import { CheckCircle2, Clock } from 'lucide-react';

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
