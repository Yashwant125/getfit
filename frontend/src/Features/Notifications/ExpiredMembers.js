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
} from "@mui/material";

const ExpiredMembers = () => {
  const [expiredMembers, setExpiredMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchExpiredMembers = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/members/expired");
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

  return (
    <Box p={3}>
      <Typography variant="h5" gutterBottom>
        ⌛ Expired Members (Paid)
      </Typography>

      {loading ? (
        <CircularProgress />
      ) : error ? (
        <Alert severity="error">{error}</Alert>
      ) : expiredMembers.length === 0 ? (
        <Typography>No expired members found.</Typography>
      ) : (
        expiredMembers.map((member) => (
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

export default ExpiredMembers;
