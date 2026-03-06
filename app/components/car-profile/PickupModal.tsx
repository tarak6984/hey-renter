'use client';

import { useState } from 'react';
import { cn, getCalendarDays, MONTH_NAMES } from '@/app/lib/utils';

interface PickupModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: (dateString: string) => void;
}

type RentalTab = 'Daily' | 'Monthly' | 'Hourly';

/**
 * Pickup date/time selection modal – pixel-perfect from Figma nodes:
 *   Daily:   8984-13741  (calendar + time scroll)
 *   Monthly: 8984-15063  (calendar with month tab active)
 *   Hourly:  8984-7497   (circular arc picker)
 *
 * Container: W=361px, H=auto, bg=white, borderRadius=20px
 * Tabs: bg=rgb(224,223,223), borderRadius=50px, padding=6px
 *   Each tab: TT Norms Pro 18px fw=500 lh=26px, padding=16px 32px
 *   Active: bg=white, borderRadius=50px, color=rgb(0,0,0)
 *   Inactive: color=rgba(0,0,0,0.8)
 * Calendar: 47×47px cells, TT Norms Pro 18px fw=500
 * CTA: bg=rgb(184,240,79) lime, borderRadius=10px, W=329px H=56px
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

  const handleConfirm = () => {
    if (tab === 'Daily' && selectedDay) {
      onConfirm(`${MONTH_NAMES[viewMonth].slice(0, 3)} ${selectedDay} - ${selectedHour}:${String(selectedMinute).padStart(2, '0')} ${isPM ? 'PM' : 'AM'}`);
    } else if (tab === 'Monthly') {
      onConfirm(`${months} month${months > 1 ? 's' : ''}`);
    } else if (tab === 'Hourly') {
      onConfirm(`${hours} hour${hours > 1 ? 's' : ''}`);
    }
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          width: '361px',
          backgroundColor: '#ffffff',
          borderRadius: '20px',
          boxShadow: '0 25px 50px rgba(0,0,0,0.25)',
          overflow: 'hidden',
          fontFamily: 'var(--font-tt-norms)',
        }}
      >
        {/* ── Tabs ── */}
        <div style={{ padding: '12px 12px 0' }}>
          <div
            style={{
              display: 'flex',
              backgroundColor: 'rgb(224,223,223)',
              borderRadius: '50px',
              padding: '4px',
            }}
          >
            {(['Daily', 'Monthly', 'Hourly'] as RentalTab[]).map(t => (
              <button
                key={t}
                onClick={() => setTab(t)}
                style={{
                  flex: 1,
                  padding: '8px 0',
                  fontFamily: 'var(--font-tt-norms)',
                  fontSize: '15px',
                  fontWeight: 500,
                  lineHeight: '22px',
                  textAlign: 'center',
                  color: tab === t ? 'rgb(0,0,0)' : 'rgba(0,0,0,0.6)',
                  backgroundColor: tab === t ? '#ffffff' : 'transparent',
                  borderRadius: tab === t ? '50px' : undefined,
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  boxShadow: tab === t ? '0 1px 3px rgba(0,0,0,0.12)' : 'none',
                }}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* ── DAILY / HOURLY: Calendar ── */}
        {(tab === 'Daily' || tab === 'Hourly') && (
          <div style={{ backgroundColor: '#ffffff' }}>
            {/* Month nav */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 12px', height: '38px' }}>
              <span style={{ fontFamily: 'var(--font-tt-norms)', fontSize: '15px', fontWeight: 500, color: '#000' }}>
                {MONTH_NAMES[viewMonth]} {viewYear}
              </span>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button onClick={prevMonth} style={{ width: '22px', height: '22px', backgroundColor: 'rgb(217,217,217)', borderRadius: '4px', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <ChevronIcon dir="left" />
                </button>
                <button onClick={nextMonth} style={{ width: '22px', height: '22px', backgroundColor: 'rgb(217,217,217)', borderRadius: '4px', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <ChevronIcon dir="right" />
                </button>
              </div>
            </div>

            {/* Day headers */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', padding: '0 12px' }}>
              {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d, i) => (
                <div key={i} style={{ height: '34px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-tt-norms)', fontSize: '13px', fontWeight: 500, color: 'rgba(0,0,0,0.5)' }}>
                  {d}
                </div>
              ))}
            </div>

            {/* Day cells */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', padding: '0 12px 8px' }}>
              {days.map((d, i) => (
                <div key={i} style={{ height: '34px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {d !== null ? (
                    <button
                      onClick={() => setSelectedDay(d)}
                      style={{
                        width: '32px', height: '32px', borderRadius: '50%',
                        backgroundColor: selectedDay === d ? '#000' : 'transparent',
                        color: selectedDay === d ? '#fff' : '#000',
                        fontFamily: 'var(--font-tt-norms)', fontSize: '14px', fontWeight: 500,
                        border: 'none', cursor: 'pointer', transition: 'all 0.15s',
                      }}
                    >
                      {d}
                    </button>
                  ) : null}
                </div>
              ))}
            </div>

            {/* Time scroll – Daily only */}
            {tab === 'Daily' && (
              <div style={{ borderTop: '1px solid #F0F0F0', padding: '10px 12px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px' }}>
                <TimeScroll value={selectedHour} min={1} max={12} onChange={setSelectedHour} />
                <span style={{ fontSize: '20px', fontWeight: 700, color: '#000' }}>:</span>
                <TimeScroll value={selectedMinute} min={0} max={59} onChange={setSelectedMinute} pad />
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                  {['AM', 'PM'].map(period => (
                    <button
                      key={period}
                      onClick={() => setIsPM(period === 'PM')}
                      style={{
                        fontFamily: 'var(--font-tt-norms)', fontSize: '13px', fontWeight: 500,
                        color: (isPM && period === 'PM') || (!isPM && period === 'AM') ? '#000' : 'rgba(0,0,0,0.3)',
                        background: 'none', border: 'none', cursor: 'pointer', padding: '1px 6px',
                      }}
                    >
                      {period}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Duration – Hourly only */}
            {tab === 'Hourly' && (
              <div style={{ borderTop: '1px solid #F0F0F0', padding: '10px 12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontFamily: 'var(--font-tt-norms)', fontSize: '15px', fontWeight: 500, color: '#000' }}>Duration (hours)</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <button onClick={() => setHours(h => Math.max(1, h - 1))} style={{ width: '30px', height: '30px', borderRadius: '50%', backgroundColor: 'rgb(224,223,223)', border: 'none', cursor: 'pointer', fontSize: '18px', fontWeight: 700 }}>−</button>
                  <span style={{ fontFamily: 'var(--font-tt-norms)', fontSize: '20px', fontWeight: 700, color: '#000', minWidth: '28px', textAlign: 'center' }}>{hours}</span>
                  <button onClick={() => setHours(h => Math.min(24, h + 1))} style={{ width: '30px', height: '30px', borderRadius: '50%', backgroundColor: 'rgb(224,223,223)', border: 'none', cursor: 'pointer', fontSize: '18px', fontWeight: 700 }}>+</button>
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
                <span style={{ fontFamily: 'var(--font-tt-norms)', fontSize: '44px', fontWeight: 700, lineHeight: '52px', color: 'rgb(34,34,34)' }}>{months}</span>
                <span style={{ fontFamily: 'var(--font-tt-norms)', fontSize: '14px', fontWeight: 700, color: 'rgb(34,34,34)' }}>months</span>
              </div>
              {[1,2,3,4,5,6,7,8,9,10,11,12].map(m => {
                const angle = ((m / 12) * 360 - 90) * (Math.PI / 180);
                const x = 110 + 95 * Math.cos(angle);
                const y = 110 + 95 * Math.sin(angle);
                return (
                  <button key={m} onClick={() => setMonths(m)}
                    style={{ position: 'absolute', left: x, top: y, transform: 'translate(-50%, -50%)', width: '18px', height: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'none', border: 'none', cursor: 'pointer' }}
                    aria-label={`${m} months`}
                  >
                    <div style={{ width: m === months ? '12px' : '8px', height: m === months ? '12px' : '8px', borderRadius: '50%', backgroundColor: m === months ? '#fff' : 'rgb(184,240,79)', border: m === months ? '2px solid rgb(184,240,79)' : 'none', boxShadow: m === months ? '0 0 0 2px rgb(184,240,79)' : 'none', transition: 'all 0.2s' }} />
                  </button>
                );
              })}
            </div>
            <span style={{ fontFamily: 'var(--font-tt-norms)', fontSize: '15px', fontWeight: 500, color: '#000', textAlign: 'center' }}>Start Date &amp; Time</span>
          </div>
        )}

        {/* ── CTA ── */}
        <div style={{ padding: '10px 12px 12px', backgroundColor: '#fff' }}>
          <button
            onClick={handleConfirm}
            style={{
              width: '100%',
              height: '46px',
              backgroundColor: 'rgb(184,240,79)',
              borderRadius: '10px',
              border: 'none',
              cursor: 'pointer',
              fontFamily: 'var(--font-tt-norms)',
              fontSize: '16px',
              fontWeight: 500,
              color: '#000',
              transition: 'opacity 0.2s',
            }}
            onMouseEnter={e => (e.currentTarget.style.opacity = '0.9')}
            onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
          >
            {tab === 'Monthly' ? 'Confirm' : 'Done'}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ── TimeScroll ─────────────────────────────────────────────────────────── */
function TimeScroll({ value, min, max, onChange, pad }: {
  value: number; min: number; max: number;
  onChange: (v: number) => void; pad?: boolean;
}) {
  const fmt = (n: number) => pad ? String(n).padStart(2, '0') : String(n);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', userSelect: 'none' }}>
      <button onClick={() => onChange(value >= max ? min : value + 1)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(0,0,0,0.3)', fontSize: '16px', lineHeight: 1, padding: '2px' }}>▲</button>
      <span style={{ fontFamily: 'var(--font-tt-norms)', fontSize: '22px', fontWeight: 700, color: '#000', minWidth: '32px', textAlign: 'center' }}>{fmt(value)}</span>
      <button onClick={() => onChange(value <= min ? max : value - 1)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(0,0,0,0.3)', fontSize: '16px', lineHeight: 1, padding: '2px' }}>▼</button>
    </div>
  );
}

/* ── ChevronIcon ─────────────────────────────────────────────────────────── */
function ChevronIcon({ dir }: { dir: 'left' | 'right' }) {
  return (
    <svg width="8" height="13" viewBox="0 0 8 13" fill="none" xmlns="http://www.w3.org/2000/svg">
      {dir === 'left'
        ? <path d="M7 1L1 6.5L7 12" stroke="rgb(28,27,31)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        : <path d="M1 1L7 6.5L1 12" stroke="rgb(28,27,31)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      }
    </svg>
  );
}
