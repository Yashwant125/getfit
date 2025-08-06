import React, { useState, useEffect } from "react";
import {
  Button,
  TextField,
  MenuItem,
  Paper,
  Typography,
  Stack,
  Box,
  useMediaQuery,
  useTheme,
} from "@mui/material";

const AddPlan = ({ setPlans }) => {
  const [membershipType, setMembershipType] = useState("");
  const [duration, setDuration] = useState("");
  const [amount, setAmount] = useState("");

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  // Auto-fill logic
  useEffect(() => {
    const planMap = {
      Silver: { duration: "1 Month", amount: 1000 },
      Gold: { duration: "3 Months", amount: 2400 },
      Platinum: { duration: "6 Months", amount: 4800 },
      Diamond: { duration: "12 Months", amount: 9600 },
    };

    if (membershipType && planMap[membershipType]) {
      setDuration(planMap[membershipType].duration);
      setAmount(planMap[membershipType].amount);
    }
  }, [membershipType]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newPlan = { membershipType, duration, amount: parseInt(amount) };

    try {
      const res = await fetch("https://getfit-v9g1.onrender.com/api/plans", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newPlan),
      });

      const data = await res.json();

      if (res.ok) {
        setPlans((prev) => [data, ...prev]);
        setMembershipType("");
        setDuration("");
        setAmount("");
        alert("✅ Plan saved successfully");
      } else {
        alert("❌ Failed to save plan: " + data.error);
      }
    } catch (error) {
      console.error("Add plan error:", error);
      alert("❌ Error saving plan");
    }
  };

  return (
    <Box mt={10} px={isMobile ? 2 : 0}>
      <Paper
        elevation={3}
        style={{
          padding: 20,
          maxWidth: 400,
          margin: "auto",
          width: "100%",
        }}
      >
        <Typography variant="h6" gutterBottom mb={3}>
          Create Membership Plan
        </Typography>
        <form onSubmit={handleSubmit}>
          <Stack spacing={2}>
            <TextField
              select
              label="Membership Type"
              value={membershipType}
              onChange={(e) => setMembershipType(e.target.value)}
              required
            >
              {["Silver", "Gold", "Platinum", "Diamond"].map((type) => (
                <MenuItem key={type} value={type}>
                  {type}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              label="Duration"
              value={duration}
              InputProps={{ readOnly: true }}
              required
            />

            <TextField
              label="Amount"
              value={amount}
              InputProps={{ readOnly: true }}
              required
            />

            <Button variant="contained" color="primary" type="submit">
              Save Plan
            </Button>
          </Stack>
        </form>
      </Paper>
    </Box>
  );
};

export default AddPlan;
