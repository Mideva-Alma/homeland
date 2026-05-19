const mongoose = require('mongoose');

const contractSchema = new mongoose.Schema({
  job: { type: mongoose.Schema.Types.ObjectId, ref: 'Job', required: true },
  employer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  freelancer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  proposal: { type: mongoose.Schema.Types.ObjectId, required: true },
  status: { type: String, enum: ['pending', 'funded', 'delivered', 'released', 'disputed'], default: 'pending' },
  escrow: { type: Number, default: 0 },
  mpesa_receipt: { type: String },
  delivered_at: { type: Date },
  released_at: { type: Date },
  dispute_reason: { type: String },
  payments: [{
    to: String,
    amount: Number,
    type: String // 'freelancer' or 'platform'
  }]
}, { timestamps: true });

module.exports = mongoose.model('Contract', contractSchema);
