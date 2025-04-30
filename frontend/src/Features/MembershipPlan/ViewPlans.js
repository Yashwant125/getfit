import React from "react";
import {
  Paper,
  Typography,
  Grid,
  Button,
  Box,
} from "@mui/material";

const ViewPlans = ({ plans }) => {
  const handlePurchase = (planId) => {
    console.log(`Purchase clicked for Plan ID: ${planId}`);
    // Payment integration logic can come here later
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

            <Box display="flex" justifyContent="flex-end" mt={2}>
              <Button
                variant="contained"
                color="primary"
                onClick={() => handlePurchase(plan._id)}
              >
                Purchase
              </Button>
            </Box>
          </Paper>
        ))
      )}
    </Paper>
  );
};

export default ViewPlans;
