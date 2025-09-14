import { useState } from 'react';
import { 
  Container, 
  Paper, 
  Typography,
  Box
} from '@mui/material';
import { DateCalendar } from '@mui/x-date-pickers';
import TaskCalendar from './TaskCalendar';
import { useTasks } from '../../hooks/useTasks';
import './styles.css';

const Calendar = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const { tasks } = useTasks();

  return (
    <Container 
      maxWidth={false} 
      sx={{ 
        maxWidth: '100%', 
        width: '100%', 
        minHeight: '100%',
        p: 2,
        pb: 4  // Add bottom padding for better spacing
      }}
    >
      <Typography 
        variant="h4" 
        component="h1" 
        className="calendar-header"
        sx={{ mb: 3 }}
      >
        Calendar View
      </Typography>
      
      <Box sx={{ 
        display: 'flex', 
        gap: 3, 
        minHeight: 'calc(100vh - 200px)', // Ensure minimum height for content
        flexWrap: { xs: 'wrap', md: 'nowrap' } 
      }}>
        <Paper 
          className="calendar-sidebar-animated"
          sx={{ 
            p: 2, 
            flex: { xs: '1 1 100%', md: '0 0 350px' },
            bgcolor: 'background.paper',
            border: '1px solid',
            borderColor: 'divider',
            borderRadius: 3,
            height: 'fit-content',
            maxHeight: '100%',
            overflow: 'hidden',
            '& .MuiPickersCalendarHeader-root': {
              color: 'text.primary'
            },
            '& .MuiDayCalendar-weekDayLabel': {
              color: 'text.secondary'
            },
            '& .MuiPickersDay-root': {
              color: 'text.primary',
              '&:hover': {
                bgcolor: 'primary.light',
                color: 'primary.contrastText'
              },
              '&.Mui-selected': {
                bgcolor: 'primary.main',
                color: 'primary.contrastText'
              }
            },
            '& .MuiPickersArrowSwitcher-button': {
              color: 'text.primary'
            }
          }}
        >
          <DateCalendar 
            className="calendar-picker"
            value={selectedDate}
            onChange={(newValue) => setSelectedDate(newValue)}
            sx={{
              '& .MuiPickersCalendarHeader-root': {
                color: 'text.primary'
              }
            }}
          />
        </Paper>

        <Paper 
          className="calendar-main-animated"
          sx={{ 
            p: 2, 
            flex: 1,
            bgcolor: 'background.paper',
            border: '1px solid',
            borderColor: 'divider',
            borderRadius: 3,
            height: 'fit-content',
            maxHeight: '100%',
            overflow: 'hidden'
          }}
        >
          <div className="calendar-task-list">
            <TaskCalendar 
              selectedDate={selectedDate} 
              tasks={tasks}
            />
          </div>
        </Paper>
      </Box>
    </Container>
  );
};

export default Calendar;