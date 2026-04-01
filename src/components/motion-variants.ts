export const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] as const },
  },
};

export const stagger = (delay = 0, each = 0.09) => ({
  hidden: {},
  show: { transition: { staggerChildren: each, delayChildren: delay } },
});

export const pageVariants = {
  initial: { opacity: 0, y: 14 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] as const },
  },
  exit: {
    opacity: 0,
    y: -10,
    transition: { duration: 0.25, ease: 'easeIn' as const },
  },
};

export const popSpring = {
  hidden: { opacity: 0, scale: 0.25, rotate: -10 },
  show: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: { type: 'spring', stiffness: 240, damping: 16 },
  },
};

export const badgeSpring = {
  hidden: { opacity: 0, scale: 0, y: 8 },
  show: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 320, damping: 22, delay: 0.25 },
  },
};
