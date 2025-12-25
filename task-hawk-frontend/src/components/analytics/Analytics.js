import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import {
  Box,
  Typography,
  Paper,
  CircularProgress,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip
} from '@mui/material';
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';
import { TrendingUp, Assignment, Timer, EmojiEvents } from '@mui/icons-material';
import { useApp } from '../../context/AppContext';
import { analyticsService } from '../../services/analyticsService';
import { COLORS } from '../../utils/constants';
import './Analytics.css';

const Analytics = () => {
  const { tasks, loading } = useApp();
  const [analyticsData, setAnalyticsData] = useState({
    productivity: [],
    taskCompletion: [],
    categoryDistribution: [],
    weeklyStats: [],
    monthlyTrends: [],
    timeDistribution: []
  });
  const [timePeriod, setTimePeriod] = useState('7d');
  const [analyticsLoading, setAnalyticsLoading] = useState(false);

  useEffect(() => {
    loadAnalyticsData();
  }, [tasks, timePeriod]);

  const loadAnalyticsData = async () => {
    setAnalyticsLoading(true);
    try {
      // Generate analytics from tasks data
      const analytics = generateAnalyticsFromTasks();
      
      // Try to fetch additional analytics from API
      try {
        const apiAnalytics = await analyticsService.getProductivityTrends(timePeriod);
        setAnalyticsData({ ...analytics, ...apiAnalytics });
      } catch (error) {
        console.error('API analytics unavailable, using generated data:', error);
        setAnalyticsData(analytics);
      }
    } catch (error) {
      console.error('Error loading analytics:', error);
    } finally {
      setAnalyticsLoading(false);
    }
  };

  const generateAnalyticsFromTasks = () => {
    if (!tasks.length) {
      return {
        productivity: [],
        taskCompletion: [],
        categoryDistribution: [],
        weeklyStats: [],
        monthlyTrends: [],
        timeDistribution: []
      };
    }

    // Generate weekly stats
    const weeklyStats = generateWeeklyStats();
    
    // Generate category distribution
    const categoryDistribution = generateCategoryDistribution();
    
    // Generate productivity trends
    const productivity = generateProductivityTrends();
    
    // Generate time distribution
    const timeDistribution = generateTimeDistribution();
    
    // Generate monthly trends
    const monthlyTrends = generateMonthlyTrends();

    return {
      productivity,
      taskCompletion: categoryDistribution,
      categoryDistribution,
      weeklyStats,
      monthlyTrends,
      timeDistribution
    };
  };

  const generateWeeklyStats = () => {
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    return days.map(day => {
      const dayTasks = tasks.filter(task => {
        if (!task.createdAt) return false;
        const taskDay = new Date(task.createdAt).toLocaleDateString('en-US', { weekday: 'short' });
        return taskDay === day;
      });
      
      return {
        day,
        completed: dayTasks.filter(t => t.completed).length,
        pending: dayTasks.filter(t => !t.completed).length,
        total: dayTasks.length
      };
    });
  };

  const generateCategoryDistribution = () => {
    const categories = {};
    tasks.forEach(task => {
      const category = task.category || 'other';
      categories[category] = (categories[category] || 0) + 1;
    });

    return Object.entries(categories).map(([name, value]) => ({
      name: name.charAt(0).toUpperCase() + name.slice(1),
      value,
      percentage: Math.round((value / tasks.length) * 100)
    }));
  };

  const generateProductivityTrends = () => {
    const last7Days = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];
      
      const dayTasks = tasks.filter(task => {
        if (!task.createdAt) return false;
        const taskDate = new Date(task.createdAt).toISOString().split('T')[0];
        return taskDate === dateStr;
      });
      
      const completed = dayTasks.filter(t => t.completed).length;
      const total = dayTasks.length;
      const productivity = total > 0 ? Math.round((completed / total) * 100) : 0;
      
      last7Days.push({
        date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        productivity,
        completed,
        total
      });
    }
    
    return last7Days;
  };

  const generateTimeDistribution = () => {
    const timeSlots = {
      'Morning (6-12)': 0,
      'Afternoon (12-18)': 0,
      'Evening (18-24)': 0,
      'Night (0-6)': 0
    };

    tasks.forEach(task => {
      if (task.createdAt) {
        const hour = new Date(task.createdAt).getHours();
        if (hour >= 6 && hour < 12) timeSlots['Morning (6-12)']++;
        else if (hour >= 12 && hour < 18) timeSlots['Afternoon (12-18)']++;
        else if (hour >= 18 && hour < 24) timeSlots['Evening (18-24)']++;
        else timeSlots['Night (0-6)']++;
      }
    });

    return Object.entries(timeSlots).map(([name, value]) => ({ name, value }));
  };

  const generateMonthlyTrends = () => {
    const last6Months = [];
    for (let i = 5; i >= 0; i--) {
      const date = new Date();
      date.setMonth(date.getMonth() - i);
      const monthStr = date.toISOString().substring(0, 7); // YYYY-MM
      
      const monthTasks = tasks.filter(task => {
        if (!task.createdAt) return false;
        const taskMonth = new Date(task.createdAt).toISOString().substring(0, 7);
        return taskMonth === monthStr;
      });
      
      last6Months.push({
        month: date.toLocaleDateString('en-US', { month: 'short' }),
        completed: monthTasks.filter(t => t.completed).length,
        total: monthTasks.length,
        efficiency: monthTasks.length > 0 ? Math.round((monthTasks.filter(t => t.completed).length / monthTasks.length) * 100) : 0
      });
    }
    
    return last6Months;
  };

  const getOverallStats = () => {
    const completed = tasks.filter(t => t.completed).length;
    const pending = tasks.filter(t => !t.completed).length;
    const high = tasks.filter(t => t.priority === 'high').length;
    const completionRate = tasks.length > 0 ? Math.round((completed / tasks.length) * 100) : 0;
    
    return { completed, pending, high, total: tasks.length, completionRate };
  };

  const CHART_COLORS = ['#2678E1', '#4CAF50', '#FF9800', '#F44336', '#9C27B0', '#00BCD4', '#FFC107'];

  const stats = getOverallStats();

  if (loading || analyticsLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
        <CircularProgress size={60} />
      </Box>
    );
  }

  return (
    <div className="analytics-container">
      <Container fluid>
        {/* Header */}
        <div className="analytics-header">
          <div>
            <Typography variant="h3" className="analytics-title">
              Analytics Dashboard 📈
            </Typography>
            <Typography variant="h6" className="analytics-subtitle">
              Track your productivity and performance
            </Typography>
          </div>
          <FormControl className="time-period-select">
            <InputLabel>Time Period</InputLabel>
            <Select
              value={timePeriod}
              onChange={(e) => setTimePeriod(e.target.value)}
              label="Time Period"
            >
              <MenuItem value="7d">Last 7 Days</MenuItem>
              <MenuItem value="30d">Last 30 Days</MenuItem>
              <MenuItem value="90d">Last 3 Months</MenuItem>
            </Select>
          </FormControl>
        </div>

        {/* Overview Stats */}
        <Row className="mb-4">
          <Col xl={3} lg={6} md={6} sm={12} className="mb-3">
            <Card className="overview-card total-tasks">
              <Card.Body className="text-center">
                <div className="overview-icon">
                  <Assignment fontSize="large" />
                </div>
                <Typography variant="h3" className="overview-number">
                  {stats.total}
                </Typography>
                <Typography variant="h6" className="overview-label">
                  Total Tasks
                </Typography>
                <Typography variant="body2" className="overview-subtitle">
                  All time
                </Typography>
              </Card.Body>
            </Card>
          </Col>

          <Col xl={3} lg={6} md={6} sm={12} className="mb-3">
            <Card className="overview-card completion-rate">
              <Card.Body className="text-center">
                <div className="overview-icon">
                  <TrendingUp fontSize="large" />
                </div>
                <Typography variant="h3" className="overview-number">
                  {stats.completionRate}%
                </Typography>
                <Typography variant="h6" className="overview-label">
                  Completion Rate
                </Typography>
                <Typography variant="body2" className="overview-subtitle">
                  Overall performance
                </Typography>
              </Card.Body>
            </Card>
          </Col>

          <Col xl={3} lg={6} md={6} sm={12} className="mb-3">
            <Card className="overview-card completed-tasks">
              <Card.Body className="text-center">
                <div className="overview-icon">
                  <EmojiEvents fontSize="large" />
                </div>
                <Typography variant="h3" className="overview-number">
                  {stats.completed}
                </Typography>
                <Typography variant="h6" className="overview-label">
                  Completed
                </Typography>
                <Typography variant="body2" className="overview-subtitle">
                  Tasks finished
                </Typography>
              </Card.Body>
            </Card>
          </Col>

          <Col xl={3} lg={6} md={6} sm={12} className="mb-3">
            <Card className="overview-card pending-tasks">
              <Card.Body className="text-center">
                <div className="overview-icon">
                  <Timer fontSize="large" />
                </div>
                <Typography variant="h3" className="overview-number">
                  {stats.pending}
                </Typography>
                <Typography variant="h6" className="overview-label">
                  Pending
                </Typography>
                <Typography variant="body2" className="overview-subtitle">
                  Tasks remaining
                </Typography>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Charts Section */}
        <Row>
          {/* Productivity Trend */}
          <Col xl={8} lg={12} className="mb-4">
            <Paper className="chart-paper">
              <div className="chart-header">
                <Typography variant="h5" className="chart-title">
                  📊 Productivity Trend
                </Typography>
                <Chip label={`Last ${timePeriod === '7d' ? '7 Days' : timePeriod === '30d' ? '30 Days' : '3 Months'}`} />
              </div>
              <div className="chart-content">
                <ResponsiveContainer width="100%" height={350}>
                  <AreaChart data={analyticsData.productivity}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#ECF4F8" />
                    <XAxis dataKey="date" stroke="#666" />
                    <YAxis stroke="#666" />
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: 'white',
                        border: '1px solid #ECF4F8',
                        borderRadius: '8px',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                      }}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="productivity" 
                      stroke={COLORS.primary} 
                      fill={COLORS.primary}
                      fillOpacity={0.3}
                      strokeWidth={3}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </Paper>
          </Col>

          {/* Category Distribution */}
          <Col xl={4} lg={12} className="mb-4">
            <Paper className="chart-paper">
              <div className="chart-header">
                <Typography variant="h5" className="chart-title">
                  🏷️ Task Categories
                </Typography>
              </div>
              <div className="chart-content">
                <ResponsiveContainer width="100%" height={350}>
                  <PieChart>
                    <Pie
                      data={analyticsData.categoryDistribution}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={120}
                      dataKey="value"
                      startAngle={90}
                      endAngle={450}
                    >
                      {analyticsData.categoryDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </Paper>
          </Col>
        </Row>

        <Row>
          {/* Weekly Performance */}
          <Col xl={6} lg={12} className="mb-4">
            <Paper className="chart-paper">
              <div className="chart-header">
                <Typography variant="h5" className="chart-title">
                  📅 Weekly Performance
                </Typography>
              </div>
              <div className="chart-content">
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={analyticsData.weeklyStats}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#ECF4F8" />
                    <XAxis dataKey="day" stroke="#666" />
                    <YAxis stroke="#666" />
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: 'white',
                        border: '1px solid #ECF4F8',
                        borderRadius: '8px',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                      }}
                    />
                    <Bar dataKey="completed" fill={COLORS.success} name="Completed" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="pending" fill={COLORS.warning} name="Pending" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Paper>
          </Col>

          {/* Time Distribution */}
          <Col xl={6} lg={12} className="mb-4">
            <Paper className="chart-paper">
              <div className="chart-header">
                <Typography variant="h5" className="chart-title">
                  ⏰ Time Distribution
                </Typography>
              </div>
              <div className="chart-content">
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={analyticsData.timeDistribution}
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      dataKey="value"
                    >
                      {analyticsData.timeDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </Paper>
          </Col>
        </Row>

        {/* Monthly Trends */}
        <Row>
          <Col lg={12} className="mb-4">
            <Paper className="chart-paper">
              <div className="chart-header">
                <Typography variant="h5" className="chart-title">
                  📈 Monthly Trends
                </Typography>
              </div>
              <div className="chart-content">
                <ResponsiveContainer width="100%" height={350}>
                  <LineChart data={analyticsData.monthlyTrends}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#ECF4F8" />
                    <XAxis dataKey="month" stroke="#666" />
                    <YAxis stroke="#666" />
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: 'white',
                        border: '1px solid #ECF4F8',
                        borderRadius: '8px',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                      }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="completed" 
                      stroke={COLORS.success} 
                      strokeWidth={3}
                      name="Completed"
                    />
                    <Line 
                      type="monotone" 
                      dataKey="total" 
                      stroke={COLORS.primary} 
                      strokeWidth={3}
                      name="Total"
                    />
                    <Line 
                      type="monotone" 
                      dataKey="efficiency" 
                      stroke={COLORS.warning} 
                      strokeWidth={3}
                      name="Efficiency %"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </Paper>
          </Col>
        </Row>

        {/* Insights Section */}
        <Row>
          <Col lg={12}>
            <Paper className="insights-paper">
              <Typography variant="h5" className="insights-title">
                💡 Key Insights
              </Typography>
              <div className="insights-grid">
                <div className="insight-card">
                  <div className="insight-icon">🎯</div>
                  <div className="insight-content">
                    <Typography variant="h6">Best Performance Day</Typography>
                    <Typography variant="body1">
                      {analyticsData.weeklyStats.length > 0 
                        ? analyticsData.weeklyStats.reduce((a, b) => a.completed > b.completed ? a : b).day
                        : 'N/A'
                      }
                    </Typography>
                  </div>
                </div>
                
                <div className="insight-card">
                  <div className="insight-icon">📊</div>
                  <div className="insight-content">
                    <Typography variant="h6">Most Active Category</Typography>
                    <Typography variant="body1">
                      {analyticsData.categoryDistribution.length > 0 
                        ? analyticsData.categoryDistribution.reduce((a, b) => a.value > b.value ? a : b).name
                        : 'N/A'
                      }
                    </Typography>
                  </div>
                </div>
                
                <div className="insight-card">
                  <div className="insight-icon">⚡</div>
                  <div className="insight-content">
                    <Typography variant="h6">Peak Productivity Time</Typography>
                    <Typography variant="body1">
                      {analyticsData.timeDistribution.length > 0 
                        ? analyticsData.timeDistribution.reduce((a, b) => a.value > b.value ? a : b).name
                        : 'N/A'
                      }
                    </Typography>
                  </div>
                </div>
                
                <div className="insight-card">
                  <div className="insight-icon">🏆</div>
                  <div className="insight-content">
                    <Typography variant="h6">Completion Streak</Typography>
                    <Typography variant="body1">
                      {stats.completionRate >= 80 ? 'Excellent!' : stats.completionRate >= 60 ? 'Good!' : 'Keep Going!'}
                    </Typography>
                  </div>
                </div>
              </div>
            </Paper>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Analytics;

