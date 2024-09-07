const mongoose = require("mongoose");

const interactionSchema = new mongoose.Schema({
  interactionType: { type: String, required: true },
  date: { type: Date, required: true },
  time: { type: String, required: true },
  description: { type: String, required: true },
});

const customerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  contactInfo: { type: String, required: true },
  company: { type: String, required: true },
  address: { type: String, required: true },
  industry: { type: String, required: true },
  notes: { type: String },
  interactions: [interactionSchema],
});

const Customer = mongoose.model("Customer", customerSchema);

module.exports = Customer;
