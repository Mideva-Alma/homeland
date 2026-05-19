const mongoose = require('mongoose');

const proposalSchema = new mongoose.Schema({
  freelancer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  cover_letter: { type: String, required: true },
  proposed_budget: { type: Number, required: true },
  timeline_days: { type: Number, required: true },
  status: { type: String, enum: ['pending', 'accepted', 'rejected'], default: 'pending' },
}, { timestamps: true });

const jobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  employer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  category: { type: String, required: true },
  location: { type: String, required: true },
  budget: { type: Number, required: true },
  proposals: [proposalSchema],
}, { timestamps: true });

module.exports = mongoose.model('Job', jobSchema);
