/**
 * Stats row showing "500+ Rental Companies" and "3,000+ Rental Cars".
 */
export default function StatsRow() {
  return (
    <div className="flex items-center justify-center gap-12 py-10">
      <StatItem value="500+" label="Rental" label2="Companies" />
      <StatItem value="3,000+" label="Rental" label2="Cars" />
    </div>
  );
}

function StatItem({ value, label, label2 }: { value: string; label: string; label2: string }) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-4xl md:text-5xl font-extrabold text-black tracking-tighter">{value}</span>
      <div className="flex flex-col text-sm text-gray-500 leading-tight">
        <span>{label}</span>
        <span>{label2}</span>
      </div>
    </div>
  );
}
