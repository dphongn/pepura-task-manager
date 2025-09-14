import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import type { Task } from '../../../types/Task';

interface StatusChartProps {
  tasks: Task[];
}

const StatusChart = ({ tasks }: StatusChartProps) => {
  const statusCounts = tasks.reduce((acc, task) => {
    acc[task.status] = (acc[task.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const data = [
    { name: 'Pending', value: statusCounts.pending || 0 },
    { name: 'In Progress', value: statusCounts['in-progress'] || 0 },
    { name: 'Completed', value: statusCounts.completed || 0 },
  ];

  const COLORS = ['#ffa726', '#42a5f5', '#66bb6a'];

  if (tasks.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '40px' }}>
        No tasks to display
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={({ name, value }) => 
            (typeof value === 'number' && value > 0) ? `${name}: ${value}` : ''
          }
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
        >
          {data.map((_, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip 
          formatter={(value, name) => [value, name]}
          labelStyle={{ color: '#2E3A59' }}
        />
        <Legend 
          verticalAlign="bottom" 
          height={36}
          iconType="circle"
        />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default StatusChart;