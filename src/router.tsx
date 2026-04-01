import { createRouter } from '@tanstack/react-router';
import { routeTree } from './routeTree.gen';
import type { AuthState } from './auth';

export interface MyRouterContext {
  auth: AuthState | undefined;
}

export function getRouter() {
  const router = createRouter({
    routeTree,
    scrollRestoration: true,
    defaultPreload: 'intent',
    defaultPreloadStaleTime: 0,
    context: {
      // auth will be passed down from App component
      auth: undefined!,
    },
  });

  return router;
}

declare module '@tanstack/react-router' {
  interface Register {
    router: ReturnType<typeof getRouter>;
  }
}
