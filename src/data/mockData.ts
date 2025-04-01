
// Mock APIs
export const mockApis = [
  {
    id: 'api-1',
    name: 'Payment Processing API',
    description: 'Process payments securely with support for multiple payment methods and currencies.',
    version: '2.1.0',
    status: 'active',
    category: 'Payments',
    lastUpdated: '3 days ago',
    callsLastDay: 24500,
    activeUsers: 87,
    documentation: {
      overview: 'The Payment Processing API allows you to securely process payments through various payment methods including credit cards, digital wallets, and bank transfers. It supports multiple currencies and provides detailed transaction reporting.',
      endpoints: [
        {
          name: 'Create Payment',
          method: 'POST',
          path: '/payments',
          description: 'Process a new payment and return a transaction ID'
        },
        {
          name: 'Get Payment',
          method: 'GET',
          path: '/payments/{payment_id}',
          description: 'Retrieve details about a specific payment'
        },
        {
          name: 'List Payments',
          method: 'GET',
          path: '/payments',
          description: 'List all payments with optional filtering'
        },
        {
          name: 'Refund Payment',
          method: 'POST',
          path: '/payments/{payment_id}/refund',
          description: 'Process a refund for an existing payment'
        }
      ]
    }
  },
  {
    id: 'api-2',
    name: 'User Management API',
    description: 'Create and manage user accounts with authentication, authorization, and profile management capabilities.',
    version: '1.8.3',
    status: 'active',
    category: 'Identity',
    lastUpdated: '1 week ago',
    callsLastDay: 18700,
    activeUsers: 124,
    documentation: {
      overview: 'The User Management API provides comprehensive user account management capabilities including registration, authentication, authorization, and profile management.',
      endpoints: [
        {
          name: 'Create User',
          method: 'POST',
          path: '/users',
          description: 'Register a new user account'
        },
        {
          name: 'Authenticate',
          method: 'POST',
          path: '/auth/login',
          description: 'Authenticate a user and receive access tokens'
        },
        {
          name: 'Get User Profile',
          method: 'GET',
          path: '/users/{user_id}',
          description: 'Retrieve a specific user profile'
        },
        {
          name: 'Update User',
          method: 'PUT',
          path: '/users/{user_id}',
          description: 'Update user account information'
        }
      ]
    }
  },
  {
    id: 'api-3',
    name: 'Data Analytics API',
    description: 'Analyze and visualize data with powerful querying capabilities and real-time reporting.',
    version: '0.9.5',
    status: 'beta',
    category: 'Analytics',
    lastUpdated: '2 days ago',
    callsLastDay: 5620,
    activeUsers: 32,
    documentation: {
      overview: 'The Data Analytics API enables powerful data analysis and visualization capabilities with customizable queries and real-time reporting features.',
      endpoints: [
        {
          name: 'Query Data',
          method: 'POST',
          path: '/analytics/query',
          description: 'Execute a custom data query'
        },
        {
          name: 'Generate Report',
          method: 'POST',
          path: '/analytics/reports',
          description: 'Generate a customized analytics report'
        },
        {
          name: 'Get Metrics',
          method: 'GET',
          path: '/analytics/metrics',
          description: 'Retrieve predefined metrics and KPIs'
        }
      ]
    }
  },
  {
    id: 'api-4',
    name: 'Notification Service API',
    description: 'Send notifications via multiple channels including email, SMS, push notifications, and in-app messaging.',
    version: '3.2.1',
    status: 'active',
    category: 'Communication',
    lastUpdated: '5 days ago',
    callsLastDay: 32100,
    activeUsers: 91,
    documentation: {
      overview: 'The Notification Service API enables sending notifications through multiple channels including email, SMS, push notifications, and in-app messaging with delivery tracking and analytics.',
      endpoints: [
        {
          name: 'Send Notification',
          method: 'POST',
          path: '/notifications',
          description: 'Send a notification through specified channels'
        },
        {
          name: 'Get Notification Status',
          method: 'GET',
          path: '/notifications/{notification_id}',
          description: 'Check the delivery status of a notification'
        },
        {
          name: 'Create Template',
          method: 'POST',
          path: '/notifications/templates',
          description: 'Create a reusable notification template'
        }
      ]
    }
  },
  {
    id: 'api-5',
    name: 'File Storage API',
    description: 'Store, retrieve, and manage files with secure access controls and content delivery optimization.',
    version: '1.5.0',
    status: 'active',
    category: 'Storage',
    lastUpdated: '2 weeks ago',
    callsLastDay: 8900,
    activeUsers: 76,
    documentation: {
      overview: 'The File Storage API provides capabilities for storing, retrieving, and managing files with secure access controls and optimized content delivery through CDN integration.',
      endpoints: [
        {
          name: 'Upload File',
          method: 'POST',
          path: '/files',
          description: 'Upload a new file to storage'
        },
        {
          name: 'Download File',
          method: 'GET',
          path: '/files/{file_id}',
          description: 'Download a file from storage'
        },
        {
          name: 'Delete File',
          method: 'DELETE',
          path: '/files/{file_id}',
          description: 'Delete a file from storage'
        },
        {
          name: 'List Files',
          method: 'GET',
          path: '/files',
          description: 'List available files with optional filtering'
        }
      ]
    }
  },
  {
    id: 'api-6',
    name: 'Legacy Inventory API',
    description: 'Manage product inventory, stock levels, and inventory reporting for e-commerce platforms.',
    version: '1.2.3',
    status: 'deprecated',
    category: 'E-commerce',
    lastUpdated: '6 months ago',
    callsLastDay: 2300,
    activeUsers: 19,
    documentation: {
      overview: 'This legacy API provides inventory management capabilities including product categorization, stock level tracking, and inventory reporting for e-commerce platforms. This API is deprecated and will be sunset in 6 months.',
      endpoints: [
        {
          name: 'Get Products',
          method: 'GET',
          path: '/inventory/products',
          description: 'List all products in inventory'
        },
        {
          name: 'Update Stock',
          method: 'PUT',
          path: '/inventory/products/{product_id}/stock',
          description: 'Update stock level for a product'
        },
        {
          name: 'Get Inventory Report',
          method: 'GET',
          path: '/inventory/reports',
          description: 'Generate inventory status report'
        }
      ]
    }
  }
] as const;

// Mock API usage data
export const generateApiUsageData = (days: number = 30) => {
  const data = [];
  const today = new Date();
  
  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    
    // Format date as short month and day (e.g., "Mar 15")
    const formattedDate = date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric' 
    });
    
    // Generate a somewhat realistic pattern with weekday variations
    const dayOfWeek = date.getDay(); // 0 = Sunday, 6 = Saturday
    let baseValue = 100000;
    
    // Weekend dip
    if (dayOfWeek === 0 || dayOfWeek === 6) {
      baseValue *= 0.6;
    }
    
    // Random variation
    const randomFactor = 0.85 + Math.random() * 0.3;
    
    // Slight overall growth trend
    const trendFactor = 1 + (i / days) * 0.15;
    
    data.push({
      name: formattedDate,
      value: Math.floor(baseValue * randomFactor / trendFactor),
    });
  }
  
  return data;
};

// Mock dashboard metrics
export const dashboardMetrics = {
  totalApiCalls: {
    value: '5.2M',
    trend: { value: 12.4, isPositive: true },
    description: 'Total API calls in the last 30 days'
  },
  activeUsers: {
    value: '143',
    trend: { value: 8.7, isPositive: true },
    description: 'Users with API activity in the last 7 days'
  },
  errorRate: {
    value: '0.82%',
    trend: { value: 0.3, isPositive: false },
    description: 'Percentage of API calls resulting in errors'
  },
  avgResponseTime: {
    value: '178ms',
    trend: { value: 5.1, isPositive: true },
    description: 'Average API response time'
  }
};

// Mock API keys
export const apiKeys = [
  {
    id: 'key-1',
    name: 'Production API Key',
    key: 'sk_prod_2fGh7i8jKl3mN4oP5qR6s',
    created: '2023-10-15',
    lastUsed: '2023-11-28',
    status: 'active',
    environment: 'production'
  },
  {
    id: 'key-2',
    name: 'Development API Key',
    key: 'sk_dev_9aBc1dEf2gHi3jKl4mNo',
    created: '2023-09-20',
    lastUsed: '2023-11-29',
    status: 'active',
    environment: 'development'
  },
  {
    id: 'key-3',
    name: 'Test API Key',
    key: 'sk_test_5qRs6tUv7wXy8zAb9cDe',
    created: '2023-11-05',
    lastUsed: '2023-11-27',
    status: 'active',
    environment: 'test'
  },
  {
    id: 'key-4',
    name: 'Legacy API Key',
    key: 'sk_legacy_1aB2cD3eF4gH5iJ6kL',
    created: '2023-05-12',
    lastUsed: '2023-08-30',
    status: 'revoked',
    environment: 'production'
  }
];

// Mock API users
export const apiUsers = [
  {
    id: 'user-1',
    name: 'Alice Johnson',
    email: 'alice@example.com',
    role: 'Admin',
    status: 'active',
    lastActive: '2 hours ago',
    usageLastMonth: 24560
  },
  {
    id: 'user-2',
    name: 'Bob Smith',
    email: 'bob@example.com',
    role: 'Developer',
    status: 'active',
    lastActive: '1 day ago',
    usageLastMonth: 18932
  },
  {
    id: 'user-3',
    name: 'Carol Davis',
    email: 'carol@example.com',
    role: 'Developer',
    status: 'active',
    lastActive: '5 hours ago',
    usageLastMonth: 31245
  },
  {
    id: 'user-4',
    name: 'Dave Wilson',
    email: 'dave@example.com',
    role: 'Analyst',
    status: 'active',
    lastActive: '3 days ago',
    usageLastMonth: 8752
  },
  {
    id: 'user-5',
    name: 'Eve Brown',
    email: 'eve@example.com',
    role: 'Developer',
    status: 'inactive',
    lastActive: '2 months ago',
    usageLastMonth: 0
  }
];

// API usage by endpoint (for specific API detail view)
export const apiEndpointUsage = [
  { 
    endpoint: '/payments', 
    method: 'POST',
    callsLastDay: 12500,
    avgResponseTime: '185ms',
    errorRate: '0.4%'
  },
  { 
    endpoint: '/payments/{id}', 
    method: 'GET',
    callsLastDay: 8700,
    avgResponseTime: '120ms',
    errorRate: '0.2%'
  },
  { 
    endpoint: '/payments', 
    method: 'GET',
    callsLastDay: 2100,
    avgResponseTime: '210ms',
    errorRate: '0.7%'
  },
  { 
    endpoint: '/payments/{id}/refund', 
    method: 'POST',
    callsLastDay: 1200,
    avgResponseTime: '250ms',
    errorRate: '1.2%'
  }
];
