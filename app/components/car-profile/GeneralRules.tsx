import { Car } from '@/app/types';
import { CheckCircle2 } from 'lucide-react';

interface GeneralRulesProps {
  car: Car;
}

/**
 * General rules + documents needed grid on the Car Profile page.
 */
export default function GeneralRules({ car }: GeneralRulesProps) {
  const rules = [
    { label: 'Minimum Age',       value: `${car.minAge} Years old` },
    { label: 'Security Deposit',  value: car.securityDeposit ? 'Required' : 'No' },
    { label: 'Security Deposit',  value: '30 days' },
    { label: 'Mileage',           value: `${car.mileagePerDay} KM per rental / ${Math.round(car.mileagePerDay / 30)} KM per day` },
    { label: 'Fuel Policy',       value: car.fuelPolicy },
  ];

  return (
    <div className="grid md:grid-cols-2 gap-6 mt-6">
      {/* General Rules */}
      <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
        <h3 className="font-bold text-sm mb-1">General Rules</h3>
        <p className="text-xs text-gray-500 mb-4">{car.insurance}</p>
        <div className="space-y-3">
          {rules.map((r, i) => (
            <div key={i} className="flex items-start justify-between text-sm border-b border-gray-50 pb-2 last:border-0">
              <span className="text-gray-500 text-xs">{r.label}</span>
              <span className="font-semibold text-xs text-gray-800 text-right max-w-[55%]">{r.value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Documents Needed */}
      <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm space-y-4">
        <div>
          <h3 className="font-bold text-sm mb-3">Documents Needed</h3>
          <ul className="space-y-2">
            {car.documents.map((doc) => (
              <li key={doc} className="flex items-center gap-2 text-xs text-gray-700">
                <CheckCircle2 size={14} className="text-green-500 flex-shrink-0" />
                {doc}
              </li>
            ))}
          </ul>
        </div>

        {/* Languages */}
        <div>
          <h3 className="font-bold text-sm mb-2">Languages</h3>
          <div className="flex flex-wrap gap-2">
            {car.languages.map((lang) => (
              <span key={lang} className="text-xs bg-gray-100 rounded-full px-3 py-1 text-gray-600">{lang}</span>
            ))}
          </div>
        </div>

        {/* Payments */}
        <div>
          <h3 className="font-bold text-sm mb-2">Payments</h3>
          <div className="flex flex-wrap gap-2">
            {car.payments.map((p) => (
              <span key={p} className="text-xs bg-gray-100 rounded-full px-3 py-1 text-gray-600">{p}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
