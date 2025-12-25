import React, { useState } from "react";
import {
  Box,
  Typography,
  IconButton,
  Badge,
  Avatar,
  Menu,
  MenuItem,
  Divider,
  ListItemIcon,
  ListItemText,
  TextField,
  InputAdornment,
  Button
} from "@mui/material";
import {
  Search,
  Notifications,
  Settings,
  ExitToApp,
  Person,
  NotificationsNone,
  Add
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import "./TopHeader.css";

const TopHeader = ({ pageTitle = "Dashboard", user, onLogout }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [notificationAnchor, setNotificationAnchor] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleProfileClick = (event) => setAnchorEl(event.currentTarget);
  const handleNotificationClick = (event) => setNotificationAnchor(event.currentTarget);
  const handleClose = () => {
    setAnchorEl(null);
    setNotificationAnchor(null);
  };

  const handleLogout = () => {
    onLogout();
    navigate("/login");
    handleClose();
  };

  const notifications = [
    { id: 1, title: "Task Deadline Approaching", message: "Finish UI update", time: "5m ago", unread: true },
    { id: 2, title: "New Member", message: "Alex joined your team", time: "1h ago", unread: true },
    { id: 3, title: "Report Ready", message: "Weekly report available", time: "2h ago", unread: false }
  ];
  const unreadCount = notifications.filter((n) => n.unread).length;

  return (
    <Box className="top-header">
      {/* Left Section */}
      <div className="header-left">
        <Typography variant="h6" className="page-title">
          Welcome back, {user?.name || "Guest"} 👋
        </Typography>
      </div>

      {/* Center Section (Search Bar) */}
      <div className="header-center">
        <TextField
          className="search-field"
          placeholder="Search Task..."
          size="small"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search sx={{ color: "#666" }} />
              </InputAdornment>
            ),
          }}
        />
      </div>

      {/* Right Section */}
      <div className="header-right">
        <Button
          className="new-task-btn"
          variant="contained"
          startIcon={<Add />}
          onClick={() => navigate("/tasks/new")}
        >
          New Task
        </Button>

        {/* Notifications */}
        <IconButton onClick={handleNotificationClick}>
          <Badge badgeContent={unreadCount} color="error">
            <Notifications />
          </Badge>
        </IconButton>

        {/* Profile */}
        <Avatar
          onClick={handleProfileClick}
          src={user?.avatarUrl || "https://via.placeholder.com/40"}
          sx={{ cursor: "pointer" }}
        >
          {user?.name ? user.name.charAt(0).toUpperCase() : "U"}
        </Avatar>

        {/* Profile Menu */}
        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
          <MenuItem>
            <ListItemIcon><Person /></ListItemIcon>
            <ListItemText>Profile</ListItemText>
          </MenuItem>
          <MenuItem>
            <ListItemIcon><Settings /></ListItemIcon>
            <ListItemText>Settings</ListItemText>
          </MenuItem>
          <Divider />
          <MenuItem onClick={handleLogout}>
            <ListItemIcon><ExitToApp /></ListItemIcon>
            <ListItemText>Logout</ListItemText>
          </MenuItem>
        </Menu>

        {/* Notifications Menu */}
        <Menu anchorEl={notificationAnchor} open={Boolean(notificationAnchor)} onClose={handleClose}>
          <Typography variant="h6" sx={{ p: 1 }}>Notifications</Typography>
          <Divider />
          {notifications.map((n) => (
            <MenuItem key={n.id}>
              <ListItemIcon><NotificationsNone /></ListItemIcon>
              <ListItemText primary={n.title} secondary={n.message} />
            </MenuItem>
          ))}
        </Menu>
      </div>
    </Box>
  );
};

export default TopHeader;
