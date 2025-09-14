export const generateId = (): string => {
  return 'task_' + Math.random().toString(36).substr(2, 9) + '_' + Date.now().toString(36);
};