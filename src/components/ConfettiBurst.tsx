import { AnimatePresence, motion } from 'framer-motion';
import { CONFETTI_COLORS } from './data';

export function ConfettiBurst({ active }: { active: boolean }) {
  const dots = Array.from({ length: 24 }, (_, i) => ({
    id: i,
    size: 5 + Math.random() * 7,
    x: 5 + Math.random() * 90,
    y: 15 + Math.random() * 65,
    color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
    dur: 1.0 + Math.random() * 1.1,
    delay: Math.random() * 0.6,
  }));
  return (
    <AnimatePresence>
      {active && (
        <div
          className="absolute inset-0 pointer-events-none overflow-hidden"
          style={{ zIndex: 5 }}
        >
          {dots.map((d) => (
            <motion.div
              key={d.id}
              className="absolute rounded-full"
              style={{
                width: d.size,
                height: d.size,
                background: d.color,
                left: `${d.x}%`,
                top: `${d.y}%`,
              }}
              initial={{ opacity: 0.9, y: 0, scale: 1 }}
              animate={{ opacity: 0, y: -90, scale: 0.3 }}
              transition={{ duration: d.dur, delay: d.delay, ease: 'easeOut' }}
            />
          ))}
        </div>
      )}
    </AnimatePresence>
  );
}
