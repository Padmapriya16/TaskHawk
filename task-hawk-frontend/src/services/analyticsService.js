import api from './api';

export const analyticsService = {
  getDashboardAnalytics: async () => {
    const response = await api.get('/analytics/dashboard');
    return response.data;
  },

  getWeeklyOverview: async () => { // NEW: For Dashboard Weekly Overview
    const response = await api.get('/analytics/weekly-overview');
    return response.data;
  },

  getProductivityTrends: async (period = '7d') => {
    const response = await api.get(`/analytics/productivity?period=${period}`);
    return response.data;
  },

  getCategoryDistribution: async () => {
    const response = await api.get('/analytics/categories');
    return response.data;
  },

  getTimeDistribution: async () => { // NEW: For Analytics Time Distribution
    const response = await api.get('/analytics/time-distribution');
    return response.data;
  },

  getMonthlyTrends: async () => { // NEW: For Analytics Monthly Trends
    const response = await api.get('/analytics/monthly-trends');
    return response.data;
  },

  // If you implement mood tracking
  updateMood: async (mood) => {
    const response = await api.post('/analytics/mood', { mood });
    return response.data;
  }
};
