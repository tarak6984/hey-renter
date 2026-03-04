import { CarSpec } from '@/app/types';
import { Gauge, Zap, Timer, Cpu, Users, Palette, Settings, Fuel } from 'lucide-react';

interface SpecsGridProps {
  specs: CarSpec;
}

/**
 * Car specifications grid – 4 columns of icon + label + value pairs.
 */
export default function SpecsGrid({ specs }: SpecsGridProps) {
  const items = [
    { icon: <Gauge size={20} />, label: 'TOP SPEED',   value: specs.topSpeed },
    { icon: <Cpu size={20} />,   label: 'ENGINE',       value: specs.engine },
    { icon: <Timer size={20} />, label: '0-100 KM/H',  value: specs.acceleration },
    { icon: <Zap size={20} />,   label: 'HORSE POWER', value: specs.horsepower },
    { icon: <Users size={20} />, label: 'SEAT CAPACITY',value: `${specs.seats} Person` },
    { icon: <Palette size={20} />,label: 'COLOR',       value: specs.color },
    { icon: <Settings size={20} />,label: 'TRANSMISSION',value: specs.transmission },
    { icon: <Fuel size={20} />,  label: 'FUEL TYPE',    value: specs.fuelType },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-5 bg-white rounded-2xl border border-gray-100 shadow-sm">
      {items.map(({ icon, label, value }) => (
        <div key={label} className="flex items-center gap-3">
          <span className="text-gray-400">{icon}</span>
          <div>
            <p className="text-[10px] font-semibold text-gray-400 tracking-wide">{label}</p>
            <p className="text-sm font-bold text-gray-900">{value}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
