import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Box, List, ListItem, ListItemIcon, ListItemText, Avatar, Typography, Divider } from '@mui/material';
import { 
  Dashboard, 
  Assignment, 
  CalendarToday, 
  Analytics, 
  Group, 
  EmojiEvents,
  Timer,
  Settings,
  Logout
} from '@mui/icons-material';
import './Navbar.css'; // Note: This CSS file is still named Navbar.css

const Sidebar = ({ user, onLogout }) => { // Accept user and onLogout props
  const navigate = useNavigate();
  const location = useLocation();

  const mainMenuItems = [
    { path: '/dashboard', label: 'Dashboard', icon: <Dashboard /> },
    { path: '/tasks', label: 'My Task', icon: <Assignment /> },
    { path: '/calendar', label: 'Calendar', icon: <CalendarToday /> },
    { path: '/analytics', label: 'Analytics', icon: <Analytics /> },
    { path: '/teamwork', label: 'Teamwork', icon: <Group /> },
    { path: '/leaderboard', label: 'Leaderboard', icon: <EmojiEvents /> },
    { path: '/pomodoro', label: 'Pomodoro', icon: <Timer /> },
  ];

  const bottomMenuItems = [
    { path: '/settings', label: 'Settings', icon: <Settings /> },
  ];

  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    onLogout();
    navigate('/login');
  };

  return (
    <Box className="sidebar">
      {/* Logo Section */}
<Box className="sidebar-header">
  <Box className="logo-container">
    <img 
      src="/assets/logo.png"  // 👉 Place logo in public/assets/logo.png
      alt="TaskHawk Logo" 
      className="logo-image"
    />
    <Typography variant="h6" className="logo-text">
      TaskHawk
    </Typography>
  </Box>
</Box>


      {/* Main Navigation */}
      <List className="sidebar-nav">
        {mainMenuItems.map((item) => (
          <ListItem
            button
            key={item.path}
            onClick={() => navigate(item.path)}
            className={`nav-item ${isActive(item.path) ? 'active' : ''}`}
          >
            <ListItemIcon className="nav-icon">
              {item.icon}
            </ListItemIcon>
            <ListItemText 
              primary={item.label} 
              className="nav-text"
            />
          </ListItem>
        ))}
      </List>

      {/* Bottom Section */}
      <Box className="sidebar-bottom">
        <Divider className="sidebar-divider" />
        
        {/* Settings */}
        <List>
          {bottomMenuItems.map((item) => (
            <ListItem
              button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`nav-item ${isActive(item.path) ? 'active' : ''}`}
            >
              <ListItemIcon className="nav-icon">
                {item.icon}
              </ListItemIcon>
              <ListItemText 
                primary={item.label} 
                className="nav-text"
              />
            </ListItem>
          ))}
        </List>

        {/* User Profile */}
        <Box className="user-profile">
          <Avatar className="user-avatar" src={user?.avatarUrl || "https://via.placeholder.com/40" }>
            {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
          </Avatar>
          <Box className="user-info">
            <Typography variant="body2" className="user-name">
              {user?.name || 'Guest User'}
            </Typography>
            <Typography variant="caption" className="user-email">
              {user?.email || 'guest@example.com'}
            </Typography>
          </Box>
          <Logout className="logout-icon" onClick={handleLogout} />
        </Box>
      </Box>
    </Box>
  );
};

export default Sidebar;
