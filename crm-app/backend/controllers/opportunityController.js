const Opportunity = require('../models/Opportunity');

// @desc    Create a new opportunity
// @route   POST /api/opportunities
// @access  Private
exports.createOpportunity = async (req, res) => {
  const { opportunityName, value, stage, expectedCloseDate, lead } = req.body;

  try {
    const opportunity = new Opportunity({
      opportunityName,
      value,
      stage,
      expectedCloseDate,
      lead,
    });

    const savedOpportunity = await opportunity.save();
    res.status(201).json(savedOpportunity);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get all opportunities or filter by stage
// @route   GET /api/opportunities
// @access  Private
exports.getOpportunities = async (req, res) => {
  const { stage } = req.query;

  try {
    const query = {};

    if (stage) query.stage = stage;

    const opportunities = await Opportunity.find(query).populate('lead', 'leadName');
    res.json(opportunities);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get a single opportunity by ID
// @route   GET /api/opportunities/:id
// @access  Private
exports.getOpportunityById = async (req, res) => {
  try {
    const opportunity = await Opportunity.findById(req.params.id).populate('lead', 'leadName');

    if (!opportunity) {
      return res.status(404).json({ message: 'Opportunity not found' });
    }

    res.json(opportunity);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Update opportunity data
// @route   PUT /api/opportunities/:id
// @access  Private
exports.updateOpportunity = async (req, res) => {
  const { opportunityName, value, stage, expectedCloseDate } = req.body;

  try {
    const opportunity = await Opportunity.findById(req.params.id);

    if (!opportunity) {
      return res.status(404).json({ message: 'Opportunity not found' });
    }

    opportunity.opportunityName = opportunityName || opportunity.opportunityName;
    opportunity.value = value || opportunity.value;
    opportunity.stage = stage || opportunity.stage;
    opportunity.expectedCloseDate = expectedCloseDate || opportunity.expectedCloseDate;

    const updatedOpportunity = await opportunity.save();
    res.json(updatedOpportunity);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Delete opportunity
// @route   DELETE /api/opportunities/:id
// @access  Private
exports.deleteOpportunity = async (req, res) => {
  try {
    const opportunity = await Opportunity.findById(req.params.id);

    if (!opportunity) {
      return res.status(404).json({ message: 'Opportunity not found' });
    }

    await opportunity.remove();
    res.json({ message: 'Opportunity removed' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
