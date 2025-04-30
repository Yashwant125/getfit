const express = require('express');
const router = express.Router();
const { addPlan, getPlans } = require('../controllers/planController');

// Route to add plan
router.post('/', addPlan);

// Route to get all plans
router.get('/', getPlans);

module.exports = router;
