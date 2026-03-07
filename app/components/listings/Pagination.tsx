'use client';

import { cn } from '@/app/lib/utils';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

/**
 * Pagination component - Prev / page numbers / Next.
 */
export default function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  const pages = buildPageArray(currentPage, totalPages);

  return (
    <div className="flex justify-center py-8">
      <nav
        aria-label="Pagination"
        className="inline-flex h-[46px] items-center overflow-hidden rounded-[11px] bg-[#E0DFDF] p-px"
      >
      <PageBtn
        disabled={currentPage <= 1}
        edge="left"
        onClick={() => onPageChange(currentPage - 1)}
      >
        Prev
      </PageBtn>

      {pages.map((p, i) =>
        p === '...' ? (
          <span
            key={`ellipsis-${i}`}
            className="flex h-[44px] w-[44px] items-center justify-center bg-white text-base leading-6 text-black"
          >
            ...
          </span>
        ) : (
          <PageBtn
            key={p}
            active={p === currentPage}
            ariaLabel={`Go to page ${p}`}
            onClick={() => onPageChange(p as number)}
          >
            {p}
          </PageBtn>
        )
      )}

      <PageBtn
        disabled={currentPage >= totalPages}
        edge="right"
        onClick={() => onPageChange(currentPage + 1)}
      >
        Next
      </PageBtn>
      </nav>
    </div>
  );
}

function PageBtn({
  children,
  active,
  disabled,
  edge,
  ariaLabel,
  onClick,
}: {
  children: React.ReactNode;
  active?: boolean;
  disabled?: boolean;
  edge?: 'left' | 'right';
  ariaLabel?: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      className={cn(
        'flex h-[44px] items-center justify-center bg-white text-base leading-6 text-black transition-colors',
        edge ? 'w-[72px]' : 'w-[44px]',
        active && 'bg-black font-medium text-[#B8F04F]',
        !active && 'font-normal',
        edge === 'left' && 'rounded-l-[10px]',
        edge === 'right' && 'rounded-r-[10px]',
        disabled && 'cursor-default'
      )}
    >
      {children}
    </button>
  );
}

function buildPageArray(current: number, total: number): (number | '...')[] {
  if (total <= 5) return Array.from({ length: total }, (_, i) => i + 1);

  const pageSet = new Set<number>([1, 2, total - 1, total]);

  if (current > 2 && current < total - 1) {
    pageSet.add(current);
  }
  if (current > 3) {
    pageSet.add(current - 1);
  }
  if (current < total - 2) {
    pageSet.add(current + 1);
  }

  const numbers = Array.from(pageSet)
    .filter((page) => page >= 1 && page <= total)
    .sort((a, b) => a - b);

  const pages: (number | '...')[] = [];
  for (let index = 0; index < numbers.length; index += 1) {
    const page = numbers[index];
    const previous = numbers[index - 1];

    if (previous !== undefined && page - previous > 1) {
      pages.push('...');
    }

    pages.push(page);
  }

  return pages;
}
