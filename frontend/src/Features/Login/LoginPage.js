import React, { useState } from 'react';
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Paper,
  Link,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoginPage = () => {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!phone || !password) {
      alert('Please enter your phone and password');
      return;
    }

    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', {
        phone,
        password,
      });

      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      alert('Login successful');
      navigate('/');
    } catch (err) {
      alert(err.response?.data?.error || 'Login failed');
    }
  };

  return (
    <Container maxWidth="xs">
      <Paper elevation={3} sx={{ mt: 10, px: 4, py: 5, textAlign: 'center' }}>
        <Typography variant="h4" fontWeight="bold" mb={3}>
          GetFit
        </Typography>

        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            margin="normal"
          />
          <TextField
            fullWidth
            type="password"
            label="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            margin="normal"
          />
          <Button
            fullWidth
            type="submit"
            variant="contained"
            sx={{ mt: 2, py: 1.2, fontWeight: 'bold' }}
          >
            Log In
          </Button>
        </Box>

        {/* Forgot password and signup row */}
        <Box
          sx={{
            mt: 2,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
          }}
        >
          <Box>
            <Typography variant="body2" sx={{ fontSize: 14, color: '#1976d2' }}>
              Forgot password?
            </Typography>
            <Typography
              variant="body2"
              sx={{ fontSize: 14, color: '#1976d2' }}
            >
              Contact gym owner
            </Typography>
          </Box>

          <Link href="/signup" fontSize={14} underline="hover">
            Sign up
          </Link>
        </Box>
      </Paper>
    </Container>
  );
};

export default LoginPage;
