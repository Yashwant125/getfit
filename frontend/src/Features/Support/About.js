import React from "react";
import { Box, Typography, Paper, Stack } from "@mui/material";

const About = () => {
  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h5" fontWeight="bold" gutterBottom>
        About GetFit
      </Typography>

      <Paper elevation={3} sx={{ padding: 3, backgroundColor: "#f9f9f9" }}>
        <Stack spacing={2}>
          <Typography variant="body1">
            <strong>GetFit</strong> is a gym management platform built to help gym owners streamline their operations, track members, manage attendance, and grow their fitness businesses efficiently.
          </Typography>
          <Typography variant="body1">
            Our goal is to provide a one-stop solution that includes tools for managing memberships, notifications, and overall gym workflows—so that gym owners can focus more on fitness and less on paperwork.
          </Typography>
          <Typography variant="body1">
            GetFit is created by a team of developers who are passionate about both technology and fitness. We are constantly improving and expanding our platform to make gym management simpler and smarter.
          </Typography>
        </Stack>
      </Paper>
    </Box>
  );
};

export default About;
