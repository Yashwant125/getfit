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
      style={{
        minHeight: "100vh",
        backgroundColor: "#eef2f7",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        paddingTop: "180px",
        paddingLeft: "1rem",
        paddingRight: "1rem",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "420px",
          backgroundColor: "#ffffff",
          borderRadius: "12px",
          boxShadow: "0 8px 24px rgba(0, 0, 0, 0.1)",
          padding: "2rem",
          display: "flex",
          flexDirection: "column",
          gap: "1.2rem",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            fontSize: "1.4rem",
            whiteSpace: "nowrap", // Ensures single line
            color: "#1e293b",
            marginBottom: "0.5rem",
            fontWeight: "600",
          }}
        >
          Mark Your Attendance
        </h2>

        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
        >
          <input
            type="text"
            placeholder="Phone or Registration Number"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
            required
            style={{
              padding: "0.75rem",
              fontSize: "1rem",
              borderRadius: "8px",
              border: "1px solid #cbd5e1",
              outline: "none",
              transition: "border 0.2s",
            }}
            onFocus={(e) =>
              (e.target.style.border = "1px solid #1976d2")
            }
            onBlur={(e) =>
              (e.target.style.border = "1px solid #cbd5e1")
            }
          />

          <button
            type="submit"
            style={{
              padding: "0.75rem",
              fontSize: "1rem",
              backgroundColor: "#1976d2",
              color: "white",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              fontWeight: "500",
              transition: "background-color 0.2s ease-in-out",
            }}
            onMouseOver={(e) =>
              (e.target.style.backgroundColor = "#155fa0")
            }
            onMouseOut={(e) =>
              (e.target.style.backgroundColor = "#1976d2")
            }
          >
            Mark Present
          </button>
        </form>

        {message && (
          <p
            style={{
              textAlign: "center",
              color: message.includes("Error") ? "#dc2626" : "#16a34a",
              fontWeight: "500",
              marginTop: "0.5rem",
            }}
          >
            {message}
          </p>
        )}
      </div>
    </div>
  );
}

export default ScanAttendance;

