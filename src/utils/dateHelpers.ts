import { format, isToday, isTomorrow, isYesterday, differenceInDays, addDays, startOfDay, endOfDay } from 'date-fns';

export const formatDate = (date: Date | string): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return format(dateObj, 'MM/dd/yyyy');
};

export const formatDateTime = (date: Date | string): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return format(dateObj, 'MM/dd/yyyy HH:mm');
};

export const formatTime = (date: Date | string): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return format(dateObj, 'HH:mm');
};

export const getRelativeDate = (date: Date | string): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  if (isToday(dateObj)) {
    return 'Today';
  }
  if (isTomorrow(dateObj)) {
    return 'Tomorrow';
  }
  if (isYesterday(dateObj)) {
    return 'Yesterday';
  }
  
  const daysDiff = differenceInDays(dateObj, new Date());
  if (daysDiff > 0 && daysDiff <= 7) {
    return `In ${daysDiff} days`;
  }
  if (daysDiff < 0 && daysDiff >= -7) {
    return `${Math.abs(daysDiff)} days ago`;
  }
  
  return formatDate(dateObj);
};

export const isOverdue = (date: Date | string): boolean => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return dateObj < new Date();
};

export const isDueToday = (date: Date | string): boolean => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return isToday(dateObj);
};

export const isDueTomorrow = (date: Date | string): boolean => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return isTomorrow(dateObj);
};

export const getDaysUntilDue = (date: Date | string): number => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return differenceInDays(dateObj, new Date());
};

export const getDateRange = (startDate: Date, endDate: Date): Date[] => {
  const dates: Date[] = [];
  let currentDate = startOfDay(startDate);
  const end = endOfDay(endDate);
  
  while (currentDate <= end) {
    dates.push(new Date(currentDate));
    currentDate = addDays(currentDate, 1);
  }
  
  return dates;
};

export const formatDuration = (minutes: number): string => {
  if (minutes < 60) {
    return `${minutes}m`;
  }
  
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  
  if (remainingMinutes === 0) {
    return `${hours}h`;
  }
  
  return `${hours}h ${remainingMinutes}m`;
};

export const getTimeSlots = (startHour: number = 0, endHour: number = 23): string[] => {
  const slots: string[] = [];
  for (let hour = startHour; hour <= endHour; hour++) {
    slots.push(format(new Date().setHours(hour, 0), 'HH:mm'));
  }
  return slots;
};