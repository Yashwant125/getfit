const express = require('express');
const router = express.Router();
const {
  addMember,
  getMembers,
  getActiveMembers,
  getUnpaidMembers,
  getExpiredMembers,
  updateMember,
  deleteMember,
} = require('../controllers/memberController');

// Routes for managing members
router.post('/', addMember);
router.get('/', getMembers);
router.get('/active', getActiveMembers);    // Active members route
router.get('/unpaid', getUnpaidMembers);    // Unpaid members route
router.get('/expired', getExpiredMembers);  // Expired members route
router.put('/:id', updateMember);
router.delete('/:id', deleteMember);

module.exports = router;
