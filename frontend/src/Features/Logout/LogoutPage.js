import React from "react";
import { Button } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";

const LogoutPage = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <Button
      onClick={handleLogout}
      startIcon={<LogoutIcon />}
      color="error"
      variant="outlined"
      fullWidth
      sx={{ mt: 2 }}
    >
      Logout
    </Button>
  );
};

export default LogoutPage;
