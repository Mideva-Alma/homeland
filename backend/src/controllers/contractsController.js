const Contract = require('../models/Contract');
const { v4: uuidv4 } = require('uuid');

// POST /api/contracts/:id/fund
exports.fundContract = async (req, res) => {
  try {
    const contract = await Contract.findById(req.params.id);
    if (!contract) return res.status(404).json({ error: 'Contract not found' });
    if (contract.status !== 'pending') return res.status(400).json({ error: 'Contract not pending' });
    contract.status = 'funded';
    contract.escrow = contract.escrow || 0;
    contract.escrow += 1; // Simulate payment
    contract.mpesa_receipt = 'MPESA-' + uuidv4().slice(0,8).toUpperCase();
    await contract.save();
    res.json({ receipt: contract.mpesa_receipt, contract });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

// POST /api/contracts/:id/deliver
exports.deliverContract = async (req, res) => {
  try {
    const contract = await Contract.findById(req.params.id);
    if (!contract) return res.status(404).json({ error: 'Contract not found' });
    if (contract.status !== 'funded') return res.status(400).json({ error: 'Contract not funded' });
    contract.status = 'delivered';
    contract.delivered_at = new Date();
    await contract.save();
    res.json({ contract });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

// POST /api/contracts/:id/approve
exports.approveContract = async (req, res) => {
  try {
    const contract = await Contract.findById(req.params.id);
    if (!contract) return res.status(404).json({ error: 'Contract not found' });
    if (contract.status !== 'delivered') return res.status(400).json({ error: 'Contract not delivered' });
    contract.status = 'released';
    contract.released_at = new Date();
    const total = contract.escrow;
    const freelancerAmount = total * 0.92;
    const platformFee = total * 0.08;
    contract.payments = [
      { to: 'freelancer', amount: freelancerAmount, type: 'freelancer' },
      { to: 'platform', amount: platformFee, type: 'platform' }
    ];
    await contract.save();
    res.json({ contract });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

// POST /api/contracts/:id/dispute
exports.disputeContract = async (req, res) => {
  const { reason } = req.body;
  if (!reason || reason.length < 20) return res.status(400).json({ error: 'Reason min 20 chars' });
  try {
    const contract = await Contract.findById(req.params.id);
    if (!contract) return res.status(404).json({ error: 'Contract not found' });
    contract.status = 'disputed';
    contract.dispute_reason = reason;
    await contract.save();
    res.json({ contract });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Standalone utility: autoReleaseEscrow
exports.autoReleaseEscrow = async () => {
  const threeDaysAgo = new Date(Date.now() - 3 * 24 * 60 * 60 * 1000);
  const contracts = await Contract.find({ status: 'delivered', delivered_at: { $lte: threeDaysAgo } });
  for (const contract of contracts) {
    contract.status = 'released';
    contract.released_at = new Date();
    const total = contract.escrow;
    const freelancerAmount = total * 0.92;
    const platformFee = total * 0.08;
    contract.payments = [
      { to: 'freelancer', amount: freelancerAmount, type: 'freelancer' },
      { to: 'platform', amount: platformFee, type: 'platform' }
    ];
    await contract.save();
  }
};
