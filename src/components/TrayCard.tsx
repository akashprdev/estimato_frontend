import { motion } from 'framer-motion';
import { Coffee } from 'lucide-react';
import type { CardValue } from './data';

interface TrayCardProps {
  value: CardValue;
  selected: CardValue;
  onClick: () => void;
}

export function TrayCard({ value, selected, onClick }: TrayCardProps) {
  const active = value === selected;
  const isCoffee = value === '☕';
  return (
    <motion.button
      onClick={onClick}
      animate={active ? { y: -14, scale: 1.08 } : { y: 0, scale: 1 }}
      whileHover={active ? {} : { y: -7, scale: 1.04 }}
      whileTap={{ scale: 0.93 }}
      transition={{ type: 'spring', stiffness: 380, damping: 22 }}
      className={`relative flex flex-col items-center justify-center rounded-xl font-extrabold
        select-none cursor-pointer transition-colors
        ${
          active
            ? 'w-14 h-[72px] gradient-primary text-primary-foreground border border-primary-deep shadow-glow'
            : 'w-12 h-16 bg-card text-foreground border border-border shadow-sm hover:bg-secondary hover:text-secondary-foreground hover:border-primary/20'
        }`}
    >
      {isCoffee ? (
        <Coffee size={active ? 21 : 17} />
      ) : (
        <span className={active ? 'text-xl' : 'text-base'}>{value}</span>
      )}
      {active && (
        <div className="w-1 h-1 rounded-full bg-primary-foreground/40 mt-1.5" />
      )}
    </motion.button>
  );
}
