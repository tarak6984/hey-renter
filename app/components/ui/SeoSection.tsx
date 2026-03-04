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
    <section className="bg-white border border-gray-100 rounded-2xl mx-auto max-w-5xl my-12 p-8 shadow-sm">
      <h2 className="text-xl font-extrabold text-center mb-4 tracking-wide">{title}</h2>
      <p className="text-gray-500 text-center text-sm mb-6">
        Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content.
      </p>
      <p className="text-gray-600 text-sm leading-7 mb-4">
        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry&apos;s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
      </p>
      {expanded && (
        <p className="text-gray-600 text-sm leading-7 mb-4">
          It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using &apos;Content here, content here&apos;, making it look like readable English. Many desktop publishing packages and versions of Lorem Ipsum.
        </p>
      )}
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full mt-4 flex items-center justify-center gap-2 py-3 border border-gray-200 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors"
      >
        SEE MORE
        <ChevronDown size={16} className={expanded ? 'rotate-180 transition-transform' : 'transition-transform'} />
      </button>
    </section>
  );
}
