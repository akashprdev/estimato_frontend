import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Bell, Settings, Shield, Zap } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { PARTICIPANTS } from '@/constants/data';
import { Link, useNavigate } from '@tanstack/react-router';

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1] as const,
      delay: i * 0.08,
    },
  }),
};

const ONLINE_MEMBERS = [
  {
    name: 'Sarah K.',
    role: 'Product Owner',
    img: PARTICIPANTS[0].img,
    badge: 'bg-primary',
  },
  {
    name: 'Marcus Chen',
    role: 'Lead Dev',
    img: PARTICIPANTS[2].img,
    badge: 'bg-amber-500',
  },
  {
    name: 'Elena R.',
    role: 'Design Lead',
    img: PARTICIPANTS[3].img,
    badge: null,
  },
];

export default function CreateRoom() {
  const [sessionCode, setSessionCode] = useState('');
  const [isJoining, setIsJoining] = useState(false);
  const navigate = useNavigate();

  const handleJoin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!sessionCode.trim()) return;
    setIsJoining(true);
    setTimeout(
      () =>
        navigate({
          to: '/',
        }),
      600
    );
  };

  return (
    <div className="min-h-screen w-full bg-background flex flex-col">
      {/* ── Top bar ── */}
      <header className="h-16 shrink-0 flex items-center justify-between px-8 border-b border-border/60">
        <span className="text-[15px] font-black text-primary tracking-tight">
          The Fluid Collaborative
        </span>
        <div className="flex items-center gap-3">
          <button className="w-9 h-9 rounded-full flex items-center justify-center text-muted-foreground hover:bg-accent transition-colors">
            <Bell size={18} />
          </button>
          <button className="w-9 h-9 rounded-full flex items-center justify-center text-muted-foreground hover:bg-accent transition-colors">
            <Settings size={18} />
          </button>
          <div className="w-9 h-9 rounded-full bg-foreground text-background flex items-center justify-center text-xs font-bold overflow-hidden">
            {PARTICIPANTS[5].img ? (
              <img
                src={PARTICIPANTS[5].img}
                className="w-full h-full object-cover"
                alt=""
              />
            ) : (
              PARTICIPANTS[5].initials
            )}
          </div>
        </div>
      </header>

      {/* ── Main ── */}
      <main className="flex-1 flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-[780px] bg-card rounded-3xl border border-border shadow-[0_24px_80px_rgba(0,0,0,0.05)] overflow-hidden"
        >
          <div className="grid grid-cols-1 md:grid-cols-[1fr_300px]">
            {/* ── Left column ── */}
            <div className="p-10 md:p-12">
              <motion.span
                custom={0}
                variants={fadeUp}
                initial="hidden"
                animate="show"
                className="text-[11px] font-extrabold text-primary tracking-[0.16em] uppercase"
              >
                Entry Portal
              </motion.span>

              <motion.h1
                custom={1}
                variants={fadeUp}
                initial="hidden"
                animate="show"
                className="text-[42px] font-black text-foreground tracking-tight leading-[1.1] mt-3 mb-4"
              >
                Create
                <br />
                Session
              </motion.h1>

              <motion.p
                custom={2}
                variants={fadeUp}
                initial="hidden"
                animate="show"
                className="text-[15px] text-muted-foreground leading-relaxed max-w-xs mb-10"
              >
                Start a collaborative estimation session and invite your team
                instantly.
              </motion.p>

              <form onSubmit={handleJoin}>
                <motion.div
                  custom={3}
                  variants={fadeUp}
                  initial="hidden"
                  animate="show"
                  className="space-y-2 mb-5"
                >
                  <label className="text-[10px] font-extrabold text-muted-foreground tracking-[0.16em] uppercase">
                    Session Name
                  </label>
                  <Input
                    value={sessionCode}
                    onChange={(e) =>
                      setSessionCode(e.target.value.toUpperCase())
                    }
                    placeholder="Sprint Planning #42"
                    className="h-14 rounded-2xl bg-muted/40 border-0 text-base font-semibold text-foreground tracking-wider placeholder:text-muted-foreground/35 placeholder:tracking-normal placeholder:font-medium focus-visible:ring-1 focus-visible:ring-primary/40 focus-visible:bg-background transition-all"
                  />
                </motion.div>

                <motion.div
                  custom={4}
                  variants={fadeUp}
                  initial="hidden"
                  animate="show"
                >
                  <Button
                    type="submit"
                    disabled={!sessionCode.trim()}
                    className="w-full h-14 rounded-2xl text-[15px] font-extrabold bg-primary text-primary-foreground hover:bg-primary/90 shadow-[0_8px_28px_hsl(var(--primary)/0.35)] disabled:opacity-30 disabled:shadow-none transition-all"
                  >
                    <AnimatePresence mode="wait">
                      {isJoining ? (
                        <motion.span
                          key="joining"
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="flex items-center gap-2"
                        >
                          <Zap size={16} className="animate-pulse" />
                          Creating session…
                        </motion.span>
                      ) : (
                        <motion.span
                          key="enter"
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                        >
                          Create Workspace
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </Button>
                </motion.div>
              </form>

              <motion.div
                custom={5}
                variants={fadeUp}
                initial="hidden"
                animate="show"
                className="flex items-center gap-2 mt-5"
              >
                <Shield size={12} className="text-muted-foreground/40" />
                <span className="text-[11px] text-muted-foreground/50 font-medium">
                  Secured with end-to-end encryption
                </span>
              </motion.div>
            </div>

            {/* ── Right column ── */}
            <div className="hidden md:flex flex-col gap-3 p-6 pt-10">
              {/* Online now panel */}
              <motion.div
                custom={2}
                variants={fadeUp}
                initial="hidden"
                animate="show"
                className="bg-muted/50 rounded-2xl p-5"
              >
                <div className="flex items-center justify-between mb-5">
                  <span className="text-[10px] font-extrabold text-muted-foreground tracking-[0.14em] uppercase">
                    Online Now
                  </span>
                  <span className="flex items-center gap-1.5 text-[11px] font-bold text-green-600">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                    3 Active
                  </span>
                </div>

                <div className="space-y-4">
                  {ONLINE_MEMBERS.map((member, i) => (
                    <motion.div
                      key={member.name}
                      custom={3 + i}
                      variants={fadeUp}
                      initial="hidden"
                      animate="show"
                      className="flex items-center gap-3 relative"
                    >
                      <div className="relative flex-shrink-0">
                        <div className="w-10 h-10 rounded-full overflow-hidden bg-muted">
                          {member.img ? (
                            <img
                              src={member.img}
                              alt={member.name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-xs font-bold text-muted-foreground">
                              {member.name[0]}
                            </div>
                          )}
                        </div>
                        {member.badge && (
                          <div
                            className={`absolute -bottom-0.5 -right-0.5 w-4 h-4 ${member.badge} rounded-full border-2 border-card flex items-center justify-center`}
                          >
                            <span className="text-[7px] text-primary-foreground">
                              ✓
                            </span>
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[13px] font-bold text-foreground truncate">
                          {member.name}
                        </p>
                        <p className="text-[11px] text-muted-foreground font-medium">
                          {member.role}
                        </p>
                      </div>
                      {i === ONLINE_MEMBERS.length - 1 && (
                        <motion.div
                          initial={{ opacity: 0, x: 10, rotate: -5 }}
                          animate={{ opacity: 1, x: 0, rotate: -3 }}
                          transition={{
                            delay: 1.2,
                            type: 'spring',
                            stiffness: 200,
                            damping: 15,
                          }}
                          className="absolute -right-2 bottom-0 bg-secondary text-secondary-foreground text-[9px] font-extrabold px-2.5 py-1 rounded-full flex items-center gap-1 shadow-sm"
                        >
                          <Zap size={8} /> JOINING…
                        </motion.div>
                      )}
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Create new */}
              <motion.div
                custom={6}
                variants={fadeUp}
                initial="hidden"
                animate="show"
                className="group flex items-center justify-between bg-muted/50 hover:bg-accent rounded-2xl p-5 transition-colors cursor-pointer text-left"
              >
                <Link to="/join" className="flex-1">
                  <p className="text-[13px] font-bold text-foreground">
                    Join Room
                  </p>
                  <p className="text-[11px] text-muted-foreground font-medium">
                    Join an existing session
                  </p>
                </Link>
                <div className="w-10 h-10 rounded-full flex items-center justify-center text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all">
                  <ArrowRight size={20} />
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
