// Navbar.jsx
import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
} from "@mui/material";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";

const Navbar = () => {
  return (
    <AppBar
      position="fixed"
      sx={{
        backgroundColor: "#f5f5f5",
        paddingY: 1,
        borderBottom: "1px solid #ddd",
        boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
        zIndex: 1300,
      }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <FitnessCenterIcon
            sx={{
              fontSize: 40,
              color: "#1976D2",
              mr: 1,
            }}
          />
          <Typography
            variant="h6"
            sx={{
              color: "#333",
              fontWeight: 600,
            }}
          >
            GetFit
          </Typography>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
