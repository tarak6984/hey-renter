import { cn } from '@/app/lib/utils';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'green' | 'dark';
  className?: string;
}

/**
 * Badge component – used for "No Deposit", category tags, etc.
 */
export default function Badge({ children, variant = 'default', className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full text-xs font-semibold px-3 py-1',
        {
          'bg-black/70 text-white backdrop-blur-sm': variant === 'default',
          'bg-[#CDFF00] text-black': variant === 'green',
          'bg-[#222] text-white': variant === 'dark',
        },
        className
      )}
    >
      {children}
    </span>
  );
}
