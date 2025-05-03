import React, { useState } from "react";
import {
  Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText,
  Divider, Collapse, Typography, Box
} from "@mui/material";
import PeopleIcon from "@mui/icons-material/People";
import FeedbackIcon from "@mui/icons-material/Feedback";
import CampaignIcon from "@mui/icons-material/Campaign";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import LogoutIcon from "@mui/icons-material/Logout";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import CardMembershipIcon from "@mui/icons-material/CardMembership";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { useNavigate } from "react-router-dom";

const Sidebar = ({ open, onClose }) => {
  const [expandedSection, setExpandedSection] = useState(null);
  const navigate = useNavigate();

  const handleToggle = (section) => {
    setExpandedSection((prev) => (prev === section ? null : section));
  };

  const handleNavigation = (path) => {
    navigate(path);
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
        <Typography variant="h6" sx={{ fontWeight: 600 }}>Settings</Typography>
        <Divider sx={{ my: 1.5, borderColor: "#ccc" }} />

        <List>
          {/* Members */}
          <ListItem disablePadding>
            <ListItemButton onClick={() => handleToggle("members")}>
              <ListItemIcon><PeopleIcon /></ListItemIcon>
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
              <ListItemIcon><CardMembershipIcon /></ListItemIcon>
              <ListItemText primary="Membership Plans" />
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
              <ListItemIcon><NotificationsIcon /></ListItemIcon>
              <ListItemText primary="Notifications" />
              {expandedSection === "notifications" ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
          </ListItem>
          <Collapse in={expandedSection === "notifications"} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItemButton sx={{ pl: 4 }} onClick={() => handleNavigation("/active-members")}>
                <ListItemText primary="Active Members" />
              </ListItemButton>
              <ListItemButton sx={{ pl: 4 }} onClick={() => handleNavigation("/unpaid-members")}>
                <ListItemText primary="Unpaid Members" />
              </ListItemButton>
              <ListItemButton sx={{ pl: 4 }} onClick={() => handleNavigation("/expired-members")}>
                <ListItemText primary="Expired Members" />
              </ListItemButton>
            </List>
          </Collapse>

          {/* Feedback */}
          <ListItem disablePadding>
            <ListItemButton onClick={() => handleNavigation("/feedback")}>
              <ListItemIcon><FeedbackIcon /></ListItemIcon>
              <ListItemText primary="Feedback" />
            </ListItemButton>
          </ListItem>

          {/* Notify All */}
          <ListItem disablePadding>
            <ListItemButton onClick={() => handleNavigation("/notify-all")}>
              <ListItemIcon><CampaignIcon /></ListItemIcon>
              <ListItemText primary="Notify All" />
            </ListItemButton>
          </ListItem>

          {/* Profile */}
          <ListItem disablePadding>
            <ListItemButton onClick={() => handleNavigation("/profile")}>
              <ListItemIcon><AccountBoxIcon /></ListItemIcon>
              <ListItemText primary="Profile" />
            </ListItemButton>
          </ListItem>

          {/* Logout */}
          <ListItem disablePadding>
            <ListItemButton onClick={() => handleNavigation("/logout")}>
              <ListItemIcon><LogoutIcon /></ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItemButton>
          </ListItem>

          {/* Support */}
          <ListItem disablePadding>
            <ListItemButton onClick={() => handleToggle("support")}>
              <ListItemIcon><FeedbackIcon /></ListItemIcon>
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
            </List>
          </Collapse>

          {/* Black Line after Cancellation and Refund */}
          <Divider sx={{ my: 2, borderColor: "black" }} />

          {/* About Us at last */}
          <ListItem disablePadding>
            <ListItemButton onClick={() => handleNavigation("/about")}>
              <ListItemText primary="About Us" />
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
    </Drawer>
  );
};

export default Sidebar;
