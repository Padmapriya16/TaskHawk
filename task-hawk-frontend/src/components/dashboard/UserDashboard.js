import React, { useEffect, useState, useCallback } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { Box, Typography, LinearProgress, Chip, Paper, CircularProgress } from '@mui/material';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';
import { useApp } from '../../context/AppContext';
import { COLORS} from '../../utils/constants';
import './UserDashboard.css';
import TopHeader from '../common/TopHeader';


const UserDashboard = () => {
  const { analytics, tasks, loading, refreshAnalytics } = useApp();
  const [weeklyData, setWeeklyData] = useState([]);

  useEffect(() => {
    refreshAnalytics();
    generateWeeklyData();
  }, [tasks]);

  const generateWeeklyData = () => {
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const data = days.map(day => ({
      day,
      completed: Math.floor(Math.random() * 10) + 1,
      pending: Math.floor(Math.random() * 5) + 1
    }));
    setWeeklyData(data);
  };

  const completedTasks = tasks.filter(task => task.completed).length;
  const totalTasks = tasks.length;
  const todayProgress = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  const progressData = [
    { name: 'Completed', value: completedTasks, color: COLORS.success },
    { name: 'Pending', value: totalTasks - completedTasks, color: COLORS.grey }
  ];

  const moodColors = {
    productive: COLORS.success,
    focused: COLORS.primary,
    stressed: COLORS.warning,
    tired: COLORS.error,
    motivated: '#9C27B0',
    overwhelmed: '#FF5722'
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
        <CircularProgress size={60} />
      </Box>
    );
  }
  

  return (
    <div className="dashboard-container">
      <Container fluid>
        <div className="dashboard-header">
          <Typography variant="h3" className="dashboard-title">
            Welcome back, Task Hawker! 🚀
          </Typography>
          <Typography variant="h6" className="dashboard-subtitle">
            Ready to conquer your day?
          </Typography>
        </div>

        <Row className="mb-4">
          {/* Current Streak */}
          <Col xl={3} lg={6} md={6} sm={12} className="mb-3">
            <Card className="stat-card streak-card h-100">
              <Card.Body className="d-flex flex-column justify-content-center align-items-center">
                <div className="stat-icon">🔥</div>
                <Typography variant="h6" className="stat-label">Current Streak</Typography>
                <Typography variant="h2" className="stat-value">
                  {analytics.streak || 0}
                </Typography>
                <Typography variant="body2" className="stat-unit">days</Typography>
              </Card.Body>
            </Card>
          </Col>

          {/* Today's Progress */}
          <Col xl={3} lg={6} md={6} sm={12} className="mb-3">
            <Card className="stat-card progress-card h-100">
              <Card.Body className="d-flex flex-column justify-content-center">
                <div className="stat-icon">📈</div>
                <Typography variant="h6" className="stat-label">Today's Progress</Typography>
                <Box sx={{ mt: 2, mb: 1 }}>
                  <LinearProgress 
                    variant="determinate" 
                    value={todayProgress} 
                    sx={{ 
                      height: 12, 
                      borderRadius: 6,
                      backgroundColor: 'rgba(0,0,0,0.1)',
                      '& .MuiLinearProgress-bar': {
                        backgroundColor: COLORS.success
                      }
                    }}
                  />
                </Box>
                <Typography variant="h3" className="stat-value">
                  {todayProgress}%
                </Typography>
              </Card.Body>
            </Card>
          </Col>

          {/* Current Mood */}
          <Col xl={3} lg={6} md={6} sm={12} className="mb-3">
            <Card className="stat-card mood-card h-100">
              <Card.Body className="d-flex flex-column justify-content-center align-items-center">
                <div className="stat-icon">😊</div>
                <Typography variant="h6" className="stat-label">Current Mood</Typography>
                <Chip 
                  label={analytics.mood || 'productive'}
                  sx={{ 
                    backgroundColor: moodColors[analytics.mood] || moodColors.productive,
                    color: 'white',
                    fontSize: '1rem',
                    fontWeight: 600,
                    mt: 1,
                    textTransform: 'capitalize'
                  }}
                />
              </Card.Body>
            </Card>
          </Col>

          {/* Tasks Today */}
          <Col xl={3} lg={6} md={6} sm={12} className="mb-3">
            <Card className="stat-card tasks-card h-100">
              <Card.Body className="d-flex flex-column justify-content-center align-items-center">
                <div className="stat-icon">✅</div>
                <Typography variant="h6" className="stat-label">Tasks Today</Typography>
                <Typography variant="h2" className="stat-value">
                  {completedTasks}/{totalTasks}
                </Typography>
                <Typography variant="body2" className="stat-unit">completed</Typography>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Row>
          {/* Task Distribution Chart */}
          <Col xl={6} lg={12} className="mb-4">
            <Paper className="chart-paper">
              <div className="chart-header">
                <Typography variant="h5" className="chart-title">Task Distribution</Typography>
              </div>
              <div className="chart-content">
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={progressData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      dataKey="value"
                      startAngle={90}
                      endAngle={450}
                    >
                      {progressData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
                <div className="pie-chart-center">
                  <Typography variant="h4" className="completion-percentage">
                    {todayProgress}%
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Complete
                  </Typography>
                </div>
              </div>
            </Paper>
          </Col>

          {/* Weekly Overview */}
          <Col xl={6} lg={12} className="mb-4">
            <Paper className="chart-paper">
              <div className="chart-header">
                <Typography variant="h5" className="chart-title">Weekly Overview</Typography>
              </div>
              <div className="chart-content">
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={weeklyData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="completed" fill={COLORS.success} name="Completed" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="pending" fill={COLORS.warning} name="Pending" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Paper>
          </Col>
        </Row>

        {/* Quick Actions */}
        <Row>
          <Col lg={12}>
            <Paper className="quick-actions-paper">
              <Typography variant="h5" className="section-title mb-3">Quick Actions</Typography>
              <div className="quick-actions-grid">
                <div className="quick-action-item" onClick={() => window.location.href = '/tasks'}>
                  <div className="action-icon">➕</div>
                  <Typography variant="body1">Add Task</Typography>
                </div>
                <div className="quick-action-item" onClick={() => window.location.href = '/calendar'}>
                  <div className="action-icon">📅</div>
                  <Typography variant="body1">View Calendar</Typography>
                </div>
                <div className="quick-action-item" onClick={() => window.location.href = '/analytics'}>
                  <div className="action-icon">📊</div>
                  <Typography variant="body1">View Analytics</Typography>
                </div>
              </div>
            </Paper>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default UserDashboard;
