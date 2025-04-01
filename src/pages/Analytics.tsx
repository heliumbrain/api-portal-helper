
import React, { useState } from 'react';
import { PageHeader } from '@/components/layout/PageHeader';
import { MetricCard } from '@/components/analytics/MetricCard';
import { ApiUsageChart } from '@/components/analytics/ApiUsageChart';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  CardDescription
} from '@/components/ui/card';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  generateApiUsageData, 
  dashboardMetrics, 
  mockApis,
  apiEndpointUsage
} from '@/data/mockData';
import { Activity, Users, AlertCircle, Clock, Download } from 'lucide-react';

const Analytics: React.FC = () => {
  const [timeRange, setTimeRange] = useState('30d');
  const [selectedApi, setSelectedApi] = useState('all');
  
  const usageData = generateApiUsageData(30);
  
  return (
    <>
      <PageHeader
        title="Analytics"
        description="Monitor your API usage and performance metrics"
        actions={
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export Data
          </Button>
        }
      />
      
      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className="w-36">
            <SelectValue placeholder="Time Range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="24h">Last 24 hours</SelectItem>
            <SelectItem value="7d">Last 7 days</SelectItem>
            <SelectItem value="30d">Last 30 days</SelectItem>
            <SelectItem value="90d">Last 90 days</SelectItem>
          </SelectContent>
        </Select>
        
        <Select value={selectedApi} onValueChange={setSelectedApi}>
          <SelectTrigger className="w-48 sm:w-64">
            <SelectValue placeholder="Select API" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All APIs</SelectItem>
            {mockApis.map(api => (
              <SelectItem key={api.id} value={api.id}>{api.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Metrics Overview */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 mb-6">
        <MetricCard
          title="Total API Calls"
          value={dashboardMetrics.totalApiCalls.value}
          description={dashboardMetrics.totalApiCalls.description}
          trend={dashboardMetrics.totalApiCalls.trend}
          icon={<Activity size={20} />}
        />
        <MetricCard
          title="Active Users"
          value={dashboardMetrics.activeUsers.value}
          description={dashboardMetrics.activeUsers.description}
          trend={dashboardMetrics.activeUsers.trend}
          icon={<Users size={20} />}
        />
        <MetricCard
          title="Error Rate"
          value={dashboardMetrics.errorRate.value}
          description={dashboardMetrics.errorRate.description}
          trend={dashboardMetrics.errorRate.trend}
          icon={<AlertCircle size={20} />}
        />
        <MetricCard
          title="Avg Response Time"
          value={dashboardMetrics.avgResponseTime.value}
          description={dashboardMetrics.avgResponseTime.description}
          trend={dashboardMetrics.avgResponseTime.trend}
          icon={<Clock size={20} />}
        />
      </div>

      {/* API Usage Chart */}
      <div className="mb-6">
        <ApiUsageChart
          title="API Usage"
          description="Total API calls over time"
          data={usageData}
        />
      </div>
      
      {/* Top APIs by Usage */}
      <div className="grid gap-6 grid-cols-1 lg:grid-cols-2 mb-6">
        <Card>
          <CardHeader>
            <CardTitle>Top APIs by Usage</CardTitle>
            <CardDescription>Most used APIs in the selected period</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockApis.slice(0, 5).map(api => (
                <div key={api.id} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Badge
                      variant="outline"
                      className={
                        api.status === 'active' 
                          ? 'bg-green-100 text-green-800 border-green-200' 
                          : api.status === 'beta'
                          ? 'bg-amber-100 text-amber-800 border-amber-200'
                          : 'bg-red-100 text-red-800 border-red-200'
                      }
                    >
                      {api.status}
                    </Badge>
                    <span className="ml-2 font-medium">{api.name}</span>
                  </div>
                  <div className="text-brand font-medium">
                    {api.callsLastDay.toLocaleString()} calls/day
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Error Rates by API</CardTitle>
            <CardDescription>APIs with highest error rates</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockApis.slice(0, 5).map((api, index) => {
                // Generate mock error rates that decrease as we go down the list
                const errorRate = (0.8 - index * 0.15).toFixed(2);
                
                return (
                  <div key={api.id} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <span className="font-medium">{api.name}</span>
                    </div>
                    <div className={Number(errorRate) > 0.5 ? 'text-red-600 font-medium' : 'text-amber-600 font-medium'}>
                      {errorRate}%
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default Analytics;
