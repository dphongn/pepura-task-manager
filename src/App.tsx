import { useState } from 'react';
import { Box, CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import Navigation from './components/Navigation';
import TaskList from './components/TaskList';
import Calendar from './components/Calendar';
import Analytics from './components/Analytics';
import { TaskProvider } from './context/TaskContext';

function App() {
  const [currentView, setCurrentView] = useState(0);
  const [darkMode, setDarkMode] = useState(false);

  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
      primary: {
        main: darkMode ? '#7C4DFF' : '#4ECDC4', // Purple in dark mode, teal in light
        light: darkMode ? '#B388FF' : '#81F7F3',
        dark: darkMode ? '#3F1A5B' : '#009688',
      },
      secondary: {
        main: darkMode ? '#536DFE' : '#A8E6CF', // Blue in dark mode, green in light
        light: darkMode ? '#8C9EFF' : '#DCEDC8',
        dark: darkMode ? '#1A237E' : '#4CAF50',
      },
      background: {
        default: darkMode ? '#0F0C29' : '#F0F8FF', // Dark blue-purple vs light blue
        paper: darkMode ? '#1A1B3A' : '#FFFFFF',
      },
      text: {
        primary: darkMode ? '#E8EAF6' : '#2E3A59',
        secondary: darkMode ? '#B39DDB' : '#5A6A7A',
      },
      success: {
        main: darkMode ? '#69F0AE' : '#81C784',
      },
      info: {
        main: darkMode ? '#40C4FF' : '#64B5F6',
      },
      warning: {
        main: darkMode ? '#FF9800' : '#FFB74D',
      },
      error: {
        main: darkMode ? '#FF5722' : '#E57373',
      },
    },
    typography: {
      fontFamily: '"Poppins", "Segoe UI", "Roboto", sans-serif',
      h4: {
        fontWeight: 600,
        color: darkMode ? '#E8EAF6' : '#2E3A59',
      },
      h6: {
        fontWeight: 500,
      },
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            backgroundColor: darkMode ? '#0F0C29' : '#F0F8FF',
            minHeight: '100vh',
          },
          html: {
            minHeight: '100vh',
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            borderRadius: 16,
            boxShadow: darkMode 
              ? '0 4px 20px rgba(124, 77, 255, 0.2)' 
              : '0 4px 20px rgba(78, 205, 196, 0.1)',
            background: darkMode ? '#1A1B3A' : '#FFFFFF',
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 25,
            textTransform: 'none',
            fontWeight: 500,
            padding: '8px 24px',
            boxShadow: 'none',
            '&:hover': {
              boxShadow: darkMode 
                ? '0 4px 15px rgba(124, 77, 255, 0.3)' 
                : '0 4px 15px rgba(78, 205, 196, 0.2)',
            },
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 16,
            boxShadow: darkMode 
              ? '0 2px 12px rgba(124, 77, 255, 0.15)' 
              : '0 2px 12px rgba(78, 205, 196, 0.08)',
            background: darkMode ? '#1A1B3A' : '#FFFFFF',
          },
        },
      },
      MuiTextField: {
        styleOverrides: {
          root: {
            '& .MuiOutlinedInput-root': {
              borderRadius: 12,
              '& fieldset': {
                borderColor: darkMode ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.1)',
              },
              '&:hover fieldset': {
                borderColor: darkMode ? '#7C4DFF' : '#4ECDC4',
              },
              '&.Mui-focused fieldset': {
                borderColor: darkMode ? '#7C4DFF' : '#4ECDC4',
              },
            },
          },
        },
      },
      MuiSelect: {
        styleOverrides: {
          root: {
            borderRadius: 12,
          },
        },
      },
      MuiChip: {
        styleOverrides: {
          root: {
            borderRadius: 12,
            fontWeight: 500,
          },
        },
      },
      MuiDialog: {
        styleOverrides: {
          paper: {
            borderRadius: 20,
            padding: '8px',
          },
        },
      },
    },
  });

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const renderView = () => {
    switch (currentView) {
      case 0:
        return <TaskList />;
      case 1:
        return <Calendar />;
      case 2:
        return <Analytics />;
      default:
        return <TaskList />;
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <CssBaseline />
        <TaskProvider>
          <Box sx={{ 
            display: 'flex', 
            flexDirection: 'column', 
            minHeight: '100vh', 
            width: '100vw',
            bgcolor: 'background.default',
            // Ensure body background extends to full height
            '& body': {
              bgcolor: 'background.default'
            }
          }}>
            <Navigation 
              currentView={currentView} 
              onViewChange={setCurrentView}
              darkMode={darkMode}
              onToggleDarkMode={toggleDarkMode}
            />
            <Box 
              component="main" 
              sx={{ 
                flexGrow: 1, 
                p: 3, 
                width: '100%',
                minHeight: 'calc(100vh - 80px)', // Subtract navigation height
                bgcolor: 'background.default'
              }}
            >
              {renderView()}
            </Box>
          </Box>
        </TaskProvider>
      </LocalizationProvider>
    </ThemeProvider>
  );
}

export default App;