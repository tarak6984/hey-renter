'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/app/lib/utils';
import { FAQ_ITEMS } from '@/app/constants';

/**
 * Expandable FAQ accordion matching the Figma Car Profile design.
 * Second item starts expanded (highlighted in lime green) per design.
 */
export default function FaqAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(1);

  return (
    <section className="mt-10">
      <h2 className="text-2xl font-extrabold mb-2">FAQ</h2>
      <p className="text-gray-500 text-sm mb-6">
        Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content.
      </p>

      <div className="space-y-2">
        {FAQ_ITEMS.map((item, i) => {
          const isOpen = openIndex === i;
          const isHighlighted = isOpen && i === 1;

          return (
            <div
              key={i}
              className={cn(
                'rounded-xl border transition-all overflow-hidden',
                isHighlighted
                  ? 'border-[#CDFF00] bg-[#f9ffe0]'
                  : 'border-gray-200 bg-white'
              )}
            >
              <button
                onClick={() => setOpenIndex(isOpen ? null : i)}
                className="w-full flex items-center justify-between px-5 py-4 text-left"
              >
                <span className="text-sm font-semibold text-gray-800">{item.question}</span>
                <ChevronDown
                  size={18}
                  className={cn(
                    'text-gray-400 flex-shrink-0 ml-4 transition-transform',
                    isOpen && 'rotate-180'
                  )}
                />
              </button>
              {isOpen && (
                <div className="px-5 pb-4 text-sm text-gray-600 leading-relaxed">
                  {item.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <button className="w-full mt-4 py-3.5 border border-gray-200 rounded-xl text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
        SEE – 200 FAQs
        <ChevronDown size={15} />
      </button>
    </section>
  );
}
