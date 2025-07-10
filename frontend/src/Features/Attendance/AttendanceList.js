import React, { useEffect, useState } from "react";
import axios from "axios";
import { generateAttendancePDF } from "../Reports/Pdf";

function AttendanceList() {
  const [groupedRecords, setGroupedRecords] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://192.168.29.227:5000/api/attendance");

        // Group records by normalized date
        const grouped = res.data.reduce((acc, record) => {
          let date;

          if (typeof record.date === "string" && record.date.includes("T")) {
            date = record.date.split("T")[0]; // ISO string
          } else if (typeof record.date === "string") {
            date = record.date; // already in YYYY-MM-DD
          } else {
            const parsedDate = new Date(record.date);
            date = !isNaN(parsedDate) ? parsedDate.toISOString().split("T")[0] : "Unknown Date";
          }

          if (!acc[date]) acc[date] = [];
          acc[date].push(record);
          return acc;
        }, {});

        setGroupedRecords(grouped);
      } catch (err) {
        console.error("Error fetching attendance", err);
      }
    };

    fetchData();
  }, []);

  return (
    <div style={{ padding: "1rem" }}>
      <h2>Attendance List</h2>
      <button
        onClick={() => {
          const flatRecords = Object.values(groupedRecords).flat();
          generateAttendancePDF(flatRecords);
        }}
        style={{ marginBottom: "15px" }}
      >
        📄 Download PDF
      </button>

      {Object.entries(groupedRecords).map(([date, records], index) => (
        <div key={index} style={{ marginBottom: "2rem" }}>
          <h3 style={{ marginBottom: "10px" }}>{date}</h3>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                <th style={{ border: "1px solid #ccc", padding: "8px" }}>#</th>
                <th style={{ border: "1px solid #ccc", padding: "8px" }}>Name</th>
                <th style={{ border: "1px solid #ccc", padding: "8px" }}>Phone</th>
              </tr>
            </thead>
            <tbody>
              {records.map((record, i) => (
                <tr key={i}>
                  <td style={{ border: "1px solid #ccc", padding: "8px" }}>{i + 1}</td>
                  <td style={{ border: "1px solid #ccc", padding: "8px" }}>{record.memberId?.name || "N/A"}</td>
                  <td style={{ border: "1px solid #ccc", padding: "8px" }}>{record.memberId?.phone || "N/A"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
}

export default AttendanceList;
