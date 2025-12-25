import api from './api';

export const calendarService = {
  getEvents: async (startDate, endDate) => {
    const response = await api.get(`/calendar/events?start=${startDate}&end=${endDate}`);
    return response.data;
  },

  createEvent: async (eventData) => {
    const response = await api.post('/calendar/events', eventData);
    return response.data;
  },

  updateEvent: async (eventId, eventData) => {
    const response = await api.put(`/calendar/events/${eventId}`, eventData);
    return response.data;
  },

  deleteEvent: async (eventId) => {
    const response = await api.delete(`/calendar/events/${eventId}`);
    return response.data;
  }
};
