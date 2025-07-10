const express = require('express');
const router = express.Router();
const { addPlan, getPlans, deletePlan } = require('../controllers/planController');

// Add new plan
router.post('/', addPlan);

// Get all plans
router.get('/', getPlans);

// Delete a plan by ID
router.delete('/:id', deletePlan);

module.exports = router;
