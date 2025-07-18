const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema(
  {
    memberId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Member", // ✅ For populate() support
      required: true,
    },
    name: String,
    phone: String,
    date: {
      type: String, // Format: YYYY-MM-DD
      required: true,
    },
    status: {
      type: String,
      enum: ["Present", "Absent"], // ✅ Only these values allowed
      default: "Present",
    },
  },
  { timestamps: true }
);

module.exports =
  mongoose.models.Attendance || mongoose.model("Attendance", attendanceSchema);
