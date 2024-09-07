const SalesReport = require('../models/SalesReport');
const Opportunity = require('../models/Opportunity');
const Lead = require('../models/Lead');

// @desc    Generate sales report
// @route   GET /api/reports/sales
// @access  Private
exports.generateSalesReport = async (req, res) => {
  const { startDate, endDate } = req.query;

  try {
    // Aggregate sales data
    const opportunities = await Opportunity.aggregate([
      {
        $match: {
          expectedCloseDate: { $gte: new Date(startDate), $lte: new Date(endDate) },
        },
      },
      {
        $group: {
          _id: null,
          totalSales: { $sum: "$value" },
          totalOpportunities: { $count: {} },
        },
      },
    ]);

    const leads = await Lead.find({ createdAt: { $gte: new Date(startDate), $lte: new Date(endDate) } });

    const conversionRate = (opportunities[0]?.totalOpportunities || 0) / (leads.length || 1);
    const averageDealSize = (opportunities[0]?.totalSales || 0) / (opportunities[0]?.totalOpportunities || 1);
    const salesCycleLength = (new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24);

    const salesReport = {
      startDate: new Date(startDate),
      endDate: new Date(endDate),
      totalSales: opportunities[0]?.totalSales || 0,
      conversionRate,
      averageDealSize,
      salesCycleLength,
    };

    res.json(salesReport);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Generate customer report
// @route   GET /api/reports/customers
// @access  Private
exports.generateCustomerReport = async (req, res) => {
  const { startDate, endDate } = req.query;

  try {
    const customers = await Lead.find({
      createdAt: { $gte: new Date(startDate), $lte: new Date(endDate) },
    });

    const customerReport = {
      totalCustomers: customers.length,
      // Add more customer metrics as needed
    };

    res.json(customerReport);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
