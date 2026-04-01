import CreateRoom from '@/features/CreateRoom';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/')({
  component: CreateRoom,
});
