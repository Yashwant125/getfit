import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Paper,
  Link,
  Divider,
} from "@mui/material";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const LoginPage = () => {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!phone || !password) {
      alert("Please enter your phone and password");
      return;
    }

    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        phone,
        password,
      });

      const { token, user } = res.data;

      // Save token, user, and ownerId for secure session
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("ownerId", user.ownerId); // this is key for filtering data

      alert("Login successful");
      navigate("/");
    } catch (err) {
      alert(err.response?.data?.error || "Login failed");
    }
  };

  return (
    <Container maxWidth="xs">
      <Paper
        elevation={4}
        sx={{
          mt: 10,
          px: 4,
          py: 5,
          textAlign: "center",
          borderRadius: 3,
          backgroundColor: "#fafafa",
        }}
      >
        {/* Logo */}
        <Box display="flex" alignItems="center" justifyContent="center" mb={3}>
          <FitnessCenterIcon sx={{ fontSize: 36, color: "#1976d2", mr: 1 }} />
          <Typography variant="h4" fontWeight="700" fontFamily="monospace">
            GetFit
          </Typography>
        </Box>

        {/* Login Form */}
        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Phone Number"
            variant="outlined"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            margin="dense"
            sx={{ bgcolor: "white" }}
          />
          <TextField
            fullWidth
            type="password"
            label="Password"
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            margin="dense"
            sx={{ bgcolor: "white" }}
          />
          <Button
            fullWidth
            type="submit"
            variant="contained"
            sx={{
              mt: 2,
              py: 1.3,
              fontWeight: "bold",
              fontSize: 15,
              letterSpacing: 1,
              background: "#1976d2",
            }}
          >
            Log In
          </Button>
        </Box>

        {/* Forgot password text */}
        <Box mt={2}>
          <Typography
            variant="body2"
            sx={{ fontSize: 13, color: "text.secondary" }}
          >
            Forgot password?{" "}
            <Box component="span" sx={{ fontWeight: 500, color: "#1976d2" }}>
              Contact your gym owner
            </Box>
          </Typography>
        </Box>

        <Divider sx={{ my: 3 }} />

        {/* Sign up link */}
        <Box>
          <Typography variant="body2" sx={{ fontSize: 13 }}>
            Don’t have an account?{" "}
            <Link
              href="/signup"
              underline="hover"
              sx={{ fontWeight: 600, color: "#1976d2" }}
            >
              Sign up
            </Link>
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default LoginPage;
