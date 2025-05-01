import React from "react";
import { Box, Typography, Paper, Stack } from "@mui/material";
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';

const ContactUs = () => (
  <Box sx={{ padding: 3 }}>
    <Typography variant="h5" fontWeight="bold" gutterBottom>
      Get in Touch with Us
    </Typography>

    <Paper elevation={3} sx={{ padding: 3, backgroundColor: "#f9f9f9" }}>
      <Stack spacing={2}>
        <Box display="flex" alignItems="center">
          <EmailIcon sx={{ color: "primary.main", marginRight: 1 }} />
          <Typography variant="body1">
            <strong>Email:</strong> yashwantk784@gmail.com
          </Typography>
        </Box>

        <Box display="flex" alignItems="center">
          <PhoneIcon sx={{ color: "primary.main", marginRight: 1 }} />
          <Typography variant="body1">
            <strong>Contact:</strong> +91 83282 99547
          </Typography>
        </Box>
      </Stack>
    </Paper>
  </Box>
);

export default ContactUs;
