import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  IconButton,
} from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";

const Navbar = () => {
  return (
    <AppBar
      position="static"
      sx={{
        background: "linear-gradient(-45deg, #ff4e50, #f9d423, #ff4e50, #f9d423)",
        backgroundSize: "400% 400%",
        animation: "gradientMove 8s ease infinite",
        paddingY: 1,
        borderBottom: "2px solid #fff",
        boxShadow: "0 4px 15px rgba(255, 105, 180, 0.5)",
      }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        {/* Icon + Title */}
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <FitnessCenterIcon
            sx={{
              fontSize: 40,
              color: "black",
              mr: 1,
              filter: "drop-shadow(2px 2px 3px rgba(255,255,255,0.5))",
            }}
          />
          <Typography
            variant="h6"
            sx={{
              color: "#fff",
              fontWeight: 600,
              textShadow: "1px 1px 2px rgba(0,0,0,0.5)",
            }}
          >
            GetFit
          </Typography>
        </Box>

        {/* Icons */}
        <Box>
          <IconButton>
            <NotificationsIcon
              sx={{ color: "#fff", textShadow: "1px 1px 2px rgba(0,0,0,0.5)" }}
            />
          </IconButton>
          <IconButton>
            <AccountCircleIcon
              sx={{ color: "#fff", textShadow: "1px 1px 2px rgba(0,0,0,0.5)" }}
            />
          </IconButton>
        </Box>
      </Toolbar>

      <style>
        {`
          @keyframes gradientMove {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
        `}
      </style>
    </AppBar>
  );
};

export default Navbar;
