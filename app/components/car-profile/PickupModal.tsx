'use client';

import { useState } from 'react';
import { cn, getCalendarDays, MONTH_NAMES } from '@/app/lib/utils';

interface PickupModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: (dateString: string) => void;
}

type RentalTab = 'Daily' | 'Monthly' | 'Hourly';

export default function PickupModal({ open, onClose, onConfirm }: PickupModalProps) {
  const [tab, setTab] = useState<RentalTab>('Daily');
  const today = new Date();
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());
  const [rangeStart, setRangeStart] = useState<number | null>(null);
  const [rangeEnd, setRangeEnd] = useState<number | null>(null);
  const [selectedHour, setSelectedHour] = useState(8);
  const [selectedMinute, setSelectedMinute] = useState(0);
  const [isPM, setIsPM] = useState(true);
  const [months, setMonths] = useState(3);
  const [hours, setHours] = useState(3);

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

  const handleDayClick = (d: number) => {
    if (!rangeStart || (rangeStart && rangeEnd)) {
      setRangeStart(d);
      setRangeEnd(null);
    } else {
      if (d < rangeStart) {
        setRangeEnd(rangeStart);
        setRangeStart(d);
      } else {
        setRangeEnd(d);
      }
    }
  };

  const isStart = (d: number) => d === rangeStart;
  const isEnd = (d: number) => d === rangeEnd;
  const isInRange = (d: number) => rangeStart && rangeEnd && d > rangeStart && d < rangeEnd;

  const handleConfirm = () => {
    if (tab === 'Daily') {
      const start = rangeStart ? `${MONTH_NAMES[viewMonth].slice(0, 3)} ${rangeStart}` : '';
      const end = rangeEnd ? ` - ${MONTH_NAMES[viewMonth].slice(0, 3)} ${rangeEnd}` : '';
      const time = `${selectedHour}:${String(selectedMinute).padStart(2, '0')} ${isPM ? 'PM' : 'AM'}`;
      onConfirm(`${start}${end}, ${time}`);
    } else if (tab === 'Monthly') {
      onConfirm(`${months} month${months > 1 ? 's' : ''}`);
    } else {
      onConfirm(`${hours} hour${hours > 1 ? 's' : ''}`);
    }
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          width: '320px',
          backgroundColor: '#ffffff',
          borderRadius: '20px',
          boxShadow: '0 25px 50px rgba(0,0,0,0.25)',
          overflow: 'hidden',
          fontFamily: 'var(--font-tt-norms)',
        }}
      >
        {/* ── Tabs ── */}
        <div style={{ padding: '10px 10px 0' }}>
          <div style={{ display: 'flex', backgroundColor: 'rgb(224,223,223)', borderRadius: '50px', padding: '4px' }}>
            {(['Daily', 'Monthly', 'Hourly'] as RentalTab[]).map(t => (
              <button key={t} onClick={() => setTab(t)} style={{
                flex: 1, padding: '7px 0',
                fontFamily: 'var(--font-tt-norms)', fontSize: '14px', fontWeight: 500,
                color: tab === t ? '#000' : 'rgba(0,0,0,0.5)',
                backgroundColor: tab === t ? '#fff' : 'transparent',
                borderRadius: tab === t ? '50px' : undefined,
                border: 'none', cursor: 'pointer', transition: 'all 0.2s',
                boxShadow: tab === t ? '0 1px 3px rgba(0,0,0,0.12)' : 'none',
              }}>{t}</button>
            ))}
          </div>
        </div>

        {/* ── DAILY / HOURLY: Calendar ── */}
        {(tab === 'Daily' || tab === 'Hourly') && (
          <div>
            {/* Month nav */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 14px 6px' }}>
              <span style={{ fontFamily: 'var(--font-tt-norms)', fontSize: '15px', fontWeight: 600, color: '#000' }}>
                {MONTH_NAMES[viewMonth]} {viewYear}
              </span>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button onClick={prevMonth} style={{ width: '24px', height: '24px', backgroundColor: 'transparent', border: '1px solid #ddd', borderRadius: '4px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <ChevronIcon dir="left" />
                </button>
                <button onClick={nextMonth} style={{ width: '24px', height: '24px', backgroundColor: 'transparent', border: '1px solid #ddd', borderRadius: '4px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <ChevronIcon dir="right" />
                </button>
              </div>
            </div>

            {/* Day headers */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', padding: '0 10px' }}>
              {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d, i) => (
                <div key={i} style={{ height: '30px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-tt-norms)', fontSize: '12px', fontWeight: 500, color: 'rgba(0,0,0,0.4)' }}>
                  {d}
                </div>
              ))}
            </div>

            {/* Day cells with range highlighting */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', padding: '0 10px 8px' }}>
              {days.map((d, i) => {
                const start = isStart(d!);
                const end = isEnd(d!);
                const inRange = d !== null && isInRange(d);
                const colIndex = i % 7;
                return (
                  <div key={i} style={{
                    height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    backgroundColor: inRange ? 'rgba(0,0,0,0.06)' : 'transparent',
                    borderRadius: inRange
                      ? (colIndex === 0 ? '18px 0 0 18px' : colIndex === 6 ? '0 18px 18px 0' : '0')
                      : undefined,
                  }}>
                    {d !== null ? (
                      <button
                        onClick={() => handleDayClick(d)}
                        style={{
                          width: '34px', height: '34px',
                          borderRadius: start || end ? '8px' : '50%',
                          backgroundColor: start || end ? '#000' : 'transparent',
                          color: start || end ? '#fff' : '#000',
                          fontFamily: 'var(--font-tt-norms)', fontSize: '13px', fontWeight: start || end ? 600 : 400,
                          border: 'none', cursor: 'pointer', transition: 'all 0.15s',
                          position: 'relative', zIndex: 1,
                        }}
                      >
                        {d}
                      </button>
                    ) : null}
                  </div>
                );
              })}
            </div>

            {/* ── Time drum scroll – Daily only ── */}
            {tab === 'Daily' && (
              <div style={{ borderTop: '1px solid #F0F0F0', padding: '8px 14px', position: 'relative' }}>
                {/* Highlight bar for selected time row */}
                <div style={{ position: 'absolute', left: '14px', right: '14px', top: '50%', transform: 'translateY(-50%)', height: '36px', backgroundColor: 'rgba(0,0,0,0.04)', borderRadius: '6px', pointerEvents: 'none' }} />
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }}>
                  <DrumScroll value={selectedHour} min={1} max={12} onChange={setSelectedHour} />
                  <span style={{ fontSize: '18px', fontWeight: 700, color: '#000', paddingBottom: '2px' }}>:</span>
                  <DrumScroll value={selectedMinute} min={0} max={59} onChange={setSelectedMinute} pad />
                  <div style={{ display: 'flex', flexDirection: 'column', marginLeft: '8px' }}>
                    {['AM', 'PM'].map(p => (
                      <button key={p} onClick={() => setIsPM(p === 'PM')} style={{
                        fontFamily: 'var(--font-tt-norms)', fontSize: '13px', fontWeight: 600,
                        color: (isPM && p === 'PM') || (!isPM && p === 'AM') ? '#000' : 'rgba(0,0,0,0.25)',
                        background: 'none', border: 'none', cursor: 'pointer', padding: '2px 0',
                        lineHeight: '20px',
                      }}>{p}</button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* ── Duration stepper – Hourly only ── */}
            {tab === 'Hourly' && (
              <div style={{ borderTop: '1px solid #F0F0F0', padding: '10px 14px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontFamily: 'var(--font-tt-norms)', fontSize: '14px', fontWeight: 500, color: '#000' }}>Duration (hours)</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <button onClick={() => setHours(h => Math.max(1, h - 1))} style={{ width: '28px', height: '28px', borderRadius: '50%', backgroundColor: 'rgb(224,223,223)', border: 'none', cursor: 'pointer', fontSize: '16px', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>−</button>
                  <span style={{ fontFamily: 'var(--font-tt-norms)', fontSize: '18px', fontWeight: 700, color: '#000', minWidth: '24px', textAlign: 'center' }}>{hours}</span>
                  <button onClick={() => setHours(h => Math.min(24, h + 1))} style={{ width: '28px', height: '28px', borderRadius: '50%', backgroundColor: 'rgb(224,223,223)', border: 'none', cursor: 'pointer', fontSize: '16px', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>+</button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ── MONTHLY: Circular arc picker ── */}
        {tab === 'Monthly' && (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '16px 12px', gap: '12px' }}>
            <div style={{ position: 'relative', width: '220px', height: '220px' }}>
              <svg width="220" height="220" viewBox="0 0 220 220">
                <circle cx="110" cy="110" r="95" fill="none" stroke="rgb(224,223,223)" strokeWidth="16"/>
                <circle cx="110" cy="110" r="95" fill="none" stroke="rgb(184,240,79)" strokeWidth="16"
                  strokeLinecap="round"
                  strokeDasharray={`${(months / 12) * 596.9} 596.9`}
                  transform="rotate(-90 110 110)"
                />
                <circle cx="110" cy="110" r="72" fill="none" stroke="rgb(224,223,223)" strokeWidth="1"/>
                <circle cx="110" cy="110" r="50" fill="none" stroke="rgb(224,223,223)" strokeWidth="1"/>
              </svg>
              <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '2px' }}>
                <span style={{ fontFamily: 'var(--font-tt-norms)', fontSize: '44px', fontWeight: 700, color: 'rgb(34,34,34)' }}>{months}</span>
                <span style={{ fontFamily: 'var(--font-tt-norms)', fontSize: '13px', fontWeight: 600, color: 'rgb(34,34,34)' }}>months</span>
              </div>
              {[1,2,3,4,5,6,7,8,9,10,11,12].map(m => {
                const angle = ((m / 12) * 360 - 90) * (Math.PI / 180);
                const x = 110 + 95 * Math.cos(angle);
                const y = 110 + 95 * Math.sin(angle);
                return (
                  <button key={m} onClick={() => setMonths(m)} aria-label={`${m} months`}
                    style={{ position: 'absolute', left: x, top: y, transform: 'translate(-50%,-50%)', width: '16px', height: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'none', border: 'none', cursor: 'pointer' }}>
                    <div style={{ width: m <= months ? '10px' : '7px', height: m <= months ? '10px' : '7px', borderRadius: '50%', backgroundColor: m <= months ? 'rgb(184,240,79)' : 'rgb(200,200,200)', transition: 'all 0.2s' }} />
                  </button>
                );
              })}
            </div>
            <span style={{ fontFamily: 'var(--font-tt-norms)', fontSize: '14px', fontWeight: 500, color: 'rgba(0,0,0,0.5)', textAlign: 'center' }}>Start Date &amp; Time</span>
          </div>
        )}

        {/* ── CTA ── */}
        <div style={{ padding: '8px 12px 12px' }}>
          <button onClick={handleConfirm} style={{
            width: '100%', height: '46px',
            backgroundColor: 'rgb(184,240,79)',
            borderRadius: '10px', border: 'none', cursor: 'pointer',
            fontFamily: 'var(--font-tt-norms)', fontSize: '16px', fontWeight: 500, color: '#000',
          }}>
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}

/* ── DrumScroll – shows prev/current/next values like iOS picker ─────────── */
function DrumScroll({ value, min, max, onChange, pad }: {
  value: number; min: number; max: number;
  onChange: (v: number) => void; pad?: boolean;
}) {
  const fmt = (n: number) => pad ? String(n).padStart(2, '0') : String(n);
  const prev = value <= min ? max : value - 1;
  const next = value >= max ? min : value + 1;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', cursor: 'pointer', width: '40px' }}
      onWheel={e => { e.preventDefault(); onChange(e.deltaY > 0 ? (value >= max ? min : value + 1) : (value <= min ? max : value - 1)); }}
    >
      <span onClick={() => onChange(prev)} style={{ fontFamily: 'var(--font-tt-norms)', fontSize: '13px', fontWeight: 400, color: 'rgba(0,0,0,0.25)', textAlign: 'center', lineHeight: '20px', cursor: 'pointer' }}>{fmt(prev)}</span>
      <span style={{ fontFamily: 'var(--font-tt-norms)', fontSize: '22px', fontWeight: 700, color: '#000', textAlign: 'center', lineHeight: '36px' }}>{fmt(value)}</span>
      <span onClick={() => onChange(next)} style={{ fontFamily: 'var(--font-tt-norms)', fontSize: '13px', fontWeight: 400, color: 'rgba(0,0,0,0.25)', textAlign: 'center', lineHeight: '20px', cursor: 'pointer' }}>{fmt(next)}</span>
    </div>
  );
}

/* ── ChevronIcon ─────────────────────────────────────────────────────────── */
function ChevronIcon({ dir }: { dir: 'left' | 'right' }) {
  return (
    <svg width="7" height="11" viewBox="0 0 7 11" fill="none">
      {dir === 'left'
        ? <path d="M6 1L1 5.5L6 10" stroke="#000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        : <path d="M1 1L6 5.5L1 10" stroke="#000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      }
    </svg>
  );
}
