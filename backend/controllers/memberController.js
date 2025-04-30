const Member = require('../models/Member');

// Add Member
const addMember = async (req, res) => {
  try {
    const {
      registrationNumber,
      name,
      phone,
      membershipType,
      startDate,
      status,
      amountPaid,
    } = req.body;

    // Ensure status is valid
    const normalizedStatus = status?.toLowerCase();
    const validStatuses = ['paid', 'unpaid', 'partially paid'];
    if (!validStatuses.includes(normalizedStatus)) {
      return res.status(400).json({ error: 'Invalid status value.' });
    }

    // Validate startDate
    const validFrom = new Date(startDate);
    if (isNaN(validFrom.getTime())) {
      return res.status(400).json({ error: 'Invalid startDate value.' });
    }

    // Calculate endDate based on membershipType
    const months = parseInt(membershipType.split(" ")[0]);
    const validTo = new Date(validFrom);
    validTo.setMonth(validFrom.getMonth() + months);

    const newMember = new Member({
      registrationNumber,
      name,
      phone,
      membershipType,
      startDate: validFrom,
      endDate: validTo,
      status: normalizedStatus,
      amountPaid,
    });

    // Save the new member to the database
    const savedMember = await newMember.save();

    res.status(201).json(savedMember);
  } catch (error) {
    console.error('Add member error:', error);
    res.status(400).json({ error: error.message });
  }
};

// Get All Members
const getMembers = async (req, res) => {
  try {
    const members = await Member.find().sort({ createdAt: -1 });
    res.status(200).json(members);
  } catch (error) {
    console.error('Get members error:', error);
    res.status(500).json({ error: error.message });
  }
};

// Get Active Members
const getActiveMembers = async (req, res) => {
  try {
    const today = new Date();
    const activeMembers = await Member.find({
      status: 'paid',
      endDate: { $gte: today },
    }).sort({ createdAt: -1 });
    res.status(200).json(activeMembers);
  } catch (error) {
    console.error('Get active members error:', error);
    res.status(500).json({ error: error.message });
  }
};

// Get Unpaid Members
const getUnpaidMembers = async (req, res) => {
  try {
    const unpaidMembers = await Member.find({
      $or: [{ status: 'unpaid' }, { status: 'partially paid' }],
    }).sort({ createdAt: -1 });
    res.status(200).json(unpaidMembers);
  } catch (error) {
    console.error('Get unpaid members error:', error);
    res.status(500).json({ error: error.message });
  }
};

// Get Expired Members
const getExpiredMembers = async (req, res) => {
  try {
    const today = new Date();
    const expiredMembers = await Member.find({
      endDate: { $lt: today },
    }).sort({ createdAt: -1 });
    res.status(200).json(expiredMembers);
  } catch (error) {
    console.error('Get expired members error:', error);
    res.status(500).json({ error: error.message });
  }
};

// Update Member
const updateMember = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      registrationNumber,
      name,
      phone,
      membershipType,
      startDate,
      status,
      amountPaid,
    } = req.body;

    const normalizedStatus = status?.toLowerCase();
    const validStatuses = ['paid', 'unpaid', 'partially paid'];
    if (!validStatuses.includes(normalizedStatus)) {
      return res.status(400).json({ error: 'Invalid status value.' });
    }

    const validFrom = new Date(startDate);
    if (isNaN(validFrom.getTime())) {
      return res.status(400).json({ error: 'Invalid startDate value.' });
    }

    const months = parseInt(membershipType.split(" ")[0]);
    const validTo = new Date(validFrom);
    validTo.setMonth(validFrom.getMonth() + months);

    const updatedMember = await Member.findByIdAndUpdate(
      id,
      {
        registrationNumber,
        name,
        phone,
        membershipType,
        startDate: validFrom,
        endDate: validTo,
        status: normalizedStatus,
        amountPaid,
      },
      { new: true }
    );

    if (!updatedMember) {
      return res.status(404).json({ error: 'Member not found' });
    }

    res.status(200).json(updatedMember);
  } catch (error) {
    console.error('Update member error:', error);
    res.status(500).json({ error: error.message });
  }
};

// Delete Member
const deleteMember = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Member.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ error: 'Member not found' });
    }

    res.status(200).json({ message: 'Member deleted successfully' });
  } catch (error) {
    console.error('Delete member error:', error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  addMember,
  getMembers,
  getActiveMembers,
  getUnpaidMembers,
  getExpiredMembers,
  updateMember,
  deleteMember,
};
