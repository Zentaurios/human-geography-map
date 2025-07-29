'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useState } from 'react';
import { QUERY_CONFIG } from '@/lib/config';

interface QueryProviderProps {
  children: React.ReactNode;
}

export function QueryProvider({ children }: QueryProviderProps) {
  // Create query client with optimized configuration
  const [queryClient] = useState(
    () => new QueryClient({
      defaultOptions: {
        queries: {
          staleTime: QUERY_CONFIG.staleTime,
          gcTime: QUERY_CONFIG.cacheTime, // Updated from cacheTime for React Query v5
          retry: QUERY_CONFIG.retry,
          retryDelay: QUERY_CONFIG.retryDelay,
          refetchOnWindowFocus: false,
          refetchOnReconnect: 'always',
        },
        mutations: {
          retry: 1,
        },
      },
    })
  );

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {/* Only show devtools in development */}
      {process.env.NODE_ENV === 'development' && (
        <ReactQueryDevtools 
          initialIsOpen={false}
          position="bottom"
        />
      )}
    </QueryClientProvider>
  );
}

// Export the query client for use in server actions if needed
export { QueryClient };
