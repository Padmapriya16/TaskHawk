export const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export const COLORS = {
  primary: '#2678E1',
  secondary: '#114A92',
  background: '#ECF4F8',
  white: '#FFFFFF',
  black: '#000000',
  grey: '#D9D9D9',
  success: '#4CAF50',
  warning: '#FF9800',
  error: '#F44336'
};

export const PRIORITY_COLORS = {
  high: '#F44336',
  medium: '#FF9800',
  low: '#4CAF50'
};

export const TASK_CATEGORIES = [
  'work',
  'personal',
  'health',
  'education',
  'finance',
  'other'
];

export const MOOD_TYPES = [
  'productive',
  'focused',
  'stressed',
  'tired',
  'motivated',
  'overwhelmed'
];
