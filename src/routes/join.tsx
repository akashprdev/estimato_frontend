import JoinRoom from '@/features/JoinRoom';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/join')({
  component: JoinRoom,
});
