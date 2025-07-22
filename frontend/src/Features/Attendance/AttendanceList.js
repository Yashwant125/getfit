import React, { useEffect, useState } from "react";
import axios from "axios";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import {
  Typography,
  IconButton,
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
  Paper,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

function AttendanceList() {
  const [groupedRecords, setGroupedRecords] = useState({});

  const fetchData = async () => {
    try {
      const res = await axios.get("https://getfit-v9g1.onrender.com/api/attendance");
      const grouped = res.data.reduce((acc, record) => {
        let date;
        if (typeof record.date === "string" && record.date.includes("T")) {
          date = record.date.split("T")[0];
        } else if (typeof record.date === "string") {
          date = record.date;
        } else {
          const parsedDate = new Date(record.date);
          date = !isNaN(parsedDate)
            ? parsedDate.toISOString().split("T")[0]
            : "Unknown Date";
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

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id, date) => {
    try {
      await axios.delete(`https://getfit-v9g1.onrender.com/api/attendance/${id}`);
      const updated = { ...groupedRecords };
      updated[date] = updated[date].filter((rec) => rec._id !== id);
      if (updated[date].length === 0) delete updated[date];
      setGroupedRecords(updated);
    } catch (err) {
      console.error("Error deleting attendance record", err);
    }
  };

  const downloadAsPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("Attendance Report", 14, 16);
    let y = 25;

    Object.entries(groupedRecords).forEach(([date, records], index) => {
      if (index > 0) y += 10;
      doc.setFontSize(13);
      doc.text(`Date: ${date}`, 14, y);
      y += 4;

      const tableData = records.map((record) => {
        const m = record.memberId || {};
        return [
          m.registrationNumber || "N/A",
          m.name || "N/A",
          m.phone || "N/A",
          m.endDate ? new Date(m.endDate).toLocaleDateString() : "N/A",
        ];
      });

      autoTable(doc, {
        head: [["Reg No", "Name", "Phone", "Expiry Date"]],
        body: tableData,
        startY: y + 2,
        theme: "grid",
        styles: { fontSize: 10 },
        margin: { left: 14, right: 14 },
        didDrawPage: (data) => {
          y = data.cursor.y;
        },
      });
    });

    doc.save("attendance_report.pdf");
  };

  return (
    <Box p={{ xs: 1, sm: 3 }}>
      <Box
        display="flex"
        flexDirection={{ xs: "column", sm: "row" }}
        justifyContent="space-between"
        alignItems={{ xs: "flex-start", sm: "center" }}
        gap={2}
        mb={3}
      >
        <Typography
          variant="h6"
          fontWeight="bold"
        >
          📋 Attendance List
        </Typography>
        <Button
          variant="contained"
          sx={{ textTransform: "capitalize" }}
          size="small"
          color="primary"
          onClick={downloadAsPDF}
        >
          📄 Download PDF
        </Button>
      </Box>

      {Object.entries(groupedRecords).map(([date, records], index) => (
        <Paper elevation={3} key={index} sx={{ mb: 4, p: { xs: 1.5, sm: 2 } }}>
          <Typography
            variant="subtitle1"
            gutterBottom
            sx={{ fontWeight: 600, color: "#444" }}
          >
            📅 {date}
          </Typography>
          <Box sx={{ overflowX: "auto" }}>
            <Table size="small">
              <TableHead>
                <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
                  <TableCell><strong>Reg No</strong></TableCell>
                  <TableCell><strong>Name</strong></TableCell>
                  <TableCell><strong>Phone</strong></TableCell>
                  <TableCell><strong>Expiry Date</strong></TableCell>
                  <TableCell align="center"><strong>Action</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {records.map((record, idx) => {
                  const m = record.memberId || {};
                  return (
                    <TableRow
                      key={record._id}
                      sx={{
                        backgroundColor: idx % 2 === 0 ? "#fafafa" : "#fff",
                        "&:hover": { backgroundColor: "#f0f0f0" },
                      }}
                    >
                      <TableCell>{m.registrationNumber || "N/A"}</TableCell>
                      <TableCell>{m.name || "N/A"}</TableCell>
                      <TableCell>{m.phone || "N/A"}</TableCell>
                      <TableCell>
                        {m.endDate
                          ? new Date(m.endDate).toLocaleDateString()
                          : "N/A"}
                      </TableCell>
                      <TableCell align="center">
                        <IconButton
                          color="error"
                          onClick={() => handleDelete(record._id, date)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </Box>
        </Paper>
      ))}
    </Box>
  );
}

export default AttendanceList;
