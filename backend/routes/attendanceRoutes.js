const express = require("express");
const router = express.Router();
const { markPresent, getAttendance } = require("../controllers/attendanceController");

router.post("/mark", markPresent);       // POST /api/attendance/mark
router.get("/", getAttendance);          // GET /api/attendance?status=present

module.exports = router;
