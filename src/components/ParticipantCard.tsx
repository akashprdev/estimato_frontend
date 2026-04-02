import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';
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
  id: string;
  name: string;
  vote: number | '?' | '☕' | null;
  hasVoted: boolean;
  isMe?: boolean;
}

// Optional confetti sparkles for voted users
const ConfettiSpark = ({ color }: { color: string }) => (
  <motion.div
    initial={{ scale: 0 }}
    animate={{ scale: [0, 1, 0], rotate: [0, 180, 360] }}
    transition={{ duration: 0.8, repeat: 0 }}
    className="absolute w-2 h-2 rounded-full"
    style={{
      backgroundColor: color,
      top: Math.random() * 24,
      left: Math.random() * 24,
    }}
  />
);

export function ParticipantCard({ participant }: { participant: Participant }) {
  const { name, hasVoted, isMe } = participant;

  return (
    <motion.div
      whileHover={{ y: -2, boxShadow: '0px 8px 20px rgba(0,0,0,0.08)' }}
      className={cn(
        'relative flex items-center justify-between p-3 rounded-2xl cursor-pointer transition-all',
        hasVoted
          ? 'bg-green-50 border border-green-200'
          : 'bg-gray-50 border border-gray-200'
      )}
    >
      {/* LEFT: Avatar + Name */}
      <div className="flex items-center gap-3">
        <Avater name={name} />
        <div className="flex flex-col">
          <span
            className={cn(
              'font-medium text-sm',
              isMe ? 'text-purple-600' : 'text-gray-800'
            )}
          >
            {name} {isMe && '(You)'}
          </span>
        </div>
      </div>

      {/* RIGHT: Status */}
      <div className="relative flex items-center justify-center w-6 h-6">
        {hasVoted ? (
          <>
            <CheckCircle className="text-green-500 w-6 h-6 animate-pulse" />
            <ConfettiSpark color={CONFETTI_COLORS[0]} />
          </>
        ) : (
          <div className="w-4 h-4 rounded-full border-2 border-gray-300" />
        )}
      </div>
    </motion.div>
  );
}

export const Avater = ({ name, color }: { name: string; color?: string }) => (
  <div
    className="flex items-center justify-center w-10 h-10 rounded-full font-bold text-gray-500 bg-gray-200"
    style={{ backgroundColor: color }}
  >
    {name.slice(0, 2).toUpperCase()}
  </div>
);
