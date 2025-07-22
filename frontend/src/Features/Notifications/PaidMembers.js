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
} from "@mui/material";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const PaidMembers = () => {
  const [activeMembers, setActiveMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchActiveMembers = async () => {
      try {
        const response = await axios.get("https://getfit-v9g1.onrender.com/api/members/active");
        setActiveMembers(response.data);
      } catch (error) {
        setError("Error fetching active members.");
        console.error("Failed to fetch active members:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchActiveMembers();
  }, []);

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    doc.text("Paid Members Report", 14, 15);

    const tableData = activeMembers.map((member, index) => [
      index + 1,
      member.name,
      member.registrationNumber,
      member.phone,
      member.membershipType,
      member.status,
      new Date(member.startDate).toLocaleDateString(),
      new Date(member.endDate).toLocaleDateString(),
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

    doc.save("Paid_Members_Report.pdf");
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
        <Typography variant="h5" sx={{ fontSize: { xs: "1.2rem", sm: "1.5rem" } }}>
          ✅ Paid Members
        </Typography>
        <Button
          variant="contained"
          color="primary"
          size="small"
          sx={{
            textTransform: "capitalize",
            alignSelf: { xs: "flex-start", sm: "center" },
            whiteSpace: "nowrap",
          }}
          onClick={handleDownloadPDF}
        >
          📄 Download PDF
        </Button>
      </Box>

      {loading ? (
        <CircularProgress />
      ) : error ? (
        <Alert severity="error">{error}</Alert>
      ) : activeMembers.length === 0 ? (
        <Typography>No active members found.</Typography>
      ) : (
        activeMembers.map((member) => (
          <Card key={member._id} sx={{ mb: 2 }}>
            <CardContent sx={{ px: 2 }}>
              <Typography variant="h6" sx={{ fontSize: { xs: "1rem", sm: "1.25rem" } }}>
                {member.name}
              </Typography>
              <Typography variant="body2">
                Reg#: {member.registrationNumber} | Phone: {member.phone}
              </Typography>
              <Typography variant="body2">Membership: {member.membershipType}</Typography>
              <Typography variant="body2">
                Status: <strong>{member.status}</strong>
              </Typography>
              <Divider sx={{ my: 1 }} />
              <Typography variant="body2">
                Start: {new Date(member.startDate).toLocaleDateString()} | End:{" "}
                {new Date(member.endDate).toLocaleDateString()}
              </Typography>
            </CardContent>
          </Card>
        ))
      )}
    </Box>
  );
};

export default PaidMembers;
