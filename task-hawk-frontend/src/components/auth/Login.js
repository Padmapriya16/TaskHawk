import React, { useState } from 'react';
import { Container, Form, Button as BSButton } from 'react-bootstrap'; // Renamed Button to BSButton to avoid conflict
import { TextField, Box, Typography, Button } from '@mui/material'; // Using MUI Button for primary action
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { authService } from '../../services/authService';
import './Auth.css'; // Create this CSS file

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { loadInitialData } = useApp(); // To load user-specific data after login

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await authService.login(email, password);
      await loadInitialData(); // Load user data into context
      navigate('/dashboard'); // Redirect to dashboard on successful login
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please check your credentials.');
    }
  };

  return (
    <Container className="auth-container">
      <Box className="auth-card">
        <Typography variant="h4" className="auth-title">Login</Typography>
        <Form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Email Address"
            type="email"
            margin="normal"
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <TextField
            fullWidth
            label="Password"
            type="password"
            margin="normal"
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {error && <Typography color="error" variant="body2" sx={{ mt: 1 }}>{error}</Typography>}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Login
          </Button>
          <Typography variant="body2" sx={{ textAlign: 'center' }}>
            Don't have an account? <span onClick={() => navigate('/signup')} className="auth-link">Sign Up</span>
          </Typography>
        </Form>
      </Box>
    </Container>
  );
};

export default Login;
