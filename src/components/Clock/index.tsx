import { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  IconButton,
  Button,
  ButtonGroup,
  Card,
  CardContent,
  LinearProgress,
  Chip,
  Stack,
  useTheme,
  alpha
} from '@mui/material';
import {
  PlayArrow,
  Pause,
  Stop,
  RestartAlt,
  Timer,
  Schedule,
  AccessTime,
  VisibilityOff
} from '@mui/icons-material';
import { format } from 'date-fns';
import { useTasks } from '../../hooks/useTasks';
import './styles.css';

interface ClockProps {
  taskTitle?: string;
  estimatedTime?: number; // in minutes
  onTimeUpdate?: (timeInMinutes: number) => void;
  showTaskTimer?: boolean;
  compact?: boolean;
}

type ClockMode = 'analog' | 'digital' | 'timer';

const Clock: React.FC<ClockProps> = ({
  taskTitle,
  estimatedTime = 0,
  onTimeUpdate,
  showTaskTimer = false,
  compact = false
}) => {
  const theme = useTheme();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [mode, setMode] = useState<ClockMode>('digital');
  const [isVisible, setIsVisible] = useState(true);
  
  // Get timer state from context
  const { 
    activeTask, 
    timerState, 
    elapsedTime, 
    startTimer, 
    pauseTimer, 
    stopTimer, 
    resetTimer 
  } = useTasks();

  // Use timer values from context
  const timerSeconds = elapsedTime;
  const currentTaskTitle = showTaskTimer ? (activeTask?.title || taskTitle || "Current Focus Session") : taskTitle;

  // Update current time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    // Request notification permission
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission();
    }

    return () => clearInterval(timer);
  }, []);

  // Notification when timer reaches estimated time
  useEffect(() => {
    if (showTaskTimer && activeTask && timerState === 'running' && estimatedTime > 0) {
      const currentMinutes = Math.floor(timerSeconds / 60);
      if (currentMinutes === estimatedTime && timerSeconds % 60 === 0) {
        if ('Notification' in window && Notification.permission === 'granted') {
          new Notification('Task Timer', {
            body: `You've reached your estimated time of ${estimatedTime} minutes!`,
            icon: '/naver-favicon.ico'
          });
        }
      }
    }
  }, [showTaskTimer, activeTask, timerState, estimatedTime, timerSeconds]);

  // Update parent component with time changes
  useEffect(() => {
    if (onTimeUpdate && showTaskTimer) {
      onTimeUpdate(Math.floor(timerSeconds / 60));
    }
  }, [onTimeUpdate, showTaskTimer, timerSeconds]);

  // Debug: Log timer state changes - simplified
  useEffect(() => {
    if (showTaskTimer && activeTask && timerState === 'running') {
      console.log(`Timer: ${formatTime(timerSeconds)} | State: ${timerState} | Task: ${activeTask.title}`);
    }
  }, [timerSeconds]); // Only log when timer actually changes

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (showTaskTimer && activeTask) { // Only enable shortcuts when task timer is active and has active task
        switch (event.code) {
          case 'Space':
            event.preventDefault();
            if (timerState === 'idle' || timerState === 'paused') {
              startTimer(activeTask);
            } else {
              pauseTimer();
            }
            break;
          case 'KeyS':
            if (event.ctrlKey) {
              event.preventDefault();
              stopTimer();
            }
            break;
          case 'KeyR':
            if (event.ctrlKey) {
              event.preventDefault();
              resetTimer();
            }
            break;
        }
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [showTaskTimer, activeTask, timerState, startTimer, pauseTimer, stopTimer, resetTimer]);

  const formatTime = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    if (hours > 0) {
      return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getProgress = (): number => {
    if (!estimatedTime || estimatedTime === 0) return 0;
    return Math.min((timerSeconds / 60) / estimatedTime * 100, 100);
  };

  const getProgressColor = (): 'primary' | 'warning' | 'error' => {
    const progress = getProgress();
    if (progress <= 80) return 'primary';
    if (progress <= 100) return 'warning';
    return 'error';
  };

  // Analog clock component
  const AnalogClock = () => {
    const size = compact ? 120 : 200;
    const centerX = size / 2;
    const centerY = size / 2;
    const radius = size / 2 - 20;

    const hours = currentTime.getHours() % 12;
    const minutes = currentTime.getMinutes();
    const seconds = currentTime.getSeconds();

    const hourAngle = (hours * 30) + (minutes * 0.5) - 90;
    const minuteAngle = (minutes * 6) - 90;
    const secondAngle = (seconds * 6) - 90;

    const hourHandLength = radius * 0.5;
    const minuteHandLength = radius * 0.7;
    const secondHandLength = radius * 0.9;

    return (
      <Box
        className="analog-clock"
        sx={{
          width: size,
          height: size,
          position: 'relative',
          margin: 'auto'
        }}
      >
        <svg width={size} height={size} className="clock-face">
          {/* Clock face */}
          <circle
            cx={centerX}
            cy={centerY}
            r={radius}
            fill="transparent"
            stroke={theme.palette.divider}
            strokeWidth="2"
          />
          
          {/* Hour markers */}
          {Array.from({ length: 12 }, (_, i) => {
            const angle = (i * 30) - 90;
            const outerX = centerX + (radius - 10) * Math.cos(angle * Math.PI / 180);
            const outerY = centerY + (radius - 10) * Math.sin(angle * Math.PI / 180);
            const innerX = centerX + (radius - 20) * Math.cos(angle * Math.PI / 180);
            const innerY = centerY + (radius - 20) * Math.sin(angle * Math.PI / 180);
            
            return (
              <line
                key={i}
                x1={outerX}
                y1={outerY}
                x2={innerX}
                y2={innerY}
                stroke={theme.palette.text.primary}
                strokeWidth="3"
              />
            );
          })}

          {/* Hour hand */}
          <line
            x1={centerX}
            y1={centerY}
            x2={centerX + hourHandLength * Math.cos(hourAngle * Math.PI / 180)}
            y2={centerY + hourHandLength * Math.sin(hourAngle * Math.PI / 180)}
            stroke={theme.palette.primary.main}
            strokeWidth="6"
            strokeLinecap="round"
            className="hour-hand"
          />

          {/* Minute hand */}
          <line
            x1={centerX}
            y1={centerY}
            x2={centerX + minuteHandLength * Math.cos(minuteAngle * Math.PI / 180)}
            y2={centerY + minuteHandLength * Math.sin(minuteAngle * Math.PI / 180)}
            stroke={theme.palette.secondary.main}
            strokeWidth="4"
            strokeLinecap="round"
            className="minute-hand"
          />

          {/* Second hand */}
          <line
            x1={centerX}
            y1={centerY}
            x2={centerX + secondHandLength * Math.cos(secondAngle * Math.PI / 180)}
            y2={centerY + secondHandLength * Math.sin(secondAngle * Math.PI / 180)}
            stroke={theme.palette.error.main}
            strokeWidth="2"
            strokeLinecap="round"
            className="second-hand"
          />

          {/* Center dot */}
          <circle
            cx={centerX}
            cy={centerY}
            r="6"
            fill={theme.palette.primary.main}
          />
        </svg>
      </Box>
    );
  };

  // Digital clock component
  const DigitalClock = () => (
    <Box className="digital-clock" sx={{ textAlign: 'center' }}>
      <Typography
        variant={compact ? "h4" : "h2"}
        sx={{
          fontFamily: 'monospace',
          fontWeight: 'bold',
          background: theme.palette.mode === 'dark'
            ? 'linear-gradient(45deg, #7C4DFF 30%, #536DFE 90%)'
            : 'linear-gradient(45deg, #4ECDC4 30%, #A8E6CF 90%)',
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          textShadow: 'none',
          // Remove glow animation that causes flashing
          animation: 'none'
        }}
      >
        {format(currentTime, 'HH:mm:ss')}
      </Typography>
      <Typography variant="body1" color="text.secondary">
        {format(currentTime, 'EEEE, MMMM do, yyyy')}
      </Typography>
    </Box>
  );

  // Countdown Clock component - shows circular countdown when timer is running
  const CountdownClock = ({ size = 200 }: { size?: number }) => {
    const progress = estimatedTime > 0 ? Math.min((timerSeconds / (estimatedTime * 60)) * 100, 100) : 0;
    const circumference = 2 * Math.PI * (size / 2 - 10);
    // For countdown: circle should show remaining time (starts full, empties as time runs out)
    const remainingProgress = 100 - progress;
    const strokeDashoffset = circumference * (1 - remainingProgress / 100);
    
    // Calculate remaining time for countdown display
    const remainingSeconds = estimatedTime > 0 ? Math.max(0, (estimatedTime * 60) - timerSeconds) : 0;
    const isOvertime = timerSeconds > (estimatedTime * 60);
    
    return (
      <Box
        sx={{
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: size,
          height: size,
          margin: '0 auto',
          mb: 2
        }}
      >
        {/* Background circle - full circle */}
        <svg
          width={size}
          height={size}
          style={{ position: 'absolute', transform: 'rotate(-90deg)' }}
        >
          <circle
            cx={size / 2}
            cy={size / 2}
            r={size / 2 - 10}
            stroke={alpha(theme.palette.primary.main, 0.1)}
            strokeWidth="8"
            fill="transparent"
          />
          {/* Countdown circle - shows remaining time */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={size / 2 - 10}
            stroke={
              isOvertime
                ? theme.palette.error.main
                : timerState === 'running'
                ? theme.palette.primary.main
                : timerState === 'paused'
                ? theme.palette.warning.main
                : theme.palette.text.disabled
            }
            strokeWidth="8"
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            style={{
              transition: 'stroke-dashoffset 0.1s linear, stroke 0.3s ease',
              filter: timerState === 'running' 
                ? `drop-shadow(0 0 8px ${isOvertime ? theme.palette.error.main : theme.palette.primary.main}60)` 
                : 'none'
            }}
          />
          
          {/* Animated pulse ring when running */}
          {timerState === 'running' && (
            <circle
              cx={size / 2}
              cy={size / 2}
              r={size / 2 - 5}
              stroke={alpha(isOvertime ? theme.palette.error.main : theme.palette.primary.main, 0.3)}
              strokeWidth="2"
              fill="transparent"
              style={{
                animation: 'pulse 2s ease-in-out infinite'
              }}
            />
          )}
        </svg>
        
        {/* Center content */}
        <Box
          sx={{
            position: 'absolute',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center'
          }}
        >
          <Typography
            variant="h3"
            sx={{
              fontFamily: 'monospace',
              fontWeight: 'bold',
              color: isOvertime
                ? 'error.main'
                : timerState === 'running' 
                ? 'primary.main' 
                : timerState === 'paused' 
                ? 'warning.main' 
                : 'text.primary',
              textShadow: timerState === 'running' 
                ? `0 0 16px ${isOvertime ? theme.palette.error.main : theme.palette.primary.main}40` 
                : 'none',
              transition: 'color 0.3s ease, text-shadow 0.3s ease',
              lineHeight: 1,
              mb: 0.5,
              animation: timerState === 'running' ? 'glow 2s ease-in-out infinite alternate' : 'none'
            }}
          >
            {formatTime(timerSeconds)}
          </Typography>
          <Typography 
            variant="caption" 
            color={isOvertime ? "error" : "text.secondary"}
            sx={{ 
              fontSize: '0.75rem',
              opacity: 0.8,
              fontWeight: isOvertime ? 600 : 400
            }}
          >
            {isOvertime ? `+${formatTime(timerSeconds - (estimatedTime * 60))} overtime` : `${formatTime(remainingSeconds)} left`}
          </Typography>
          {estimatedTime > 0 && (
            <Typography 
              variant="caption" 
              color="text.secondary"
              sx={{ 
                fontSize: '0.7rem',
                opacity: 0.6 
              }}
            >
              / {estimatedTime}min goal • {progress.toFixed(1)}%
            </Typography>
          )}
        </Box>
      </Box>
    );
  };

  // Timer component
  const TimerDisplay = () => (
    <Box 
      className={`timer-display ${timerState === 'running' ? 'timer-running' : timerState === 'paused' ? 'timer-paused' : ''}`} 
      sx={{ 
        textAlign: 'center',
        position: 'relative' // Ensure proper positioning for pseudo-elements
      }}
    >
      {/* Show countdown clock when task is active and has estimated time */}
      {showTaskTimer && activeTask && estimatedTime > 0 ? (
        <CountdownClock size={compact ? 160 : 200} />
      ) : (
        <Typography
          variant={compact ? "h3" : "h1"}
          sx={{
            fontFamily: 'monospace',
            fontWeight: 'bold',
            color: timerState === 'running' 
              ? 'primary.main' 
              : timerState === 'paused' 
              ? 'warning.main' 
              : 'text.primary',
            mb: 2,
            textShadow: timerState === 'running' 
              ? `0 0 20px ${theme.palette.primary.main}40` 
              : 'none',
            transition: 'color 0.3s ease, text-shadow 0.3s ease', // Only animate safe properties
            minHeight: compact ? '2.5rem' : '4rem', // Prevent layout shift
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          {formatTime(timerSeconds)}
        </Typography>
      )}
      
      {showTaskTimer && activeTask && (
        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" color="text.primary" sx={{ mb: 1 }}>
            {currentTaskTitle}
          </Typography>
          {estimatedTime > 0 && (
            <Box sx={{ mb: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="body2" color="text.secondary">
                  Progress
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {Math.floor(timerSeconds / 60)}/{estimatedTime} min 
                  {timerSeconds > 0 && timerState !== 'running' && (
                    <span style={{ opacity: 0.7 }}> (paused)</span>
                  )}
                </Typography>
              </Box>
              <LinearProgress
                variant="determinate"
                value={getProgress()}
                color={getProgressColor()}
                sx={{
                  height: 8,
                  borderRadius: 4,
                  bgcolor: alpha(theme.palette.primary.main, 0.1),
                  '& .MuiLinearProgress-bar': {
                    borderRadius: 4,
                    background: getProgress() > 100 
                      ? `linear-gradient(90deg, ${theme.palette.error.main}, ${theme.palette.error.light})`
                      : getProgress() > 80 
                      ? `linear-gradient(90deg, ${theme.palette.warning.main}, ${theme.palette.warning.light})`
                      : `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.primary.light})`,
                    // Remove animation that causes flashing
                    animation: 'none'
                  }
                }}
              />
            </Box>
          )}
          <Stack direction="row" spacing={1} justifyContent="center" flexWrap="wrap">
            <Chip
              icon={<Schedule />}
              label={`Estimated: ${estimatedTime}min`}
              size="small"
              variant="outlined"
            />
            <Chip
              icon={<Timer />}
              label={timerState}
              size="small"
              color={timerState === 'running' ? 'success' : 'default'}
            />
          </Stack>
          
          {/* Keyboard shortcuts hint */}
          <Typography variant="caption" color="text.secondary" sx={{ mt: 1, opacity: 0.7 }}>
            Shortcuts: Space (Start/Pause) • Ctrl+S (Stop) • Ctrl+R (Reset)
          </Typography>
        </Box>
      )}

      <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%', px: 2 }}>
        <ButtonGroup 
          variant="contained" 
          sx={{ 
            mb: 2,
            width: '100%',
            maxWidth: '400px',
            borderRadius: 3,
            overflow: 'hidden',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
            '& .MuiButton-root': {
              flex: 1,
              minWidth: 0,
              padding: compact ? '8px 12px' : '12px 16px',
              fontSize: compact ? '0.75rem' : '0.875rem',
              fontWeight: 600,
              transition: 'all 0.3s ease',
              border: 'none',
              '&:not(:last-child)': {
                borderRight: '1px solid rgba(255, 255, 255, 0.2)'
              },
              '&:hover': {
                boxShadow: 'inset 0 0 0 2px rgba(255, 255, 255, 0.2)',
                filter: 'brightness(1.1)'
              }
            }
          }}
        >
        {timerState === 'idle' || timerState === 'paused' ? (
          <Button 
            onClick={() => activeTask && startTimer(activeTask)} 
            startIcon={<PlayArrow />}
            color="success"
            sx={{
              background: 'linear-gradient(45deg, #4CAF50 30%, #66BB6A 90%)',
              '&:hover': {
                background: 'linear-gradient(45deg, #388E3C 30%, #4CAF50 90%)',
                transform: 'none'
              }
            }}
          >
            {timerState === 'idle' ? 'Start' : 'Resume'}
          </Button>
        ) : (
          <Button 
            onClick={pauseTimer} 
            startIcon={<Pause />} 
            color="warning"
            sx={{
              background: 'linear-gradient(45deg, #FF9800 30%, #FFB74D 90%)',
              '&:hover': {
                background: 'linear-gradient(45deg, #F57C00 30%, #FF9800 90%)',
                transform: 'none'
              }
            }}
          >
            Pause
          </Button>
        )}
        <Button 
          onClick={stopTimer} 
          startIcon={<Stop />} 
          color="error"
          sx={{
            background: 'linear-gradient(45deg, #F44336 30%, #E57373 90%)',
            '&:hover': {
              background: 'linear-gradient(45deg, #D32F2F 30%, #F44336 90%)',
              transform: 'none'
            }
          }}
        >
          Stop
        </Button>
        <Button 
          onClick={resetTimer} 
          startIcon={<RestartAlt />}
          sx={{
            background: 'linear-gradient(45deg, #2196F3 30%, #64B5F6 90%)',
            color: 'white',
            '&:hover': {
              background: 'linear-gradient(45deg, #1976D2 30%, #2196F3 90%)',
              transform: 'none'
            }
          }}
        >
          Reset
        </Button>
      </ButtonGroup>
      </Box>
    </Box>
  );

  if (!isVisible && !compact) {
    return (
      <IconButton
        onClick={() => setIsVisible(true)}
        sx={{
          position: 'fixed',
          bottom: 24,
          right: 24,
          bgcolor: 'primary.main',
          color: 'white',
          '&:hover': { bgcolor: 'primary.dark' },
          zIndex: 1000
        }}
      >
        <Schedule />
      </IconButton>
    );
  }

  return (
    <Card
      className="clock-container"
      sx={{
        background: theme.palette.mode === 'dark'
          ? 'linear-gradient(135deg, #1A1B3A 0%, #2D1B69 100%)'
          : 'linear-gradient(135deg, #FFFFFF 0%, #F8F9FA 100%)',
        border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
        borderRadius: 4,
        position: compact ? 'relative' : 'sticky',
        top: compact ? 'auto' : 24,
        zIndex: 100,
        boxShadow: theme.palette.mode === 'dark'
          ? '0 8px 32px rgba(124, 77, 255, 0.3)'
          : '0 8px 32px rgba(78, 205, 196, 0.2)',
        backdropFilter: 'blur(10px)',
        overflow: 'visible',
        // Prevent animation conflicts
        transformStyle: 'preserve-3d',
        backfaceVisibility: 'hidden',
        perspective: 1000
      }}
    >
      <CardContent sx={{ 
        p: compact ? 2 : 3,
        minHeight: compact ? 'auto' : '200px', // Ensure consistent height
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
      }}>
        {!compact && (
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Schedule color="primary" />
              Task Timer
            </Typography>
            <Box>
              <IconButton
                size="small"
                onClick={() => setIsVisible(false)}
                sx={{ mr: 1 }}
              >
                <VisibilityOff />
              </IconButton>
            </Box>
          </Box>
        )}

        {!showTaskTimer && mode !== 'timer' && !compact && (
          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
            <ButtonGroup size="small">
              <Button
                variant={mode === 'digital' ? 'contained' : 'outlined'}
                onClick={() => setMode('digital')}
                startIcon={<Schedule />}
              >
                Digital
              </Button>
              <Button
                variant={mode === 'analog' ? 'contained' : 'outlined'}
                onClick={() => setMode('analog')}
                startIcon={<AccessTime />}
              >
                Analog
              </Button>
              <Button
                variant="outlined"
                onClick={() => setMode('timer')}
                startIcon={<Timer />}
              >
                Timer
              </Button>
            </ButtonGroup>
          </Box>
        )}

        {/* Always show timer mode when showTaskTimer is true, or show modes when no active task */}
        {showTaskTimer ? (
          activeTask ? (
            <TimerDisplay />
          ) : (
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h6" sx={{ mb: 2, color: 'text.secondary' }}>
                No active task
              </Typography>
              <DigitalClock />
              <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                Start a task to begin timing
              </Typography>
            </Box>
          )
        ) : mode === 'timer' ? (
          <TimerDisplay />
        ) : mode === 'analog' ? (
          <AnalogClock />
        ) : (
          <DigitalClock />
        )}
      </CardContent>
    </Card>
  );
};

export default Clock;