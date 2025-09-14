export interface Task {
  id: string;
  title: string;
  description: string;
  dueDate: Date;
  status: 'pending' | 'in-progress' | 'completed';
  estimatedTime: number; // in minutes
  actualTime?: number; // in minutes
  createdAt: Date;
  updatedAt: Date;
  priority: 'low' | 'medium' | 'high';
  category?: string;
  tags?: string[];
  subtasks?: SubTask[];
}

export interface SubTask {
  id: string;
  title: string;
  completed: boolean;
  createdAt: Date;
}

export interface TaskFilter {
  status?: Task['status'][];
  priority?: Task['priority'][];
  category?: string[];
  tags?: string[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  overdue?: boolean;
}

export interface TaskSort {
  field: keyof Task;
  direction: 'asc' | 'desc';
}

export type TaskStatus = Task['status'];
export type TaskPriority = Task['priority'];