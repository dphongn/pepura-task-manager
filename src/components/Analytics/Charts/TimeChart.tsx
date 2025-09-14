import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import type { Task } from '../../../types/Task';

interface TimeChartProps {
  tasks: Task[];
}

const TimeChart = ({ tasks }: TimeChartProps) => {
  const completedTasks = tasks.filter(task => task.status === 'completed' && task.actualTime);

  const data = completedTasks.slice(0, 5).map(task => ({
    name: task.title.length > 15 ? task.title.substring(0, 15) + '...' : task.title,
    estimated: Math.round(task.estimatedTime / 60 * 10) / 10,
    actual: Math.round((task.actualTime || 0) / 60 * 10) / 10,
  }));

  if (data.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '40px' }}>
        No completed tasks with time data
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(128,128,128,0.3)" />
        <XAxis 
          dataKey="name" 
          tick={{ fontSize: 12 }}
          stroke="currentColor"
        />
        <YAxis 
          tick={{ fontSize: 12 }}
          stroke="currentColor"
        />
        <Tooltip 
          contentStyle={{
            backgroundColor: 'rgba(255,255,255,0.95)',
            border: '1px solid #ccc',
            borderRadius: '8px',
            color: '#333'
          }}
        />
        <Bar dataKey="estimated" fill="#ffa726" name="Estimated (hours)" radius={[4, 4, 0, 0]} />
        <Bar dataKey="actual" fill="#42a5f5" name="Actual (hours)" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default TimeChart;