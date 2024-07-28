const Lead=require('../models/Lead')
const { body, validationResult } = require('express-validator');

exports.createLead = [
  // Validation rules
  body('productName').notEmpty().withMessage('Product name is required'),
  body('phoneNumber').notEmpty().withMessage('Phone number is required').isMobilePhone().withMessage('Invalid phone number'),
  body('description').notEmpty().withMessage('Description is required'),
  body('companyName').notEmpty().withMessage('Company name is required'),
  body('industry').notEmpty().withMessage('Industry is required'),
  body('state').notEmpty().withMessage('State is required'),
  body('city').notEmpty().withMessage('City is required'),

  // Controller logic
  async (req, res) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { productName, phoneNumber, description, companyName, industry, state, city } = req.body;

    try {
      const newLead = await Lead.create({
        productName,
       
        phoneNumber,
        description,
        companyName,
        industry,
        state,
        city,
      });

      return res.status(201).json({ message: 'Lead created successfully', lead: newLead });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Server error' });
    }
  }
];
exports.getAllLeads = async (req, res) => {
    try {
      const leads = await Lead.findAll();
  
      if (!leads.length) {
        return res.status(404).json({ message: 'No leads found' });
      }
  
      return res.status(200).json({ leads });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Server error' });
    }
  };
exports.deleteLead = [
    // Validation rules
    body('id').notEmpty().withMessage('ID is required').isInt().withMessage('ID must be an integer'),
  
    // Controller logic
    async (req, res) => {
      // Check for validation errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
  
      const { id } = req.body;
  
      try {
        // Check if the lead exists
        const lead = await Lead.findByPk(id);
        if (!lead) {
          return res.status(404).json({ message: 'Lead not found' });
        }
  
        // Delete the lead
        await lead.destroy();
  
        return res.status(200).json({ message: 'Lead deleted successfully' });
      } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error' });
      }
    }
  ];