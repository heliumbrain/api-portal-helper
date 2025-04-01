
import React from 'react';
import { PageHeader } from '@/components/layout/PageHeader';
import { MetricCard } from '@/components/analytics/MetricCard';
import { ApiUsageChart } from '@/components/analytics/ApiUsageChart';
import { ApiCard, ApiCardProps } from '@/components/apis/ApiCard';
import { Button } from '@/components/ui/button';
import { dashboardMetrics, generateApiUsageData, mockApis } from '@/data/mockData';
import { Activity, Users, AlertCircle, Clock, PlusSquare } from 'lucide-react';
import { Link } from 'react-router-dom';

const Dashboard: React.FC = () => {
  const usageData = generateApiUsageData(30);
  const topApis = mockApis.slice(0, 3) as unknown as ApiCardProps[];

  return (
    <>
      <PageHeader
        title="API Developer Portal"
        description="Monitor your APIs performance and usage"
        actions={
          <Link to="/apis">
            <Button>
              <PlusSquare className="mr-2 h-4 w-4" />
              Browse APIs
            </Button>
          </Link>
        }
      />

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

      {/* Top APIs */}
      <h2 className="text-xl font-semibold mb-4">Top APIs</h2>
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mb-6">
        {topApis.map((api) => (
          <Link key={api.id} to={`/apis/${api.id}`}>
            <ApiCard {...api} />
          </Link>
        ))}
      </div>
    </>
  );
};

export default Dashboard;
