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
    textShadow: '1px 1px 2px rgba(0,0,0,0.5)',
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
          background: 'linear-gradient(-45deg, #ff4e50, #f9d423, #ff4e50, #f9d423)',
          backgroundSize: '400% 400%',
          animation: 'gradientMove 8s ease infinite',
          borderTop: '2px solid #fff',
          boxShadow: '0 -4px 15px rgba(255, 105, 180, 0.5)',
          zIndex: 1000,
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
          <BottomNavigationAction label="Home" value={0} icon={<HomeIcon sx={iconSx} />} sx={iconSx} />
          <BottomNavigationAction label="Profile" value={1} icon={<PersonIcon sx={iconSx} />} sx={iconSx} />
          <BottomNavigationAction label="Menu" value={2} icon={<AppsIcon sx={iconSx} />} sx={iconSx} />
          <BottomNavigationAction label="Settings" value="settings" icon={<SettingsIcon sx={iconSx} />} sx={iconSx} />
        </BottomNavigation>

        <style>
          {`
            @keyframes gradientMove {
              0% { background-position: 0% 50%; }
              50% { background-position: 100% 50%; }
              100% { background-position: 0% 50%; }
            }
          `}
        </style>
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
