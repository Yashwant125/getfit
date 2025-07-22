import React from "react";
import {
  Paper,
  Typography,
  Grid,
  IconButton,
  Button,
  Box,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import jsPDF from "jspdf";
import "jspdf-autotable";

const ViewPlans = ({ plans, fetchPlans }) => {
  const handleDelete = async (planId) => {
    try {
      await axios.delete(`https://getfit-v9g1.onrender.com/api/plans/${planId}`);
      fetchPlans(); // Refresh after deletion
    } catch (error) {
      console.error("Error deleting plan:", error.response?.data || error.message);
    }
  };

  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("GetFit - Membership Plans", 14, 20);

    const headers = [["#", "Type", "Duration", "Amount"]];
    const data = plans.map((plan, index) => [
      index + 1,
      plan.membershipType || "N/A",
      plan.duration || "N/A",
      plan.amount || "N/A",
    ]);

    doc.autoTable({
      head: headers,
      body: data,
      startY: 30,
      styles: { fontSize: 11, cellPadding: 3 },
      headStyles: { fillColor: [22, 160, 133] },
    });

    doc.save("Membership_Plans_Report.pdf");
  };

  return (
    <Paper
      elevation={3}
      sx={{
        p: 3,
        width: "100%",
        maxWidth: "700px",
        mx: "auto",
        mt: 5,
      }}
    >
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        flexWrap="wrap"
        mb={2}
      >
        <Typography variant="h6" fontSize={{ xs: "1rem", sm: "1.25rem" }}>
          All Membership Plans
        </Typography>
        <Button
          variant="contained"
          color="primary"
          size="small"
          onClick={downloadPDF}
          sx={{
            fontSize: "0.7rem",
            px: 1.5,
            py: 0.5,
            mt: { xs: 1, sm: 0 },
            textTransform: "none",
            whiteSpace: "nowrap",
          }}
        >
          📄 Download PDF
        </Button>
      </Box>

      {plans.length === 0 ? (
        <Typography>No plans available.</Typography>
      ) : (
        plans.map((plan) => (
          <Paper
            key={plan._id}
            elevation={1}
            sx={{
              p: 2,
              mb: 2,
              border: "1px solid #ddd",
              borderRadius: 2,
              backgroundColor: "#f9f9f9",
              position: "relative",
            }}
          >
            <IconButton
              aria-label="delete"
              onClick={() => handleDelete(plan._id)}
              sx={{
                position: "absolute",
                top: 8,
                right: 8,
                color: "red",
              }}
            >
              <DeleteIcon />
            </IconButton>

            <Grid container spacing={1}>
              <Grid item xs={12}>
                <Typography variant="body2">
                  <strong>Type:</strong> {plan.membershipType}
                </Typography>
              </Grid>
              <Grid item xs={6} sm={6}>
                <Typography variant="body2">
                  <strong>Duration:</strong> {plan.duration}
                </Typography>
              </Grid>
              <Grid item xs={6} sm={6}>
                <Typography variant="body2">
                  <strong>Amount:</strong> ₹{plan.amount}
                </Typography>
              </Grid>
            </Grid>
          </Paper>
        ))
      )}
    </Paper>
  );
};

export default ViewPlans;
