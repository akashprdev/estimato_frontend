import { motion } from 'framer-motion';
import { Layers } from 'lucide-react';
import { fadeUp } from './motion-variants';
import { Avater, type Participant } from './ParticipantCard';

export function FlipCard({
  participant,
  flipped,
  votes,
}: {
  participant: Participant;
  flipped: boolean;
  votes?: Record<string, number> | null;
}) {
  const { id, name } = participant;

  const vote = votes?.[id] ?? '?';

  const isMe = participant?.id.toString() === localStorage.getItem('playerId');
  return (
    <motion.div variants={fadeUp} className="flex flex-col items-center gap-3">
      <div style={{ perspective: 900, height: 156 }} className="w-32">
        <motion.div
          style={{
            transformStyle: 'preserve-3d',
            position: 'relative',
            width: '100%',
            height: '100%',
          }}
          animate={{ rotateY: flipped ? 180 : 0 }}
          transition={{ duration: 0.72, ease: [0.4, 0, 0.2, 1] }}
        >
          {/* Back face */}
          <div
            className="absolute inset-0 rounded-xl overflow-hidden gradient-primary flex items-center justify-center"
            style={{ backfaceVisibility: 'hidden' }}
          >
            <div
              className="absolute inset-0 opacity-[0.15]"
              style={{
                backgroundImage:
                  'radial-gradient(rgba(255,255,255,0.7) 1px, transparent 1px)',
                backgroundSize: '13px 13px',
              }}
            />
            <motion.div
              className="absolute inset-0 rounded-xl"
              style={{
                background:
                  'linear-gradient(90deg, transparent, rgba(255,255,255,0.16), transparent)',
                backgroundSize: '200% 100%',
              }}
              animate={{ backgroundPosition: ['-200% center', '200% center'] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: 'linear' }}
            />
            <Layers size={34} className="text-primary-foreground/30 z-10" />
          </div>

          {/* Front face */}
          <motion.div
            className={`absolute inset-0 rounded-xl bg-card flex items-center justify-center
              'border border-primary/10'`}
            style={{
              backfaceVisibility: 'hidden',
              transform: 'rotateY(180deg)',
            }}
          >
            <span
              className={`text-[44px] font-black tracking-tighter text-primary`}
            >
              {vote}
            </span>
          </motion.div>
        </motion.div>
      </div>

      {/* Name chip */}
      <motion.div
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.3, ease: 'easeOut' }}
        className="flex items-center gap-2 bg-card px-3 py-1.5 rounded-full border border-border shadow-sm"
      >
        <Avater name={participant.name?.slice(0, 2).toUpperCase()} />

        <span className="text-[11px] font-bold text-foreground leading-none">
          {name.split(' ')[0]}
        </span>
        {isMe && (
          <span className="text-[8px] font-extrabold text-primary bg-secondary px-1.5 py-0.5 rounded-full leading-none">
            YOU
          </span>
        )}
      </motion.div>
    </motion.div>
  );
}
