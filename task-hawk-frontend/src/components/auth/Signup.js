import React, { useState } from 'react';
import { Container, Form, Button as BSButton } from 'react-bootstrap';
import { TextField, Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { authService } from '../../services/authService';
import './Auth.css'; // Create this CSS file

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await authService.register(name, email, password);
      navigate('/login?message=Registration successful! Please log in.');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    }
  };

  return (
    <Container className="auth-container">
      <Box className="auth-card">
        <Typography variant="h4" className="auth-title">Sign Up</Typography>
        <Form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Full Name"
            type="text"
            margin="normal"
            variant="outlined"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
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
            Sign Up
          </Button>
          <Typography variant="body2" sx={{ textAlign: 'center' }}>
            Already have an account? <span onClick={() => navigate('/login')} className="auth-link">Login</span>
          </Typography>
        </Form>
      </Box>
    </Container>
  );
};

export default Signup;
