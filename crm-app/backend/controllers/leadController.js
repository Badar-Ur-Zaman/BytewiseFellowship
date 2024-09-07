const Lead = require('../models/Lead');

// @desc    Create a new lead
// @route   POST /api/leads
// @access  Private
exports.createLead = async (req, res) => {
  const { leadName, contactInfo, source, status, assignedTo } = req.body;

  try {
    const lead = new Lead({
      leadName,
      contactInfo,
      source,
      status,
      assignedTo,
    });

    const savedLead = await lead.save();
    res.status(201).json(savedLead);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get all leads or filter by criteria
// @route   GET /api/leads
// @access  Private
exports.getLeads = async (req, res) => {
  const { status, assignedTo } = req.query;

  try {
    const query = {};

    if (status) query.status = status;
    if (assignedTo) query.assignedTo = assignedTo;

    const leads = await Lead.find(query).populate('assignedTo', 'name email');
    res.json(leads);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get a single lead by ID
// @route   GET /api/leads/:id
// @access  Private
exports.getLeadById = async (req, res) => {
  try {
    const lead = await Lead.findById(req.params.id).populate('assignedTo', 'name email');

    if (!lead) {
      return res.status(404).json({ message: 'Lead not found' });
    }

    res.json(lead);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Update lead data
// @route   PUT /api/leads/:id
// @access  Private
exports.updateLead = async (req, res) => {
  const { leadName, contactInfo, source, status, assignedTo } = req.body;

  try {
    const lead = await Lead.findById(req.params.id);

    if (!lead) {
      return res.status(404).json({ message: 'Lead not found' });
    }

    lead.leadName = leadName || lead.leadName;
    lead.contactInfo = contactInfo || lead.contactInfo;
    lead.source = source || lead.source;
    lead.status = status || lead.status;
    lead.assignedTo = assignedTo || lead.assignedTo;

    const updatedLead = await lead.save();
    res.json(updatedLead);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Delete lead
// @route   DELETE /api/leads/:id
// @access  Private
exports.deleteLead = async (req, res) => {
  try {
    const lead = await Lead.findById(req.params.id);

    if (!lead) {
      return res.status(404).json({ message: 'Lead not found' });
    }

    await lead.remove();
    res.json({ message: 'Lead removed' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
