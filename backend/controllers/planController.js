const Plan = require('../models/Plan');

// Add a new membership plan
const addPlan = async (req, res) => {
  try {
    const { membershipType, duration, amount } = req.body;

    const newPlan = await Plan.create({ membershipType, duration, amount });
    res.status(201).json(newPlan);
  } catch (error) {
    console.error("Add plan error:", error);
    res.status(400).json({ error: error.message });
  }
};

// Get all membership plans
const getPlans = async (_req, res) => {
  try {
    const plans = await Plan.find().sort({ createdAt: -1 });
    res.status(200).json(plans);
  } catch (error) {
    console.error("Get plans error:", error);
    res.status(500).json({ error: error.message });
  }
};

// Delete a membership plan by ID
const deletePlan = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedPlan = await Plan.findByIdAndDelete(id);

    if (!deletedPlan) {
      return res.status(404).json({ message: "Plan not found" });
    }

    res.status(200).json({ message: "Plan deleted successfully" });
  } catch (error) {
    console.error("Delete plan error:", error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  addPlan,
  getPlans,
  deletePlan,
};
