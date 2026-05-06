import { Link, useNavigate } from '@tanstack/react-router';
import { motion } from 'framer-motion';
import {
  ChevronsUpDown,
  Layers,
  LogOut,
  Pencil,
  PlusCircleIcon,
  User2Icon,
} from 'lucide-react';
import { Button } from './ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { getPlayerId, getPlayerName, setPlayerName } from '@/utilities/helper';
import { NameModal } from './NameModal';
import { useState } from 'react';
import { socket } from '@/utilities/socket';
const nav = [
  { icon: Layers, label: 'Poker Table', active: true },
  {
    icon: PlusCircleIcon,
    label: 'Create New Room',
    active: false,
    link: '/',
  },
];

function NavItem({
  icon: Icon,
  label,
  active = false,
  link: link,
}: {
  icon: React.ElementType;
  label: string;
  active?: boolean;
  link?: string;
}) {
  return (
    <motion.div
      whileHover={{ x: 3 }}
      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
      className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors cursor-pointer
        ${
          active
            ? 'bg-secondary text-secondary-foreground'
            : 'text-muted-foreground hover:bg-muted hover:text-foreground'
        }`}
    >
      <Link to={link} replace={true} className="flex items-center gap-2">
        <Icon
          size={16}
          className={active ? 'text-primary' : 'text-muted-foreground'}
        />
        {label}
      </Link>
    </motion.div>
  );
}

export function PokerSidebar() {
  const stroredName = getPlayerName();
  const [open, setOpen] = useState(false);
  // const [name, setName] = useState<string | null>(getPlayerName());
  const navigate = useNavigate();

  const handleLogout = () => {
    console.log('🚪 Logging out...');

    if (socket.connected) {
      socket.disconnect();
    }

    localStorage.removeItem('playerId');

    navigate({ to: '/' });
  };

  return (
    <>
      <aside className="w-52 relative h-full flex flex-col py-5 px-3 bg-background border-r border-border flex-shrink-0">
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
        <div className="fixed w-52 bottom-2 left-0">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size="lg" variant="outline" className="w-full">
                <User2Icon className="size-5" />
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">{stroredName}</span>
                </div>
                <ChevronsUpDown className="ml-auto size-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
              align="end"
              sideOffset={4}
            >
              <DropdownMenuLabel className="p-0 font-normal">
                <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-medium">
                      Name: {stroredName}
                    </span>
                  </div>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem onClick={() => setOpen(true)}>
                  <Pencil />
                  Update Name
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />

              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}>
                <LogOut />
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </aside>
      <NameModal
        open={open}
        setOpen={setOpen}
        onSubmit={(value) => {
          // setName(value);
          setPlayerName(value);

          socket.emit('update_name', {
            playerId: getPlayerId(),
            name: value,
          });

          setOpen(false);
        }}
      />
    </>
  );
}
