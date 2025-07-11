const Attendance = require("../models/Attendance");
const Member = require("../models/Member");

// ✅ Mark attendance by phone number
exports.markAttendance = async (req, res) => {
  const phone = req.body.phone?.trim(); // Trim input to avoid space issues
  const today = new Date().toISOString().split("T")[0]; // Format: YYYY-MM-DD

  try {
    // Optional: Log incoming phone for debugging
    console.log("Marking attendance for phone:", phone);

    const member = await Member.findOne({ phone });
    if (!member) {
      console.log("❌ Member not found with phone:", phone);
      return res.status(404).json({ error: "Member not found" });
    }

    const alreadyMarked = await Attendance.findOne({
      memberId: member._id,
      date: today,
    });

    if (alreadyMarked) {
      return res.status(400).json({ error: "Attendance already marked for today" });
    }

    const newAttendance = new Attendance({
      memberId: member._id,
      name: member.name,
      phone: member.phone,
      date: today,
      status: "Present",
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
      .populate("memberId", "name phone");

    res.json(records);
  } catch (err) {
    console.error("⚠️ Error fetching attendance:", err);
    res.status(500).json({ error: "Error fetching attendance records" });
  }
};
