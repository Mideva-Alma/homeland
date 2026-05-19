const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validateRegister, validateLogin } = require('../utils/validators');

const JWT_SECRET = process.env.JWT_SECRET;
const REFRESH_SECRET = process.env.REFRESH_TOKEN_SECRET;

function generateAccessToken(user) {
  return jwt.sign({ userId: user._id, role: user.role }, JWT_SECRET, { expiresIn: '1h' });
}
function generateRefreshToken(user) {
  return jwt.sign({ userId: user._id, role: user.role }, REFRESH_SECRET, { expiresIn: '7d' });
}

exports.register = async (req, res) => {
  const { errors, valid } = validateRegister(req.body);
  if (!valid) return res.status(400).json({ errors });
  try {
    const exists = await User.findOne({ $or: [ { email: req.body.email }, { phone: req.body.phone } ] });
    if (exists) return res.status(409).json({ errors: { email: 'Email or phone already in use' } });
    const hash = await bcrypt.hash(req.body.password, 12);
    const user = await User.create({ ...req.body, password: hash });
    const userObj = user.toObject();
    delete userObj.password;
    delete userObj.refreshToken;
    res.status(201).json({ user: userObj });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.login = async (req, res) => {
  const { errors, valid } = validateLogin(req.body);
  if (!valid) return res.status(400).json({ errors });
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(401).json({ error: 'Invalid credentials' });
    const match = await bcrypt.compare(req.body.password, user.password);
    if (!match) return res.status(401).json({ error: 'Invalid credentials' });
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);
    user.refreshToken = refreshToken;
    await user.save();
    res.json({ accessToken, refreshToken });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.refresh = async (req, res) => {
  const { refreshToken } = req.body;
  if (!refreshToken) return res.status(400).json({ error: 'Refresh token required' });
  try {
    const payload = jwt.verify(refreshToken, REFRESH_SECRET);
    const user = await User.findById(payload.userId);
    if (!user || user.refreshToken !== refreshToken) return res.status(401).json({ error: 'Invalid refresh token' });
    const accessToken = generateAccessToken(user);
    res.json({ accessToken });
  } catch (err) {
    res.status(401).json({ error: 'Invalid refresh token' });
  }
};

exports.me = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select('-password -refreshToken');
    res.json({ user });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};
