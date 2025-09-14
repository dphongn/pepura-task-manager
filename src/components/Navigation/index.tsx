import { AppBar, Toolbar, Tabs, Tab, Box, Typography, IconButton } from '@mui/material';
import ListAltIcon from '@mui/icons-material/ListAlt';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import './styles.css';

interface NavigationProps {
  currentView: number;
  onViewChange: (view: number) => void;
  darkMode: boolean;
  onToggleDarkMode: () => void;
}

const Navigation = ({ currentView, onViewChange, darkMode, onToggleDarkMode }: NavigationProps) => {
  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    onViewChange(newValue);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar 
        position="static" 
        sx={{
          background: darkMode 
            ? 'linear-gradient(135deg, #2D1B69 0%, #0F0C29 100%)'
            : 'linear-gradient(135deg, #4ECDC4 0%, #A8E6CF 100%)',
          boxShadow: darkMode 
            ? '0 4px 20px rgba(45, 27, 105, 0.5)'
            : '0 4px 20px rgba(78, 205, 196, 0.3)'
        }}
      >
        <Toolbar sx={{ minHeight: 80 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mr: 4 }}>
            <Box>
              <Typography variant="h6" sx={{ color: 'white', fontWeight: 600 }}>
                Pepura
              </Typography>
              <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.8)' }}>
                Little steps matter
              </Typography>
            </Box>
          </Box>
          
          <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center' }}>
            <Tabs 
              value={currentView} 
              onChange={handleChange}
              textColor="inherit"
              TabIndicatorProps={{
                sx: { bgcolor: 'white', height: 4, borderRadius: 2 }
              }}
              sx={{
                '& .MuiTab-root': {
                  minHeight: 60,
                  fontWeight: 500,
                  textTransform: 'none',
                  fontSize: '1rem',
                  borderRadius: 3,
                  mx: 0.5,
                  transition: 'all 0.3s ease',
                  color: 'rgba(255,255,255,0.8)',
                  minWidth: 140,
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    color: 'white',
                    borderRadius: 2
                  },
                  '&.Mui-selected': {
                    backgroundColor: 'rgba(255, 255, 255, 0.2)',
                    color: 'white',
                    borderRadius: 3,
                  }
                }
              }}
            >
              <Tab 
                icon={<ListAltIcon />} 
                label="Tasks" 
                iconPosition="start"
              />
              <Tab 
                icon={<CalendarMonthIcon />} 
                label="Calendar" 
                iconPosition="start"
              />
              <Tab 
                icon={<AnalyticsIcon />} 
                label="Analytics" 
                iconPosition="start"
              />
            </Tabs>
          </Box>
          
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <IconButton 
              onClick={onToggleDarkMode}
              sx={{ 
                color: 'white',
                bgcolor: 'rgba(255,255,255,0.1)',
                borderRadius: 3,
                padding: 1.5,
                transition: 'all 0.3s ease',
                '&:hover': { 
                  bgcolor: 'rgba(255,255,255,0.2)',
                  transform: 'scale(1.1)'
                }
              }}
            >
              {darkMode ? <LightModeIcon /> : <DarkModeIcon />}
            </IconButton>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <AutoAwesomeIcon sx={{ color: 'white' }} />
              <Typography variant="body2" sx={{ color: 'white', fontWeight: 500 }}>
                Student Time Manager
              </Typography>
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navigation;