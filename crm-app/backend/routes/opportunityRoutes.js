const express = require('express');
const {
  createOpportunity,
  getOpportunities,
  getOpportunityById,
  updateOpportunity,
  deleteOpportunity,
} = require('../controllers/opportunityController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// Route to create a new opportunity and get all opportunities
router.route('/')
  .post(protect, createOpportunity)  // Create a new opportunity
  .get(protect, getOpportunities);   // Get all opportunities

// Route to get, update, or delete an opportunity by ID
router.route('/:id')
  .get(protect, getOpportunityById)   // Get an opportunity by ID
  .put(protect, updateOpportunity)   // Update an opportunity by ID
  .delete(protect, deleteOpportunity); // Delete an opportunity by ID

module.exports = router;
