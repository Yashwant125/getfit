import React, { useState } from 'react';
import {
  Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText,
  Divider, Collapse, Typography, Box
} from '@mui/material';
import PeopleIcon from '@mui/icons-material/People';
import FeedbackIcon from '@mui/icons-material/Feedback';
import CampaignIcon from '@mui/icons-material/Campaign';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import LogoutIcon from '@mui/icons-material/Logout';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import CardMembershipIcon from '@mui/icons-material/CardMembership';
import NotificationsIcon from '@mui/icons-material/Notifications';

const Sidebar = ({ open, onClose, setValue }) => {
  const [expandedSection, setExpandedSection] = useState(null);

  const handleToggle = (section) => {
    setExpandedSection((prev) => (prev === section ? null : section));
  };

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: { width: 260, background: '#fff', color: '#000' },
      }}
    >
      <Box sx={{ padding: 2 }}>
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          Settings
        </Typography>

        <Divider sx={{ my: 1.5, borderColor: '#ccc' }} />

        <List>
          {/* Members */}
          <ListItem disablePadding>
            <ListItemButton onClick={() => handleToggle('members')}>
              <ListItemIcon><PeopleIcon /></ListItemIcon>
              <ListItemText primary="Members" />
              {expandedSection === 'members' ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
          </ListItem>
          <Collapse in={expandedSection === 'members'} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItemButton sx={{ pl: 4 }} onClick={() => { setValue(1); onClose(); }}>
                <ListItemText primary="Add Members" />
              </ListItemButton>
              <ListItemButton sx={{ pl: 4 }} onClick={() => { setValue(2); onClose(); }}>
                <ListItemText primary="View Members" />
              </ListItemButton>
            </List>
          </Collapse>

          {/* Membership Plans */}
          <ListItem disablePadding>
            <ListItemButton onClick={() => handleToggle('plans')}>
              <ListItemIcon><CardMembershipIcon /></ListItemIcon>
              <ListItemText primary="Membership Plans" />
              {expandedSection === 'plans' ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
          </ListItem>
          <Collapse in={expandedSection === 'plans'} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItemButton sx={{ pl: 4 }} onClick={() => { setValue(3); onClose(); }}>
                <ListItemText primary="Add Plan" />
              </ListItemButton>
              <ListItemButton sx={{ pl: 4 }} onClick={() => { setValue(4); onClose(); }}>
                <ListItemText primary="View Plans" />
              </ListItemButton>
            </List>
          </Collapse>

          {/* Notifications */}
          <ListItem disablePadding>
            <ListItemButton onClick={() => handleToggle('notifications')}>
              <ListItemIcon><NotificationsIcon /></ListItemIcon>
              <ListItemText primary="Notifications" />
              {expandedSection === 'notifications' ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
          </ListItem>
          <Collapse in={expandedSection === 'notifications'} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItemButton sx={{ pl: 4 }} onClick={() => { setValue(7); onClose(); }}>
                <ListItemText primary="Active Members" />
              </ListItemButton>
              <ListItemButton sx={{ pl: 4 }} onClick={() => { setValue(5); onClose(); }}>
                <ListItemText primary="Unpaid Members" />
              </ListItemButton>
              <ListItemButton sx={{ pl: 4 }} onClick={() => { setValue(6); onClose(); }}>
                <ListItemText primary="Expired Members" />
              </ListItemButton>
            </List>
          </Collapse>

          {/* Feedback */}
          <ListItem disablePadding>
            <ListItemButton onClick={() => { setValue(8); onClose(); }}>
              <ListItemIcon><FeedbackIcon /></ListItemIcon>
              <ListItemText primary="Feedback" />
            </ListItemButton>
          </ListItem>

          {/* Notify All */}
          <ListItem disablePadding>
            <ListItemButton onClick={() => { setValue(12); onClose(); }}>
              <ListItemIcon><CampaignIcon /></ListItemIcon>
              <ListItemText primary="Notify All" />
            </ListItemButton>
          </ListItem>

          {/* Profile */}
          <ListItem disablePadding>
            <ListItemButton onClick={() => { setValue(9); onClose(); }}>
              <ListItemIcon><AccountBoxIcon /></ListItemIcon>
              <ListItemText primary="Profile" />
            </ListItemButton>
          </ListItem>

          {/* Logout */}
          <ListItem disablePadding>
            <ListItemButton onClick={() => { setValue(11); onClose(); }}>
              <ListItemIcon><LogoutIcon /></ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
    </Drawer>
  );
};

export default Sidebar;
