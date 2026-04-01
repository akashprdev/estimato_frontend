import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_protected/profile/edit-profile')({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/(app)/profile/edit-profile"!</div>;
}
