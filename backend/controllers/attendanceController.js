const Attendance = require("../models/Attendance");
const Member = require("../models/Member");

// POST /api/attendance/mark
const markPresent = async (req, res) => {
  try {
    const { phone } = req.body;

    if (!phone) {
      return res.status(400).json({ error: "Phone number is required." });
    }

    const member = await Member.findOne({ phone });
    if (!member) {
      return res.status(404).json({ error: "Member not found with this phone number." });
    }

    // Get today's date in YYYY-MM-DD format
    const today = new Date().toISOString().split("T")[0];

    const alreadyMarked = await Attendance.findOne({
      memberId: member._id,
      date: today,
    });

    if (alreadyMarked) {
      return res.status(400).json({ error: "Attendance already marked today." });
    }

    const attendance = new Attendance({
      memberId: member._id,
      date: today, // Save as string: "YYYY-MM-DD"
      status: "present",
      markedAt: new Date(), // Full timestamp
    });

    await attendance.save();

    res.status(201).json({ message: `Attendance marked for ${member.name}` });
  } catch (err) {
    console.error("Error marking attendance:", err.message);
    res.status(500).json({ error: "Server error. Please try again." });
  }
};

// GET /api/attendance
const getAttendance = async (req, res) => {
  try {
    const { date, status } = req.query;
    const filter = {};

    // Optional date filter (expects "YYYY-MM-DD")
    if (date) {
      filter.date = date;
    }

    // Optional status filter
    if (status && status !== "all") {
      filter.status = status;
    }

    const attendance = await Attendance.find(filter)
      .populate("memberId", "name registrationNumber phone")
      .sort({ date: -1 });

    res.status(200).json(attendance);
  } catch (err) {
    console.error("Error fetching attendance:", err.message);
    res.status(500).json({ error: "Failed to retrieve attendance data." });
  }
};

module.exports = {
  markPresent,
  getAttendance,
};
