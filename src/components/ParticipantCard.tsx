import { motion } from 'framer-motion';
import { fadeUp } from './motion-variants';
import { PokerAvatar, VoteStatus } from './primitives';
import type { Participant } from './data';

export function ParticipantCard({ participant }: { participant: Participant }) {
  const { name, initials, colorClass, img, hasVoted } = participant;
  return (
    <motion.div
      variants={fadeUp}
      className={`flex items-center justify-between px-4 py-3.5 rounded-2xl
        ${
          hasVoted
            ? 'bg-card shadow-soft'
            : 'bg-card/40 border border-border/60 opacity-60'
        }`}
    >
      <div className="flex items-center gap-3">
        <PokerAvatar img={img} initials={initials} colorClass={colorClass} />
        <span className="text-sm font-bold text-foreground">{name}</span>
      </div>
      <VoteStatus voted={hasVoted} />
    </motion.div>
  );
}
