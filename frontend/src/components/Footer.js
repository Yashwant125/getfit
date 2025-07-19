// Footer.jsx
import React, { useState } from 'react';
import {
  BottomNavigation,
  BottomNavigationAction,
  Paper,
} from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import SettingsIcon from '@mui/icons-material/Settings';
import Sidebar from './Sidebar';
import { useNavigate } from 'react-router-dom';

const Footer = ({ value, setValue }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const iconSx = {
    color: '#1976D2',
  };

  const handleSettingsClick = () => {
    setIsSidebarOpen(true);
  };

  const handleNavChange = (event, newValue) => {
    if (newValue === 'settings') {
      handleSettingsClick();
    } else {
      setValue(newValue);
      if (isSidebarOpen) {
        setIsSidebarOpen(false);
      }
      setTimeout(() => {
        if (newValue === 0) navigate('/');
        else if (newValue === 1) navigate('/profile');
        else if (newValue === 2) navigate('/add-member');
      }, 100);
    }
  };

  return (
    <>
      <Paper
        sx={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: '#f5f5f5',
          borderTop: '1px solid #ddd',
          boxShadow: '0 -2px 6px rgba(0,0,0,0.1)',
          zIndex: 1200,
        }}
        elevation={3}
      >
        <BottomNavigation
          showLabels
          value={value}
          onChange={handleNavChange}
          sx={{ background: 'transparent' }}
        >
          <BottomNavigationAction label="Home" value={0} icon={<HomeIcon sx={iconSx} />} />
          <BottomNavigationAction label="Profile" value={1} icon={<PersonIcon sx={iconSx} />} />
          <BottomNavigationAction label="+ Member" value={2} icon={<PersonAddIcon sx={iconSx} />} />
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

