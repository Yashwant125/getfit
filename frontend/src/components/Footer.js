import React, { useState } from 'react';
import {
  BottomNavigation,
  BottomNavigationAction,
  Paper,
} from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import AppsIcon from '@mui/icons-material/Apps';
import SettingsIcon from '@mui/icons-material/Settings';
import Sidebar from './Sidebar';

const Footer = ({ value, setValue }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const iconSx = {
    color: '#fff',
  };

  const handleSettingsClick = () => {
    setIsSidebarOpen(true);
  };

  return (
    <>
      <Paper
        sx={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: '#ff9800', // solid orange
          borderTop: '2px solid #fff',
          boxShadow: '0 -4px 10px rgba(0,0,0,0.3)',
          zIndex: 1200,
        }}
        elevation={3}
      >
        <BottomNavigation
          showLabels
          value={value}
          onChange={(event, newValue) => {
            if (newValue === 'settings') {
              handleSettingsClick();
            } else {
              setValue(newValue);
            }
          }}
          sx={{ background: 'transparent' }}
        >
          <BottomNavigationAction label="Home" value={0} icon={<HomeIcon sx={iconSx} />} />
          <BottomNavigationAction label="Profile" value={1} icon={<PersonIcon sx={iconSx} />} />
          <BottomNavigationAction label="Menu" value={2} icon={<AppsIcon sx={iconSx} />} />
          <BottomNavigationAction label="Settings" value="settings" icon={<SettingsIcon sx={iconSx} />} />
        </BottomNavigation>
      </Paper>

      <Sidebar
        open={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        setValue={setValue}
      />
    </>
  );
};

export default Footer;
