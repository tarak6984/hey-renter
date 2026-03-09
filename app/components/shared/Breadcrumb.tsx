import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { cn } from '@/app/lib/utils';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
  itemClassName?: string;
  linkClassName?: string;
  currentClassName?: string;
  separatorClassName?: string;
}

/**
 * Breadcrumb navigation used on Car Profile and Confirmation pages.
 */
export default function Breadcrumb({
  items,
  className,
  itemClassName,
  linkClassName,
  currentClassName,
  separatorClassName,
}: BreadcrumbProps) {
  return (
    <nav
      aria-label="Breadcrumb"
      className={cn(
        'mx-auto flex w-full max-w-[1440px] flex-wrap items-center gap-x-1.5 gap-y-2 px-4 py-4 text-sm sm:px-6 md:px-[39px]',
        className
      )}
    >
      {items.map((item, i) => (
        <span key={i} className={cn('flex min-w-0 items-center gap-1.5', itemClassName)}>
          {i > 0 ? <ChevronRight size={14} className={cn('text-gray-400', separatorClassName)} /> : null}
          {item.href ? (
            <Link
              href={item.href}
              className={cn(
                'min-w-0 truncate font-medium text-gray-600 transition-colors hover:text-black',
                linkClassName
              )}
            >
              {item.label}
            </Link>
          ) : (
            <span className={cn('min-w-0 truncate text-gray-400', currentClassName)}>{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
