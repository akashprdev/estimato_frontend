import { motion } from 'framer-motion';
import { Layers, Settings } from 'lucide-react';

function NavItem({
  icon: Icon,
  label,
  active = false,
}: {
  icon: React.ElementType;
  label: string;
  active?: boolean;
}) {
  return (
    <motion.a
      href="#"
      whileHover={{ x: 3 }}
      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
      className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors cursor-pointer
        ${
          active
            ? 'bg-secondary text-secondary-foreground'
            : 'text-muted-foreground hover:bg-muted hover:text-foreground'
        }`}
    >
      <Icon
        size={16}
        className={active ? 'text-primary' : 'text-muted-foreground'}
      />
      {label}
    </motion.a>
  );
}

export function PokerSidebar() {
  const nav = [
    { icon: Layers, label: 'Poker Table', active: true },
    { icon: Settings, label: 'Create New Room', active: false },
  ];
  return (
    <aside className="w-52 h-full flex flex-col py-5 px-3 bg-background border-r border-border flex-shrink-0">
      <div className="px-3 mb-6">
        <p className="text-[10px] font-bold text-muted-foreground tracking-[0.12em] uppercase mt-0.5">
          Planning Poker
        </p>
      </div>
      <nav className="flex flex-col gap-0.5 flex-1">
        {nav.map((n) => (
          <NavItem key={n.label} {...n} />
        ))}
      </nav>
    </aside>
  );
}
