import React, { useState } from "react";
import axios from "axios";

function ScanAttendance() {
  const [identifier, setIdentifier] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!identifier) return;

    try {
      const res = await axios.post("/api/attendance/mark", { identifier });
      setMessage(res.data.message || "Marked present!");
      setIdentifier(""); // optional: clear input
    } catch (err) {
      setMessage(err.response?.data?.error || "Error marking attendance");
    }
  };

  return (
    <div className="attendance-form">
      <h2>Mark Your Attendance</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter Phone or Registration Number"
          value={identifier}
          onChange={(e) => setIdentifier(e.target.value)}
          required
        />
        <button type="submit">Mark Present</button>
      </form>
      <p>{message}</p>
    </div>
  );
}

export default ScanAttendance;
