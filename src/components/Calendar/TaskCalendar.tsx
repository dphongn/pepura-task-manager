import { 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow,
  Typography,
  Chip,
  Tooltip,
  Box,
  Stack
} from '@mui/material';
import { format, isSameDay } from 'date-fns';
import type { Task } from '../../types/Task';

interface TaskCalendarProps {
  selectedDate: Date | null;
  tasks: Task[];
}

const TaskCalendar = ({ selectedDate, tasks }: TaskCalendarProps) => {
  const filteredTasks = tasks.filter(task => 
    selectedDate && isSameDay(new Date(task.dueDate), selectedDate)
  );

  // Generate time slots for full 24-hour format (0-23)
  const timeSlots = Array.from({ length: 24 }, (_, i) => i);

  // Helper function to format time
  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };

  // Helper function to get priority color
  const getPriorityColor = (priority: Task['priority']) => {
    switch (priority) {
      case 'high': return '#f44336';
      case 'medium': return '#ff9800';
      case 'low': return '#4caf50';
      default: return '#2196f3';
    }
  };

  // Helper function to get status color
  const getStatusColor = (status: Task['status']) => {
    switch (status) {
      case 'completed': return '#4caf50';
      case 'in-progress': return '#2196f3';
      case 'pending': return '#ff9800';
      default: return '#757575';
    }
  };

  // Helper function to create tooltip content
  const createTooltipContent = (task: Task) => (
    <Box sx={{ p: 1, maxWidth: 300 }}>
      <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 1, color: 'white' }}>
        {task.title}
      </Typography>
      {task.description && (
        <Typography variant="body2" sx={{ mb: 1, color: 'rgba(255,255,255,0.9)' }}>
          {task.description}
        </Typography>
      )}
      <Stack spacing={0.5}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.7)' }}>
            Status:
          </Typography>
          <Chip 
            label={task.status} 
            size="small" 
            sx={{ 
              height: 16, 
              fontSize: '0.6rem',
              bgcolor: getStatusColor(task.status),
              color: 'white'
            }} 
          />
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.7)' }}>
            Priority:
          </Typography>
          <Chip 
            label={task.priority} 
            size="small" 
            sx={{ 
              height: 16, 
              fontSize: '0.6rem',
              bgcolor: getPriorityColor(task.priority),
              color: 'white'
            }} 
          />
        </Box>
        <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.7)' }}>
          Due: {format(new Date(task.dueDate), 'MM/dd/yyyy hh:mm')}
        </Typography>
        <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.7)' }}>
          Estimated: {formatTime(task.estimatedTime)}
        </Typography>
        {task.actualTime !== undefined && (
          <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.7)' }}>
            Actual: {formatTime(task.actualTime)}
          </Typography>
        )}
        {task.category && (
          <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.7)' }}>
            Category: {task.category}
          </Typography>
        )}
      </Stack>
    </Box>
  );

  return (
    <TableContainer sx={{ 
      bgcolor: 'transparent',
      maxHeight: '600px',
      overflow: 'auto'
    }}>
      <Typography variant="h6" sx={{ mb: 2, color: 'text.primary' }}>
        Tasks for {selectedDate ? format(selectedDate, 'MM/dd/yyyy') : 'Selected Date'}
        {filteredTasks.length > 0 && (
          <Typography component="span" sx={{ ml: 1, fontSize: '0.9rem', color: 'text.secondary' }}>
            ({filteredTasks.length} task{filteredTasks.length !== 1 ? 's' : ''})
          </Typography>
        )}
      </Typography>

      <Table size="small" sx={{ 
        '& .MuiTableCell-root': {
          borderColor: 'divider',
          color: 'text.primary',
          py: 0.5,
          px: 1
        },
        '& .MuiTableHead-root .MuiTableCell-root': {
          bgcolor: 'action.hover',
          fontWeight: 600,
          py: 1
        }
      }}>
        <TableHead>
          <TableRow>
            <TableCell width={80} sx={{ color: 'text.primary', fontSize: '0.875rem' }}>Time</TableCell>
            <TableCell sx={{ color: 'text.primary', fontSize: '0.875rem' }}>Tasks</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {timeSlots.map(hour => {
            const tasksAtHour = filteredTasks.filter(task => 
              new Date(task.dueDate).getHours() === hour
            );

            return (
              <TableRow 
                key={hour}
                sx={{ 
                  '&:nth-of-type(odd)': { 
                    bgcolor: 'action.hover' 
                  },
                  '&:hover': {
                    bgcolor: 'action.focus'
                  },
                  height: '40px'
                }}
              >
                <TableCell sx={{ color: 'text.secondary', fontSize: '0.8rem' }}>
                  {format(new Date().setHours(hour, 0), 'hh:mm aa')}
                </TableCell>
                <TableCell sx={{ py: 0.5 }}>
                  {tasksAtHour.map(task => (
                    <Tooltip
                      key={task.id}
                      title={createTooltipContent(task)}
                      placement="right"
                      arrow
                      enterDelay={300}
                      leaveDelay={200}
                      componentsProps={{
                        tooltip: {
                          sx: {
                            bgcolor: 'rgba(0, 0, 0, 0.9)',
                            maxWidth: 350,
                            borderRadius: 2,
                            boxShadow: '0 8px 24px rgba(0,0,0,0.3)'
                          }
                        },
                        arrow: {
                          sx: {
                            color: 'rgba(0, 0, 0, 0.9)'
                          }
                        }
                      }}
                    >
                      <Chip
                        label={task.title}
                        color={task.status === 'completed' ? 'success' : 'primary'}
                        size="small"
                        variant={task.status === 'completed' ? 'filled' : 'outlined'}
                        sx={{ 
                          mr: 0.5, 
                          mb: 0.5,
                          height: '20px',
                          fontSize: '0.7rem',
                          cursor: 'help',
                          transition: 'all 0.2s ease',
                          '&:hover': {
                            transform: 'scale(1.05)',
                            boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
                          },
                          '& .MuiChip-label': {
                            fontWeight: 500,
                            px: 0.5
                          }
                        }}
                      />
                    </Tooltip>
                  ))}
                  {tasksAtHour.length === 0 && (
                    <Typography variant="body2" color="text.disabled" fontStyle="italic" sx={{ fontSize: '0.75rem' }}>
                      No tasks scheduled
                    </Typography>
                  )}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TaskCalendar;