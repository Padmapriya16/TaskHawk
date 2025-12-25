import api from './api';

export const taskService = {
  getAllTasks: async () => {
    const response = await api.get('/tasks');
    return response.data;
  },

  createTask: async (taskData) => {
    const response = await api.post('/tasks', taskData);
    return response.data;
  },

  updateTask: async (taskId, taskData) => {
    const response = await api.patch(`/tasks/${taskId}`, taskData); // Use PATCH for partial updates
    return response.data;
  },

  deleteTask: async (taskId) => {
    const response = await api.delete(`/tasks/${taskId}`);
    return response.data;
  },

  toggleComplete: async (taskId, completed) => {
    const response = await api.patch(`/tasks/${taskId}`, { completed });
    return response.data;
  },
};
