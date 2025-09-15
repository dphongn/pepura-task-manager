import { Container, Typography, Paper, Box, Stack, Card, CardContent, LinearProgress, Chip } from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import SpeedIcon from '@mui/icons-material/Speed';
import TargetIcon from '@mui/icons-material/GpsFixed';
import TimeChart from './Charts/TimeChart';
import StatusChart from './Charts/StatusChart';
import { useTasks } from '../../hooks/useTasks';
import './styles.css';

const Analytics = () => {
  const { tasks } = useTasks();

  // Basic metrics
  const completedTasks = tasks.filter(task => task.status === 'completed').length;
  const totalTasks = tasks.length;
  const completionRate = totalTasks > 0 ? (completedTasks / totalTasks * 100).toFixed(1) : 0;

  // Time tracking calculations
  const totalEstimatedTime = tasks.reduce((sum, task) => sum + task.estimatedTime, 0);
  const totalActualTime = tasks.reduce((sum, task) => sum + (task.actualTime || 0), 0);
  const completedTasksWithTime = tasks.filter(task => task.status === 'completed' && task.actualTime);
  
  const averageEstimatedTime = totalTasks > 0 ? Math.round(totalEstimatedTime / totalTasks) : 0;
  const averageActualTime = completedTasksWithTime.length > 0 
    ? Math.round(completedTasksWithTime.reduce((sum, task) => sum + (task.actualTime || 0), 0) / completedTasksWithTime.length)
    : 0;

  const timeAccuracy = totalEstimatedTime > 0 && totalActualTime > 0 
    ? ((1 - Math.abs(totalEstimatedTime - totalActualTime) / totalEstimatedTime) * 100).toFixed(1)
    : 0;

  // Productivity metrics
  const overdueTasksCount = tasks.filter(task => 
    new Date(task.dueDate) < new Date() && task.status !== 'completed'
  ).length;

  const productivityScore = totalTasks > 0 
    ? Math.round(((completedTasks / totalTasks) * 0.6 + 
       (overdueTasksCount === 0 ? 0.4 : (1 - overdueTasksCount / totalTasks) * 0.4)) * 100)
    : 0;

  // Time distribution by priority
  const timeByPriority = {
    high: tasks.filter(t => t.priority === 'high').reduce((sum, t) => sum + t.estimatedTime, 0),
    medium: tasks.filter(t => t.priority === 'medium').reduce((sum, t) => sum + t.estimatedTime, 0),
    low: tasks.filter(t => t.priority === 'low').reduce((sum, t) => sum + t.estimatedTime, 0),
  };

  const formatTime = (minutes: number) => {
    const totalMins = Math.round(minutes); // Round to nearest minute
    const hours = Math.floor(totalMins / 60);
    const mins = totalMins % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };

  return (
    <Container 
      maxWidth={false} 
      sx={{ 
        maxWidth: '100%', 
        width: '100%',
        minHeight: '100%',
        pb: 4  // Add bottom padding for better spacing
      }}
    >
      <Typography 
        variant="h4" 
        component="h1" 
        className="analytics-header"
        sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 2 }}
      >
        <AccessTimeIcon color="primary" sx={{ fontSize: 40 }} />
        Time Tracking Overview
      </Typography>

      <Stack spacing={4}>
        {/* Enhanced Summary Cards */}
        <Box sx={{ 
          display: 'grid', 
          gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: 'repeat(4, 1fr)' },
          gap: 3 
        }}>
          <Card className="analytics-stats-card" sx={{ 
            background: 'linear-gradient(135deg, #64B5F6 0%, #90CAF9 100%)',
            borderRadius: 4,
            boxShadow: '0 8px 24px rgba(100, 181, 246, 0.3)',
          }}>
            <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2, p: 3 }}>
              <AccessTimeIcon sx={{ fontSize: 40, color: 'white' }} />
              <Box>
                <Typography variant="h4" sx={{ color: 'white', fontWeight: 'bold' }}>
                  {formatTime(totalEstimatedTime)}
                </Typography>
                <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.9)' }}>
                  Total Planned Time
                </Typography>
              </Box>
            </CardContent>
          </Card>

          <Card className="analytics-stats-card" sx={{ 
            background: 'linear-gradient(135deg, #81C784 0%, #A5D6A7 100%)',
            borderRadius: 4,
            boxShadow: '0 8px 24px rgba(129, 199, 132, 0.3)',
          }}>
            <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2, p: 3 }}>
              <TrendingUpIcon sx={{ fontSize: 40, color: 'white' }} />
              <Box>
                <Typography variant="h4" sx={{ color: 'white', fontWeight: 'bold' }}>
                  {formatTime(totalActualTime)}
                </Typography>
                <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.9)' }}>
                  Actual Time Spent
                </Typography>
              </Box>
            </CardContent>
          </Card>

          <Card className="analytics-stats-card" sx={{ 
            background: 'linear-gradient(135deg, #FFB74D 0%, #FFCC02 100%)',
            borderRadius: 4,
            boxShadow: '0 8px 24px rgba(255, 183, 77, 0.3)',
          }}>
            <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2, p: 3 }}>
              <TargetIcon sx={{ fontSize: 40, color: 'white' }} />
              <Box>
                <Typography variant="h4" sx={{ color: 'white', fontWeight: 'bold' }}>
                  {timeAccuracy}%
                </Typography>
                <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.9)' }}>
                  Time Accuracy
                </Typography>
              </Box>
            </CardContent>
          </Card>

          <Card className="analytics-stats-card" sx={{ 
            background: 'linear-gradient(135deg, #9C27B0 0%, #BA68C8 100%)',
            borderRadius: 4,
            boxShadow: '0 8px 24px rgba(156, 39, 176, 0.3)',
          }}>
            <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2, p: 3 }}>
              <SpeedIcon sx={{ fontSize: 40, color: 'white' }} />
              <Box>
                <Typography variant="h4" sx={{ color: 'white', fontWeight: 'bold' }}>
                  {productivityScore}%
                </Typography>
                <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.9)' }}>
                  Productivity Score
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Box>

        {/* Time Insights Section */}
        <Box sx={{ 
          display: 'grid', 
          gridTemplateColumns: { xs: '1fr', lg: '2fr 1fr' },
          gap: 3 
        }}>
          <Paper className="analytics-section" sx={{ p: 3, borderRadius: 4 }}>
            <Typography variant="h6" sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 1 }}>
              <AccessTimeIcon color="primary" />
              Time Distribution Insights
            </Typography>
            
            <Stack spacing={3}>
              <Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2" color="text.secondary">Average Estimated Time</Typography>
                  <Typography variant="body2" fontWeight="bold">{formatTime(averageEstimatedTime)}</Typography>
                </Box>
                <LinearProgress 
                  variant="determinate" 
                  value={Math.min((averageEstimatedTime / 120) * 100, 100)} 
                  sx={{ height: 8, borderRadius: 4 }}
                />
              </Box>

              <Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2" color="text.secondary">Average Actual Time</Typography>
                  <Typography variant="body2" fontWeight="bold">{formatTime(averageActualTime)}</Typography>
                </Box>
                <LinearProgress 
                  variant="determinate" 
                  value={Math.min((averageActualTime / 120) * 100, 100)} 
                  color="success"
                  sx={{ height: 8, borderRadius: 4 }}
                />
              </Box>

              <Box>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>Time by Priority</Typography>
                <Stack spacing={2}>
                  <Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Chip label="High" size="small" color="error" />
                        <Typography variant="body2">Priority Tasks</Typography>
                      </Box>
                      <Typography variant="body2" fontWeight="bold">{formatTime(timeByPriority.high)}</Typography>
                    </Box>
                    <LinearProgress 
                      variant="determinate" 
                      value={totalEstimatedTime > 0 ? (timeByPriority.high / totalEstimatedTime) * 100 : 0} 
                      color="error"
                      sx={{ height: 6, borderRadius: 3 }}
                    />
                  </Box>
                  
                  <Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Chip label="Medium" size="small" color="warning" />
                        <Typography variant="body2">Priority Tasks</Typography>
                      </Box>
                      <Typography variant="body2" fontWeight="bold">{formatTime(timeByPriority.medium)}</Typography>
                    </Box>
                    <LinearProgress 
                      variant="determinate" 
                      value={totalEstimatedTime > 0 ? (timeByPriority.medium / totalEstimatedTime) * 100 : 0} 
                      color="warning"
                      sx={{ height: 6, borderRadius: 3 }}
                    />
                  </Box>
                  
                  <Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Chip label="Low" size="small" color="success" />
                        <Typography variant="body2">Priority Tasks</Typography>
                      </Box>
                      <Typography variant="body2" fontWeight="bold">{formatTime(timeByPriority.low)}</Typography>
                    </Box>
                    <LinearProgress 
                      variant="determinate" 
                      value={totalEstimatedTime > 0 ? (timeByPriority.low / totalEstimatedTime) * 100 : 0} 
                      color="success"
                      sx={{ height: 6, borderRadius: 3 }}
                    />
                  </Box>
                </Stack>
              </Box>
            </Stack>
          </Paper>

          <Paper className="analytics-section" sx={{ p: 3, borderRadius: 4 }}>
            <Typography variant="h6" sx={{ mb: 3 }}>
              Quick Stats
            </Typography>
            <Stack spacing={3}>
              <Paper sx={{ p: 2, bgcolor: 'primary.main', color: 'white', borderRadius: 3 }}>
                <Typography variant="body2" sx={{ opacity: 0.9 }}>Tasks Completed</Typography>
                <Typography variant="h5" fontWeight="bold">{completedTasks} / {totalTasks}</Typography>
                <Typography variant="body2" sx={{ opacity: 0.9 }}>({completionRate}% completion rate)</Typography>
              </Paper>
              
              <Paper sx={{ p: 2, bgcolor: overdueTasksCount > 0 ? 'error.main' : 'success.main', color: 'white', borderRadius: 3 }}>
                <Typography variant="body2" sx={{ opacity: 0.9 }}>Overdue Tasks</Typography>
                <Typography variant="h5" fontWeight="bold">{overdueTasksCount}</Typography>
                <Typography variant="body2" sx={{ opacity: 0.9 }}>
                  {overdueTasksCount === 0 ? 'Great job!' : 'Need attention'}
                </Typography>
              </Paper>
              
              <Paper sx={{ p: 2, bgcolor: 'info.main', color: 'white', borderRadius: 3 }}>
                <Typography variant="body2" sx={{ opacity: 0.9 }}>Average Task Duration</Typography>
                <Typography variant="h5" fontWeight="bold">{formatTime(averageEstimatedTime)}</Typography>
                <Typography variant="body2" sx={{ opacity: 0.9 }}>Estimated per task</Typography>
              </Paper>
            </Stack>
          </Paper>
        </Box>

        {/* Charts */}
        <Box sx={{ 
          display: 'grid', 
          gridTemplateColumns: { xs: '1fr', lg: '1fr 1fr' },
          gap: 3 
        }}>
          <Paper className="analytics-chart" sx={{ p: 3, height: 400, borderRadius: 4 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Task Status Distribution
            </Typography>
            <StatusChart tasks={tasks} />
          </Paper>

          <Paper className="analytics-chart" sx={{ p: 3, height: 400, borderRadius: 4 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Time Usage Patterns
            </Typography>
            <TimeChart tasks={tasks} />
          </Paper>
        </Box>
      </Stack>
    </Container>
  );
};

export default Analytics;