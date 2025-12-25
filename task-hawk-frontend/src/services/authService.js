import api from './api';

export const authService = {
  login: async (email, password) => {
    console.log('authService.login: Calling backend /auth/login...'); // LOG
    const response = await api.post('/auth/login', { email, password });
    console.log('authService.login: Backend response for login:', response.data); // LOG
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      console.log('authService.login: Token saved to localStorage.'); // LOG
    }
    return response.data;
  },

  register: async (name, email, password) => {
    console.log('authService.register: Calling backend /auth/register...'); // LOG
    const response = await api.post('/auth/register', { name, email, password });
    console.log('authService.register: Backend response for register:', response.data); // LOG
    return response.data;
  },

  logout: () => {
    console.log('authService.logout: Removing token from localStorage.'); // LOG
    localStorage.removeItem('token');
  },

  getCurrentUser: async () => {
    const token = localStorage.getItem('token');
    console.log('authService.getCurrentUser: Token from localStorage:', token ? 'found' : 'not found'); // LOG
    if (!token) {
      return null;
    }
    try {
      const response = await api.get('/auth/me');
      console.log('authService.getCurrentUser: Backend response for /auth/me:', response.data); // LOG
      return response.data;
    } catch (error) {
      console.error('authService.getCurrentUser Error:', error.response?.data || error.message); // LOG
      localStorage.removeItem('token');
      return null;
    }
  },

  forgotPassword: async (email) => {
    console.log('authService.forgotPassword: Calling backend /auth/forgotpassword...'); // LOG
    const response = await api.post('/auth/forgotpassword', { email });
    console.log('authService.forgotPassword: Backend response:', response.data); // LOG
    return response.data;
  },

  resetPassword: async (token, newPassword) => {
    console.log('authService.resetPassword: Calling backend /auth/resetpassword...'); // LOG
    const response = await api.put(`/auth/resetpassword/${token}`, { newPassword });
    console.log('authService.resetPassword: Backend response:', response.data); // LOG
    return response.data;
  }
};
