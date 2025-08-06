import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Card,
  CardContent,
  Typography,
  CircularProgress,
  Box,
  Divider,
  Alert,
  Button,
  TextField,
} from "@mui/material";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const ExpiredMembers = () => {
  const [expiredMembers, setExpiredMembers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchExpiredMembers = async () => {
      try {
        const response = await axios.get(
          "https://getfit-v9g1.onrender.com/api/members/expired"
        );
        setExpiredMembers(response.data);
      } catch (error) {
        setError("Error fetching expired members.");
        console.error("Error fetching expired members:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchExpiredMembers();
  }, []);

  const filteredMembers = expiredMembers.filter((member) => {
    const term = searchTerm.toLowerCase();
    return (
      member.name.toLowerCase().includes(term) ||
      member.registrationNumber.toLowerCase().includes(term)
    );
  });

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    doc.text("Expired Members Report", 14, 15);

    const tableData = filteredMembers.map((member, index) => [
      index + 1,
      member.name,
      member.registrationNumber,
      member.phone,
      member.membershipType,
      member.status,
      new Date(member.startDate).toLocaleDateString("en-GB"),
      new Date(member.endDate).toLocaleDateString("en-GB"),
    ]);

    autoTable(doc, {
      head: [
        [
          "S.No",
          "Name",
          "Reg No.",
          "Phone",
          "Membership",
          "Status",
          "Start Date",
          "End Date",
        ],
      ],
      body: tableData,
      startY: 20,
      styles: { fontSize: 8 },
    });

    doc.save("Expired_Members_Report.pdf");
  };

  return (
    <Box p={{ xs: 2, sm: 3 }}>
      <Box
        display="flex"
        flexDirection={{ xs: "column", sm: "row" }}
        justifyContent="space-between"
        alignItems={{ xs: "flex-start", sm: "center" }}
        gap={2}
        mb={2}
      >
        <Typography variant="h5">⌛ Expired Members</Typography>

        <Box display="flex" gap={2} alignItems="center" flexWrap="wrap">
          <TextField
            size="small"
            label="Search Reg No. or Name"
            variant="outlined"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Button
            variant="contained"
            sx={{ textTransform: "capitalize" }}
            size="small"
            color="primary"
            onClick={handleDownloadPDF}
          >
            📄 Download PDF
          </Button>
        </Box>
      </Box>

      {loading ? (
        <CircularProgress />
      ) : error ? (
        <Alert severity="error">{error}</Alert>
      ) : filteredMembers.length === 0 ? (
        <Typography>No expired members found.</Typography>
      ) : (
        filteredMembers.map((member) => (
          <Card key={member._id} sx={{ mb: 2 }}>
            <CardContent>
              <Typography variant="h6" fontSize={{ xs: 16, sm: 18 }}>
                {member.name}
              </Typography>
              <Typography variant="body2" fontSize={{ xs: 13, sm: 14 }}>
                Reg#: {member.registrationNumber} | Phone: {member.phone}
              </Typography>
              <Typography variant="body2" fontSize={{ xs: 13, sm: 14 }}>
                Membership: {member.membershipType}
              </Typography>
              <Typography variant="body2" fontSize={{ xs: 13, sm: 14 }}>
                Status: <strong>{member.status}</strong>
              </Typography>
              <Divider sx={{ my: 1 }} />
              <Typography variant="body2" fontSize={{ xs: 13, sm: 14 }}>
                Start: {new Date(member.startDate).toLocaleDateString("en-GB")} | End:{" "}
                {new Date(member.endDate).toLocaleDateString("en-GB")}
              </Typography>
            </CardContent>
          </Card>
        ))
      )}
    </Box>
  );
};

export default ExpiredMembers;


