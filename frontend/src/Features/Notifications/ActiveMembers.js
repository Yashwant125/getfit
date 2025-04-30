import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Card,
  CardContent,
  Typography,
  CircularProgress,
  Grid,
} from "@mui/material";

const ActiveMembers = () => {
  const [activeMembers, setActiveMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchActiveMembers = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/members/active");
        setActiveMembers(response.data);
      } catch (error) {
        console.error("Failed to fetch active members:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchActiveMembers();
  }, []);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={5}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box p={3}>
      <Typography variant="h5" fontWeight="bold" gutterBottom>
        Active Members
      </Typography>

      {activeMembers.length === 0 ? (
        <Typography>No active members found.</Typography>
      ) : (
        <Grid container spacing={2}>
          {activeMembers.map((member) => (
            <Grid item xs={12} md={6} lg={4} key={member._id}>
              <Card elevation={3}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {member.name}
                  </Typography>
                  <Typography variant="body2">Reg #: {member.registrationNumber}</Typography>
                  <Typography variant="body2">Phone: {member.phone}</Typography>
                  <Typography variant="body2">Plan: {member.membershipType}</Typography>
                  <Typography variant="body2">
                    Start Date: {new Date(member.startDate).toLocaleDateString()}
                  </Typography>
                  <Typography variant="body2">
                    End Date: {new Date(member.endDate).toLocaleDateString()}
                  </Typography>
                  <Typography variant="body2">Status: {member.status.toUpperCase()}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default ActiveMembers;
