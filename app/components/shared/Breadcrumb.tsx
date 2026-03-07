import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

/**
 * Breadcrumb navigation used on Car Profile and Confirmation pages.
 */
export default function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav
      aria-label="Breadcrumb"
      className="mx-auto flex w-full max-w-[1440px] items-center gap-1.5 px-4 py-4 text-sm sm:px-6 md:px-[39px]"
    >
      {items.map((item, i) => (
        <span key={i} className="flex items-center gap-1.5">
          {i > 0 ? <ChevronRight size={14} className="text-gray-400" /> : null}
          {item.href ? (
            <Link
              href={item.href}
              className="font-medium text-gray-600 transition-colors hover:text-black"
            >
              {item.label}
            </Link>
          ) : (
            <span className="text-gray-400">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
