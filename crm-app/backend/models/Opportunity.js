const mongoose = require('mongoose');

const opportunitySchema = new mongoose.Schema({
  opportunityName: { type: String, required: true },
  value: { type: Number, required: true },
  stage: {
    type: String,
    enum: ['Qualification', 'Proposal', 'Negotiation', 'Closed'],
    default: 'Qualification',
  },
  expectedCloseDate: { type: Date, required: true },
  lead: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Lead',
    required: true,
  },
});

const Opportunity = mongoose.model('Opportunity', opportunitySchema);

module.exports = Opportunity;
