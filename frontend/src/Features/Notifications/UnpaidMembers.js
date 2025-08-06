import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Card,
  CardContent,
  Typography,
  CircularProgress,
  Divider,
  Alert,
  Button,
  TextField,
} from "@mui/material";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const UnpaidMembers = () => {
  const [unpaidMembers, setUnpaidMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchUnpaidMembers = async () => {
      try {
        const response = await axios.get("https://getfit-v9g1.onrender.com/api/members/unpaid");
        setUnpaidMembers(response.data);
      } catch (error) {
        setError("Error fetching unpaid members.");
        console.error("Error fetching unpaid members:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUnpaidMembers();
  }, []);

  const filteredMembers = unpaidMembers.filter((member) =>
    member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.registrationNumber.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    doc.text("Unpaid & Partially Paid Members Report", 14, 15);

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

    doc.save("Unpaid_Members_Report.pdf");
  };

  return (
    <Box p={2} sx={{ maxWidth: "100%", mx: "auto" }}>
      <Box
        display="flex"
        flexDirection={{ xs: "column", sm: "row" }}
        justifyContent="space-between"
        alignItems={{ xs: "stretch", sm: "center" }}
        gap={2}
        mb={2}
      >
        <Typography variant="h6">🧾 Unpaid Members</Typography>
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
        <Typography>No matching unpaid members found.</Typography>
      ) : (
        filteredMembers.map((member) => (
          <Card key={member._id} sx={{ mb: 2 }}>
            <CardContent>
              <Typography variant="h6" fontSize={{ xs: "1rem", sm: "1.2rem" }}>
                {member.name}
              </Typography>
              <Typography variant="body2" fontSize={{ xs: "0.85rem" }}>
                Reg#: {member.registrationNumber} | Phone: {member.phone}
              </Typography>
              <Typography variant="body2" fontSize={{ xs: "0.85rem" }}>
                Membership: {member.membershipType}
              </Typography>
              <Typography variant="body2" fontSize={{ xs: "0.85rem" }}>
                Status: <strong>{member.status}</strong>
              </Typography>
              <Divider sx={{ my: 1 }} />
              <Typography variant="body2" fontSize={{ xs: "0.85rem" }}>
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

export default UnpaidMembers;


