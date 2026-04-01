import type { QueryClient } from '@tanstack/react-query';

export type AuthContext = {
  user: any | null;
  login: (user: any) => void;
  logout: () => void;
  isAuthenticated: () => boolean;
};

export type AppContext = AuthContext & {
  queryClient: QueryClient;
};
