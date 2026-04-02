import { AnimatePresence, motion } from 'framer-motion';
import { EyebrowLabel } from './primitives';
import type { CardValue } from './data';

export function CenterCard({ value }: { value: CardValue }) {
  return (
    <div className="w-60 aspect-[3/4] bg-secondary border border-primary/10 rounded-[2.5rem] flex flex-col items-center justify-center relative overflow-hidden shadow-[0_20px_60px_hsl(var(--shadow-violet)/0.1)]">
      <div className="absolute inset-0 bg-gradient-to-b from-card/30 to-transparent pointer-events-none" />
      <EyebrowLabel>Your Vote</EyebrowLabel>
      <AnimatePresence mode="wait">
        <motion.span
          key={String(value)}
          initial={{ opacity: 0, scale: 0.6, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.7, y: -8 }}
          transition={{ type: 'spring', stiffness: 340, damping: 22 }}
          className="text-[100px] font-black text-primary leading-none tracking-tighter z-10"
        >
          {value}
        </motion.span>
      </AnimatePresence>
    </div>
  );
}
