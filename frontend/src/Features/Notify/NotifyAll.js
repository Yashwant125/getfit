import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Card, CardContent, Grid, Snackbar } from '@mui/material';

const NotifyAll = () => {
  const [message, setMessage] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);

  // Dummy list of members (this will be dynamic once the backend is integrated)
  const dummyMembers = [
    { id: 1, name: 'Rahul Sharma' },
    { id: 2, name: 'Sneha Verma' },
    { id: 3, name: 'Aman Gupta' },
  ];

  const handleSendMessage = () => {
    if (message.trim()) {
      // Here you would normally send the message to the backend
      // For now, just display the Snackbar to simulate success
      setOpenSnackbar(true);
      setMessage('');
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
        Broadcast Message to All Members
      </Typography>

      <TextField
        label="Enter Message"
        variant="outlined"
        fullWidth
        multiline
        rows={4}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        sx={{ mb: 2 }}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleSendMessage}
        sx={{ mb: 3 }}
      >
        Send Message
      </Button>

      <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
        Message Preview (for all members):
      </Typography>

      <Grid container spacing={2}>
        {dummyMembers.map((member) => (
          <Grid item xs={12} md={6} lg={4} key={member.id}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Typography variant="subtitle1" fontWeight={600}>
                  {member.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {message || 'No message sent yet'}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Snackbar to show success message */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={() => setOpenSnackbar(false)}
        message="Message sent to all members!"
      />
    </Box>
  );
};

export default NotifyAll;
