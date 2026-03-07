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
    <div className="flex items-center justify-center gap-1 py-8">
      <PageBtn disabled={currentPage <= 1} onClick={() => onPageChange(currentPage - 1)}>
        Prev
      </PageBtn>

      {pages.map((p, i) =>
        p === '...' ? (
          <span key={`ellipsis-${i}`} className="w-9 text-center text-sm text-gray-400">
            ...
          </span>
        ) : (
          <PageBtn
            key={p}
            active={p === currentPage}
            onClick={() => onPageChange(p as number)}
          >
            {p}
          </PageBtn>
        )
      )}

      <PageBtn disabled={currentPage >= totalPages} onClick={() => onPageChange(currentPage + 1)}>
        Next
      </PageBtn>
    </div>
  );
}

function PageBtn({
  children,
  active,
  disabled,
  onClick,
}: {
  children: React.ReactNode;
  active?: boolean;
  disabled?: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cn(
        'h-9 w-9 rounded-lg text-sm font-medium transition-colors',
        active ? 'bg-black text-white' : 'text-gray-600 hover:bg-gray-100',
        disabled && 'pointer-events-none opacity-40'
      )}
    >
      {children}
    </button>
  );
}

function buildPageArray(current: number, total: number): (number | '...')[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  const pages: (number | '...')[] = [1];
  if (current > 3) pages.push('...');
  for (let p = Math.max(2, current - 1); p <= Math.min(total - 1, current + 1); p++) {
    pages.push(p);
  }
  if (current < total - 2) pages.push('...');
  pages.push(total);
  return pages;
}
