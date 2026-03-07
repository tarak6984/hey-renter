const STATS = [
  {
    width: 252.94,
    value: '500+',
    valueWidth: 131,
    labelLines: ['Rental', 'Companies'],
    labelWidth: 83,
  },
  {
    width: 265.94,
    value: '3,000+',
    valueWidth: 179,
    labelLines: ['Rental', 'Cars'],
    labelWidth: 48,
  },
];

/**
 * Home stats strip from Figma node 8937:42823.
 */
export default function StatsRow() {
  return (
    <section className="w-full">
      <div className="mx-auto flex w-full max-w-[1440px] flex-wrap items-center justify-center gap-x-10 gap-y-6 px-4 sm:px-6 md:h-10 md:px-[39px]">
        {STATS.map((stat) => (
          <StatItem
            key={stat.value}
            width={stat.width}
            value={stat.value}
            valueWidth={stat.valueWidth}
            labelLines={stat.labelLines}
            labelWidth={stat.labelWidth}
          />
        ))}
      </div>
    </section>
  );
}

function StatItem({
  width,
  value,
  valueWidth,
  labelLines,
  labelWidth,
}: {
  width: number;
  value: string;
  valueWidth: number;
  labelLines: string[];
  labelWidth: number;
}) {
  return (
    <div className="flex h-[35px] items-center justify-center gap-2" style={{ width: `${width}px` }}>
      <span
        style={{
          width: `${valueWidth}px`,
          display: 'flex',
          alignItems: 'center',
          fontFamily: 'var(--font-clash)',
          fontSize: '48px',
          fontWeight: 700,
          lineHeight: '58px',
          color: '#000000',
        }}
      >
        {value}
      </span>

      <DividerSlash />

      <div
        className="flex flex-col justify-center"
        style={{
          width: labelWidth,
          height: 35,
          fontFamily: 'var(--font-tt-norms)',
          fontSize: '16px',
          fontWeight: 500,
          lineHeight: '24px',
          color: '#000000',
        }}
      >
        {labelLines.map((line) => (
          <span key={line}>{line}</span>
        ))}
      </div>
    </div>
  );
}

function DividerSlash() {
  return (
    <div
      aria-hidden
      className="flex h-[35px] w-10 flex-shrink-0 items-center justify-center"
    >
      <span
        className="block w-10 border-t border-[#E0DFDF]"
        style={{ transform: 'rotate(-55deg)' }}
      />
    </div>
  );
}
