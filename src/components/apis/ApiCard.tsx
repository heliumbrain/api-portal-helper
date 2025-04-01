
import React from 'react';
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Activity, Clock, Users } from 'lucide-react';

export interface ApiCardProps {
  id: string;
  name: string;
  description: string;
  version: string;
  status: 'active' | 'deprecated' | 'beta';
  category: string;
  lastUpdated: string;
  callsLastDay: number;
  activeUsers: number;
}

export const ApiCard: React.FC<ApiCardProps> = ({
  id,
  name,
  description,
  version,
  status,
  category,
  lastUpdated,
  callsLastDay,
  activeUsers,
}) => {
  const statusColor = {
    active: 'bg-green-100 text-green-800 hover:bg-green-200',
    deprecated: 'bg-red-100 text-red-800 hover:bg-red-200',
    beta: 'bg-amber-100 text-amber-800 hover:bg-amber-200',
  };

  const formatNumber = (num: number) => {
    return num > 999 ? `${(num / 1000).toFixed(1)}k` : num;
  };

  return (
    <Card className="api-card h-full">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-xl font-bold">{name}</CardTitle>
            <CardDescription className="text-sm mt-1">v{version}</CardDescription>
          </div>
          <Badge className={statusColor[status]} variant="outline">
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground line-clamp-2 h-10">{description}</p>
        
        <div className="flex items-center mt-3 space-x-4">
          <div className="flex items-center text-sm text-muted-foreground">
            <Activity size={16} className="mr-1 text-brand" />
            <span>{formatNumber(callsLastDay)} calls/day</span>
          </div>
          <div className="flex items-center text-sm text-muted-foreground">
            <Users size={16} className="mr-1 text-brand" />
            <span>{activeUsers} users</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="pt-2 flex justify-between border-t">
        <Badge variant="outline" className="bg-secondary text-secondary-foreground">
          {category}
        </Badge>
        <div className="flex items-center text-xs text-muted-foreground">
          <Clock size={14} className="mr-1" />
          <span>Updated {lastUpdated}</span>
        </div>
      </CardFooter>
    </Card>
  );
};
