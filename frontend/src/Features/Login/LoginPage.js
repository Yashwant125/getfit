import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Paper,
  Link,
  InputAdornment,
  IconButton
} from "@mui/material";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const LoginPage = () => {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
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

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("ownerId", user.ownerId);

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
          backgroundColor: "#f9f9f9",
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
            type={showPassword ? "text" : "password"}
            label="Password"
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            margin="dense"
            sx={{ bgcolor: "white" }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    size="small"
                    onClick={() => setShowPassword((prev) => !prev)}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
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

        {/* Forgot + Sign Up Row */}
        <Box
          mt={2}
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <Link
            href="/reset-password"
            underline="hover"
            sx={{ fontSize: 14, color: "text.secondary" }}
          >
            Forgot password
          </Link>

          <Link
            href="/signup"
            underline="hover"
            sx={{ fontSize: 14, color: "text.secondary" }}
          >
            Sign up
          </Link>
        </Box>
      </Paper>
    </Container>
  );
};

export default LoginPage;

