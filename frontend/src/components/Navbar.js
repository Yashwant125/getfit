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
      position="fixed"
      sx={{
        backgroundColor: "#ff9800", // solid orange
        paddingY: 1,
        borderBottom: "2px solid #fff",
        boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
        zIndex: 1300,
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
            }}
          />
          <Typography
            variant="h6"
            sx={{
              color: "#fff",
              fontWeight: 600,
            }}
          >
            GetFit
          </Typography>
        </Box>

        {/* Icons */}
        <Box>
          <IconButton>
            <NotificationsIcon sx={{ color: "#fff" }} />
          </IconButton>
          <IconButton>
            <AccountCircleIcon sx={{ color: "#fff" }} />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
