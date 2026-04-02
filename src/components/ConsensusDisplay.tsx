import { AnimatePresence, motion } from 'framer-motion';
import { BadgeCheck } from 'lucide-react';
import { Pill } from './primitives';

export function ConsensusDisplay({
  visible,
  finalEstimate = 0,
}: {
  visible: boolean;
  finalEstimate: number;
}) {
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
        variants={{
          hidden: { opacity: 0, y: 18 },
          show: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] as const },
          },
        }}
        initial="hidden"
        animate={visible ? 'show' : 'hidden'}
      >
        <Pill className="bg-amber-warm/10 text-amber-warm-foreground border border-amber-warm/30 mb-3 z-10 relative">
          <BadgeCheck size={11} />
          Final Estimate
        </Pill>
      </motion.div>
      <motion.div
        variants={{
          hidden: { opacity: 0, y: 18 },
          show: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] as const },
          },
        }}
        initial="hidden"
        animate={visible ? 'show' : 'hidden'}
        className="z-10 relative"
      >
        <span className="text-[120px] font-black text-primary leading-none tracking-tighter select-none drop-shadow-sm">
          {finalEstimate}
        </span>
      </motion.div>
    </div>
  );
}
