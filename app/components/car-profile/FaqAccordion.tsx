'use client';

import { useState } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { cn } from '@/app/lib/utils';
import { FAQ_ITEMS } from '@/app/constants';

/**
 * FAQ section aligned to the Car Profile Figma block.
 * The second item starts expanded per the design.
 */
export default function FaqAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(1);

  return (
    <section className="mt-16 min-w-0">
      <div className="flex flex-col items-center gap-6">
        <h2
          className="text-center text-black"
          style={{
            fontFamily: 'var(--font-clash)',
            fontSize: 'clamp(24px, 6vw, 30px)',
            fontWeight: 600,
            lineHeight: '38px',
          }}
        >
          FAQ
        </h2>

        <p className="text-center text-[16px] font-normal leading-6 text-black sm:text-[18px] sm:leading-[26px]">
          Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content.
        </p>
      </div>

      <div className="mt-10 space-y-4 sm:space-y-6">
        {FAQ_ITEMS.map((item, i) => {
          const isOpen = openIndex === i;

          return (
            <div key={i} className="space-y-4">
              <button
                type="button"
                onClick={() => setOpenIndex(isOpen ? null : i)}
                className={cn(
                  'flex min-h-[72px] w-full items-center justify-between rounded-[10px] border-2 px-4 py-4 text-left transition-colors sm:px-6 sm:py-6',
                  isOpen ? 'border-black/10 bg-black/20' : 'border-black/10 bg-black/[0.06]'
                )}
              >
                  <span className="min-w-0 pr-4 text-[16px] font-medium leading-6 text-black sm:text-[18px] sm:leading-[26px]">
                  {item.question}
                </span>
                <AccordionArrow expanded={isOpen} />
              </button>

              {isOpen ? (
                <div className="min-w-0 overflow-hidden rounded-[10px] border border-black/20 bg-[#B8F04F] px-4 py-4 sm:px-6 sm:py-6">
                  <p className="text-[15px] font-medium leading-6 text-black sm:text-[16px] sm:leading-[24px]">
                    {item.answer}
                  </p>
                </div>
              ) : null}
            </div>
          );
        })}
      </div>

      <button className="mt-10 flex h-14 w-full items-center justify-center gap-2 rounded-[10px] border-2 border-black px-4 text-center text-[16px] font-medium leading-6 text-black transition-colors hover:bg-white/70 sm:px-5 sm:pl-6 sm:text-[18px] sm:leading-[26px]">
        SEE - 200 FAQs
        <ChevronRight size={24} strokeWidth={2.5} aria-hidden="true" />
      </button>
    </section>
  );
}

function AccordionArrow({ expanded }: { expanded: boolean }) {
  return (
    <ChevronDown
      size={24}
      strokeWidth={2.5}
      aria-hidden="true"
      className={cn('flex-shrink-0 text-black transition-transform', expanded && 'rotate-180')}
    />
  );
}
