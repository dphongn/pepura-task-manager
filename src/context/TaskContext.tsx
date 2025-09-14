import React, { createContext, useState, useEffect, useCallback } from 'react';
import type { Task, TaskFilter, TaskSort } from '../types/Task';
import { saveTasks, loadTasks } from '../utils/localStorage';
import { generateId } from '../utils/uuid';

interface TaskContextType {
  tasks: Task[];
  filteredTasks: Task[];
  filter: TaskFilter;
  sort: TaskSort;
  isLoading: boolean;
  error: string | null;
  
  // CRUD operations
  addTask: (task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateTask: (task: Task) => void;
  deleteTask: (id: string) => void;
  
  // Bulk operations
  deleteMultipleTasks: (ids: string[]) => void;
  markTasksComplete: (ids: string[]) => void;
  
  // Filter and sort
  setFilter: (filter: TaskFilter) => void;
  setSort: (sort: TaskSort) => void;
  clearFilter: () => void;
  
  // Statistics
  getTaskStats: () => TaskStats;
}

interface TaskStats {
  total: number;
  pending: number;
  inProgress: number;
  completed: number;
  overdue: number;
  dueToday: number;
  dueTomorrow: number;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export { TaskContext };

export const TaskProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<TaskFilter>({});
  const [sort, setSort] = useState<TaskSort>({ field: 'dueDate', direction: 'asc' });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load tasks from localStorage on mount
  useEffect(() => {
    try {
      const savedTasks = loadTasks();
      
      // If no saved tasks, add some sample tasks for testing
      if (savedTasks.length === 0) {
        const today = new Date();
        const sampleTasks: Task[] = [
          {
            id: 'sample-1',
            title: 'Complete Project Proposal',
            description: 'Finalize the project proposal for the client meeting',
            dueDate: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 10, 0), // 10 AM today
            status: 'completed',
            estimatedTime: 120, // 2 hours
            actualTime: 135, // 2 hours 15 minutes
            createdAt: new Date(),
            updatedAt: new Date(),
            priority: 'high'
          },
          {
            id: 'sample-2',
            title: 'Review Marketing Strategy',
            description: 'Analyze current marketing campaigns and suggest improvements',
            dueDate: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 15, 30), // 3:30 PM today
            status: 'in-progress',
            estimatedTime: 90, // 1.5 hours
            actualTime: 45, // 45 minutes so far
            createdAt: new Date(),
            updatedAt: new Date(),
            priority: 'medium'
          },
          {
            id: 'sample-3',
            title: 'Update Website Content',
            description: 'Refresh blog posts and update product information',
            dueDate: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1, 9, 0), // 9 AM tomorrow
            status: 'pending',
            estimatedTime: 180, // 3 hours
            createdAt: new Date(),
            updatedAt: new Date(),
            priority: 'low'
          },
          {
            id: 'sample-4',
            title: 'Team Meeting Preparation',
            description: 'Prepare agenda and materials for weekly team meeting',
            dueDate: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 14, 0), // 2 PM today
            status: 'completed',
            estimatedTime: 30, // 30 minutes
            actualTime: 40, // 40 minutes
            createdAt: new Date(),
            updatedAt: new Date(),
            priority: 'medium'
          },
          {
            id: 'sample-5',
            title: 'Code Review',
            description: 'Review pull requests and provide feedback to team members',
            dueDate: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 16, 0), // 4 PM today
            status: 'in-progress',
            estimatedTime: 60, // 1 hour
            actualTime: 25, // 25 minutes so far
            createdAt: new Date(),
            updatedAt: new Date(),
            priority: 'high'
          }
        ];
        setTasks(sampleTasks);
        setIsLoading(false);
        return;
      }
      
      // Convert date strings back to Date objects
      const tasksWithDates = savedTasks.map(task => ({
        ...task,
        dueDate: new Date(task.dueDate),
        createdAt: new Date(task.createdAt),
        updatedAt: new Date(task.updatedAt)
      }));
      setTasks(tasksWithDates);
      setIsLoading(false);
    } catch (error) {
      console.error('Failed to load tasks:', error);
      setError('Failed to load tasks');
      setIsLoading(false);
    }
  }, []);

  // Save tasks to localStorage whenever tasks change
  useEffect(() => {
    if (!isLoading) {
      saveTasks(tasks);
    }
  }, [tasks, isLoading]);

  // Filter and sort tasks
  const applyFilterAndSort = useCallback(() => {
    let filtered = [...tasks];

    // Apply filters
    if (filter.status && filter.status.length > 0) {
      filtered = filtered.filter(task => filter.status!.includes(task.status));
    }

    if (filter.priority && filter.priority.length > 0) {
      filtered = filtered.filter(task => filter.priority!.includes(task.priority));
    }

    if (filter.category && filter.category.length > 0) {
      filtered = filtered.filter(task => 
        task.category && filter.category!.includes(task.category)
      );
    }

    if (filter.tags && filter.tags.length > 0) {
      filtered = filtered.filter(task => 
        task.tags && task.tags.some(tag => filter.tags!.includes(tag))
      );
    }

    if (filter.dateRange) {
      filtered = filtered.filter(task => 
        task.dueDate >= filter.dateRange!.start && 
        task.dueDate <= filter.dateRange!.end
      );
    }

    if (filter.overdue) {
      const now = new Date();
      filtered = filtered.filter(task => task.dueDate < now && task.status !== 'completed');
    }

    // Apply sorting
    filtered.sort((a, b) => {
      const aValue = a[sort.field];
      const bValue = b[sort.field];
      
      // Handle undefined values
      if (aValue === undefined && bValue === undefined) return 0;
      if (aValue === undefined) return sort.direction === 'asc' ? 1 : -1;
      if (bValue === undefined) return sort.direction === 'asc' ? -1 : 1;
      
      // Handle Date objects
      if (aValue instanceof Date && bValue instanceof Date) {
        const diff = aValue.getTime() - bValue.getTime();
        return sort.direction === 'asc' ? diff : -diff;
      }
      
      // Handle strings and numbers
      if (aValue < bValue) return sort.direction === 'asc' ? -1 : 1;
      if (aValue > bValue) return sort.direction === 'asc' ? 1 : -1;
      return 0;
    });

    setFilteredTasks(filtered);
  }, [tasks, filter, sort]);

  useEffect(() => {
    applyFilterAndSort();
  }, [applyFilterAndSort]);

  // CRUD operations
  const addTask = useCallback((taskData: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newTask: Task = {
      ...taskData,
      id: generateId(),
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    setTasks(prev => [...prev, newTask]);
  }, []);

  const updateTask = useCallback((updatedTask: Task) => {
    setTasks(prev => prev.map(task => 
      task.id === updatedTask.id 
        ? { ...updatedTask, updatedAt: new Date() }
        : task
    ));
  }, []);

  const deleteTask = useCallback((id: string) => {
    setTasks(prev => prev.filter(task => task.id !== id));
  }, []);

  const deleteMultipleTasks = useCallback((ids: string[]) => {
    setTasks(prev => prev.filter(task => !ids.includes(task.id)));
  }, []);

  const markTasksComplete = useCallback((ids: string[]) => {
    setTasks(prev => prev.map(task => 
      ids.includes(task.id) 
        ? { ...task, status: 'completed' as const, updatedAt: new Date() }
        : task
    ));
  }, []);

  const clearFilter = useCallback(() => {
    setFilter({});
  }, []);

  const getTaskStats = useCallback((): TaskStats => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    return {
      total: tasks.length,
      pending: tasks.filter(task => task.status === 'pending').length,
      inProgress: tasks.filter(task => task.status === 'in-progress').length,
      completed: tasks.filter(task => task.status === 'completed').length,
      overdue: tasks.filter(task => 
        task.dueDate < now && task.status !== 'completed'
      ).length,
      dueToday: tasks.filter(task => 
        task.dueDate >= today && task.dueDate < tomorrow
      ).length,
      dueTomorrow: tasks.filter(task => {
        const dayAfterTomorrow = new Date(tomorrow);
        dayAfterTomorrow.setDate(dayAfterTomorrow.getDate() + 1);
        return task.dueDate >= tomorrow && task.dueDate < dayAfterTomorrow;
      }).length
    };
  }, [tasks]);

  const value: TaskContextType = {
    tasks,
    filteredTasks,
    filter,
    sort,
    isLoading,
    error,
    addTask,
    updateTask,
    deleteTask,
    deleteMultipleTasks,
    markTasksComplete,
    setFilter,
    setSort,
    clearFilter,
    getTaskStats
  };

  return (
    <TaskContext.Provider value={value}>
      {children}
    </TaskContext.Provider>
  );
};