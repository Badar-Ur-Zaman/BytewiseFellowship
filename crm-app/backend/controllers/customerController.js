const Customer = require('../models/Customer');

// @desc    Create a new customer
// @route   POST /api/customers
// @access  Private
exports.createCustomer = async (req, res) => {
  const { name, contactInfo, company, address, industry, notes } = req.body;

  try {
    const customer = new Customer({
      name,
      contactInfo,
      company,
      address,
      industry,
      notes,
    });

    const savedCustomer = await customer.save();
    res.status(201).json(savedCustomer);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get all customers or search by criteria
// @route   GET /api/customers
// @access  Private
exports.getCustomers = async (req, res) => {
  const { name, company, industry } = req.query;

  try {
    const query = {};

    if (name) query.name = { $regex: name, $options: 'i' };
    if (company) query.company = { $regex: company, $options: 'i' };
    if (industry) query.industry = { $regex: industry, $options: 'i' };

    const customers = await Customer.find(query);
    res.json(customers);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get a single customer by ID
// @route   GET /api/customers/:id
// @access  Private
exports.getCustomerById = async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id);

    if (!customer) {
      return res.status(404).json({ message: 'Customer not found' });
    }

    res.json(customer);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Update customer data
// @route   PUT /api/customers/:id
// @access  Private
exports.updateCustomer = async (req, res) => {
  const { name, contactInfo, company, address, industry, notes } = req.body;

  try {
    const customer = await Customer.findById(req.params.id);

    if (!customer) {
      return res.status(404).json({ message: 'Customer not found' });
    }

    customer.name = name || customer.name;
    customer.contactInfo = contactInfo || customer.contactInfo;
    customer.company = company || customer.company;
    customer.address = address || customer.address;
    customer.industry = industry || customer.industry;
    customer.notes = notes || customer.notes;

    const updatedCustomer = await customer.save();
    res.json(updatedCustomer);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Delete customer
// @route   DELETE /api/customers/:id
// @access  Private
exports.deleteCustomer = async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id);

    if (!customer) {
      return res.status(404).json({ message: 'Customer not found' });
    }

    await customer.remove();
    res.json({ message: 'Customer removed' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Log an interaction for a customer
// @route   POST /api/customers/:id/interactions
// @access  Private
exports.logInteraction = async (req, res) => {
  const { interactionType, date, time, description } = req.body;

  try {
    const customer = await Customer.findById(req.params.id);

    if (!customer) {
      return res.status(404).json({ message: 'Customer not found' });
    }

    const newInteraction = {
      interactionType,
      date,
      time,
      description,
    };

    customer.interactions.push(newInteraction);
    const updatedCustomer = await customer.save();

    res.status(201).json(updatedCustomer);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
