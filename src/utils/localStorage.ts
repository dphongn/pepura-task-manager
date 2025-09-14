import type { Task } from '../types/Task';

const STORAGE_KEYS = {
  TASKS: 'student-time-manager-tasks',
  USER_PREFERENCES: 'student-time-manager-preferences',
  ANALYTICS_DATA: 'student-time-manager-analytics'
} as const;

export interface UserPreferences {
  theme: 'light' | 'dark';
  defaultView: 'tasks' | 'calendar' | 'analytics';
  notifications: boolean;
  workingHours: {
    start: string;
    end: string;
  };
}

export interface AnalyticsData {
  completionHistory: Array<{
    date: string;
    completed: number;
    total: number;
  }>;
  procrastinationCoefficient: number;
  averageCompletionTime: number;
}

// Generic localStorage functions
export const getFromStorage = <T>(key: string): T | null => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  } catch (error) {
    console.error(`Error reading from localStorage key "${key}":`, error);
    return null;
  }
};

export const saveToStorage = <T>(key: string, data: T): boolean => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
    return true;
  } catch (error) {
    console.error(`Error saving to localStorage key "${key}":`, error);
    return false;
  }
};

export const removeFromStorage = (key: string): boolean => {
  try {
    localStorage.removeItem(key);
    return true;
  } catch (error) {
    console.error(`Error removing from localStorage key "${key}":`, error);
    return false;
  }
};

export const clearAllStorage = (): boolean => {
  try {
    Object.values(STORAGE_KEYS).forEach(key => {
      localStorage.removeItem(key);
    });
    return true;
  } catch (error) {
    console.error('Error clearing localStorage:', error);
    return false;
  }
};

// Task-specific functions
export const saveTasks = (tasks: Task[]): boolean => {
  return saveToStorage(STORAGE_KEYS.TASKS, tasks);
};

export const loadTasks = (): Task[] => {
  const tasks = getFromStorage<Task[]>(STORAGE_KEYS.TASKS);
  return tasks || [];
};

export const saveTask = (task: Task): boolean => {
  const tasks = loadTasks();
  const existingIndex = tasks.findIndex(t => t.id === task.id);
  
  if (existingIndex >= 0) {
    tasks[existingIndex] = task;
  } else {
    tasks.push(task);
  }
  
  return saveTasks(tasks);
};

export const deleteTask = (taskId: string): boolean => {
  const tasks = loadTasks();
  const filteredTasks = tasks.filter(task => task.id !== taskId);
  return saveTasks(filteredTasks);
};

// User preferences functions
export const saveUserPreferences = (preferences: UserPreferences): boolean => {
  return saveToStorage(STORAGE_KEYS.USER_PREFERENCES, preferences);
};

export const loadUserPreferences = (): UserPreferences => {
  const preferences = getFromStorage<UserPreferences>(STORAGE_KEYS.USER_PREFERENCES);
  return preferences || {
    theme: 'light',
    defaultView: 'tasks',
    notifications: true,
    workingHours: {
      start: '09:00',
      end: '17:00'
    }
  };
};

// Analytics data functions
export const saveAnalyticsData = (data: AnalyticsData): boolean => {
  return saveToStorage(STORAGE_KEYS.ANALYTICS_DATA, data);
};

export const loadAnalyticsData = (): AnalyticsData => {
  const data = getFromStorage<AnalyticsData>(STORAGE_KEYS.ANALYTICS_DATA);
  return data || {
    completionHistory: [],
    procrastinationCoefficient: 1.0,
    averageCompletionTime: 0
  };
};

// Backup and restore functions
export const exportData = (): string => {
  const data = {
    tasks: loadTasks(),
    preferences: loadUserPreferences(),
    analytics: loadAnalyticsData(),
    exportDate: new Date().toISOString()
  };
  return JSON.stringify(data, null, 2);
};

export const importData = (jsonString: string): boolean => {
  try {
    const data = JSON.parse(jsonString);
    
    if (data.tasks) {
      saveTasks(data.tasks);
    }
    if (data.preferences) {
      saveUserPreferences(data.preferences);
    }
    if (data.analytics) {
      saveAnalyticsData(data.analytics);
    }
    
    return true;
  } catch (error) {
    console.error('Error importing data:', error);
    return false;
  }
};

// Storage size utilities
export const getStorageSize = (): number => {
  let total = 0;
  for (const key in localStorage) {
    if (Object.prototype.hasOwnProperty.call(localStorage, key)) {
      total += localStorage[key].length;
    }
  }
  return total;
};

export const getStorageInfo = () => {
  const tasks = loadTasks();
  const preferences = loadUserPreferences();
  const analytics = loadAnalyticsData();
  
  return {
    tasksCount: tasks.length,
    storageSize: getStorageSize(),
    lastUpdated: new Date().toISOString(),
    hasPreferences: !!preferences,
    hasAnalytics: !!analytics
  };
};