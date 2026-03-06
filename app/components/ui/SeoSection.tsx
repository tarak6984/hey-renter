'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface SeoSectionProps {
  title?: string;
}

/**
 * SEO text block with a "See More" expandable toggle.
 * Reused on both Home and Listings pages.
 */
export default function SeoSection({ title = 'SEO SECTION' }: SeoSectionProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <section className="my-12 w-full rounded-[20px] border border-black/10 bg-white p-10">
      <div className="flex flex-col items-center gap-10">
        <h2
          className="w-full text-center text-black"
          style={{
            fontFamily: 'var(--font-clash)',
            fontSize: '30px',
            fontWeight: 600,
            lineHeight: '38px',
          }}
        >
          {title}
        </h2>
        <p className="max-w-[860px] text-center text-[18px] leading-[1.44] text-black/60">
          Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content.
        </p>
        <p className="max-w-[1282px] text-center text-[18px] leading-[1.6] text-black/75">
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry&apos;s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
        </p>
        {expanded && (
          <p className="max-w-[1282px] text-center text-[18px] leading-[1.6] text-black/75">
            It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using &apos;Content here, content here&apos;. Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
          </p>
        )}
        <button
          onClick={() => setExpanded(!expanded)}
          className="flex w-full items-center justify-center gap-2 rounded-[10px] border-[2px] border-black/10 bg-black/6 text-[18px] font-medium text-black/75 transition-colors hover:bg-black/8"
          style={{
            minHeight: '56px',
            padding: '20px 20px 20px 24px',
          }}
        >
          SEE MORE
          <ChevronDown size={18} className={expanded ? 'rotate-180 transition-transform' : 'transition-transform'} />
        </button>
      </div>
    </section>
  );
}
