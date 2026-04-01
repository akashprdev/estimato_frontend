import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Eye, RotateCcw, ArrowRight } from 'lucide-react';
import { fadeUp, stagger, pageVariants } from './motion-variants';
import { FlipCard } from './FlipCard';
import { ConsensusDisplay } from './ConsensusDisplay';
import { ConfettiBurst } from './ConfettiBurst';
import { PARTICIPANTS } from './data';

export function RevealScreen({ onReVote }: { onReVote: () => void }) {
  const [flippedCount, setFlippedCount] = useState(0);
  const [showConsensus, setShowConsensus] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    PARTICIPANTS.forEach((_, i) => {
      setTimeout(() => setFlippedCount(i + 1), 320 + i * 210);
    });
    const done = 320 + PARTICIPANTS.length * 210;
    setTimeout(() => setShowConsensus(true), done + 140);
    setTimeout(() => setShowConfetti(true), done + 360);
    setTimeout(() => setShowConfetti(false), done + 2200);
  }, []);

  return (
    <motion.div
      key="reveal"
      {...pageVariants}
      className="flex flex-col flex-1 overflow-hidden relative"
    >
      <div className="flex-1 overflow-y-auto p-8 pb-32">
        <motion.div
          variants={stagger(0, 0.1)}
          initial="hidden"
          animate="show"
          className="flex justify-between items-start mb-8"
        >
          <motion.div variants={fadeUp} className="max-w-lg">
            <span className="text-[10px] font-extrabold text-primary tracking-widest uppercase bg-secondary px-2.5 py-1 rounded-md">
              Current Story
            </span>
            <h2 className="text-2xl font-black text-foreground mt-3 tracking-tight leading-snug">
              ENG-402 Implement real-time cursor tracking
            </h2>
          </motion.div>
          <motion.div variants={fadeUp} className="text-right">
            <p className="text-[10px] font-bold text-muted-foreground tracking-widest uppercase mb-1.5">
              Status
            </p>
            <div className="flex items-center gap-1.5 text-primary font-bold text-sm">
              <Eye size={14} /> Reveal State
            </div>
          </motion.div>
        </motion.div>

        <div className="relative">
          <ConfettiBurst active={showConfetti} />
          <ConsensusDisplay visible={showConsensus} />
        </div>

        <motion.div
          variants={stagger(0.1, 0.08)}
          initial="hidden"
          animate="show"
          className="grid grid-cols-6 gap-4 max-w-4xl mx-auto"
        >
          {PARTICIPANTS.map((p, i) => (
            <FlipCard key={p.id} participant={p} flipped={flippedCount > i} />
          ))}
        </motion.div>
      </div>

      {/* Footer */}
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="absolute bottom-0 left-0 right-0 h-24 bg-card border-t border-border flex items-center justify-center gap-4"
      >
        <motion.button
          onClick={onReVote}
          whileHover={{ backgroundColor: 'hsl(var(--muted))' }}
          whileTap={{ scale: 0.97 }}
          className="flex items-center gap-2 px-7 py-3 rounded-xl text-sm font-bold text-muted-foreground transition-colors"
        >
          <RotateCcw size={14} /> Re-vote
        </motion.button>
        <motion.button
          onClick={onReVote}
          whileHover={{
            scale: 1.025,
            boxShadow: '0 12px 32px hsl(263 70% 50% / 0.36)',
          }}
          whileTap={{ scale: 0.97 }}
          className="flex items-center gap-2.5 px-12 py-3.5 rounded-xl text-sm font-extrabold text-primary-foreground gradient-primary shadow-glow"
        >
          Start Next Round <ArrowRight size={15} />
        </motion.button>
      </motion.div>
    </motion.div>
  );
}
