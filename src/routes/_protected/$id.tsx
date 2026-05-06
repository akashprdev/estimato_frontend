import Room from '@/features/Room';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_protected/$id')({
  component: Room,
});
