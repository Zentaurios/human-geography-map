'use client';

import ApiIntegrationTester from '@/components/research/ApiIntegrationTester';

export default function ApiTestingPage() {
  // Only show in development
  if (process.env.NODE_ENV !== 'development') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-muted-foreground mb-4">
            🚫 Development Only
          </h1>
          <p className="text-muted-foreground">
            This testing interface is only available in development mode.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto py-8 px-4">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            🔬 API Integration Testing Suite
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Comprehensive testing and verification tools for the Human Geography Research API integration.
            Verify real data integration, test error handling, and monitor API health.
          </p>
        </div>
        
        <ApiIntegrationTester />
      </div>
    </div>
  );
}