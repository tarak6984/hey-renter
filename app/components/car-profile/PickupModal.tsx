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
        <div style={{ padding: '16px 16px 0' }}>
          <div
            style={{
              display: 'flex',
              backgroundColor: 'rgb(224,223,223)',
              borderRadius: '50px',
              padding: '6px',
            }}
          >
            {(['Daily', 'Monthly', 'Hourly'] as RentalTab[]).map(t => (
              <button
                key={t}
                onClick={() => setTab(t)}
                style={{
                  flex: 1,
                  padding: '16px 0',
                  fontFamily: 'var(--font-tt-norms)',
                  fontSize: '18px',
                  fontWeight: 500,
                  lineHeight: '26px',
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
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '11px 16px',
                height: '46px',
              }}
            >
              <span style={{ fontFamily: 'var(--font-tt-norms)', fontSize: '18px', fontWeight: 500, lineHeight: '26px', color: '#000' }}>
                {MONTH_NAMES[viewMonth]} {viewYear}
              </span>
              <div style={{ display: 'flex', gap: '9px' }}>
                <button
                  onClick={prevMonth}
                  style={{ width: '24px', height: '24px', backgroundColor: 'rgb(217,217,217)', borderRadius: '4px', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                >
                  <ChevronIcon dir="left" />
                </button>
                <button
                  onClick={nextMonth}
                  style={{ width: '24px', height: '24px', backgroundColor: 'rgb(217,217,217)', borderRadius: '4px', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                >
                  <ChevronIcon dir="right" />
                </button>
              </div>
            </div>

            {/* Day headers */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 47px)', padding: '0 16px' }}>
              {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d, i) => (
                <div key={i} style={{ width: '47px', height: '47px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-tt-norms)', fontSize: '18px', fontWeight: 500, lineHeight: '26px', color: '#000' }}>
                  {d}
                </div>
              ))}
            </div>

            {/* Day cells */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 47px)', padding: '0 16px 16px' }}>
              {days.map((d, i) => (
                <div key={i} style={{ width: '47px', height: '47px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {d !== null ? (
                    <button
                      onClick={() => setSelectedDay(d)}
                      style={{
                        width: '40px', height: '40px', borderRadius: '50%',
                        backgroundColor: selectedDay === d ? '#000' : 'transparent',
                        color: selectedDay === d ? '#fff' : '#000',
                        fontFamily: 'var(--font-tt-norms)', fontSize: '18px', fontWeight: 500,
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
              <div style={{ borderTop: '1px solid #F0F0F0', padding: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px' }}>
                <TimeScroll value={selectedHour} min={1} max={12} onChange={setSelectedHour} />
                <span style={{ fontSize: '24px', fontWeight: 700, color: '#000' }}>:</span>
                <TimeScroll value={selectedMinute} min={0} max={59} onChange={setSelectedMinute} pad />
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  {['AM', 'PM'].map(period => (
                    <button
                      key={period}
                      onClick={() => setIsPM(period === 'PM')}
                      style={{
                        fontFamily: 'var(--font-tt-norms)', fontSize: '16px', fontWeight: 500,
                        color: (isPM && period === 'PM') || (!isPM && period === 'AM') ? '#000' : 'rgba(0,0,0,0.3)',
                        background: 'none', border: 'none', cursor: 'pointer', padding: '2px 8px',
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
              <div style={{ borderTop: '1px solid #F0F0F0', padding: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontFamily: 'var(--font-tt-norms)', fontSize: '18px', fontWeight: 500, color: '#000' }}>Duration (hours)</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <button onClick={() => setHours(h => Math.max(1, h - 1))} style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: 'rgb(224,223,223)', border: 'none', cursor: 'pointer', fontSize: '20px', fontWeight: 700 }}>−</button>
                  <span style={{ fontFamily: 'var(--font-tt-norms)', fontSize: '24px', fontWeight: 700, color: '#000', minWidth: '32px', textAlign: 'center' }}>{hours}</span>
                  <button onClick={() => setHours(h => Math.min(24, h + 1))} style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: 'rgb(224,223,223)', border: 'none', cursor: 'pointer', fontSize: '20px', fontWeight: 700 }}>+</button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ── MONTHLY: Circular arc picker ── */}
        {tab === 'Monthly' && (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '24px', gap: '16px' }}>
            <div style={{ position: 'relative', width: '313px', height: '313px' }}>
              <svg width="313" height="313" viewBox="0 0 313 313">
                {/* Outer ring bg */}
                <circle cx="156.5" cy="156.5" r="140" fill="none" stroke="rgb(224,223,223)" strokeWidth="20"/>
                {/* Progress arc – lime green */}
                <circle
                  cx="156.5" cy="156.5" r="140"
                  fill="none"
                  stroke="rgb(184,240,79)"
                  strokeWidth="20"
                  strokeLinecap="round"
                  strokeDasharray={`${(months / 12) * 879.6} 879.6`}
                  transform="rotate(-90 156.5 156.5)"
                />
                {/* Middle ring */}
                <circle cx="156.5" cy="156.5" r="110" fill="none" stroke="rgb(224,223,223)" strokeWidth="1"/>
                {/* Inner ring */}
                <circle cx="156.5" cy="156.5" r="80" fill="none" stroke="rgb(224,223,223)" strokeWidth="1"/>
              </svg>
              {/* Center info */}
              <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '4px' }}>
                <span style={{ fontFamily: 'var(--font-tt-norms)', fontSize: '60px', fontWeight: 700, lineHeight: '72px', color: 'rgb(34,34,34)' }}>{months}</span>
                <span style={{ fontFamily: 'var(--font-tt-norms)', fontSize: '18px', fontWeight: 700, lineHeight: '26px', color: 'rgb(34,34,34)' }}>months</span>
              </div>
              {/* Month dots */}
              {[1,2,3,4,5,6,7,8,9,10,11,12].map(m => {
                const angle = ((m / 12) * 360 - 90) * (Math.PI / 180);
                const x = 156.5 + 140 * Math.cos(angle);
                const y = 156.5 + 140 * Math.sin(angle);
                return (
                  <button
                    key={m}
                    onClick={() => setMonths(m)}
                    style={{ position: 'absolute', left: x, top: y, transform: 'translate(-50%, -50%)', width: '20px', height: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'none', border: 'none', cursor: 'pointer' }}
                    aria-label={`${m} months`}
                  >
                    <div style={{ width: m === months ? '14px' : '10px', height: m === months ? '14px' : '10px', borderRadius: '50%', backgroundColor: m === months ? '#fff' : 'rgb(184,240,79)', border: m === months ? '2px solid rgb(184,240,79)' : 'none', boxShadow: m === months ? '0 0 0 2px rgb(184,240,79)' : 'none', transition: 'all 0.2s' }} />
                  </button>
                );
              })}
            </div>
            <span style={{ fontFamily: 'var(--font-tt-norms)', fontSize: '18px', fontWeight: 500, lineHeight: '26px', color: '#000', textAlign: 'center' }}>Start Date &amp; Time</span>
          </div>
        )}

        {/* ── CTA ── */}
        <div style={{ padding: '16px', backgroundColor: '#fff' }}>
          <button
            onClick={handleConfirm}
            style={{
              width: '100%',
              height: '56px',
              backgroundColor: 'rgb(184,240,79)',
              borderRadius: '10px',
              border: 'none',
              cursor: 'pointer',
              fontFamily: 'var(--font-tt-norms)',
              fontSize: '18px',
              fontWeight: 500,
              lineHeight: '26px',
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
      <button onClick={() => onChange(value >= max ? min : value + 1)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(0,0,0,0.3)', fontSize: '20px', lineHeight: 1, padding: '4px' }}>▲</button>
      <span style={{ fontFamily: 'var(--font-tt-norms)', fontSize: '28px', fontWeight: 700, color: '#000', minWidth: '40px', textAlign: 'center' }}>{fmt(value)}</span>
      <button onClick={() => onChange(value <= min ? max : value - 1)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(0,0,0,0.3)', fontSize: '20px', lineHeight: 1, padding: '4px' }}>▼</button>
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
