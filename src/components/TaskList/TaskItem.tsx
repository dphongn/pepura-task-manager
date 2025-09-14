import { useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  IconButton,
  Box,
  Chip,
  Menu,
  MenuItem,
  Avatar,
  Button
} from '@mui/material';
import { format } from 'date-fns';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import FlagIcon from '@mui/icons-material/Flag';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PendingIcon from '@mui/icons-material/Pending';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import StopIcon from '@mui/icons-material/Stop';
import DeleteIcon from '@mui/icons-material/Delete';
import TimerIcon from '@mui/icons-material/Timer';
import type { Task } from '../../types/Task';
import { useTasks } from '../../hooks/useTasks';

interface TaskItemProps {
  task: Task;
  viewMode?: 'list' | 'grid';
  className?: string;
}

const TaskItem = ({ task, viewMode = 'list', className = '' }: TaskItemProps) => {
  const { updateTask, deleteTask } = useTasks();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [sessionTime, setSessionTime] = useState(0);

  const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleStatusChange = (newStatus: Task['status']) => {
    updateTask({ ...task, status: newStatus });
    handleMenuClose();
  };

  const handleDelete = () => {
    deleteTask(task.id);
    handleMenuClose();
  };

  const startTimer = () => {
    setIsTimerRunning(true);
  };

  const stopTimer = () => {
    setIsTimerRunning(false);
    if (sessionTime > 0) {
      const newActualTime = (task.actualTime || 0) + sessionTime;
      updateTask({ ...task, actualTime: newActualTime });
      setSessionTime(0);
    }
  };

  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };

  const getStatusColor = (status: Task['status']) => {
    switch (status) {
      case 'pending': return '#FFB74D';
      case 'in-progress': return '#64B5F6';  
      case 'completed': return '#81C784';
      default: return '#E0E0E0';
    }
  };

  const getStatusIcon = (status: Task['status']) => {
    switch (status) {
      case 'pending': return <PendingIcon />;
      case 'in-progress': return <PlayArrowIcon />;
      case 'completed': return <CheckCircleIcon />;
      default: return <PendingIcon />;
    }
  };

  const getPriorityColor = (priority: Task['priority']) => {
    switch (priority) {
      case 'high': return '#E57373';
      case 'medium': return '#FFB74D';
      case 'low': return '#81C784';
      default: return '#E0E0E0';
    }
  };

  // Different layouts for list vs grid view
  const isListView = viewMode === 'list';

  return (
    <Card 
      variant="outlined" 
      className={`task-item ${className}`}
      sx={{
        borderRadius: 4,
        border: `2px solid ${getStatusColor(task.status)}20`,
        background: `linear-gradient(135deg, ${getStatusColor(task.status)}08, ${getStatusColor(task.status)}04)`,
        boxShadow: `0 4px 20px ${getStatusColor(task.status)}15`,
        transition: 'all 0.3s ease',
        height: isListView ? 'auto' : 'fit-content',
        minHeight: isListView ? 'auto' : '280px',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: `0 12px 35px ${getStatusColor(task.status)}25`,
          border: `2px solid ${getStatusColor(task.status)}40`,
        }
      }}
    >
      <CardContent sx={{ p: isListView ? 3 : 2, height: '100%', display: 'flex', flexDirection: 'column' }}>
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'flex-start',
          flexDirection: isListView ? 'row' : 'column',
          gap: isListView ? 0 : 2,
          flex: 1
        }}>
          <Box sx={{ flex: 1, width: '100%' }}>
            <Box sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: 2, 
              mb: 2,
              flexDirection: isListView ? 'row' : 'column',
              textAlign: isListView ? 'left' : 'center'
            }}>
              <Avatar sx={{ 
                bgcolor: getStatusColor(task.status), 
                width: isListView ? 32 : 40, 
                height: isListView ? 32 : 40,
                fontSize: '0.875rem',
                alignSelf: isListView ? 'flex-start' : 'center'
              }}>
                {getStatusIcon(task.status)}
              </Avatar>
              <Box sx={{ flex: 1, textAlign: isListView ? 'left' : 'center' }}>
                <Typography 
                  variant={isListView ? "h6" : "subtitle1"} 
                  component="h3" 
                  sx={{ 
                    fontWeight: 600,
                    fontSize: isListView ? '1.125rem' : '1rem',
                    lineHeight: 1.2,
                    mb: isListView ? 0 : 1
                  }}
                >
                  {task.title}
                </Typography>
                {!isListView && (
                  <Chip 
                    icon={<FlagIcon />}
                    label={task.priority} 
                    size="small" 
                    sx={{ 
                      bgcolor: getPriorityColor(task.priority),
                      color: 'white',
                      fontWeight: 500,
                      borderRadius: 3,
                      mt: 1
                    }}
                  />
                )}
              </Box>
              {isListView && (
                <Chip 
                  icon={<FlagIcon />}
                  label={task.priority} 
                  size="small" 
                  sx={{ 
                    bgcolor: getPriorityColor(task.priority),
                    color: 'white',
                    fontWeight: 500,
                    borderRadius: 3
                  }}
                />
              )}
            </Box>
            
            <Typography 
              color="text.secondary" 
              sx={{ 
                mb: 2,
                fontSize: isListView ? '0.875rem' : '0.8rem',
                lineHeight: 1.4,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                display: '-webkit-box',
                WebkitLineClamp: isListView ? 2 : 3,
                WebkitBoxOrient: 'vertical',
                textAlign: isListView ? 'left' : 'center'
              }}
            >
              {task.description}
            </Typography>
            
            <Box sx={{ 
              display: 'flex', 
              gap: 1, 
              alignItems: 'center', 
              flexWrap: 'wrap', 
              mb: 2,
              justifyContent: isListView ? 'flex-start' : 'center',
              flexDirection: isListView ? 'row' : 'column'
            }}>
              <Box sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: 0.5,
                mb: isListView ? 0 : 1
              }}>
                <AccessTimeIcon fontSize="small" sx={{ color: 'primary.main' }} />
                <Typography 
                  variant="body2" 
                  color="text.secondary"
                  sx={{ fontSize: isListView ? '0.8rem' : '0.75rem' }}
                >
                  Due: {format(new Date(task.dueDate), 'MM/dd/yyyy HH:mm')}
                </Typography>
              </Box>
              
              <Box sx={{ 
                display: 'flex', 
                gap: 1, 
                flexWrap: 'wrap',
                justifyContent: isListView ? 'flex-start' : 'center'
              }}>
                <Chip 
                  label={task.status} 
                  size="small" 
                  sx={{ 
                    bgcolor: getStatusColor(task.status),
                    color: 'white',
                    fontWeight: 500,
                    borderRadius: 3,
                    fontSize: '0.7rem',
                    height: 20
                  }}
                />
                
                {task.estimatedTime > 0 && (
                  <Chip 
                    label={`${formatTime(task.estimatedTime)} est.`}
                    size="small" 
                    variant="outlined"
                    sx={{ 
                      borderColor: 'primary.main', 
                      color: 'primary.main',
                      fontSize: '0.7rem',
                      height: 20
                    }}
                  />
                )}

                {task.actualTime && task.actualTime > 0 && (
                  <Chip 
                    icon={<TimerIcon sx={{ fontSize: '0.7rem' }} />}
                    label={`${formatTime(task.actualTime)} spent`}
                    size="small" 
                    sx={{ 
                      bgcolor: 'success.main', 
                      color: 'white',
                      borderRadius: 3,
                      fontSize: '0.7rem',
                      height: 20,
                      '& .MuiChip-icon': {
                        fontSize: '0.7rem'
                      }
                    }}
                  />
                )}
              </Box>
            </Box>

            {/* Time Tracking Controls */}
            {task.status !== 'completed' && (
              <Box sx={{ 
                display: 'flex', 
                gap: 1, 
                alignItems: 'center', 
                mt: 'auto',
                justifyContent: isListView ? 'flex-start' : 'center',
                flexDirection: isListView ? 'row' : 'column'
              }}>
                <Button
                  size="small"
                  variant={isTimerRunning ? "outlined" : "contained"}
                  onClick={isTimerRunning ? stopTimer : startTimer}
                  startIcon={isTimerRunning ? <StopIcon /> : <PlayArrowIcon />}
                  sx={{ 
                    borderRadius: 3,
                    fontSize: '0.7rem',
                    px: 1.5,
                    py: 0.5,
                    minWidth: isListView ? 'auto' : '120px'
                  }}
                >
                  {isTimerRunning ? 'Stop' : 'Start'}
                </Button>
                
                {sessionTime > 0 && (
                  <Chip 
                    label={`+${formatTime(sessionTime)}`}
                    size="small"
                    color="info"
                    sx={{ 
                      fontSize: '0.7rem',
                      height: 20
                    }}
                  />
                )}
              </Box>
            )}
          </Box>
          
          <IconButton 
            onClick={handleMenuOpen}
            sx={{ 
              bgcolor: 'rgba(78, 205, 196, 0.1)',
              alignSelf: isListView ? 'flex-start' : 'flex-end',
              position: isListView ? 'static' : 'absolute',
              top: isListView ? 'auto' : 8,
              right: isListView ? 'auto' : 8,
              '&:hover': { bgcolor: 'rgba(78, 205, 196, 0.2)' }
            }}
          >
            <MoreVertIcon />
          </IconButton>
        </Box>
      </CardContent>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        PaperProps={{
          sx: { borderRadius: 2, minWidth: 200 }
        }}
      >
        <MenuItem onClick={() => handleStatusChange('pending')} sx={{ gap: 1 }}>
          <PendingIcon fontSize="small" />
          Mark as Pending
        </MenuItem>
        <MenuItem onClick={() => handleStatusChange('in-progress')} sx={{ gap: 1 }}>
          <PlayArrowIcon fontSize="small" />
          Mark In Progress
        </MenuItem>
        <MenuItem onClick={() => handleStatusChange('completed')} sx={{ gap: 1 }}>
          <CheckCircleIcon fontSize="small" />
          Mark Completed
        </MenuItem>
        <MenuItem onClick={handleDelete} sx={{ gap: 1, color: 'error.main' }}>
          <DeleteIcon fontSize="small" />
          Delete
        </MenuItem>
      </Menu>
    </Card>
  );
};

export default TaskItem;