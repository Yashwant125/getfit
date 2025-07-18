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

const UnpaidMembers = () => {
  const [unpaidMembers, setUnpaidMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUnpaidMembers = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/members/unpaid");
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

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    doc.text("Unpaid & Partially Paid Members Report", 14, 15);

    const tableData = unpaidMembers.map((member, index) => [
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

    doc.save("Unpaid_Members_Report.pdf");
  };

  return (
    <Box p={3}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h6">🧾 Unpaid & Partially Paid Members</Typography>
        <Button
          variant="contained"
          color="primary"
          size="small"
          onClick={handleDownloadPDF}
          sx={{ textTransform: "none", px: 2, py: 0.5 }}
        >
          📄 Download PDF
        </Button>
      </Box>

      {loading ? (
        <CircularProgress />
      ) : error ? (
        <Alert severity="error">{error}</Alert>
      ) : unpaidMembers.length === 0 ? (
        <Typography>No unpaid members found.</Typography>
      ) : (
        unpaidMembers.map((member) => (
          <Card key={member._id} sx={{ mb: 2 }}>
            <CardContent>
              <Typography variant="h6">{member.name}</Typography>
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

export default UnpaidMembers;
