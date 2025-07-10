import React from "react";
import {
  Paper,
  Typography,
  Grid,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";

const ViewPlans = ({ plans, fetchPlans }) => {
  const handleDelete = async (planId) => {
    try {
      await axios.delete(`http://localhost:5000/api/plans/${planId}`);
      fetchPlans(); // Refresh after deletion
    } catch (error) {
      console.error("Error deleting plan:", error.response?.data || error.message);
    }
  };

  return (
    <Paper
      elevation={3}
      sx={{
        p: 4,
        width: "100%",
        maxWidth: "700px",
        mx: "auto",
        mt: 5,
      }}
    >
      <Typography variant="h6" gutterBottom>
        All Membership Plans
      </Typography>
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
            {/* 🗑️ Delete icon in top-right corner */}
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
              <Grid item xs={12} sm={6}>
                <strong>Type:</strong> {plan.membershipType}
              </Grid>
              <Grid item xs={12} sm={6}>
                <strong>Duration:</strong> {plan.duration}
              </Grid>
              <Grid item xs={12} sm={6}>
                <strong>Amount:</strong> ₹{plan.amount}
              </Grid>
            </Grid>
          </Paper>
        ))
      )}
    </Paper>
  );
};

export default ViewPlans;
