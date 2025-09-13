const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
const taskRoutes = require('./routes/tasks'); 
const analyticsRoutes = require('./routes/analytics'); 
const calendarRoutes = require('./routes/calendar'); 
const authMiddleware = require('./middleware/auth');

// Load config
dotenv.config({ path: './config/config.env' });

const app = express();

// Connect Database
connectDB();

// Middleware
app.use(express.json());
app.use(cors());

// Define Routes
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes); // Use real task routes
app.use('/api/analytics', analyticsRoutes); // Use real analytics routes
app.use('/api/calendar', calendarRoutes); // Use real calendar routes

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`));
