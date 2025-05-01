import React, { useState, useEffect } from "react";
import {
  TextField,
  MenuItem,
  Button,
  Typography,
  Paper,
  Grid,
  InputLabel,
  FormControl,
  Select,
} from "@mui/material";
import axios from "axios";

const membershipOptions = ["1 Month", "3 Months", "6 Months", "12 Months"];
const statusOptions = [
  { value: "Paid" },
  { value: "Unpaid" },
  { value: "Partially Paid" },
];

const AddMember = ({ setMembers }) => {
  const today = new Date().toISOString().split("T")[0];

  const [formData, setFormData] = useState({
    registrationNumber: "",
    name: "",
    phone: "",
    amountPaid: "",
    status: "",
    membershipType: "",
    startDate: today,
    endDate: today,
  });

  useEffect(() => {
    if (formData.startDate && formData.membershipType) {
      const months = parseInt(formData.membershipType.split(" ")[0]);
      const fromDate = new Date(formData.startDate);
      if (!isNaN(fromDate.getTime()) && !isNaN(months)) {
        const toDate = new Date(fromDate);
        toDate.setMonth(toDate.getMonth() + months);
        const endDateFormatted = toDate.toISOString().split("T")[0];
        setFormData((prev) => ({
          ...prev,
          endDate: endDateFormatted,
        }));
      }
    }
  }, [formData.startDate, formData.membershipType]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "startDate") {
      setFormData((prev) => ({
        ...prev,
        startDate: value,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation before submission
    if (!membershipOptions.includes(formData.membershipType)) {
      alert("Please select a valid membership type.");
      return;
    }

    const testEndDate = new Date(formData.endDate);
    if (isNaN(testEndDate.getTime())) {
      alert("Invalid end date. Please check the form.");
      return;
    }

    if (isNaN(formData.amountPaid) || parseInt(formData.amountPaid) <= 0) {
      alert("Amount Paid should be a valid positive number.");
      return;
    }

    try {
      const updatedData = {
        ...formData,
        status: formData.status.toLowerCase(),
        amountPaid: parseInt(formData.amountPaid) || 0,
        startDate: new Date(formData.startDate),
        endDate: new Date(formData.endDate),
      };

      console.log("Sending request with data:", updatedData);

      const res = await axios.post("https://getfit-v9g1.onrender.com", updatedData);

      if (res.status === 200 || res.status === 201) {
        setMembers((prev) => [...prev, res.data]);
        alert("Member added successfully!");
        setFormData({
          registrationNumber: "",
          name: "",
          phone: "",
          amountPaid: "",
          status: "",
          membershipType: "",
          startDate: today,
          endDate: today,
        });
      } else {
        alert("Failed to add member. Please try again.");
      }
    } catch (error) {
      console.error("Error adding member:", error.response ? error.response.data : error.message);
      alert("Error adding member. Please check the console.");
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 4, maxWidth: 700, mx: "auto", mt: 5 }}>
      <Typography variant="h6" gutterBottom>
        Add Member
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              fullWidth
              name="registrationNumber"
              label="Registration Number"
              value={formData.registrationNumber}
              onChange={handleChange}
              required
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              fullWidth
              name="name"
              label="Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              fullWidth
              name="phone"
              label="Phone Number"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              fullWidth
              name="amountPaid"
              label="Amount Paid"
              type="number"
              value={formData.amountPaid}
              onChange={handleChange}
              required
            />
          </Grid>

          <Grid item xs={6}>
            <FormControl fullWidth required>
              <InputLabel shrink>Status</InputLabel>
              <Select
                name="status"
                value={formData.status}
                onChange={handleChange}
                displayEmpty
              >
                {statusOptions.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.value}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={6}>
            <FormControl fullWidth required>
              <InputLabel shrink>Membership Type</InputLabel>
              <Select
                name="membershipType"
                value={formData.membershipType}
                onChange={handleChange}
                displayEmpty
              >
                <MenuItem value="" disabled>
                  Select Membership Type
                </MenuItem>
                {membershipOptions.map((type) => (
                  <MenuItem key={type} value={type}>
                    {type}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={6}>
            <TextField
              fullWidth
              type="date"
              name="startDate"
              label="Start Date"
              InputLabelProps={{ shrink: true }}
              value={formData.startDate}
              onChange={handleChange}
              required
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              fullWidth
              type="date"
              name="endDate"
              label="End Date"
              InputLabelProps={{ shrink: true }}
              value={formData.endDate}
              InputProps={{ readOnly: true }}
              required
            />
          </Grid>

          <Grid item xs={12}>
            <Button fullWidth variant="contained" type="submit">
              Save Member
            </Button>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
};

export default AddMember;
