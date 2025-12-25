import React, { createContext, useContext, useReducer, useEffect, useCallback } from 'react';
import { taskService } from '../services/taskService';
import { analyticsService } from '../services/analyticsService';
import { authService } from '../services/authService';
import { calendarService } from '../services/calendarService';

const AppContext = createContext();

const initialState = {
  user: null,
  isAuthenticated: false,
  loading: false, // General loading for data fetches
  loadingAuth: true, // Specific loading for initial auth check
  error: null,
  tasks: [],
  analytics: {
    todayProgress: 0,
    streak: 0,
    mood: 'productive',
    completedTasks: 0,
    totalTasks: 0
  },
  calendarEvents: [], // New state for calendar events
};

function appReducer(state, action) {
  switch (action.type) {
    case 'SET_LOADING':
      // console.log('Reducer: SET_LOADING', action.payload); // Debug log
      return { ...state, loading: action.payload };
    case 'SET_LOADING_AUTH':
      // console.log('Reducer: SET_LOADING_AUTH', action.payload); // Debug log
      return { ...state, loadingAuth: action.payload };
    case 'SET_ERROR':
      // console.error('Reducer: SET_ERROR', action.payload); // Debug log
      return { ...state, error: action.payload, loading: false, loadingAuth: false };
    case 'SET_TASKS':
      // console.log('Reducer: SET_TASKS', action.payload.length, 'tasks'); // Debug log
      return { ...state, tasks: action.payload, loading: false };
    case 'ADD_TASK':
      return { ...state, tasks: [...state.tasks, action.payload] };
    case 'UPDATE_TASK':
      return {
        ...state,
        tasks: state.tasks.map(task =>
          task._id === action.payload._id ? action.payload : task
        )
      };
    case 'DELETE_TASK':
      return {
        ...state,
        tasks: state.tasks.filter(task => task._id !== action.payload)
      };
    case 'SET_ANALYTICS':
      // console.log('Reducer: SET_ANALYTICS', action.payload); // Debug log
      return { ...state, analytics: { ...state.analytics, ...action.payload } };
    case 'SET_CALENDAR_EVENTS': // NEW
      // console.log('Reducer: SET_CALENDAR_EVENTS', action.payload.length, 'events'); // Debug log
      return { ...state, calendarEvents: action.payload };
    case 'SET_USER':
      // console.log('Reducer: SET_USER', action.payload ? 'User received' : 'No user', 'isAuthenticated:', !!action.payload); // Debug log
      return { ...state, user: action.payload, isAuthenticated: !!action.payload, loadingAuth: false };
    case 'LOGOUT':
      // console.log('Reducer: LOGOUT'); // Debug log
      return { ...initialState, loadingAuth: false };
    default:
      return state;
  }
}

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Function to load all user-specific app data (tasks, analytics, calendar)
  const loadInitialData = useCallback(async () => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      if (!state.isAuthenticated) {
        // console.log('loadInitialData: Not authenticated, skipping data load.'); // Debug log
        return;
      }
      // console.log('loadInitialData: Authenticated, fetching all app data...'); // Debug log
      const [tasks, analytics, calendarEvents] = await Promise.all([
        taskService.getAllTasks(),
        analyticsService.getDashboardAnalytics(),
        calendarService.getEvents(
          new Date(new Date().setMonth(new Date().getMonth() - 1)).toISOString(), // Last month
          new Date(new Date().setMonth(new Date().getMonth() + 2)).toISOString()  // Next 2 months
        )
      ]);
      dispatch({ type: 'SET_TASKS', payload: tasks });
      dispatch({ type: 'SET_ANALYTICS', payload: analytics });
      dispatch({ type: 'SET_CALENDAR_EVENTS', payload: calendarEvents }); // Set calendar events
    } catch (error) {
      console.error('loadInitialData Error:', error);
      dispatch({ type: 'SET_ERROR', payload: error.message });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  }, [state.isAuthenticated]);

  // Function to check auth token and load user on app start or after login
  const checkAuthAndLoadUser = useCallback(async () => {
    // console.log('checkAuthAndLoadUser: Checking for token and user...'); // Debug log
    dispatch({ type: 'SET_LOADING_AUTH', payload: true });
    try {
      const user = await authService.getCurrentUser();
      // console.log('checkAuthAndLoadUser: getCurrentUser returned:', user); // Debug log
      dispatch({ type: 'SET_USER', payload: user });
      // loadInitialData will be called by its own useEffect or explicitly where needed
    } catch (error) {
      console.error('checkAuthAndLoadUser Error:', error);
      dispatch({ type: 'SET_ERROR', payload: error.message });
      dispatch({ type: 'SET_USER', payload: null });
    } finally {
      dispatch({ type: 'SET_LOADING_AUTH', payload: false });
      // console.log('checkAuthAndLoadUser: Auth check complete. isAuthenticated:', state.isAuthenticated); // Debug log
    }
  }, []); // No dependencies for initial load to avoid re-runs

  useEffect(() => {
    checkAuthAndLoadUser();
  }, [checkAuthAndLoadUser]);

  // Trigger loadInitialData when isAuthenticated changes (after initial check)
  useEffect(() => {
    if (state.isAuthenticated && !state.loadingAuth) {
      loadInitialData();
    }
  }, [state.isAuthenticated, state.loadingAuth, loadInitialData]);


  // Centralized login function
  const login = async (email, password) => {
    // console.log('login function: Attempting login for:', email); // Debug log
    dispatch({ type: 'SET_LOADING_AUTH', payload: true });
    try {
      await authService.login(email, password);
      // console.log('login function: authService.login successful, token should be in localStorage.'); // Debug log
      
      const user = await authService.getCurrentUser();
      // console.log('login function: getCurrentUser after login returned:', user); // Debug log
      dispatch({ type: 'SET_USER', payload: user });
      
      if (!user) {
        // console.log('login function: getCurrentUser failed after login, redirecting to login.'); // Debug log
        throw new Error('Could not retrieve user after login.');
      }
      return user;
    } catch (error) {
      console.error('login function Error:', error);
      dispatch({ type: 'SET_ERROR', payload: error.message });
      dispatch({ type: 'SET_USER', payload: null });
      throw error;
    } finally {
      dispatch({ type: 'SET_LOADING_AUTH', payload: false });
      // console.log('login function: Final isAuthenticated state:', state.isAuthenticated); // Debug log
    }
  };

  const createTask = async (taskData) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      const newTask = await taskService.createTask(taskData);
      dispatch({ type: 'ADD_TASK', payload: newTask });
      await refreshAnalytics(); // Refresh analytics after task change
      await refreshCalendarEvents(); // Also refresh calendar
      return newTask;
    } catch (error) {
      console.error('createTask Error:', error);
      dispatch({ type: 'SET_ERROR', payload: error.message });
      throw error;
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const updateTask = async (taskId, taskData) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      const updatedTask = await taskService.updateTask(taskId, taskData);
      dispatch({ type: 'UPDATE_TASK', payload: updatedTask });
      await refreshAnalytics(); // Refresh analytics after task change
      await refreshCalendarEvents(); // Also refresh calendar
      return updatedTask;
    } catch (error) {
      console.error('updateTask Error:', error);
      dispatch({ type: 'SET_ERROR', payload: error.message });
      throw error;
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const deleteTask = async (taskId) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      await taskService.deleteTask(taskId);
      dispatch({ type: 'DELETE_TASK', payload: taskId });
      await refreshAnalytics(); // Refresh analytics after task change
      await refreshCalendarEvents(); // Also refresh calendar
    } catch (error) {
      console.error('deleteTask Error:', error);
      dispatch({ type: 'SET_ERROR', payload: error.message });
      throw error;
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const toggleTaskComplete = async (taskId, completed) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      const updatedTask = await taskService.toggleComplete(taskId, !completed);
      dispatch({ type: 'UPDATE_TASK', payload: updatedTask });
      await refreshAnalytics(); // Refresh analytics after task change
      await refreshCalendarEvents(); // Also refresh calendar
      return updatedTask;
    } catch (error) {
      console.error('toggleTaskComplete Error:', error);
      dispatch({ type: 'SET_ERROR', payload: error.message });
      throw error;
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const refreshAnalytics = useCallback(async () => {
    if (!state.isAuthenticated) {
      // console.log('refreshAnalytics: Not authenticated, skipping refresh.'); // Debug log
      return;
    }
    // console.log('refreshAnalytics: Authenticated, refreshing analytics...'); // Debug log
    try {
      const analytics = await analyticsService.getDashboardAnalytics();
      dispatch({ type: 'SET_ANALYTICS', payload: analytics });
    } catch (error) {
      console.error('refreshAnalytics Error:', error);
      dispatch({ type: 'SET_ERROR', payload: error.message });
    }
  }, [state.isAuthenticated]);

  const updateMood = async (mood) => {
    if (!state.isAuthenticated) return;
    try {
      await analyticsService.updateMood(mood);
      dispatch({ type: 'SET_ANALYTICS', payload: { mood } });
    } catch (error) {
      console.error('updateMood Error:', error);
      dispatch({ type: 'SET_ERROR', payload: error.message });
    }
  };

  const logout = () => {
    // console.log('logout function: Logging out...'); // Debug log
    authService.logout();
    dispatch({ type: 'LOGOUT' });
  };

  // NEW: Calendar event functions
  const createCalendarEvent = async (eventData) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      const newEvent = await calendarService.createEvent(eventData);
      // To reflect new event, refetch all calendar events
      await refreshCalendarEvents();
      return newEvent;
    } catch (error) {
      console.error('createCalendarEvent Error:', error);
      dispatch({ type: 'SET_ERROR', payload: error.message });
      throw error;
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const updateCalendarEvent = async (eventId, eventData) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      const updatedEvent = await calendarService.updateEvent(eventId, eventData);
      await refreshCalendarEvents();
      return updatedEvent;
    } catch (error) {
      console.error('updateCalendarEvent Error:', error);
      dispatch({ type: 'SET_ERROR', payload: error.message });
      throw error;
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const deleteCalendarEvent = async (eventId) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      await calendarService.deleteEvent(eventId);
      await refreshCalendarEvents();
    } catch (error) {
      console.error('deleteCalendarEvent Error:', error);
      dispatch({ type: 'SET_ERROR', payload: error.message });
      throw error;
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const refreshCalendarEvents = useCallback(async (start, end) => {
    if (!state.isAuthenticated) return;
    // console.log('refreshCalendarEvents: Fetching calendar events...'); // Debug log
    try {
      const events = await calendarService.getEvents(
        start || new Date(new Date().setMonth(new Date().getMonth() - 1)).toISOString(),
        end || new Date(new Date().setMonth(new Date().getMonth() + 2)).toISOString()
      );
      dispatch({ type: 'SET_CALENDAR_EVENTS', payload: events });
    } catch (error) {
      console.error('refreshCalendarEvents Error:', error);
      dispatch({ type: 'SET_ERROR', payload: error.message });
    }
  }, [state.isAuthenticated]);


  const value = {
    ...state,
    login,
    logout,
    createTask,
    updateTask,
    deleteTask,
    toggleTaskComplete,
    updateMood,
    refreshAnalytics,
    loadInitialData,
    checkAuthAndLoadUser,
    createCalendarEvent,
    updateCalendarEvent,
    deleteCalendarEvent,
    refreshCalendarEvents,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};
