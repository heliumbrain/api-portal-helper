
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { PageHeader } from '@/components/layout/PageHeader';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MetricCard } from '@/components/analytics/MetricCard';
import { ApiUsageChart } from '@/components/analytics/ApiUsageChart';
import { Badge } from '@/components/ui/badge';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { mockApis, generateApiUsageData, apiEndpointUsage } from '@/data/mockData';
import { ArrowLeft, Activity, Users, RefreshCw, Clock, BookOpen, Code, BarChart } from 'lucide-react';

const ApiDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const api = mockApis.find(api => api.id === id);
  const usageData = generateApiUsageData(30);
  
  if (!api) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium">API Not Found</h3>
        <Link to="/apis">
          <Button variant="link" className="mt-2">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to API Catalog
          </Button>
        </Link>
      </div>
    );
  }
  
  const statusColor = {
    active: 'bg-green-100 text-green-800 hover:bg-green-200',
    deprecated: 'bg-red-100 text-red-800 hover:bg-red-200',
    beta: 'bg-amber-100 text-amber-800 hover:bg-amber-200',
  };

  return (
    <>
      <PageHeader
        title={
          <div className="flex items-center">
            <Link to="/apis">
              <Button variant="ghost" size="icon" className="mr-2 p-1">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            {api.name}
          </div>
        }
        description={
          <div className="flex items-center gap-2 mt-1">
            <Badge className={statusColor[api.status]} variant="outline">
              {api.status.charAt(0).toUpperCase() + api.status.slice(1)}
            </Badge>
            <span className="text-sm text-muted-foreground">v{api.version}</span>
            <span className="text-sm text-muted-foreground">·</span>
            <Badge variant="outline" className="bg-secondary text-secondary-foreground">
              {api.category}
            </Badge>
          </div>
        }
        actions={
          <Button>
            <Code className="mr-2 h-4 w-4" />
            Try API
          </Button>
        }
      />

      <Tabs defaultValue="overview" className="mb-6">
        <TabsList>
          <TabsTrigger value="overview">
            <BookOpen className="mr-2 h-4 w-4" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="documentation">
            <Code className="mr-2 h-4 w-4" />
            Documentation
          </TabsTrigger>
          <TabsTrigger value="analytics">
            <BarChart className="mr-2 h-4 w-4" />
            Analytics
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>API Description</CardTitle>
              </CardHeader>
              <CardContent>
                <p>{api.description}</p>
              </CardContent>
            </Card>
            
            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
              <MetricCard
                title="API Calls / Day"
                value={api.callsLastDay.toLocaleString()}
                icon={<Activity size={20} />}
              />
              <MetricCard
                title="Active Users"
                value={api.activeUsers}
                icon={<Users size={20} />}
              />
              <MetricCard
                title="Avg Response Time"
                value="185ms"
                icon={<Clock size={20} />}
              />
              <MetricCard
                title="Error Rate"
                value="0.48%"
                icon={<RefreshCw size={20} />}
              />
            </div>
            
            <ApiUsageChart
              title="API Usage"
              description="API calls over time"
              data={usageData}
            />
          </div>
        </TabsContent>
        
        <TabsContent value="documentation">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>API Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <p>{api.documentation?.overview}</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Endpoints</CardTitle>
                <CardDescription>Available API endpoints and methods</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4">Endpoint</th>
                        <th className="text-left py-3 px-4">Method</th>
                        <th className="text-left py-3 px-4">Description</th>
                      </tr>
                    </thead>
                    <tbody>
                      {api.documentation?.endpoints.map((endpoint, index) => (
                        <tr 
                          key={index} 
                          className="border-b hover:bg-muted/50 transition-colors"
                        >
                          <td className="py-3 px-4 font-mono text-sm">{endpoint.path}</td>
                          <td className="py-3 px-4">
                            <Badge 
                              variant="outline"
                              className={
                                endpoint.method === 'GET' 
                                  ? 'bg-blue-100 text-blue-800 border-blue-200' 
                                  : endpoint.method === 'POST'
                                  ? 'bg-green-100 text-green-800 border-green-200'
                                  : endpoint.method === 'PUT'
                                  ? 'bg-amber-100 text-amber-800 border-amber-200'
                                  : 'bg-red-100 text-red-800 border-red-200'
                              }
                            >
                              {endpoint.method}
                            </Badge>
                          </td>
                          <td className="py-3 px-4">{endpoint.description}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="analytics">
          <div className="space-y-6">
            <ApiUsageChart
              title="API Usage"
              description="API calls over time"
              data={usageData}
            />
            
            <Card>
              <CardHeader>
                <CardTitle>Endpoint Usage</CardTitle>
                <CardDescription>Usage statistics by endpoint</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4">Endpoint</th>
                        <th className="text-left py-3 px-4">Method</th>
                        <th className="text-left py-3 px-4">Calls / Day</th>
                        <th className="text-left py-3 px-4">Avg Response Time</th>
                        <th className="text-left py-3 px-4">Error Rate</th>
                      </tr>
                    </thead>
                    <tbody>
                      {apiEndpointUsage.map((endpoint, index) => (
                        <tr 
                          key={index} 
                          className="border-b hover:bg-muted/50 transition-colors"
                        >
                          <td className="py-3 px-4 font-mono text-sm">{endpoint.endpoint}</td>
                          <td className="py-3 px-4">
                            <Badge 
                              variant="outline"
                              className={
                                endpoint.method === 'GET' 
                                  ? 'bg-blue-100 text-blue-800 border-blue-200' 
                                  : endpoint.method === 'POST'
                                  ? 'bg-green-100 text-green-800 border-green-200'
                                  : endpoint.method === 'PUT'
                                  ? 'bg-amber-100 text-amber-800 border-amber-200'
                                  : 'bg-red-100 text-red-800 border-red-200'
                              }
                            >
                              {endpoint.method}
                            </Badge>
                          </td>
                          <td className="py-3 px-4">{endpoint.callsLastDay.toLocaleString()}</td>
                          <td className="py-3 px-4">{endpoint.avgResponseTime}</td>
                          <td className="py-3 px-4">{endpoint.errorRate}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </>
  );
};

export default ApiDetail;
