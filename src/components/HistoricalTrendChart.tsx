import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const mockHistoricalData = [
  { day: 'Mon', efficiency: 78, usage: 120 },
  { day: 'Tue', efficiency: 82, usage: 110 },
  { day: 'Wed', efficiency: 85, usage: 105 },
  { day: 'Thu', efficiency: 75, usage: 130 },
  { day: 'Fri', efficiency: 88, usage: 98 },
  { day: 'Sat', efficiency: 92, usage: 85 },
  { day: 'Sun', efficiency: 90, usage: 90 }
];

export const HistoricalTrendChart = ({ isDarkMode, activeHouseName }: { isDarkMode: boolean, activeHouseName: string }) => {
  return (
    <div className={`p-6 rounded-2xl border mb-8 ${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'} shadow-sm`}>
      <h3 className="text-lg font-bold mb-4 font-display">
        Historical Energy Efficiency Trends (Past Week) - {activeHouseName}
      </h3>
      <div className="h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={mockHistoricalData}>
            <CartesianGrid strokeDasharray="3 3" stroke={isDarkMode ? '#334155' : '#e2e8f0'} />
            <XAxis dataKey="day" stroke={isDarkMode ? '#94a3b8' : '#64748b'} />
            <YAxis stroke={isDarkMode ? '#94a3b8' : '#64748b'} />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: isDarkMode ? '#1e293b' : '#ffffff',
                borderColor: isDarkMode ? '#334155' : '#e2e8f0',
                color: isDarkMode ? '#f8fafc' : '#0f172a'
              }}
            />
            <Legend />
            <Line type="monotone" dataKey="efficiency" stroke="#10b981" strokeWidth={3} name="Efficiency Score" />
            <Line type="monotone" dataKey="usage" stroke="#3b82f6" strokeWidth={3} name="Usage (kWh)" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
