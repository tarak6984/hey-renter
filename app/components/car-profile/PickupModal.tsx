'use client';

import { useState } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { cn, getCalendarDays, MONTH_NAMES } from '@/app/lib/utils';

interface PickupModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: (dateString: string) => void;
}

type RentalTab = 'Daily' | 'Monthly' | 'Hourly';

/**
 * Pickup date/time selection modal.
 * Tabs: Daily (calendar + time scroll), Monthly (dial), Hourly (calendar + duration).
 */
export default function PickupModal({ open, onClose, onConfirm }: PickupModalProps) {
  const [tab, setTab] = useState<RentalTab>('Daily');
  const today = new Date();
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [selectedHour, setSelectedHour] = useState(8);
  const [selectedMinute, setSelectedMinute] = useState(0);
  const [isPM, setIsPM] = useState(true);
  const [months, setMonths] = useState(3);

  if (!open) return null;

  const days = getCalendarDays(viewYear, viewMonth);

  const prevMonth = () => {
    if (viewMonth === 0) { setViewMonth(11); setViewYear(y => y - 1); }
    else setViewMonth(m => m - 1);
  };
  const nextMonth = () => {
    if (viewMonth === 11) { setViewMonth(0); setViewYear(y => y + 1); }
    else setViewMonth(m => m + 1);
  };

  const handleConfirm = () => {
    if (tab === 'Daily' && selectedDay) {
      const h = selectedHour % 12 + (isPM ? 12 : 0);
      const dateStr = `${MONTH_NAMES[viewMonth].slice(0,3)} ${selectedDay} - ${selectedHour}:${String(selectedMinute).padStart(2,'0')} ${isPM ? 'PM' : 'AM'}`;
      onConfirm(dateStr);
    } else if (tab === 'Monthly') {
      onConfirm(`${months} month${months > 1 ? 's' : ''}`);
    } else if (tab === 'Hourly' && selectedDay) {
      onConfirm(`${MONTH_NAMES[viewMonth].slice(0,3)} ${selectedDay} – ${selectedHour}h`);
    }
  };

  /* ── Monthly dial angle ── */
  const dialAngle = ((months - 1) / 11) * 270 - 135; // -135° to +135°

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4" onClick={onClose}>
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-sm overflow-hidden" onClick={e => e.stopPropagation()}>
        {/* Tabs */}
        <div className="flex bg-gray-100 m-4 rounded-full p-1">
          {(['Daily', 'Monthly', 'Hourly'] as RentalTab[]).map(t => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={cn(
                'flex-1 py-2 text-sm font-semibold rounded-full transition-all',
                tab === t ? 'bg-white shadow text-black' : 'text-gray-500 hover:text-gray-700'
              )}
            >
              {t}
            </button>
          ))}
        </div>

        <div className="px-5 pb-5">
          {/* ── DAILY / HOURLY: Calendar ── */}
          {(tab === 'Daily' || tab === 'Hourly') && (
            <>
              {/* Month navigation */}
              <div className="flex items-center justify-between mb-4">
                <span className="font-bold text-sm">{MONTH_NAMES[viewMonth]} {viewYear}</span>
                <div className="flex gap-2">
                  <button onClick={prevMonth} className="w-7 h-7 rounded-full hover:bg-gray-100 flex items-center justify-center"><ChevronLeft size={15} /></button>
                  <button onClick={nextMonth} className="w-7 h-7 rounded-full hover:bg-gray-100 flex items-center justify-center"><ChevronRight size={15} /></button>
                </div>
              </div>

              {/* Day headers */}
              <div className="grid grid-cols-7 mb-1">
                {['S','M','T','W','T','F','S'].map((d, i) => (
                  <div key={i} className="text-center text-xs font-semibold text-gray-400 py-1">{d}</div>
                ))}
              </div>

              {/* Day cells */}
              <div className="grid grid-cols-7 gap-y-1 mb-4">
                {days.map((d, i) => (
                  <div key={i} className="flex items-center justify-center">
                    {d !== null ? (
                      <button
                        onClick={() => setSelectedDay(d)}
                        className={cn(
                          'w-8 h-8 rounded-full text-sm font-medium transition-all',
                          selectedDay === d ? 'bg-black text-white' : 'hover:bg-gray-100 text-gray-700'
                        )}
                      >
                        {d}
                      </button>
                    ) : <div className="w-8 h-8" />}
                  </div>
                ))}
              </div>

              {/* Time scroll – Daily only */}
              {tab === 'Daily' && (
                <div className="flex items-center justify-center gap-4 border-t pt-4">
                  <TimeScroll value={selectedHour} min={1} max={12} onChange={setSelectedHour} />
                  <TimeScroll value={selectedMinute} min={0} max={59} onChange={setSelectedMinute} pad />
                  <div className="flex flex-col items-center gap-1 text-sm font-semibold">
                    <button onClick={() => setIsPM(false)} className={cn('px-2 py-0.5 rounded', !isPM ? 'font-bold text-black' : 'text-gray-300')}>AM</button>
                    <button onClick={() => setIsPM(true)}  className={cn('px-2 py-0.5 rounded', isPM  ? 'font-bold text-black' : 'text-gray-300')}>PM</button>
                  </div>
                </div>
              )}

              {/* Duration hours – Hourly only */}
              {tab === 'Hourly' && (
                <div className="flex items-center justify-between border-t pt-4">
                  <span className="text-sm font-semibold text-gray-600">Duration (hours)</span>
                  <div className="flex items-center gap-3">
                    <button onClick={() => setSelectedHour(h => Math.max(1, h - 1))} className="w-8 h-8 bg-gray-100 rounded-full font-bold">−</button>
                    <span className="text-lg font-extrabold w-6 text-center">{selectedHour}</span>
                    <button onClick={() => setSelectedHour(h => Math.min(24, h + 1))} className="w-8 h-8 bg-gray-100 rounded-full font-bold">+</button>
                  </div>
                </div>
              )}
            </>
          )}

          {/* ── MONTHLY: Radial dial ── */}
          {tab === 'Monthly' && (
            <div className="flex flex-col items-center gap-6">
              <div className="relative w-52 h-52">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 200 200">
                  {/* Background track */}
                  <circle cx="100" cy="100" r="80" fill="none" stroke="#f0f0f0" strokeWidth="16" />
                  {/* Progress arc */}
                  <circle
                    cx="100" cy="100" r="80"
                    fill="none"
                    stroke="#CDFF00"
                    strokeWidth="16"
                    strokeLinecap="round"
                    strokeDasharray={`${(months / 12) * 502} 502`}
                  />
                </svg>
                {/* Center label */}
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-4xl font-extrabold">{months}</span>
                  <span className="text-sm text-gray-500">months</span>
                </div>
                {/* Draggable knob dots */}
                {[1,2,3,4,5,6,7,8,9,10,11,12].map(m => {
                  const angle = ((m / 12) * 360 - 90) * (Math.PI / 180);
                  const x = 100 + 80 * Math.cos(angle);
                  const y = 100 + 80 * Math.sin(angle);
                  return (
                    <button
                      key={m}
                      onClick={() => setMonths(m)}
                      className="absolute w-3 h-3 -translate-x-1/2 -translate-y-1/2"
                      style={{ left: `${(x / 200) * 100}%`, top: `${(y / 200) * 100}%` }}
                      aria-label={`${m} months`}
                    >
                      <div className={cn(
                        'w-3 h-3 rounded-full transition-all',
                        m === months ? 'bg-white border-2 border-[#CDFF00] scale-125 shadow' : 'bg-gray-300 scale-75'
                      )} />
                    </button>
                  );
                })}
              </div>
              <button className="text-sm font-semibold underline text-gray-600">Start Date</button>
            </div>
          )}

          {/* Confirm */}
          <button
            onClick={handleConfirm}
            className="w-full mt-5 bg-[#CDFF00] hover:bg-[#b8e600] text-black font-bold py-3.5 rounded-full transition-colors"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}

/* ── TimeScroll ─────────────────────────────────────────────────────────────── */
function TimeScroll({ value, min, max, onChange, pad }: {
  value: number; min: number; max: number; onChange: (v: number) => void; pad?: boolean;
}) {
  const fmt = (n: number) => pad ? String(n).padStart(2, '0') : String(n);
  return (
    <div className="flex flex-col items-center select-none">
      <button onClick={() => onChange(value === max ? min : value + 1)} className="text-gray-300 hover:text-gray-500 text-lg leading-none pb-1">▲</button>
      <span className="text-xl font-extrabold w-8 text-center">{fmt(value)}</span>
      <button onClick={() => onChange(value === min ? max : value - 1)} className="text-gray-300 hover:text-gray-500 text-lg leading-none pt-1">▼</button>
    </div>
  );
}
