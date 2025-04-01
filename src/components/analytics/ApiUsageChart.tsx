
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useLayout } from '@/contexts/LayoutContext';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface ApiUsageChartProps {
  title: string;
  description?: string;
  data: Array<{
    name: string;
    value: number;
  }>;
}

export const ApiUsageChart: React.FC<ApiUsageChartProps> = ({ title, description, data }) => {
  const { branding } = useLayout();
  const [timeRange, setTimeRange] = React.useState('7d');

  // Create a style object for the chart with the brand color
  const getHslColor = (hslValue: string, opacity: number = 1) => {
    // Parse the HSL value
    const [h, s, l] = hslValue.split(' ').map((val, index) => {
      return index === 0 ? parseInt(val) : parseInt(val.replace('%', ''));
    });
    
    return `hsla(${h}, ${s}%, ${l}%, ${opacity})`;
  };

  return (
    <Card className="h-full">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <CardTitle>{title}</CardTitle>
          {description && <CardDescription>{description}</CardDescription>}
        </div>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className="w-28">
            <SelectValue placeholder="Select range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="24h">Last 24h</SelectItem>
            <SelectItem value="7d">Last 7 days</SelectItem>
            <SelectItem value="30d">Last 30 days</SelectItem>
            <SelectItem value="90d">Last 90 days</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 10, right: 0, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                <stop 
                  offset="5%" 
                  stopColor={getHslColor(branding.primaryColor, 0.8)} 
                  stopOpacity={0.8} 
                />
                <stop 
                  offset="95%" 
                  stopColor={getHslColor(branding.primaryColor, 0.2)} 
                  stopOpacity={0.2} 
                />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
            <XAxis 
              dataKey="name" 
              tick={{ fontSize: 12 }}
              tickLine={false}
              axisLine={false}
            />
            <YAxis 
              tick={{ fontSize: 12 }}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => (value > 999 ? `${(value / 1000).toFixed(0)}k` : value)}
            />
            <Tooltip 
              formatter={(value: number) => [`${value.toLocaleString()} calls`, 'API Calls']}
              contentStyle={{ 
                borderRadius: '8px', 
                border: '1px solid #f0f0f0',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)'
              }}
            />
            <Area 
              type="monotone" 
              dataKey="value" 
              stroke={getHslColor(branding.primaryColor)} 
              fillOpacity={1}
              fill="url(#colorValue)" 
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};
