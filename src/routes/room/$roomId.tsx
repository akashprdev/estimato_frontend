import Room from '@/features/Room';
import { createFileRoute, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/room/$roomId')({
  component: Room,
  beforeLoad: ({ params }) => {
    if (!params.roomId) {
      throw redirect({
        to: '/',
      });
    }
  },
});
