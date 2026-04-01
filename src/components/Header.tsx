import { PARTICIPANTS } from './data';
import { motion } from 'motion/react';

export const Header = ({ showInviteButton = false }) => {
  return (
    <header
      className="h-16 flex-shrink-0 flex items-center justify-between px-7
      bg-card/80 backdrop-blur-sm border-b border-border sticky top-0 z-20"
    >
      <div className="flex items-center gap-4">
        <span className="text-[15px] font-black text-primary tracking-tight">
          Estimato
        </span>
        <div className="w-px h-5 bg-border" />
      </div>

      {showInviteButton && (
        <div className="flex items-center gap-3">
          <div className="flex">
            {PARTICIPANTS.slice(0, 4).map((p, i) => (
              <div
                key={p.id}
                className={`w-8 h-8 rounded-full ${p.colorClass} border-2 border-card
              text-[10px] font-bold flex items-center justify-center overflow-hidden flex-shrink-0`}
                style={{ marginLeft: i > 0 ? -8 : 0, zIndex: 10 - i }}
              >
                {p.img ? (
                  <img
                    src={p.img}
                    className="w-full h-full object-cover"
                    alt={p.initials}
                  />
                ) : (
                  p.initials
                )}
              </div>
            ))}
            <div
              className="w-8 h-8 rounded-full bg-muted border-2 border-card text-muted-foreground
            text-[10px] font-bold flex items-center justify-center"
              style={{ marginLeft: -8, zIndex: 5 }}
            >
              +2
            </div>
          </div>
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="gradient-primary hover:opacity-90 text-primary-foreground px-5 py-2 rounded-lg text-sm font-bold transition-opacity"
          >
            Invite
          </motion.button>
        </div>
      )}
    </header>
  );
};
