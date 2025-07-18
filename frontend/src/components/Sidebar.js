import React, { useState } from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Collapse,
  Typography,
  Box,
} from "@mui/material";
import PeopleIcon from "@mui/icons-material/People";
import FeedbackIcon from "@mui/icons-material/Feedback";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import CardMembershipIcon from "@mui/icons-material/CardMembership";
import NotificationsIcon from "@mui/icons-material/Notifications";
import AttendanceIcon from "@mui/icons-material/EventAvailable";
import { useNavigate } from "react-router-dom";
import LogoutPage from "../Features/Logout/LogoutPage";

const Sidebar = ({ open, onClose, setValue }) => {
  const [expandedSection, setExpandedSection] = useState(null);
  const navigate = useNavigate();

  const handleToggle = (section) => {
    setExpandedSection((prev) => (prev === section ? null : section));
  };

  const handleNavigation = (path) => {
    navigate(path);
    setValue && setValue(0);
    onClose();
  };

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      PaperProps={{ sx: { width: 260, background: "#fff", color: "#000" } }}
    >
      <Box sx={{ padding: 2 }}>
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          Settings
        </Typography>
        <Divider sx={{ my: 1.5, borderColor: "#ccc" }} />

        <List>
          {/* Members */}
          <ListItem disablePadding>
            <ListItemButton onClick={() => handleToggle("members")}>
              <ListItemIcon>
                <PeopleIcon />
              </ListItemIcon>
              <ListItemText primary="Members" />
              {expandedSection === "members" ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
          </ListItem>
          <Collapse in={expandedSection === "members"} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItemButton sx={{ pl: 4 }} onClick={() => handleNavigation("/add-member")}>
                <ListItemText primary="Add Members" />
              </ListItemButton>
              <ListItemButton sx={{ pl: 4 }} onClick={() => handleNavigation("/view-members")}>
                <ListItemText primary="View Members" />
              </ListItemButton>
            </List>
          </Collapse>

          {/* Membership Plans */}
          <ListItem disablePadding>
            <ListItemButton onClick={() => handleToggle("plans")}>
              <ListItemIcon>
                <CardMembershipIcon />
              </ListItemIcon>
              <ListItemText primary="Membership" />
              {expandedSection === "plans" ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
          </ListItem>
          <Collapse in={expandedSection === "plans"} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItemButton sx={{ pl: 4 }} onClick={() => handleNavigation("/add-plan")}>
                <ListItemText primary="Add Plan" />
              </ListItemButton>
              <ListItemButton sx={{ pl: 4 }} onClick={() => handleNavigation("/view-plans")}>
                <ListItemText primary="View Plans" />
              </ListItemButton>
            </List>
          </Collapse>

          {/* Notifications */}
          <ListItem disablePadding>
            <ListItemButton onClick={() => handleToggle("notifications")}>
              <ListItemIcon>
                <NotificationsIcon />
              </ListItemIcon>
              <ListItemText primary="Notifications" />
              {expandedSection === "notifications" ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
          </ListItem>
          <Collapse in={expandedSection === "notifications"} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItemButton sx={{ pl: 4 }} onClick={() => handleNavigation("/paid-members")}>
                <ListItemText primary="Paid Members" />
              </ListItemButton>
              <ListItemButton sx={{ pl: 4 }} onClick={() => handleNavigation("/unpaid-members")}>
                <ListItemText primary="Unpaid Members" />
              </ListItemButton>
              <ListItemButton sx={{ pl: 4 }} onClick={() => handleNavigation("/expired-members")}>
                <ListItemText primary="Expired Members" />
              </ListItemButton>
            </List>
          </Collapse>

          {/* Attendance */}
          <ListItem disablePadding>
            <ListItemButton onClick={() => handleToggle("attendance")}>
              <ListItemIcon>
                <AttendanceIcon />
              </ListItemIcon>
              <ListItemText primary="Attendance" />
              {expandedSection === "attendance" ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
          </ListItem>
          <Collapse in={expandedSection === "attendance"} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItemButton sx={{ pl: 4 }} onClick={() => handleNavigation("/attendance-list")}>
                <ListItemText primary="Attendance List" />
              </ListItemButton>
              <ListItemButton sx={{ pl: 4 }} onClick={() => handleNavigation("/qr-code")}>
                <ListItemText primary="QR Code" />
              </ListItemButton>
            </List>
          </Collapse>

          {/* Reset Password */}
          <ListItem disablePadding>
            <ListItemButton onClick={() => handleNavigation("/reset-password")}>
              <ListItemIcon>
                <AccountBoxIcon />
              </ListItemIcon>
              <ListItemText primary="Reset Password" />
            </ListItemButton>
          </ListItem>

          {/* Profile */}
          <ListItem disablePadding>
            <ListItemButton onClick={() => handleNavigation("/profile")}>
              <ListItemIcon>
                <AccountBoxIcon />
              </ListItemIcon>
              <ListItemText primary="Profile" />
            </ListItemButton>
          </ListItem>

          {/* Logout */}
          <Box sx={{ px: 2, mt: 2 }}>
            <LogoutPage />
          </Box>

          <Divider sx={{ my: 2, borderColor: "black" }} />

          {/* Support */}
          <ListItem disablePadding>
            <ListItemButton onClick={() => handleToggle("support")}>
              <ListItemIcon>
                <FeedbackIcon />
              </ListItemIcon>
              <ListItemText primary="Support" />
              {expandedSection === "support" ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
          </ListItem>
          <Collapse in={expandedSection === "support"} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItemButton sx={{ pl: 4 }} onClick={() => handleNavigation("/terms")}>
                <ListItemText primary="Terms and Conditions" />
              </ListItemButton>
              <ListItemButton sx={{ pl: 4 }} onClick={() => handleNavigation("/contact")}>
                <ListItemText primary="Contact Us" />
              </ListItemButton>
              <ListItemButton sx={{ pl: 4 }} onClick={() => handleNavigation("/privacy")}>
                <ListItemText primary="Privacy Policy" />
              </ListItemButton>
              <ListItemButton sx={{ pl: 4 }} onClick={() => handleNavigation("/shipping")}>
                <ListItemText primary="Shipping Policy" />
              </ListItemButton>
              <ListItemButton sx={{ pl: 4 }} onClick={() => handleNavigation("/cancellation-refund")}>
                <ListItemText primary="Cancellation and Refund" />
              </ListItemButton>
              <ListItemButton sx={{ pl: 4 }} onClick={() => handleNavigation("/about")}>
                <ListItemText primary="About Us" />
              </ListItemButton>
            </List>
          </Collapse>
        </List>
      </Box>
    </Drawer>
  );
};

export default Sidebar;
