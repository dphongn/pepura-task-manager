import { useState } from 'react';
import { 
  Box, 
  Paper, 
  Typography, 
  Button, 
  Stack,
  Container,
  Card,
  CardContent,
  IconButton,
  Tooltip,
  Menu,
  MenuItem,
  Chip,
  TextField,
  InputAdornment,
  Divider,
  Checkbox,
  ListItemText
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import FilterListIcon from '@mui/icons-material/FilterList';
import ViewListIcon from '@mui/icons-material/ViewList';
import GridViewIcon from '@mui/icons-material/GridView';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import TaskForm from './TaskForm';
import TaskItem from './TaskItem';
import { useTasks } from '../../hooks/useTasks';
import type { Task } from '../../types/Task';
import Clock from '../Clock';
import './styles.css';

const TaskList = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');
  const [filterAnchorEl, setFilterAnchorEl] = useState<null | HTMLElement>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<Task['status'][]>([]);
  const [priorityFilter, setPriorityFilter] = useState<Task['priority'][]>([]);
  const [showOverdue, setShowOverdue] = useState(false);
  
  const { tasks, getTaskStats, activeTask } = useTasks();
  const stats = getTaskStats();

  // Filter tasks based on current filters
  const filteredTasks = tasks.filter(task => {
    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      const matchesTitle = task.title.toLowerCase().includes(query);
      const matchesDescription = task.description.toLowerCase().includes(query);
      if (!matchesTitle && !matchesDescription) return false;
    }

    // Status filter
    if (statusFilter.length > 0 && !statusFilter.includes(task.status)) {
      return false;
    }

    // Priority filter
    if (priorityFilter.length > 0 && !priorityFilter.includes(task.priority)) {
      return false;
    }

    // Overdue filter
    if (showOverdue) {
      const isOverdue = new Date(task.dueDate) < new Date() && task.status !== 'completed';
      if (!isOverdue) return false;
    }

    return true;
  });

  const handleFilterMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setFilterAnchorEl(event.currentTarget);
  };

  const handleFilterMenuClose = () => {
    setFilterAnchorEl(null);
  };

  const handleStatusFilterChange = (status: Task['status']) => {
    setStatusFilter(prev => 
      prev.includes(status) 
        ? prev.filter(s => s !== status)
        : [...prev, status]
    );
  };

  const handlePriorityFilterChange = (priority: Task['priority']) => {
    setPriorityFilter(prev => 
      prev.includes(priority) 
        ? prev.filter(p => p !== priority)
        : [...prev, priority]
    );
  };

  const clearAllFilters = () => {
    setSearchQuery('');
    setStatusFilter([]);
    setPriorityFilter([]);
    setShowOverdue(false);
  };

  const hasActiveFilters = searchQuery || statusFilter.length > 0 || priorityFilter.length > 0 || showOverdue;

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
      <Box sx={{ display: 'flex', gap: 3 }}>
        {/* Main Content */}
        <Box sx={{ flex: 1 }}>
          <Stack spacing={4}>
            {/* Header Section */}
            <Box 
              className="task-header-animated"
              sx={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                background: (theme) => theme.palette.mode === 'dark' 
                  ? 'linear-gradient(135deg, #2D1B69 0%, #0F0C29 100%)'
                  : 'linear-gradient(135deg, #4ECDC4 0%, #A8E6CF 100%)',
                borderRadius: 3,
                p: 3,
                color: 'white'
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <AutoAwesomeIcon sx={{ fontSize: 40 }} />
                <Box>
                  <Typography variant="h4" component="h1" sx={{ color: 'white', mb: 1 }}>
                    My Tasks
                  </Typography>
                  <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.9)' }}>
                    Manage your daily productivity
                  </Typography>
                </Box>
              </Box>
              <Box sx={{ display: 'flex', gap: 2 }}>
                <Tooltip title="Filter tasks">
                  <IconButton 
                    sx={{ 
                      color: 'white',
                      bgcolor: hasActiveFilters ? 'rgba(255,255,255,0.3)' : 'transparent',
                      '&:hover': { bgcolor: 'rgba(255,255,255,0.2)' }
                    }}
                    onClick={handleFilterMenuOpen}
                  >
                    <FilterListIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title={viewMode === 'list' ? 'Grid view' : 'List view'}>
                  <IconButton 
                    sx={{ color: 'white' }}
                    onClick={() => setViewMode(viewMode === 'list' ? 'grid' : 'list')}
                  >
                    {viewMode === 'list' ? <GridViewIcon /> : <ViewListIcon />}
                  </IconButton>
                </Tooltip>
                <Button 
                  variant="contained" 
                  startIcon={<AddIcon />}
                  onClick={() => setIsFormOpen(true)}
                  sx={{ 
                    bgcolor: 'rgba(255,255,255,0.2)', 
                    color: 'white',
                    '&:hover': { bgcolor: 'rgba(255,255,255,0.3)' }
                  }}
                >
                  Add Task
                </Button>
              </Box>
            </Box>

            {/* Stats Cards */}
            <Box sx={{ 
              display: 'grid', 
              gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: 'repeat(4, 1fr)' },
              gap: 3 
            }}>
              <Card 
                className="task-stats-card"
                sx={{ 
                  background: 'linear-gradient(135deg, #81C784 0%, #A5D6A7 100%)',
                  borderRadius: 4,
                  boxShadow: '0 8px 24px rgba(129, 199, 132, 0.3)',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: '0 12px 32px rgba(129, 199, 132, 0.4)'
                  }
                }}
              >
                <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2, p: 3 }}>
                  <TaskAltIcon sx={{ fontSize: 40, color: 'white' }} />
                  <Box>
                    <Typography variant="h4" sx={{ color: 'white', fontWeight: 'bold' }}>
                      {stats.total}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.9)' }}>
                      Total Tasks
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
              <Card 
                className="task-stats-card"
                sx={{ 
                  background: 'linear-gradient(135deg, #FFB74D 0%, #FFCC02 100%)',
                  borderRadius: 4,
                  boxShadow: '0 8px 24px rgba(255, 183, 77, 0.3)',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: '0 12px 32px rgba(255, 183, 77, 0.4)'
                  }
                }}
              >
                <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2, p: 3 }}>
                  <PendingActionsIcon sx={{ fontSize: 40, color: 'white' }} />
                  <Box>
                    <Typography variant="h4" sx={{ color: 'white', fontWeight: 'bold' }}>
                      {stats.pending + stats.inProgress}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.9)' }}>
                      In Progress
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
              <Card 
                className="task-stats-card"
                sx={{ 
                  background: 'linear-gradient(135deg, #64B5F6 0%, #90CAF9 100%)',
                  borderRadius: 4,
                  boxShadow: '0 8px 24px rgba(100, 181, 246, 0.3)',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: '0 12px 32px rgba(100, 181, 246, 0.4)'
                  }
                }}
              >
                <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2, p: 3 }}>
                  <TaskAltIcon sx={{ fontSize: 40, color: 'white' }} />
                  <Box>
                    <Typography variant="h4" sx={{ color: 'white', fontWeight: 'bold' }}>
                      {stats.completed}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.9)' }}>
                      Completed
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
              <Card 
                className="task-stats-card"
                sx={{ 
                  background: 'linear-gradient(135deg, #E57373 0%, #EF9A9A 100%)',
                  borderRadius: 4,
                  boxShadow: '0 8px 24px rgba(229, 115, 115, 0.3)',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: '0 12px 32px rgba(229, 115, 115, 0.4)'
                  }
                }}
              >
                <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2, p: 3 }}>
                  <PendingActionsIcon sx={{ fontSize: 40, color: 'white' }} />
                  <Box>
                    <Typography variant="h4" sx={{ color: 'white', fontWeight: 'bold' }}>
                      {stats.overdue}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.9)' }}>
                      Overdue
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Box>

            {/* Search and Filters */}
            <Paper 
              className="task-search-section"
              elevation={0} 
              sx={{ p: 2, borderRadius: 3, border: '1px solid rgba(78, 205, 196, 0.2)' }}
            >
              <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap' }}>
                <TextField
                  placeholder="Search tasks..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  size="small"
                  sx={{ minWidth: 250, flex: 1 }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon color="action" />
                      </InputAdornment>
                    ),
                    endAdornment: searchQuery && (
                      <InputAdornment position="end">
                        <IconButton size="small" onClick={() => setSearchQuery('')}>
                          <ClearIcon />
                        </IconButton>
                      </InputAdornment>
                    ),
                    sx: { borderRadius: 3 }
                  }}
                />
                
                {hasActiveFilters && (
                  <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', flexWrap: 'wrap' }}>
                    {statusFilter.map(status => (
                      <Chip
                        key={status}
                        label={`Status: ${status}`}
                        onDelete={() => handleStatusFilterChange(status)}
                        size="small"
                        color="primary"
                        variant="outlined"
                      />
                    ))}
                    {priorityFilter.map(priority => (
                      <Chip
                        key={priority}
                        label={`Priority: ${priority}`}
                        onDelete={() => handlePriorityFilterChange(priority)}
                        size="small"
                        color="secondary"
                        variant="outlined"
                      />
                    ))}
                    {showOverdue && (
                      <Chip
                        label="Overdue only"
                        onDelete={() => setShowOverdue(false)}
                        size="small"
                        color="error"
                        variant="outlined"
                      />
                    )}
                    <Button size="small" onClick={clearAllFilters} startIcon={<ClearIcon />}>
                      Clear All
                    </Button>
                  </Box>
                )}
                
                <Typography variant="body2" color="text.secondary">
                  {filteredTasks.length} of {tasks.length} tasks
                </Typography>
              </Box>
            </Paper>

            {/* Task List */}
            <Paper 
              className="task-list-section"
              elevation={0} 
              sx={{ p: 3, borderRadius: 4, border: '1px solid rgba(78, 205, 196, 0.2)' }}
            >
              {filteredTasks.length === 0 ? (
                <Box sx={{ textAlign: 'center', py: 8 }}>
                  <AutoAwesomeIcon sx={{ fontSize: 80, color: 'primary.main', mb: 2 }} />
                  <Typography variant="h6" color="text.secondary" sx={{ mb: 1 }}>
                    {hasActiveFilters ? 'No tasks match your filters' : 'No tasks yet. Add your first task!'}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {hasActiveFilters ? 'Try adjusting your search or filters' : 'Start organizing your day with your first task'}
                  </Typography>
                  {hasActiveFilters && (
                    <Button sx={{ mt: 2 }} onClick={clearAllFilters}>
                      Clear Filters
                    </Button>
                  )}
                </Box>
              ) : (
                <Box sx={{
                  display: viewMode === 'grid' ? 'grid' : 'flex',
                  gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' },
                  flexDirection: viewMode === 'list' ? 'column' : undefined,
                  gap: 2
                }}>
                  {filteredTasks.map((task) => (
                    <TaskItem key={task.id} task={task} viewMode={viewMode} className="task-item-animated" />
                  ))}
                </Box>
              )}
            </Paper>

            {/* Filter Menu */}
            <Menu
              anchorEl={filterAnchorEl}
              open={Boolean(filterAnchorEl)}
              onClose={handleFilterMenuClose}
              PaperProps={{
                sx: { 
                  borderRadius: 2, 
                  minWidth: 250,
                  maxHeight: 400
                }
              }}
            >
              <Box sx={{ p: 2, pb: 1 }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 1 }}>
                  Filter Tasks
                </Typography>
                
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                  Status
                </Typography>
                {(['pending', 'in-progress', 'completed'] as Task['status'][]).map(status => (
                  <MenuItem 
                    key={status} 
                    onClick={() => handleStatusFilterChange(status)}
                    sx={{ py: 0.5 }}
                  >
                    <Checkbox 
                      checked={statusFilter.includes(status)} 
                      size="small"
                    />
                    <ListItemText primary={status} />
                  </MenuItem>
                ))}
                
                <Divider sx={{ my: 1 }} />
                
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                  Priority
                </Typography>
                {(['high', 'medium', 'low'] as Task['priority'][]).map(priority => (
                  <MenuItem 
                    key={priority} 
                    onClick={() => handlePriorityFilterChange(priority)}
                    sx={{ py: 0.5 }}
                  >
                    <Checkbox 
                      checked={priorityFilter.includes(priority)} 
                      size="small"
                    />
                    <ListItemText primary={priority} />
                  </MenuItem>
                ))}
                
                <Divider sx={{ my: 1 }} />
                
                <MenuItem onClick={() => setShowOverdue(!showOverdue)} sx={{ py: 0.5 }}>
                  <Checkbox checked={showOverdue} size="small" />
                  <ListItemText primary="Overdue tasks only" />
                </MenuItem>
                
                {hasActiveFilters && (
                  <>
                    <Divider sx={{ my: 1 }} />
                    <MenuItem onClick={clearAllFilters} sx={{ justifyContent: 'center' }}>
                      <Button size="small" startIcon={<ClearIcon />}>
                        Clear All Filters
                      </Button>
                    </MenuItem>
                  </>
                )}
              </Box>
            </Menu>
          </Stack>
        </Box>

        {/* Sidebar with Clock */}
        <Box sx={{ 
          width: { xs: '100%', lg: 320 },
          position: { xs: 'relative', lg: 'sticky' },
          top: { xs: 'auto', lg: 24 },
          height: 'fit-content',
          display: { xs: 'none', md: 'block' }
        }}>
          <Clock 
            showTaskTimer={true}
            taskTitle={activeTask?.title || "No active task"}
            estimatedTime={activeTask?.estimatedTime || 60}
            onTimeUpdate={(time) => {
              console.log('Time updated:', time);
            }}
          />
        </Box>
      </Box>

      <TaskForm 
        open={isFormOpen}
        onClose={() => setIsFormOpen(false)}
      />
    </Container>
  );
};

export default TaskList;