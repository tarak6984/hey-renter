import { Car } from '@/app/types';

interface GeneralRulesProps {
  car: Car;
}

/**
 * General Rules + Documents/Languages/Payments – pixel-perfect from Figma node 7350:98323
 *
 * Figma tokens:
 * - Container: layout_WSFAWY – row, gap (from design), fills white
 * - General Rules card: white, /shadow/md, border-radius 20px
 *   - Insurance term: Black/6% bg, Black/6% border 1px, border-radius 10px
 *   - Each rule row: row, icon 32×32, text col gap 4px
 *   - Values: Body Medium/Medium 16px/500 Black/100%
 *   - Labels: Body Small/Medium 14px/500 Black/50%
 * - Documents card: white, /shadow/md, border-radius 20px
 *   - check_circle icon: green
 *   - Language pills: border #E0DFDF 1px, border-radius 100px, padding 4px 8px
 *   - Payment pills: same as language pills
 */

// Figma rule icons (inline SVG matching Figma component specs)
function PersonIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="8" r="3.5" stroke="black" strokeWidth="1.5"/>
      <path d="M5 20c0-3.866 3.134-7 7-7s7 3.134 7 7" stroke="black" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
}
function SecurityIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M12 3L4 6.5v5c0 4.418 3.355 8.555 8 9.5 4.645-.945 8-5.082 8-9.5v-5L12 3z" stroke="black" strokeWidth="1.5" strokeLinejoin="round"/>
    </svg>
  );
}
function MoneyIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="9" stroke="black" strokeWidth="1.5"/>
      <path d="M12 7v10M9.5 9.5C9.5 8.395 10.619 8 12 8s2.5.395 2.5 1.5S13.381 11 12 11s-2.5.895-2.5 2 1.119 2 2.5 2 2.5-.395 2.5-1.5" stroke="black" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
}
function MileageIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M12 5C8.134 5 5 8.134 5 12s3.134 7 7 7 7-3.134 7-7-3.134-7-7-7z" stroke="black" strokeWidth="1.5"/>
      <path d="M12 12l-3-3" stroke="black" strokeWidth="1.5" strokeLinecap="round"/>
      <circle cx="12" cy="12" r="1.5" fill="black"/>
    </svg>
  );
}
function FuelIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M7 21V7a2 2 0 012-2h6a2 2 0 012 2v4h1a1 1 0 011 1v4a1 1 0 01-1 1h-1v4" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M7 12h8" stroke="black" strokeWidth="1.5"/>
    </svg>
  );
}
function CheckCircleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="9" stroke="#22c55e" strokeWidth="1.5"/>
      <path d="M8 12l3 3 5-5" stroke="#22c55e" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

const RULES = [
  { icon: <PersonIcon />,   label: 'Minimum Age',      getValue: (c: Car) => `${c.minAge} Years old` },
  { icon: <SecurityIcon />, label: 'Security Deposit',  getValue: (c: Car) => c.securityDeposit ? 'Required' : 'No' },
  { icon: <MoneyIcon />,    label: 'Security Deposit',  getValue: () => '30 days' },
  { icon: <MileageIcon />,  label: 'Mileage',           getValue: (c: Car) => `${c.mileagePerDay} KM per rental` },
  { icon: <FuelIcon />,     label: 'Fuel Policy',       getValue: (c: Car) => c.fuelPolicy },
];

export default function GeneralRules({ car }: GeneralRulesProps) {
  return (
    <div className="grid md:grid-cols-2 gap-5 mt-5">

      {/* ── General Rules card ── */}
      <div
        className="bg-white flex flex-col"
        style={{
          borderRadius: 20,
          boxShadow: '0px 4px 6px -1px rgba(0,0,0,0.1), 0px 2px 4px -1px rgba(0,0,0,0.06)',
          padding: 24,
          gap: 16,
        }}
      >
        {/* Title */}
        <p style={{ fontSize: 18, fontWeight: 500, color: '#000', margin: 0 }}>General Rules</p>

        {/* Insurance pill */}
        <div
          className="flex items-center justify-between"
          style={{
            background: 'rgba(0,0,0,0.06)',
            border: '1px solid rgba(0,0,0,0.06)',
            borderRadius: 10,
            padding: '12px 16px',
          }}
        >
          <div className="flex flex-col" style={{ gap: 4 }}>
            <p style={{ fontSize: 16, fontWeight: 500, color: '#000', margin: 0 }}>{car.insurance}</p>
            <p style={{ fontSize: 14, fontWeight: 500, color: 'rgba(0,0,0,0.5)', margin: 0 }}>
              Excess amount 2K - 5K AED depend on vehicle
            </p>
          </div>
          {/* Shield icon */}
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}>
            <path d="M12 3L4 6.5v5c0 4.418 3.355 8.555 8 9.5 4.645-.945 8-5.082 8-9.5v-5L12 3z" stroke="black" strokeOpacity="0.5" strokeWidth="1.5" strokeLinejoin="round"/>
          </svg>
        </div>

        {/* Rules list */}
        <div className="flex flex-col" style={{ gap: 12 }}>
          {RULES.map((rule, i) => (
            <div
              key={i}
              className="flex items-center justify-between"
              style={{
                background: 'rgba(0,0,0,0.06)',
                border: '1px solid rgba(0,0,0,0.06)',
                borderRadius: 10,
                padding: '10px 16px',
              }}
            >
              <div className="flex items-center" style={{ gap: 10 }}>
                <div style={{ width: 24, height: 24, flexShrink: 0 }}>{rule.icon}</div>
                <p style={{ fontSize: 16, fontWeight: 500, color: '#000', margin: 0 }}>{rule.label}</p>
              </div>
              <p style={{ fontSize: 16, fontWeight: 500, color: '#000', margin: 0 }}>
                {rule.getValue(car)}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Documents / Languages / Payments card ── */}
      <div
        className="bg-white flex flex-col"
        style={{
          borderRadius: 20,
          boxShadow: '0px 4px 6px -1px rgba(0,0,0,0.1), 0px 2px 4px -1px rgba(0,0,0,0.06)',
          padding: 24,
          gap: 20,
        }}
      >
        {/* Documents Needed */}
        <div className="flex flex-col" style={{ gap: 12 }}>
          <p style={{ fontSize: 18, fontWeight: 500, color: '#000', margin: 0 }}>Documents Needed</p>
          {car.documents.map((doc) => (
            <div key={doc} className="flex items-center" style={{ gap: 10 }}>
              <CheckCircleIcon />
              <p style={{ fontSize: 16, fontWeight: 500, color: '#000', margin: 0 }}>{doc}</p>
            </div>
          ))}
        </div>

        {/* Languages */}
        <div className="flex flex-col" style={{ gap: 12 }}>
          <p style={{ fontSize: 18, fontWeight: 500, color: '#000', margin: 0 }}>Languages</p>
          <div className="flex flex-wrap" style={{ gap: 8 }}>
            {car.languages.map((lang) => (
              <div
                key={lang}
                className="flex items-center"
                style={{
                  border: '1px solid #E0DFDF',
                  borderRadius: 100,
                  padding: '4px 8px',
                }}
              >
                <span style={{ fontSize: 14, fontWeight: 500, color: 'rgba(0,0,0,0.8)' }}>{lang}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Payments */}
        <div className="flex flex-col" style={{ gap: 12 }}>
          <p style={{ fontSize: 18, fontWeight: 500, color: '#000', margin: 0 }}>Payments</p>
          <div className="flex flex-wrap" style={{ gap: 8 }}>
            {car.payments.map((p) => (
              <div
                key={p}
                className="flex items-center"
                style={{
                  border: '1px solid #E0DFDF',
                  borderRadius: 100,
                  padding: '4px 8px',
                }}
              >
                <span style={{ fontSize: 14, fontWeight: 500, color: 'rgba(0,0,0,0.8)' }}>{p}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
