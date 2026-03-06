'use client';

import { useState, useRef, useCallback } from 'react';
import { getCalendarDays, MONTH_NAMES } from '@/app/lib/utils';

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
  const [rangeStart, setRangeStart] = useState<number | null>(null); // timestamp
  const [rangeEnd, setRangeEnd] = useState<number | null>(null);     // timestamp
  const [selectedHour, setSelectedHour] = useState(8);
  const [selectedMinute, setSelectedMinute] = useState(0);
  const [isPM, setIsPM] = useState(true);
  const [months, setMonths] = useState(3);
  const [hours, setHours] = useState(3);
  // Fade transition state — must be declared before any early return
  const [visibleTab, setVisibleTab] = useState<RentalTab>('Daily');
  const [fading, setFading] = useState(false);
  // Monthly calendar sub-view — dates stored as timestamps for cross-month/year support
  const [showMonthlyCalendar, setShowMonthlyCalendar] = useState(false);
  const [monthlyRangeStart, setMonthlyRangeStart] = useState<number | null>(null); // timestamp
  const [monthlyRangeEnd, setMonthlyRangeEnd] = useState<number | null>(null);     // timestamp
  const [monthlyViewYear, setMonthlyViewYear] = useState(today.getFullYear());
  const [monthlyViewMonth, setMonthlyViewMonth] = useState(today.getMonth());
  // Hourly — single start date + time
  const [showHourlyCalendar, setShowHourlyCalendar] = useState(false);
  const [hourlyStartDate, setHourlyStartDate] = useState<number | null>(null); // timestamp (date only)
  const [hourlyViewYear, setHourlyViewYear] = useState(today.getFullYear());
  const [hourlyViewMonth, setHourlyViewMonth] = useState(today.getMonth());
  const [hourlyShowTime, setHourlyShowTime] = useState(false); // after date picked, show time
  const [hourlyHour, setHourlyHour] = useState(8);
  const [hourlyMinute, setHourlyMinute] = useState(0);
  const [hourlyIsPM, setHourlyIsPM] = useState(false);

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
    const ts = toTs(viewYear, viewMonth, d);
    if (!rangeStart || (rangeStart && rangeEnd)) {
      setRangeStart(ts);
      setRangeEnd(null);
    } else {
      if (ts < rangeStart) {
        setRangeEnd(rangeStart);
        setRangeStart(ts);
      } else {
        setRangeEnd(ts);
      }
    }
  };

  const isStart = (d: number) => rangeStart !== null && toTs(viewYear, viewMonth, d) === rangeStart;
  const isEnd   = (d: number) => rangeEnd   !== null && toTs(viewYear, viewMonth, d) === rangeEnd;
  const isInRange = (d: number) => {
    const ts = toTs(viewYear, viewMonth, d);
    return !!(rangeStart && rangeEnd && ts > rangeStart && ts < rangeEnd);
  };

  const handleConfirm = () => {
    if (tab === 'Daily') {
      const start = rangeStart ? fmtDate(rangeStart) : '';
      const end = rangeEnd ? ` → ${fmtDate(rangeEnd)}` : '';
      const time = `${selectedHour}:${String(selectedMinute).padStart(2, '0')} ${isPM ? 'PM' : 'AM'}`;
      onConfirm(`${start}${end}, ${time}`);
    } else if (tab === 'Monthly') {
      const start = monthlyRangeStart ? `${fmtDate(monthlyRangeStart)}${monthlyRangeEnd ? ` → ${fmtDate(monthlyRangeEnd)}` : ''} · ` : '';
      onConfirm(`${start}${months} month${months > 1 ? 's' : ''}`);
    } else {
      // Hourly: "Mar 10, 8:00 PM · 3 hrs"
      const dateStr = hourlyStartDate
        ? `${fmtDate(hourlyStartDate)}, ${hourlyHour}:${String(hourlyMinute).padStart(2,'0')} ${hourlyIsPM ? 'PM' : 'AM'} · `
        : '';
      onConfirm(`${dateStr}${hours} hr${hours > 1 ? 's' : ''}`);
    }
    onClose();
  };

  const switchTab = (t: RentalTab) => {
    if (t === tab) return;
    setFading(true);
    setTimeout(() => {
      setTab(t);
      setVisibleTab(t);
      setFading(false);
    }, 180);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
      onClick={onClose}
      style={{
        animation: 'pickupModalBackdropIn 180ms ease both',
      }}
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
          animation: 'pickupModalPanelIn 220ms cubic-bezier(0.22, 1, 0.36, 1) both',
          transformOrigin: 'top center',
        }}
      >
        {/* ── Tabs ── */}
        <div style={{ padding: '10px 10px 0' }}>
          <div style={{ display: 'flex', backgroundColor: 'rgb(224,223,223)', borderRadius: '50px', padding: '4px' }}>
            {(['Daily', 'Monthly', 'Hourly'] as RentalTab[]).map(t => (
              <button key={t} onClick={() => switchTab(t)} style={{
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

        {/* ── Fixed-height content area — taller when sub-calendar is open ── */}
        <div style={{
          height: (showHourlyCalendar || showMonthlyCalendar) ? '440px' : '380px',
          transition: 'height 0.18s ease',
          position: 'relative',
          overflow: 'hidden',
        }}>
          {/* Fade wrapper — opacity transitions on tab change */}
          <div style={{
            position: 'absolute', inset: 0,
            opacity: fading ? 0 : 1,
            transition: 'opacity 0.18s ease',
            display: 'flex', flexDirection: 'column',
          }}>

            {/* ── DAILY ── */}
            {visibleTab === 'Daily' && (
              <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
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
                    <div key={i} style={{ height: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-tt-norms)', fontSize: '12px', fontWeight: 500, color: 'rgba(0,0,0,0.4)' }}>
                      {d}
                    </div>
                  ))}
                </div>

                {/* Day cells */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', padding: '0 10px' }}>
                  {days.map((d, i) => {
                    const start = isStart(d!);
                    const end = isEnd(d!);
                    const inRange = d !== null && isInRange(d);
                    const colIndex = i % 7;
                    return (
                      <div key={i} style={{
                        height: '34px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                        backgroundColor: inRange ? 'rgba(0,0,0,0.06)' : 'transparent',
                        borderRadius: inRange
                          ? (colIndex === 0 ? '17px 0 0 17px' : colIndex === 6 ? '0 17px 17px 0' : '0')
                          : undefined,
                      }}>
                        {d !== null ? (
                          <button onClick={() => handleDayClick(d)} style={{
                            width: '32px', height: '32px',
                            borderRadius: start || end ? '8px' : '50%',
                            backgroundColor: start || end ? '#000' : 'transparent',
                            color: start || end ? '#fff' : '#000',
                            fontFamily: 'var(--font-tt-norms)', fontSize: '13px', fontWeight: start || end ? 600 : 400,
                            border: 'none', cursor: 'pointer', transition: 'all 0.15s', position: 'relative', zIndex: 1,
                          }}>{d}</button>
                        ) : null}
                      </div>
                    );
                  })}
                </div>

                {/* Time drum scroll */}
                <div style={{ marginTop: 'auto', borderTop: '1px solid #F0F0F0', padding: '8px 14px', position: 'relative' }}>
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
                          background: 'none', border: 'none', cursor: 'pointer', padding: '2px 0', lineHeight: '20px',
                        }}>{p}</button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ── HOURLY ── */}
            {visibleTab === 'Hourly' && (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', gap: '12px' }}>
                {showHourlyCalendar ? (
                  /* Step 1: pick a single start date */
                  <HourlyDatePicker
                    viewYear={hourlyViewYear} viewMonth={hourlyViewMonth}
                    selectedDate={hourlyStartDate}
                    onPrevMonth={() => { if (hourlyViewMonth === 0) { setHourlyViewMonth(11); setHourlyViewYear(y => y - 1); } else setHourlyViewMonth(m => m - 1); }}
                    onNextMonth={() => { if (hourlyViewMonth === 11) { setHourlyViewMonth(0); setHourlyViewYear(y => y + 1); } else setHourlyViewMonth(m => m + 1); }}
                    onDayClick={(ts) => { setHourlyStartDate(ts); setHourlyShowTime(true); }}
                    onBack={() => { setShowHourlyCalendar(false); setHourlyShowTime(false); }}
                    showTime={hourlyShowTime}
                    hour={hourlyHour} minute={hourlyMinute} isPM={hourlyIsPM}
                    onHourChange={setHourlyHour} onMinuteChange={setHourlyMinute} onIsPMChange={setHourlyIsPM}
                  />
                ) : (
                  /* Dial view */
                  <>
                    <HourlyDial hours={hours} onChange={setHours} />
                    <span
                      onClick={() => setShowHourlyCalendar(true)}
                      style={{ fontFamily: 'var(--font-tt-norms)', fontSize: '15px', fontWeight: 500, color: '#000', textDecoration: 'underline', cursor: 'pointer', textAlign: 'center' }}
                    >
                      {hourlyStartDate && hourlyShowTime
                        ? `${fmtDate(hourlyStartDate)}, ${hourlyHour}:${String(hourlyMinute).padStart(2,'0')} ${hourlyIsPM ? 'PM' : 'AM'}`
                        : hourlyStartDate
                        ? fmtDate(hourlyStartDate)
                        : 'Start Date & Time'}
                    </span>
                  </>
                )}
              </div>
            )}

            {/* ── MONTHLY ── */}
            {visibleTab === 'Monthly' && (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', gap: '12px' }}>
                {showMonthlyCalendar ? (
                  <CalendarPicker
                    viewYear={monthlyViewYear} viewMonth={monthlyViewMonth}
                    rangeStart={monthlyRangeStart} rangeEnd={monthlyRangeEnd}
                    onPrevMonth={() => { if (monthlyViewMonth === 0) { setMonthlyViewMonth(11); setMonthlyViewYear(y => y - 1); } else setMonthlyViewMonth(m => m - 1); }}
                    onNextMonth={() => { if (monthlyViewMonth === 11) { setMonthlyViewMonth(0); setMonthlyViewYear(y => y + 1); } else setMonthlyViewMonth(m => m + 1); }}
                    onDayClick={(ts) => {
                      if (!monthlyRangeStart || (monthlyRangeStart && monthlyRangeEnd)) {
                        setMonthlyRangeStart(ts); setMonthlyRangeEnd(null);
                      } else {
                        if (ts < monthlyRangeStart) { setMonthlyRangeEnd(monthlyRangeStart); setMonthlyRangeStart(ts); }
                        else setMonthlyRangeEnd(ts);
                      }
                    }}
                    onBack={() => setShowMonthlyCalendar(false)}
                  />
                ) : (
                  <>
                    <MonthlyDial months={months} onChange={setMonths} />
                    <span
                      onClick={() => setShowMonthlyCalendar(true)}
                      style={{ fontFamily: 'var(--font-tt-norms)', fontSize: '15px', fontWeight: 500, color: '#000', textDecoration: 'underline', cursor: 'pointer', textAlign: 'center' }}
                    >
                      {monthlyRangeStart
                        ? `${fmtDate(monthlyRangeStart)}${monthlyRangeEnd ? ` → ${fmtDate(monthlyRangeEnd)}` : ''}`
                        : 'Start Date'}
                    </span>
                  </>
                )}
              </div>
            )}

          </div>
        </div>

        {/* ── CTA — hidden when any sub-calendar is open ── */}
        {!showMonthlyCalendar && !showHourlyCalendar && (
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
        )}
      </div>
    </div>
  );
}

/* ── HourlyDatePicker – single date + time picker for Hourly tab ─────────── */
function HourlyDatePicker({ viewYear, viewMonth, selectedDate, onPrevMonth, onNextMonth, onDayClick, onBack, showTime, hour, minute, isPM, onHourChange, onMinuteChange, onIsPMChange }: {
  viewYear: number; viewMonth: number;
  selectedDate: number | null;
  onPrevMonth: () => void; onNextMonth: () => void;
  onDayClick: (ts: number) => void;
  onBack: () => void;
  showTime: boolean;
  hour: number; minute: number; isPM: boolean;
  onHourChange: (h: number) => void;
  onMinuteChange: (m: number) => void;
  onIsPMChange: (v: boolean) => void;
}) {
  const days = getCalendarDays(viewYear, viewMonth);
  const tsFor = (d: number) => toTs(viewYear, viewMonth, d);
  const isSelected = (d: number) => selectedDate !== null && tsFor(d) === selectedDate;

  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 14px 6px' }}>
        <button onClick={onBack} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '0 4px', display: 'flex', alignItems: 'center' }}>
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M11 3L5 9L11 15" stroke="#000" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <span style={{ fontFamily: 'var(--font-tt-norms)', fontSize: '15px', fontWeight: 600, color: '#000' }}>
          {MONTH_NAMES[viewMonth]} {viewYear}
        </span>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button onClick={onPrevMonth} style={{ width: '24px', height: '24px', backgroundColor: 'transparent', border: '1px solid #ddd', borderRadius: '4px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <ChevronIcon dir="left" />
          </button>
          <button onClick={onNextMonth} style={{ width: '24px', height: '24px', backgroundColor: 'transparent', border: '1px solid #ddd', borderRadius: '4px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <ChevronIcon dir="right" />
          </button>
        </div>
      </div>

      {/* Day headers */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', padding: '0 10px' }}>
        {['S','M','T','W','T','F','S'].map((d, i) => (
          <div key={i} style={{ height: '26px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-tt-norms)', fontSize: '12px', fontWeight: 500, color: 'rgba(0,0,0,0.4)' }}>{d}</div>
        ))}
      </div>

      {/* Day cells — single selection */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', padding: '0 10px' }}>
        {days.map((d, i) => {
          const sel = d !== null && isSelected(d);
          return (
            <div key={i} style={{ height: '34px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {d !== null ? (
                <button onClick={() => onDayClick(tsFor(d))} style={{
                  width: '32px', height: '32px',
                  borderRadius: sel ? '8px' : '50%',
                  backgroundColor: sel ? '#000' : 'transparent',
                  color: sel ? '#fff' : '#000',
                  fontFamily: 'var(--font-tt-norms)', fontSize: '13px', fontWeight: sel ? 600 : 400,
                  border: 'none', cursor: 'pointer', transition: 'all 0.15s',
                }}>{d}</button>
              ) : null}
            </div>
          );
        })}
      </div>

      {/* Time picker — shown after date selected */}
      {showTime && selectedDate && (
        <div style={{ marginTop: 'auto', borderTop: '1px solid #f0f0f0', padding: '8px 14px', position: 'relative' }}>
          <div style={{ textAlign: 'center', fontFamily: 'var(--font-tt-norms)', fontSize: '12px', color: 'rgba(0,0,0,0.45)', marginBottom: '4px' }}>
            {fmtDateFull(selectedDate)}
          </div>
          <div style={{ position: 'absolute', left: '14px', right: '14px', top: '50%', transform: 'translateY(-10%)', height: '36px', backgroundColor: 'rgba(0,0,0,0.04)', borderRadius: '6px', pointerEvents: 'none' }} />
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }}>
            <DrumScroll value={hour} min={1} max={12} onChange={onHourChange} />
            <span style={{ fontSize: '18px', fontWeight: 700, color: '#000', paddingBottom: '2px' }}>:</span>
            <DrumScroll value={minute} min={0} max={59} onChange={onMinuteChange} pad />
            <div style={{ display: 'flex', flexDirection: 'column', marginLeft: '8px' }}>
              {['AM', 'PM'].map(p => (
                <button key={p} onClick={() => onIsPMChange(p === 'PM')} style={{
                  fontFamily: 'var(--font-tt-norms)', fontSize: '13px', fontWeight: 600,
                  color: (isPM && p === 'PM') || (!isPM && p === 'AM') ? '#000' : 'rgba(0,0,0,0.25)',
                  background: 'none', border: 'none', cursor: 'pointer', padding: '2px 0', lineHeight: '20px',
                }}>{p}</button>
              ))}
            </div>
          </div>
          <button onClick={onBack} style={{
            marginTop: '6px', width: '100%', height: '36px',
            backgroundColor: '#000', color: '#fff',
            borderRadius: '8px', border: 'none', cursor: 'pointer',
            fontFamily: 'var(--font-tt-norms)', fontSize: '14px', fontWeight: 600,
          }}>Done</button>
        </div>
      )}
    </div>
  );
}

/* ── helpers ── */
function toTs(year: number, month: number, day: number) {
  return new Date(year, month, day).getTime();
}
function fmtDate(ts: number) {
  const d = new Date(ts);
  return `${MONTH_NAMES[d.getMonth()].slice(0,3)} ${d.getDate()}`;
}
function fmtDateFull(ts: number) {
  const d = new Date(ts);
  return `${MONTH_NAMES[d.getMonth()].slice(0,3)} ${d.getDate()}, ${d.getFullYear()}`;
}

/* ── CalendarPicker – stores dates as timestamps, supports cross-month/year ── */
function CalendarPicker({ viewYear, viewMonth, rangeStart, rangeEnd, onPrevMonth, onNextMonth, onDayClick, onBack }: {
  viewYear: number; viewMonth: number;
  rangeStart: number | null; rangeEnd: number | null; // timestamps
  onPrevMonth: () => void; onNextMonth: () => void;
  onDayClick: (ts: number) => void; // passes timestamp
  onBack: () => void;
}) {
  const days = getCalendarDays(viewYear, viewMonth);

  const tsFor = (d: number) => toTs(viewYear, viewMonth, d);
  const isStart = (d: number) => rangeStart !== null && tsFor(d) === rangeStart;
  const isEnd   = (d: number) => rangeEnd   !== null && tsFor(d) === rangeEnd;
  const isInRange = (d: number) => {
    const ts = tsFor(d);
    return !!(rangeStart && rangeEnd && ts > rangeStart && ts < rangeEnd);
  };

  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 14px 6px' }}>
        <button onClick={onBack} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '0 4px', display: 'flex', alignItems: 'center' }}>
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M11 3L5 9L11 15" stroke="#000" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <span style={{ fontFamily: 'var(--font-tt-norms)', fontSize: '15px', fontWeight: 600, color: '#000' }}>
          {MONTH_NAMES[viewMonth]} {viewYear}
        </span>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button onClick={onPrevMonth} style={{ width: '24px', height: '24px', backgroundColor: 'transparent', border: '1px solid #ddd', borderRadius: '4px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <ChevronIcon dir="left" />
          </button>
          <button onClick={onNextMonth} style={{ width: '24px', height: '24px', backgroundColor: 'transparent', border: '1px solid #ddd', borderRadius: '4px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <ChevronIcon dir="right" />
          </button>
        </div>
      </div>

      {/* Selected range label — full date inside calendar */}
      {rangeStart && (
        <div style={{ textAlign: 'center', fontFamily: 'var(--font-tt-norms)', fontSize: '12px', color: 'rgba(0,0,0,0.45)', padding: '0 14px 4px' }}>
          {fmtDateFull(rangeStart)}{rangeEnd ? ` → ${fmtDateFull(rangeEnd)}` : ' → pick end date'}
        </div>
      )}

      {/* Day headers */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', padding: '0 10px' }}>
        {['S','M','T','W','T','F','S'].map((d, i) => (
          <div key={i} style={{ height: '26px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-tt-norms)', fontSize: '12px', fontWeight: 500, color: 'rgba(0,0,0,0.4)' }}>{d}</div>
        ))}
      </div>

      {/* Day cells */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', padding: '0 10px' }}>
        {days.map((d, i) => {
          const start   = d !== null && isStart(d);
          const end     = d !== null && isEnd(d);
          const inRange = d !== null && isInRange(d);
          const colIndex = i % 7;
          return (
            <div key={i} style={{
              height: '34px', display: 'flex', alignItems: 'center', justifyContent: 'center',
              backgroundColor: inRange ? 'rgba(0,0,0,0.06)' : 'transparent',
              borderRadius: inRange ? (colIndex === 0 ? '17px 0 0 17px' : colIndex === 6 ? '0 17px 17px 0' : '0') : undefined,
            }}>
              {d !== null ? (
                <button onClick={() => onDayClick(tsFor(d))} style={{
                  width: '32px', height: '32px',
                  borderRadius: start || end ? '8px' : '50%',
                  backgroundColor: start || end ? '#000' : 'transparent',
                  color: start || end ? '#fff' : '#000',
                  fontFamily: 'var(--font-tt-norms)', fontSize: '13px', fontWeight: start || end ? 600 : 400,
                  border: 'none', cursor: 'pointer', transition: 'all 0.15s', position: 'relative', zIndex: 1,
                }}>{d}</button>
              ) : null}
            </div>
          );
        })}
      </div>

      {/* Done button */}
      {rangeStart && (
        <div style={{ marginTop: 'auto', padding: '6px 14px 8px' }}>
          <button onClick={onBack} style={{
            width: '100%', height: '38px',
            backgroundColor: rangeEnd ? '#000' : 'rgba(0,0,0,0.15)', color: '#fff',
            borderRadius: '8px', border: 'none', cursor: rangeEnd ? 'pointer' : 'default',
            fontFamily: 'var(--font-tt-norms)', fontSize: '14px', fontWeight: 600,
          }}>
            {rangeEnd ? 'Done' : 'Select end date'}
          </button>
        </div>
      )}
    </div>
  );
}

/* ── MonthlyDial – same design as HourlyDial but for 1-12 months ─────────── */
function MonthlyDial({ months, onChange }: { months: number; onChange: (m: number) => void }) {
  const MAX = 12;
  const cx = 130; const cy = 130;
  const r = 85;
  const ringWidth = 42;
  const tickR = r;

  const svgRef = useRef<SVGSVGElement>(null);
  const isDragging = useRef(false);

  const fraction = months / MAX;
  const circumference = 2 * Math.PI * r;
  const arcLength = fraction * circumference;

  const handleAngle = (fraction * 360 - 90) * (Math.PI / 180);
  const hx = cx + r * Math.cos(handleAngle);
  const hy = cy + r * Math.sin(handleAngle);

  const angleToMonths = useCallback((clientX: number, clientY: number) => {
    if (!svgRef.current) return months;
    const rect = svgRef.current.getBoundingClientRect();
    const scaleX = 260 / rect.width;
    const scaleY = 260 / rect.height;
    const x = (clientX - rect.left) * scaleX - cx;
    const y = (clientY - rect.top) * scaleY - cy;
    let angle = Math.atan2(y, x) * (180 / Math.PI) + 90;
    if (angle < 0) angle += 360;
    return Math.max(1, Math.min(MAX, Math.round((angle / 360) * MAX)));
  }, [months, cx, cy, MAX]);

  const onHandlePointerDown = useCallback((e: React.PointerEvent<SVGCircleElement>) => {
    e.stopPropagation();
    (e.currentTarget as SVGCircleElement).setPointerCapture(e.pointerId);
    isDragging.current = true;
  }, []);

  const onSvgPointerMove = useCallback((e: React.PointerEvent<SVGSVGElement>) => {
    if (!isDragging.current) return;
    onChange(angleToMonths(e.clientX, e.clientY));
  }, [angleToMonths, onChange]);

  const onPointerUp = useCallback(() => { isDragging.current = false; }, []);

  // 12 tick dots
  const ticks = Array.from({ length: 12 }, (_, i) => {
    const a = ((i / 12) * 360 - 90) * (Math.PI / 180);
    return { x: cx + tickR * Math.cos(a), y: cy + tickR * Math.sin(a) };
  });

  return (
    <div style={{ position: 'relative', width: '260px', height: '260px' }}>
      <svg ref={svgRef} width="260" height="260" viewBox="0 0 260 260"
        style={{ touchAction: 'none', cursor: 'default' }}
        onPointerMove={onSvgPointerMove} onPointerUp={onPointerUp} onPointerCancel={onPointerUp}
      >
        <defs>
          <radialGradient id="monthHandleGrad" cx="45%" cy="35%" r="60%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="70%" stopColor="#f5f5f5" />
            <stop offset="100%" stopColor="#e8f5d0" />
          </radialGradient>
          <filter id="monthHandleShadow" x="-40%" y="-40%" width="180%" height="180%">
            <feDropShadow dx="0" dy="2" stdDeviation="4" floodColor="rgba(0,0,0,0.20)" />
          </filter>
        </defs>

        {/* Elevation shadow disk */}
        <circle cx={cx} cy={cy} r={r + ringWidth/2 + 2} fill="rgb(235,235,235)"
          style={{ filter: 'drop-shadow(0 12px 24px rgba(0,0,0,0.18)) drop-shadow(0 4px 8px rgba(0,0,0,0.12))', pointerEvents: 'none' }}
        />
        {/* Outer gray border */}
        <circle cx={cx} cy={cy} r={r + ringWidth/2 - 1} fill="none"
          stroke="rgb(200,200,200)" strokeWidth="2" style={{ pointerEvents: 'none' }}
        />
        {/* Gray track ring */}
        <circle cx={cx} cy={cy} r={r} fill="none" stroke="rgb(225,225,225)" strokeWidth={ringWidth}
          style={{ pointerEvents: 'none' }}
        />
        {/* Inner gray border */}
        <circle cx={cx} cy={cy} r={r - ringWidth/2 + 1} fill="none"
          stroke="rgb(205,205,205)" strokeWidth="2" style={{ pointerEvents: 'none' }}
        />
        {/* Tick dots */}
        {ticks.map((t, i) => (
          <circle key={i} cx={t.x} cy={t.y} r={3} fill="rgb(148,148,148)" style={{ pointerEvents: 'none' }} />
        ))}
        {/* Lime arc */}
        <circle cx={cx} cy={cy} r={r} fill="none" stroke="rgb(184,240,79)" strokeWidth={ringWidth}
          strokeLinecap="round"
          strokeDasharray={`${arcLength} ${circumference}`}
          transform={`rotate(-90 ${cx} ${cy})`}
          style={{ pointerEvents: 'none' }}
        />
        {/* White handle */}
        <circle cx={hx} cy={hy} r={17} fill="url(#monthHandleGrad)"
          filter="url(#monthHandleShadow)"
          style={{ cursor: 'grab' }}
          onPointerDown={onHandlePointerDown}
        />
        {/* Center number */}
        <text x={cx} y={cy - 10} textAnchor="middle" dominantBaseline="middle"
          style={{ fontFamily: 'var(--font-tt-norms)', fontSize: '48px', fontWeight: 700, fill: 'rgb(30,30,30)', pointerEvents: 'none' }}
        >{months}</text>
        {/* Center label */}
        <text x={cx} y={cy + 26} textAnchor="middle" dominantBaseline="middle"
          style={{ fontFamily: 'var(--font-tt-norms)', fontSize: '16px', fontWeight: 500, fill: 'rgb(120,120,120)', pointerEvents: 'none' }}
        >months</text>
      </svg>
    </div>
  );
}

/* ── HourlyDial – circular arc knob with full mouse drag support ─────────── */
function HourlyDial({ hours, onChange }: { hours: number; onChange: (h: number) => void }) {
  const MAX = 24;
  const cx = 130; const cy = 130;
  const r = 85;
  const ringWidth = 42;  // wide ring matching Figma
  const tickR = r;       // dots on ring centerline

  const svgRef = useRef<SVGSVGElement>(null);
  const isDragging = useRef(false);

  const fraction = hours / MAX;
  const circumference = 2 * Math.PI * r;
  const arcLength = fraction * circumference;

  const handleAngle = (fraction * 360 - 90) * (Math.PI / 180);
  const hx = cx + r * Math.cos(handleAngle);
  const hy = cy + r * Math.sin(handleAngle);

  // Convert pointer position → hours value
  const angleToHours = useCallback((clientX: number, clientY: number) => {
    if (!svgRef.current) return hours;
    const rect = svgRef.current.getBoundingClientRect();
    const scaleX = 260 / rect.width;
    const scaleY = 260 / rect.height;
    const x = (clientX - rect.left) * scaleX - cx;
    const y = (clientY - rect.top) * scaleY - cy;
    let angle = Math.atan2(y, x) * (180 / Math.PI) + 90;
    if (angle < 0) angle += 360;
    return Math.max(1, Math.round((angle / 360) * MAX));
  }, [hours, cx, cy, MAX]);

  // Only start drag when pointer goes down ON the white handle
  const onHandlePointerDown = useCallback((e: React.PointerEvent<SVGCircleElement>) => {
    e.stopPropagation();
    (e.currentTarget as SVGCircleElement).setPointerCapture(e.pointerId);
    isDragging.current = true;
  }, []);

  // Move fires on the SVG (capture keeps pointer even if outside handle)
  const onSvgPointerMove = useCallback((e: React.PointerEvent<SVGSVGElement>) => {
    if (!isDragging.current) return;
    onChange(angleToHours(e.clientX, e.clientY));
  }, [angleToHours, onChange]);

  const onPointerUp = useCallback(() => {
    isDragging.current = false;
  }, []);

  // 12 dots matching Figma — evenly spaced, deeper gray
  const ticks = Array.from({ length: 12 }, (_, i) => {
    const a = ((i / 12) * 360 - 90) * (Math.PI / 180);
    return { x: cx + tickR * Math.cos(a), y: cy + tickR * Math.sin(a) };
  });

  return (
    <div style={{ position: 'relative', width: '260px', height: '260px' }}>
      <svg
        ref={svgRef}
        width="260" height="260"
        viewBox="0 0 260 260"
        style={{ touchAction: 'none', cursor: 'default' }}
        onPointerMove={onSvgPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      >
        {/* defs */}
        <defs>
          <radialGradient id="handleGrad" cx="45%" cy="35%" r="60%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="70%" stopColor="#f5f5f5" />
            <stop offset="100%" stopColor="#e8f5d0" />
          </radialGradient>
          <filter id="handleShadow" x="-40%" y="-40%" width="180%" height="180%">
            <feDropShadow dx="0" dy="2" stdDeviation="4" floodColor="rgba(0,0,0,0.20)" />
          </filter>
        </defs>

        {/* 0. Dial disk elevation shadow — large diffused shadow beneath entire dial */}
        <circle cx={cx} cy={cy} r={r + ringWidth/2 + 2} fill="rgb(235,235,235)"
          style={{ filter: 'drop-shadow(0 12px 24px rgba(0,0,0,0.18)) drop-shadow(0 4px 8px rgba(0,0,0,0.12))', pointerEvents: 'none' }}
        />

        {/* 1a. Outer gray border ring */}
        <circle cx={cx} cy={cy} r={r + ringWidth/2 - 1} fill="none"
          stroke="rgb(200,200,200)" strokeWidth="2"
          style={{ pointerEvents: 'none' }}
        />

        {/* 1b. Gray track ring */}
        <circle cx={cx} cy={cy} r={r} fill="none" stroke="rgb(225,225,225)" strokeWidth={ringWidth}
          style={{ pointerEvents: 'none' }}
        />

        {/* 1c. Inner gray border ring */}
        <circle cx={cx} cy={cy} r={r - ringWidth/2 + 1} fill="none"
          stroke="rgb(205,205,205)" strokeWidth="2"
          style={{ pointerEvents: 'none' }}
        />

        {/* 2. Tick dots — 12 dots, dark gray matching Figma */}
        {ticks.map((t, i) => (
          <circle key={i} cx={t.x} cy={t.y} r={3} fill="rgb(148,148,148)" style={{ pointerEvents: 'none' }} />
        ))}

        {/* 3. Lime green arc — covers active tick dots */}
        <circle
          cx={cx} cy={cy} r={r}
          fill="none"
          stroke="rgb(184,240,79)"
          strokeWidth={ringWidth}
          strokeLinecap="round"
          strokeDasharray={`${arcLength} ${circumference}`}
          transform={`rotate(-90 ${cx} ${cy})`}
          style={{ pointerEvents: 'none' }}
        />

        {/* 4. White handle with radial gradient + shadow — matches Figma */}
        <circle
          cx={hx} cy={hy} r={17} fill="url(#handleGrad)"
          filter="url(#handleShadow)"
          style={{ cursor: 'grab' }}
          onPointerDown={onHandlePointerDown}
        />

        {/* 5. Center number */}
        <text x={cx} y={cy - 10} textAnchor="middle" dominantBaseline="middle"
          style={{ fontFamily: 'var(--font-tt-norms)', fontSize: '48px', fontWeight: 700, fill: 'rgb(30,30,30)', pointerEvents: 'none' }}
        >{hours}</text>
        {/* 6. "hours" label */}
        <text x={cx} y={cy + 26} textAnchor="middle" dominantBaseline="middle"
          style={{ fontFamily: 'var(--font-tt-norms)', fontSize: '16px', fontWeight: 500, fill: 'rgb(120,120,120)', pointerEvents: 'none' }}
        >hours</text>
      </svg>
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
