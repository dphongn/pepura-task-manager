import { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Stack,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Typography
} from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers';
import AddTaskIcon from '@mui/icons-material/AddTask';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import DescriptionIcon from '@mui/icons-material/Description';
import { useTasks } from '../../hooks/useTasks';

interface TaskFormProps {
  open: boolean;
  onClose: () => void;
}

const TaskForm = ({ open, onClose }: TaskFormProps) => {
  const { addTask } = useTasks();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState<Date | null>(null);
  const [estimatedTime, setEstimatedTime] = useState('');
  const [priority, setPriority] = useState<'low' | 'medium' | 'high'>('medium');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !dueDate) return;

    addTask({
      title,
      description,
      dueDate,
      estimatedTime: Number(estimatedTime) || 0,
      status: 'pending',
      priority
    });

    // Reset form
    setTitle('');
    setDescription('');
    setDueDate(null);
    setEstimatedTime('');
    setPriority('medium');
    onClose();
  };

  return (
    <Dialog 
      open={open} 
      onClose={onClose} 
      maxWidth="sm" 
      fullWidth
      PaperProps={{
        sx: { borderRadius: 4, p: 1 }
      }}
    >
      <form onSubmit={handleSubmit}>
        <DialogTitle sx={{ pb: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <AddTaskIcon sx={{ color: 'primary.main', fontSize: 32 }} />
            <Typography variant="h5" sx={{ fontWeight: 600, color: 'text.primary' }}>
              Add New Task
            </Typography>
          </Box>
        </DialogTitle>
        
        <DialogContent sx={{ pt: 2 }}>
          <Stack spacing={3} sx={{ mt: 1 }}>
            <TextField
              label="Task Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              fullWidth
              variant="outlined"
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 3
                }
              }}
            />
            
            <TextField
              label="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              multiline
              rows={3}
              fullWidth
              variant="outlined"
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 3
                }
              }}
              InputProps={{
                startAdornment: (
                  <Box sx={{ mr: 1, color: 'text.secondary', alignSelf: 'flex-start', mt: 1 }}>
                    <DescriptionIcon />
                  </Box>
                )
              }}
            />
            
            <Box sx={{ display: 'flex', gap: 2 }}>
              <DateTimePicker
                label="Due Date"
                value={dueDate}
                onChange={(newValue) => setDueDate(newValue)}
                sx={{ 
                  flex: 1,
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 3,
                  },
                  '& .MuiInputAdornment-root': {
                    '& .MuiIconButton-root': {
                      borderRadius: 2,
                    }
                  }
                }}
              />
              
              <FormControl sx={{ flex: 1 }}>
                <InputLabel>Priority</InputLabel>
                <Select
                  value={priority}
                  label="Priority"
                  onChange={(e) => setPriority(e.target.value as 'low' | 'medium' | 'high')}
                  sx={{ 
                    borderRadius: 3,
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderRadius: 3,
                    }
                  }}
                >
                  <MenuItem value="low">
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <PriorityHighIcon sx={{ color: '#81C784' }} />
                      Low
                    </Box>
                  </MenuItem>
                  <MenuItem value="medium">
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <PriorityHighIcon sx={{ color: '#FFB74D' }} />
                      Medium
                    </Box>
                  </MenuItem>
                  <MenuItem value="high">
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <PriorityHighIcon sx={{ color: '#E57373' }} />
                      High
                    </Box>
                  </MenuItem>
                </Select>
              </FormControl>
            </Box>
            
            <TextField
              label="Estimated Time (minutes)"
              type="number"
              value={estimatedTime}
              onChange={(e) => setEstimatedTime(e.target.value)}
              fullWidth
              variant="outlined"
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 3
                }
              }}
              InputProps={{
                startAdornment: (
                  <Box sx={{ mr: 1, color: 'text.secondary' }}>
                    <AccessTimeIcon />
                  </Box>
                )
              }}
            />
          </Stack>
        </DialogContent>
        
        <DialogActions sx={{ p: 3, gap: 1 }}>
          <Button 
            onClick={onClose}
            sx={{ 
              borderRadius: 3,
              px: 3,
              color: 'text.secondary'
            }}
          >
            Cancel
          </Button>
          <Button 
            type="submit" 
            variant="contained"
            sx={{ 
              borderRadius: 3,
              px: 4,
              background: 'linear-gradient(135deg, #4ECDC4 0%, #A8E6CF 100%)',
              '&:hover': {
                background: 'linear-gradient(135deg, #3BA89C 0%, #8FD4A7 100%)'
              }
            }}
          >
            Add Task
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default TaskForm;