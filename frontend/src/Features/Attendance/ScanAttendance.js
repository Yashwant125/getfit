import React, { useState } from "react";
import axios from "axios";

function ScanAttendance() {
  const [identifier, setIdentifier] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!identifier) return;

    try {
      const res = await axios.post("https://getfit-v9g1.onrender.com/api/attendance/mark", { identifier });
      setMessage(res.data.message || "Marked present!");
      setIdentifier("");
    } catch (err) {
      setMessage(err.response?.data?.error || "Error marking attendance");
    }
  };

  return (
    <div
      className="attendance-form"
      style={{
        maxWidth: "400px",
        margin: "0 auto",
        padding: "1.5rem",
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        boxShadow: "0 0 10px rgba(0,0,0,0.1)",
        borderRadius: "10px",
        backgroundColor: "#f9f9f9",
      }}
    >
      <h2 style={{ textAlign: "center", fontSize: "1.2rem" }}>
        Mark Your Attendance
      </h2>
      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}
      >
        <input
          type="text"
          placeholder="Enter Phone or Registration Number"
          value={identifier}
          onChange={(e) => setIdentifier(e.target.value)}
          required
          style={{
            padding: "0.6rem",
            fontSize: "1rem",
            borderRadius: "5px",
            border: "1px solid #ccc",
          }}
        />
        <button
          type="submit"
          style={{
            padding: "0.6rem",
            fontSize: "1rem",
            backgroundColor: "#1976d2",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Mark Present
        </button>
      </form>
      <p style={{ textAlign: "center", color: "#333", margin: 0 }}>{message}</p>
    </div>
  );
}

export default ScanAttendance;
