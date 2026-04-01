import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Eye } from 'lucide-react';

import { fadeUp, stagger, pageVariants } from './motion-variants';
import { Pill } from './primitives';
import { ParticipantCard } from './ParticipantCard';
import { TrayCard } from './TrayCard';
import { CenterCard } from './CenterCard';

import { CARD_VALUES, type CardValue, type Participant } from './data';

function splitParticipants(participants: Participant[]) {
  const mid = Math.ceil(participants.length / 2);

  return {
    left: participants.slice(0, mid),
    right: participants.slice(mid),
  };
}

export function VotingScreen({
  onReveal,
  participants = [],
}: {
  onReveal: () => void;
  participants: Participant[];
}) {
  const [selected, setSelected] = useState<CardValue>(0);
  const [exiting, setExiting] = useState(false);

  const handleReveal = () => {
    setExiting(true);
    setTimeout(onReveal, 320);
  };

  const { left, right } = useMemo(
    () => splitParticipants(participants),
    [participants]
  );

  return (
    <motion.div
      key="vote"
      {...pageVariants}
      className="flex flex-col flex-1 overflow-hidden relative"
    >
      {/* MAIN AREA */}
      <div className="flex-1 overflow-y-auto p-8 pb-36">
        {/* HEADER */}
        <motion.div
          variants={stagger(0, 0.1)}
          initial="hidden"
          animate="show"
          className="flex justify-between items-start mb-10"
        >
          <motion.div variants={fadeUp}>
            <Pill className="bg-secondary text-secondary-foreground border border-primary/20">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              Voting in progress
            </Pill>
          </motion.div>
        </motion.div>

        {/* PARTICIPANTS */}
        <div className="grid md:grid-cols-[1fr_auto_1fr] gap-8 items-center max-w-5xl mx-auto">
          {/* LEFT */}
          <motion.div
            layout
            variants={stagger(0.08, 0.12)}
            initial="hidden"
            animate="show"
            className="flex flex-col gap-4 items-end"
          >
            {left.map((p) => (
              <ParticipantCard key={p.id} participant={p} />
            ))}
          </motion.div>

          {/* CENTER CARD */}
          <motion.div
            layout
            initial={{ opacity: 0, scale: 0.82 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              type: 'spring',
              stiffness: 230,
              damping: 20,
              delay: 0.15,
            }}
          >
            <CenterCard value={selected} />
          </motion.div>

          {/* RIGHT */}
          <motion.div
            layout
            variants={stagger(0.08, 0.2)}
            initial="hidden"
            animate="show"
            className="flex flex-col gap-4 items-start"
          >
            {right.map((p) => (
              <ParticipantCard key={p.id} participant={p} />
            ))}
          </motion.div>
        </div>
      </div>

      {/* CARD TRAY */}
      <motion.div
        animate={exiting ? { opacity: 0, y: 18 } : { opacity: 1, y: 0 }}
        transition={{ duration: 0.28 }}
        className="absolute bottom-0 left-0 right-0 h-28 flex items-center justify-center px-8"
      >
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.3,
            duration: 0.5,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="flex items-end gap-3 px-5 py-4 glass-surface rounded-[1.75rem] shadow-elevated"
        >
          {CARD_VALUES.map((v) => (
            <TrayCard
              key={v}
              value={v}
              selected={selected}
              onClick={() => setSelected(v)}
            />
          ))}

          <div className="w-px h-9 bg-border mx-2 self-center" />

          <motion.button
            onClick={handleReveal}
            whileHover={{
              backgroundColor: 'hsl(263 70% 50% / 0.06)',
              color: 'hsl(263 70% 50%)',
            }}
            whileTap={{ scale: 0.96 }}
            className="flex items-center gap-2 px-5 py-2.5 rounded-2xl text-sm font-bold text-muted-foreground transition-colors self-center"
          >
            <Eye size={16} />
            Show Results
          </motion.button>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
