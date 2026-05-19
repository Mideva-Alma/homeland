const Job = require('../models/Job');
const User = require('../models/User');

// GET /api/jobs
exports.listJobs = async (req, res) => {
  try {
    let { search, category, location, budget_min, budget_max, sort, page = 1, limit = 10 } = req.query;
    let query = {};
    if (search) query.$or = [
      { title: { $regex: search, $options: 'i' } },
      { description: { $regex: search, $options: 'i' } }
    ];
    if (category) query.category = category;
    if (location) query.location = location;
    if (budget_min) query.budget = { ...query.budget, $gte: Number(budget_min) };
    if (budget_max) query.budget = { ...query.budget, $lte: Number(budget_max) };
    let jobsQuery = Job.find(query);
    if (sort === 'budget_high') jobsQuery = jobsQuery.sort({ budget: -1 });
    else if (sort === 'budget_low') jobsQuery = jobsQuery.sort({ budget: 1 });
    else jobsQuery = jobsQuery.sort({ createdAt: -1 });
    const total = await Job.countDocuments(query);
    const jobs = await jobsQuery.skip((page-1)*limit).limit(Number(limit)).populate('employer', 'name email');
    res.json({ jobs, total });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

// POST /api/jobs
exports.createJob = async (req, res) => {
  const { title, description, category, location, budget } = req.body;
  if (!title || !description || !category || !location || !budget) {
    return res.status(400).json({ error: 'All fields required' });
  }
  try {
    const job = await Job.create({
      title, description, category, location, budget,
      employer: req.user.userId
    });
    res.status(201).json({ job });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

// GET /api/jobs/:id
exports.getJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id).populate('employer', 'name email');
    if (!job) return res.status(404).json({ error: 'Job not found' });
    res.json({ job, proposalCount: job.proposals.length });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

// POST /api/jobs/:id/proposals
exports.createProposal = async (req, res) => {
  const { cover_letter, proposed_budget, timeline_days } = req.body;
  if (!cover_letter || cover_letter.length < 50) return res.status(400).json({ error: 'Cover letter min 50 chars' });
  if (!proposed_budget) return res.status(400).json({ error: 'Proposed budget required' });
  if (!timeline_days) return res.status(400).json({ error: 'Timeline required' });
  try {
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ error: 'Job not found' });
    const already = job.proposals.find(p => p.freelancer.toString() === req.user.userId);
    if (already) return res.status(409).json({ error: 'You already proposed for this job' });
    job.proposals.push({
      freelancer: req.user.userId,
      cover_letter,
      proposed_budget,
      timeline_days
    });
    await job.save();
    res.status(201).json({ proposal: job.proposals[job.proposals.length-1] });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

// PUT /api/jobs/:id/proposals/:proposalId/accept
exports.acceptProposal = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ error: 'Job not found' });
    if (job.employer.toString() !== req.user.userId) return res.status(403).json({ error: 'Not your job' });
    const proposal = job.proposals.id(req.params.proposalId);
    if (!proposal) return res.status(404).json({ error: 'Proposal not found' });
    job.proposals.forEach(p => {
      if (p._id.equals(proposal._id)) p.status = 'accepted';
      else p.status = 'rejected';
    });
    await job.save();
    // Contract creation would go here
    res.json({ proposal });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};
