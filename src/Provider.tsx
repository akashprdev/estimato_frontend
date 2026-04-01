import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import type { ReactNode } from 'react';
import { AuthProvider } from './auth';

const queryClient = new QueryClient();

export const Provider = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <AuthProvider>
        <QueryClientProvider client={queryClient}>
          {children}
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </AuthProvider>
    </>
  );
};
