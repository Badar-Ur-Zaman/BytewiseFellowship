const mongoose = require('mongoose');

const leadSchema = new mongoose.Schema({
  leadName: { type: String, required: true },
  contactInfo: { type: String, required: true },
  source: { type: String, required: true },
  status: {
    type: String,
    enum: ['New', 'In Progress', 'Converted', 'Lost'],
    default: 'New',
  },
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
});

const Lead = mongoose.model('Lead', leadSchema);

module.exports = Lead;
