// routes/attendanceRoutes.js

const express = require("express");
const router = express.Router();
const attendanceController = require("../controllers/attendanceController");

router.post("/mark", attendanceController.markAttendance);
router.get("/", attendanceController.getAllAttendance);
router.delete("/:id", attendanceController.deleteAttendance);

module.exports = router;
