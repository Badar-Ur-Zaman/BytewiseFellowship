const express = require('express');
const { generateSalesReport, generateCustomerReport } = require('../controllers/reportController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/sales', protect, generateSalesReport);
router.get('/customers', protect, generateCustomerReport);

module.exports = router;
