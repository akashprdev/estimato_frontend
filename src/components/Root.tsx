import { useAuth } from '@/auth';
import { Provider } from '@/Provider';
import { Outlet, useRouter } from '@tanstack/react-router';

function InnerRoot() {
  const auth = useAuth();
  const router = useRouter();

  router.update({
    context: {
      auth,
    },
  });

  if (auth.isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <main>
      <Outlet />
    </main>
  );
}

export const Root = () => {
  return (
    <Provider>
      <InnerRoot />
    </Provider>
  );
};
