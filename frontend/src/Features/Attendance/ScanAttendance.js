import React, { useState } from "react";
import axios from "axios";

function ScanAttendance() {
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!phone) return;

    try {
      const res = await axios.post("/api/attendance/mark", { phone });
      setMessage(res.data.message || "Marked present!");
    } catch (err) {
      setMessage(err.response?.data?.error || "Error marking attendance");
    }
  };

  return (
    <div className="attendance-form">
      <h2>Mark Your Attendance</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="tel"
          placeholder="Enter your phone number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />
        <button type="submit">Mark Present</button>
      </form>
      <p>{message}</p>
    </div>
  );
}

export default ScanAttendance;
