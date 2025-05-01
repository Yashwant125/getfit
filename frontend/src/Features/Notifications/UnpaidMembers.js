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

const UnpaidMembers = () => {
  const [unpaidMembers, setUnpaidMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  return (
    <Box p={3}>
      <Typography variant="h5" gutterBottom>
        🧾 Unpaid & Partially Paid Members
      </Typography>

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
