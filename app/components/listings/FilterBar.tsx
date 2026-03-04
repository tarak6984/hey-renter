'use client';

import { SlidersHorizontal, ArrowUpDown, Tag, Infinity, X } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/app/lib/utils';

interface FilterBarProps {
  total: number;
  onNoDepositChange?: (v: boolean) => void;
  onUnlimitedMileageChange?: (v: boolean) => void;
}

/**
 * Filter bar shown above the listings grid.
 * Matches the Figma design: total count, Filters, Sort by, pill filters.
 */
export default function FilterBar({ total, onNoDepositChange, onUnlimitedMileageChange }: FilterBarProps) {
  const [noDeposit, setNoDeposit] = useState(true);
  const [unlimitedMileage, setUnlimitedMileage] = useState(false);

  const toggleNoDeposit = () => {
    const next = !noDeposit;
    setNoDeposit(next);
    onNoDepositChange?.(next);
  };

  const toggleUnlimitedMileage = () => {
    const next = !unlimitedMileage;
    setUnlimitedMileage(next);
    onUnlimitedMileageChange?.(next);
  };

  return (
    <div className="flex flex-col gap-3">
      {/* Top row: count + sort/filter */}
      <div className="flex items-center justify-between">
        <p className="text-sm font-semibold text-gray-700">{total} cars found</p>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-1.5 text-sm text-gray-600 hover:text-black transition-colors">
            <SlidersHorizontal size={15} />
            Filters
          </button>
          <button className="flex items-center gap-1.5 text-sm text-gray-600 hover:text-black transition-colors">
            <ArrowUpDown size={15} />
            Sort by
          </button>
        </div>
      </div>

      {/* Pill filters */}
      <div className="flex items-center gap-2 flex-wrap">
        <FilterPill active={noDeposit} icon={<X size={12} />} onClick={toggleNoDeposit}>
          No Deposit
        </FilterPill>
        <FilterPill active={false} hasDropdown onClick={() => {}}>
          Category
        </FilterPill>
        <FilterPill active={unlimitedMileage} icon={<Infinity size={12} />} onClick={toggleUnlimitedMileage}>
          Unlimited mileage
        </FilterPill>
        <FilterPill active={false} icon={<Tag size={12} />} onClick={() => {}}>
          Offers
        </FilterPill>
      </div>
    </div>
  );
}

function FilterPill({
  children, active, icon, hasDropdown, onClick,
}: {
  children: React.ReactNode;
  active?: boolean;
  icon?: React.ReactNode;
  hasDropdown?: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full border transition-all',
        active
          ? 'bg-black text-white border-black'
          : 'bg-white text-gray-700 border-gray-200 hover:border-gray-400'
      )}
    >
      {icon}
      {children}
      {hasDropdown && (
        <svg width="10" height="10" viewBox="0 0 10 10" fill="currentColor">
          <path d="M5 7L1 3h8z" />
        </svg>
      )}
    </button>
  );
}
