import React, { useState } from 'react';
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  CircularProgress,
  
} from '@mui/material';
import axios from 'axios';

const ResetPassword = () => {
  const [phone, setPhone] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleReset = async () => {
    if (!phone || !newPassword) {
      alert('Please enter both phone number and new password');
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post('https://getfit-v9g1.onrender.com/api/auth/reset-password', {
        phone,
        newPassword,
      });
      alert(res.data.message || 'Password reset successfully');
      setPhone('');
      setNewPassword('');
    } catch (err) {
      alert(err.response?.data?.error || 'Reset failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="xs">
      <Box
        sx={{
          mt: 8,
          p: 3,
          borderRadius: 2,
          boxShadow: 3,
          bgcolor: 'background.paper',
        }}
      >
        <Typography
          variant="h5"
          align="center"
          fontWeight="bold"
          gutterBottom
        >
          Reset Password
        </Typography>

        <Box component="form" noValidate autoComplete="off">
          <TextField
            fullWidth
            label="Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="New Password"
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            margin="normal"
            required
          />
          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={handleReset}
            sx={{ mt: 2 }}
            disabled={loading}
          >
            {loading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              'Reset Password'
            )}
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default ResetPassword;
