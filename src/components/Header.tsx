import { useState } from 'react';
import { motion } from 'motion/react';
import { Check, UserPlus } from 'lucide-react';

export const Header = ({ showInviteButton = false }) => {
  const [copy, setCopy] = useState(false);
  const handleInvite = () => {
    // copy path to clipboard
    navigator.clipboard.writeText(window.location.href);
    setCopy(true);
    setTimeout(() => setCopy(false), 2000);
  };

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
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="gradient-primary hover:opacity-90 text-primary-foreground px-5 py-2 rounded-lg text-sm font-bold transition-opacity"
            onClick={handleInvite}
          >
            <span className="flex gap-2 items-center">
              {copy ? (
                <>
                  <Check size={14} />
                  Copied
                </>
              ) : (
                <>
                  <UserPlus size={14} />
                  Invite
                </>
              )}
            </span>
          </motion.button>
        </div>
      )}
    </header>
  );
};
