const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema(
  {
    memberId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Member", // Matches the Member model
      required: true,
    },
    name: String,
    phone: String,
    date: {
      type: String, // Stored as 'YYYY-MM-DD'
      required: true,
    },
    status: {
      type: String,
      enum: ["Present", "Absent"],
      default: "Present",
    },
  },
  { timestamps: true }
);

// ✅ Prevent OverwriteModelError
module.exports = mongoose.models.Attendance || mongoose.model("Attendance", attendanceSchema);
