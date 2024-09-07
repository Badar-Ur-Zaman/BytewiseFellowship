const mongoose = require('mongoose');

const salesReportSchema = new mongoose.Schema({
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  totalSales: { type: Number, default: 0 },
  conversionRate: { type: Number, default: 0 },
  averageDealSize: { type: Number, default: 0 },
  salesCycleLength: { type: Number, default: 0 }, // in days
});

const SalesReport = mongoose.model('SalesReport', salesReportSchema);

module.exports = SalesReport;
