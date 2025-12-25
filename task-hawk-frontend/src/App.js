import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Box, CircularProgress } from '@mui/material';
import 'bootstrap/dist/css/bootstrap.min.css';
import { AppProvider, useApp } from './context/AppContext';

// --- Your Component Imports ---
import Navbar from './components/common/Navbar'; // Your Sidebar component, named Navbar
import AppHeader from './components/common/AppHeader'; // Global header for static/public pages
import Footer from './components/common/Footer';       // Global footer for static/public pages
import TopHeader from './components/common/TopHeader';  // Header *inside* authenticated app pages

import UserDashboard from './components/dashboard/UserDashboard';
import MyTasks from './components/tasks/MyTasks';
import TaskCalendar from './components/calendar/TaskCalendar';
import Analytics from './components/analytics/Analytics';

import HomePage from './pages/HomePage';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
// Removed: ForgotPassword and ResetPassword imports

import TermsAndConditions from './pages/TermsAndConditions'; // Your Terms & Conditions page
import PrivacyPolicy from './pages/PrivacyPolicy';         // Your Privacy Policy page
import ProtectedRoute from './components/common/ProtectedRoute';
import AboutUs from './pages/AboutUs';         // Your Privacy Policy page
import FAQ from './pages/FAQ'; 
import GetInTouch from './pages/getintouch';

        // Your Privacy Policy page
import './App.css';

const theme = createTheme({
  palette: {
    primary: {
      main: '#2678E1',
      dark: '#114A92',
      light: '#ECF4F8',
    },
    secondary: {
      main: '#114A92',
    },
    background: {
      default: '#ECF4F8',
      paper: '#FFFFFF',
    },
    success: {
      main: '#4CAF50',
    },
    warning: {
      main: '#FF9800',
    },
    error: {
      main: '#F44336',
    },
  },
  typography: {
    fontFamily: ['Fredoka', 'Arial', 'sans-serif'].join(','),
    h1: {
      fontFamily: ['Lilita One', 'cursive'].join(','),
    },
    h2: {
      fontFamily: ['Lilita One', 'cursive'].join(','),
    },
    h3: {
      fontFamily: ['Lilita One', 'cursive'].join(','),
    },
    h4: {
      fontFamily: ['League Spartan', 'sans-serif'].join(','),
    },
    h5: {
      fontFamily: ['League Spartan', 'sans-serif'].join(','),
    },
    h6: {
      fontFamily: ['League Spartan', 'sans-serif'].join(','),
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 25,
          textTransform: 'none',
          fontWeight: 600,
          padding: '8px 24px',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: '0 4px 20px rgba(17, 74, 146, 0.15)',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 16,
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: '12px',
          },
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          borderRadius: '12px',
        },
      },
    },
  },
});

// AppLayout component to handle conditional rendering of headers/footers
function AppLayout() {
  const { isAuthenticated, loadingAuth, user, logout } = useApp();
  const location = useLocation();

  // Define routes that should use the static page layout (AppHeader + Footer)
  const staticPagePaths = [
    '/', '/login', '/signup', '/terms', '/privacy', '/about', '/faq', '/contact',// Add other static pages like /about, /contact
  ];
  const isStaticPage = staticPagePaths.includes(location.pathname);

  if (loadingAuth) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <CircularProgress size={60} />
      </Box>
    );
  }

  return (
    <Box className="App" sx={{ display: 'flex' }}>
      {/* Conditional Header/Sidebar */}
      {isAuthenticated && !isStaticPage ? (
        // Authenticated, not a static page -> Render Sidebar
        <Navbar user={user} onLogout={logout} /> // Your Sidebar component, named Navbar
      ) : (
        // Not authenticated OR a static page -> AppHeader is rendered *inside* the page component
        // For static pages (HomePage, Login, Signup, Terms, Privacy), AppHeader and Footer are
        // rendered directly within their respective page components.
        // This Box will be empty here, as the page itself handles its header/footer.
        null
      )}

      {/* Main Content Area */}
      <Box className="main-content" sx={{ 
        // Adjust margin for sidebar only if authenticated AND not a static page
        marginLeft: isAuthenticated && !isStaticPage ? '280px' : 0,
        width: isAuthenticated && !isStaticPage ? 'calc(100% - 280px)' : '100%',
        minHeight: '100vh',
        overflowX: 'hidden'
      }}>
         {/* ✅ Add TopHeader here */}
  {isAuthenticated && !isStaticPage && (
    <TopHeader user={user} onLogout={logout} />
  )}
        <Routes>
          {/* Public Routes - These pages are responsible for rendering AppHeader and Footer themselves */}
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/terms" element={<TermsAndConditions />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/faq" element={<FAQ />} />
      <Route path="/contact" element={<GetInTouch />} />

          {/* Add other static page routes here: /about, /contact */}

          {/* Protected Routes - These pages will have the Sidebar (Navbar) and TopHeader */}
          <Route path="/dashboard" element={<ProtectedRoute><UserDashboard /></ProtectedRoute>} />
          <Route path="/tasks" element={<ProtectedRoute><MyTasks /></ProtectedRoute>} />
          <Route path="/calendar" element={<ProtectedRoute><TaskCalendar /></ProtectedRoute>} />
          <Route path="/analytics" element={<ProtectedRoute><Analytics /></ProtectedRoute>} />
          
          {/* Redirect authenticated users from public routes to dashboard */}
          {isAuthenticated && (
            <>
              <Route path="/login" element={<Navigate to="/dashboard" replace />} />
              <Route path="/signup" element={<Navigate to="/dashboard" replace />} />
              {/* Optional: Redirect other static pages if authenticated */}
              {/* If you want users to stay on Terms/Privacy even when logged in, remove these redirects */}
              {/* <Route path="/terms" element={<Navigate to="/dashboard" replace />} /> */}
              {/* <Route path="/privacy" element={<Navigate to="/dashboard" replace />} /> */}
            </>
          )}

          {/* Fallback for unknown routes */}
          <Route path="*" element={<Navigate to={isAuthenticated ? "/dashboard" : "/"} replace />} />
        </Routes>
      </Box>
      {/* Global Footer - No longer rendered here, as it's inside static pages */}
    </Box>
  );
}

// Root App component to provide ThemeProvider and AppProvider
function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <AppProvider>
          <AppLayout />
        </AppProvider>
      </Router>
    </ThemeProvider>
  );
}

export default App;
