const Attendance = require("../models/Attendance");
const Member = require("../models/Member");

// ✅ Mark attendance by phone or registration number
exports.markAttendance = async (req, res) => {
  const identifier = req.body.identifier?.trim();
  const today = new Date().toISOString().split("T")[0];

  try {
    console.log("Marking attendance for:", identifier);

    const member = await Member.findOne({
      $or: [{ phone: identifier }, { registrationNumber: identifier }],
    });

    if (!member) {
      console.log("❌ Member not found with identifier:", identifier);
      return res.status(404).json({ error: "Member not found" });
    }

    const alreadyMarked = await Attendance.findOne({
      memberId: member._id,
      date: today,
    });

    if (alreadyMarked) {
      return res
        .status(400)
        .json({ error: "Attendance already marked for today" });
    }

    const newAttendance = new Attendance({
      memberId: member._id,
      name: member.name,
      phone: member.phone,
      date: today,
      status: "Present", // ✅ Always set to "Present"
    });

    await newAttendance.save();
    res.status(200).json({ message: "Attendance marked successfully" });
  } catch (err) {
    console.error("⚠️ Error marking attendance:", err);
    res.status(500).json({ error: "Server error while marking attendance" });
  }
};

// ✅ Get all attendance records (for display)
exports.getAllAttendance = async (req, res) => {
  try {
    const records = await Attendance.find()
      .sort({ date: -1 })
      .populate("memberId"); // ✅ This line is the key fix

    res.json(records);
  } catch (err) {
    console.error("⚠️ Error fetching attendance:", err);
    res.status(500).json({ error: "Error fetching attendance records" });
  }
};

// ✅ Delete an attendance record by ID
exports.deleteAttendance = async (req, res) => {
  const attendanceId = req.params.id;

  try {
    const deletedRecord = await Attendance.findByIdAndDelete(attendanceId);
    if (!deletedRecord) {
      return res.status(404).json({ error: "Attendance record not found" });
    }

    res.json({ message: "Attendance record deleted successfully" });
  } catch (err) {
    console.error("⚠️ Error deleting attendance record:", err);
    res.status(500).json({ error: "Server error while deleting attendance" });
  }
};
