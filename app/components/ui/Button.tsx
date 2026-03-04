import { cn } from '@/app/lib/utils';
import { ButtonHTMLAttributes, forwardRef } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'whatsapp';
  size?: 'sm' | 'md' | 'lg';
}

/**
 * Reusable Button component with multiple variants matching the HeyRenter design.
 */
const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center gap-2 font-semibold rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none',
          {
            // Primary – lime green (main CTA)
            'bg-[#CDFF00] text-black hover:bg-[#b8e600] focus:ring-[#CDFF00]': variant === 'primary',
            // Secondary – dark fill
            'bg-[#222] text-white hover:bg-[#333] focus:ring-gray-500': variant === 'secondary',
            // Outline
            'border-2 border-[#CDFF00] text-[#CDFF00] hover:bg-[#CDFF00] hover:text-black focus:ring-[#CDFF00]': variant === 'outline',
            // Ghost
            'bg-transparent text-white hover:bg-white/10 focus:ring-white/20': variant === 'ghost',
            // WhatsApp green
            'bg-[#25D366] text-white hover:bg-[#1ebe5b] focus:ring-[#25D366]': variant === 'whatsapp',
          },
          {
            'text-xs px-3 py-1.5': size === 'sm',
            'text-sm px-5 py-2.5': size === 'md',
            'text-base px-7 py-3.5': size === 'lg',
          },
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
export default Button;
