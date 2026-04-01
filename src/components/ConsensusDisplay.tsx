import { AnimatePresence, motion } from 'framer-motion';
import { BadgeCheck } from 'lucide-react';
import { Pill } from './primitives';
import { popSpring, badgeSpring } from './motion-variants';

export function ConsensusDisplay({ visible }: { visible: boolean }) {
  return (
    <div className="flex flex-col items-center relative mb-8">
      <AnimatePresence>
        {visible && (
          <motion.div
            className="absolute rounded-full bg-primary pointer-events-none"
            style={{ width: 200, height: 200, filter: 'blur(56px)', zIndex: 0 }}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: [0, 0.28, 0.18], scale: [0.5, 1.15, 1] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.4, times: [0, 0.55, 1] }}
          />
        )}
      </AnimatePresence>
      <motion.div
        variants={badgeSpring}
        initial="hidden"
        animate={visible ? 'show' : 'hidden'}
      >
        <Pill className="bg-amber-warm/10 text-amber-warm-foreground border border-amber-warm/30 mb-3 z-10 relative">
          <BadgeCheck size={11} />
          Consensus Reached
        </Pill>
      </motion.div>
      <motion.div
        variants={popSpring}
        initial="hidden"
        animate={visible ? 'show' : 'hidden'}
        className="z-10 relative"
      >
        <span className="text-[120px] font-black text-primary leading-none tracking-tighter select-none drop-shadow-sm">
          5
        </span>
      </motion.div>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: visible ? 1 : 0 }}
        transition={{ delay: 0.55, duration: 0.4 }}
        className="text-[10px] font-extrabold text-muted-foreground tracking-[0.22em] uppercase mt-1 z-10"
      >
        Final Estimate
      </motion.p>
    </div>
  );
}
