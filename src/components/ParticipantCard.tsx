import { motion } from 'framer-motion';
import { fadeUp } from './motion-variants';
import type { CardValue } from './data';
import { Circle } from 'lucide-react';
import { cn } from '@/lib/utils';

export const CONFETTI_COLORS = [
  '#7c3aed',
  '#a78bfa',
  '#fbbf24',
  '#fb923c',
  '#c4b5fd',
  '#34d399',
  '#f472b6',
];

export interface Participant {
  id: number;
  name: string;
  vote: CardValue | null;
  hasVoted: boolean;
  isMe?: boolean;
}

export function ParticipantCard({ participant }: { participant: Participant }) {
  const { name, hasVoted } = participant;

  const getRendomColorCard = () => {
    const randomIndex = Math.floor(Math.random() * CONFETTI_COLORS.length);
    return CONFETTI_COLORS[randomIndex];
  };

  return (
    <motion.div
      variants={fadeUp}
      className={cn(
        'flex items-center justify-between px-4 py-3.5 rounded-2xl',
        hasVoted
          ? 'bg-green-500 shadow-2xl'
          : 'bg-gray-100 border border-gray-300 shadow-sm'
      )}
    >
      <div className="flex items-center gap-2">
        <PokerAvatar
          colorClass={getRendomColorCard()}
          initials={participant.name?.slice(0, 2).toUpperCase()}
        />
        <span className="text-sm font-bold text-foreground">{name}</span>

        <Circle
          size={8}
          className="text-primary"
          fill="currentColor"
          strokeWidth={0}
        />
      </div>
    </motion.div>
  );
}

interface AvatarProps {
  initials: string;
  colorClass?: string;
  size?: 'sm' | 'md' | 'lg';
}

export function PokerAvatar({ initials }: AvatarProps) {
  return (
    <div
      className={cn(
        ' bg-muted text-muted-foreground size-12 rounded-full shrink-0 flex items-center justify-center font-bold overflow-hidden'
      )}
    >
      {initials}
    </div>
  );
}
