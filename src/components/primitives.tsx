import { CheckCircle2, Clock } from 'lucide-react';

interface AvatarProps {
  img: string | null;
  initials: string;
  colorClass?: string;
  size?: 'sm' | 'md' | 'lg';
}

export function PokerAvatar({
  img,
  initials,
  colorClass = 'bg-muted text-muted-foreground',
  size = 'md',
}: AvatarProps) {
  const sizeMap = {
    sm: 'w-6 h-6 text-[9px]',
    md: 'w-11 h-11 text-xs',
    lg: 'w-12 h-12 text-sm',
  };
  return (
    <div
      className={`${sizeMap[size]} ${colorClass} rounded-full flex-shrink-0 flex items-center justify-center font-bold overflow-hidden`}
    >
      {img ? (
        <img src={img} alt={initials} className="w-full h-full object-cover" />
      ) : (
        initials
      )}
    </div>
  );
}

export function VoteStatus({ voted }: { voted: boolean }) {
  return voted ? (
    <CheckCircle2
      size={20}
      className="text-primary"
      fill="currentColor"
      strokeWidth={0}
    />
  ) : (
    <Clock size={17} className="text-muted-foreground/50" />
  );
}

export function Pill({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-extrabold tracking-wider uppercase ${className}`}
    >
      {children}
    </span>
  );
}

export function EyebrowLabel({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p
      className={`text-[10px] font-extrabold text-muted-foreground tracking-[0.14em] uppercase mb-1.5 ${className}`}
    >
      {children}
    </p>
  );
}
