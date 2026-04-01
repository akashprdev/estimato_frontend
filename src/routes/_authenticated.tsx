import { createFileRoute, Outlet } from '@tanstack/react-router';

export const Route = createFileRoute('/_authenticated')({
  component: AuthenticationLayout,
});

function AuthenticationLayout() {
  return (
    <div className="p-2">
      <div>
        <Outlet />
      </div>
    </div>
  );
}
