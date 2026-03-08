'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
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
  const [shellOffset, setShellOffset] = useState(80);
  const [viewport, setViewport] = useState({ width: 1280, height: 900 });

  useEffect(() => {
    if (!open || typeof window === 'undefined') return;

    const visualViewport = window.visualViewport;

    const measureHeaderOffset = () => {
      const navbar = document.querySelector<HTMLElement>('[data-shell-navbar]');
      const navbarBottom = navbar?.getBoundingClientRect().bottom ?? 80;

      setShellOffset(Math.max(0, Math.round(navbarBottom)) || 80);
      setViewport({
        width: visualViewport?.width ?? window.innerWidth,
        height: visualViewport?.height ?? window.innerHeight,
      });
    };

    measureHeaderOffset();
    window.addEventListener('resize', measureHeaderOffset);
    window.addEventListener('scroll', measureHeaderOffset, { passive: true });
    visualViewport?.addEventListener('resize', measureHeaderOffset);
    visualViewport?.addEventListener('scroll', measureHeaderOffset);

    return () => {
      window.removeEventListener('resize', measureHeaderOffset);
      window.removeEventListener('scroll', measureHeaderOffset);
      visualViewport?.removeEventListener('resize', measureHeaderOffset);
      visualViewport?.removeEventListener('scroll', measureHeaderOffset);
    };
  }, [open]);

  if (!open) return null;

  const modalBaseWidth = 361;
  const modalBaseHeight = showHourlyCalendar
    ? (hourlyShowTime ? 860 : 690)
    : showMonthlyCalendar
    ? 690
    : 597;
  const headerGap = 24;
  const availableWidth = Math.max(280, viewport.width - 32);
  const availableHeight = Math.max(280, viewport.height - shellOffset - (headerGap * 2));
  const modalScale = Math.min(1, availableWidth / modalBaseWidth, availableHeight / modalBaseHeight);
  const modalLayoutSize = {
    width: modalBaseWidth * modalScale,
    height: modalBaseHeight * modalScale,
  };

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
      const end = rangeEnd ? ` - ${fmtDate(rangeEnd)}` : '';
      const time = `${selectedHour}:${String(selectedMinute).padStart(2, '0')} ${isPM ? 'PM' : 'AM'}`;
      onConfirm(`${start}${end}, ${time}`);
    } else if (tab === 'Monthly') {
      const start = monthlyRangeStart ? `${fmtDate(monthlyRangeStart)}${monthlyRangeEnd ? ` - ${fmtDate(monthlyRangeEnd)}` : ''} · ` : '';
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
      className="fixed bottom-0 left-0 right-0 z-50 flex justify-center"
      onClick={onClose}
      style={{
        animation: 'pickupModalBackdropIn 180ms ease both',
        alignItems: 'flex-start',
        top: `${shellOffset}px`,
        paddingTop: `${headerGap}px`,
        paddingBottom: '24px',
        paddingLeft: '16px',
        paddingRight: '16px',
        backgroundColor: 'rgba(6,9,14,0.58)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        overflowY: 'auto',
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          width: `${modalLayoutSize.width}px`,
          minHeight: `${modalLayoutSize.height}px`,
          display: 'flex',
          justifyContent: 'center',
          flexShrink: 0,
        }}
      >
        <div
          style={{
            width: '361px',
            backgroundColor: '#ffffff',
            borderRadius: '20px',
            boxShadow: '0 24px 56px rgba(0,0,0,0.20)',
            overflow: 'hidden',
            fontFamily: 'var(--font-tt-norms)',
            animation: 'pickupModalPanelIn 220ms cubic-bezier(0.22, 1, 0.36, 1) both',
            transformOrigin: 'top center',
            transform: `scale(${modalScale})`,
          }}
        >
        {/* ── Tabs ── */}
        <div style={{ padding: '24px 24px 0' }}>
          <div style={{ display: 'flex', backgroundColor: 'rgb(224,223,223)', borderRadius: '50px', padding: '6px', minHeight: '68px' }}>
            {(['Daily', 'Monthly', 'Hourly'] as RentalTab[]).map(t => (
              <button key={t} onClick={() => switchTab(t)} style={{
                flex: 1, padding: '16px 0',
                fontFamily: 'var(--font-tt-norms)', fontSize: '18px', fontWeight: 500,
                color: tab === t ? '#000' : 'rgba(0,0,0,0.8)',
                backgroundColor: tab === t ? '#fff' : 'transparent',
                borderRadius: tab === t ? '999px' : undefined,
                border: 'none', cursor: 'pointer', transition: 'all 0.2s',
                boxShadow: tab === t ? '0 2px 8px rgba(0,0,0,0.16)' : 'none',
              }}>{t}</button>
            ))}
          </div>
        </div>

        {/* ── Fixed-height content area — taller when sub-calendar is open ── */}
        <div style={{
          height: showHourlyCalendar && hourlyShowTime
            ? '585px'
            : (showHourlyCalendar || showMonthlyCalendar)
            ? '505px'
            : '417px',
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
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start', height: '100%', gap: '24px', paddingTop: '32px' }}>
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
                      style={{ fontFamily: 'var(--font-tt-norms)', fontSize: '18px', fontWeight: 500, color: '#000', textDecoration: 'underline', textUnderlineOffset: '2px', cursor: 'pointer', textAlign: 'center' }}
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
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start', height: '100%', gap: '24px', paddingTop: '32px' }}>
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
                      style={{ fontFamily: 'var(--font-tt-norms)', fontSize: '18px', fontWeight: 500, color: '#000', textDecoration: 'underline', textUnderlineOffset: '2px', cursor: 'pointer', textAlign: 'center' }}
                    >
                      {monthlyRangeStart
                        ? `${fmtDate(monthlyRangeStart)}${monthlyRangeEnd ? ` - ${fmtDate(monthlyRangeEnd)}` : ''}`
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
          <div style={{ borderTop: '1px solid rgba(0,0,0,0.1)', padding: '16px', marginTop: 'auto' }}>
            <button onClick={handleConfirm} style={{
              width: '100%', height: '56px',
              backgroundColor: 'rgb(184,240,79)',
              borderRadius: '10px', border: 'none', cursor: 'pointer',
              fontFamily: 'var(--font-tt-norms)', fontSize: '18px', fontWeight: 500, color: '#000',
            }}>
              Confirm
            </button>
          </div>
        )}
        </div>
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
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '18px 14px 10px' }}>
        <span style={{ fontFamily: 'var(--font-tt-norms)', fontSize: '15px', fontWeight: 600, color: '#000' }}>
          {MONTH_NAMES[viewMonth]} {viewYear}
        </span>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button onClick={onPrevMonth} style={{ width: '20px', height: '20px', backgroundColor: 'transparent', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 0 }}>
            <ChevronIcon dir="left" />
          </button>
          <button onClick={onNextMonth} style={{ width: '20px', height: '20px', backgroundColor: 'transparent', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 0 }}>
            <ChevronIcon dir="right" />
          </button>
        </div>
      </div>

      {/* Day headers */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', padding: '0 14px' }}>
        {['S','M','T','W','T','F','S'].map((d, i) => (
          <div key={i} style={{ height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-tt-norms)', fontSize: '14px', fontWeight: 500, color: 'rgba(0,0,0,0.85)' }}>{d}</div>
        ))}
      </div>

      {/* Day cells — single selection */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', padding: '0 14px' }}>
        {days.map((d, i) => {
          const sel = d !== null && isSelected(d);
          return (
            <div key={i} style={{ height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {d !== null ? (
                <button onClick={() => onDayClick(tsFor(d))} style={{
                  width: '40px', height: '40px',
                  borderRadius: sel ? '8px' : '50%',
                  backgroundColor: sel ? '#000' : 'transparent',
                  color: sel ? '#fff' : 'rgba(0,0,0,0.5)',
                  fontFamily: 'var(--font-tt-norms)', fontSize: '16px', fontWeight: sel ? 600 : 500,
                  border: 'none', cursor: 'pointer', transition: 'all 0.15s',
                }}>{d}</button>
              ) : null}
            </div>
          );
        })}
      </div>

      {/* Time picker — shown after date selected */}
      {showTime && selectedDate && (
        <div style={{ marginTop: 'auto', borderTop: '1px solid #E7E7E7', padding: '12px 14px 18px', position: 'relative' }}>
          <div style={{ position: 'absolute', left: '68px', right: '68px', top: '86px', height: '30px', backgroundColor: 'rgba(0,0,0,0.06)', borderRadius: '6px', pointerEvents: 'none' }} />
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '2px', minHeight: '132px' }}>
            <DrumScroll value={hour} min={1} max={12} onChange={onHourChange} />
            <span style={{ fontSize: '18px', fontWeight: 700, color: '#000', paddingBottom: '2px', margin: '0 4px' }}>:</span>
            <DrumScroll value={minute} min={0} max={59} onChange={onMinuteChange} pad />
            <div style={{ display: 'flex', flexDirection: 'column', marginLeft: '12px' }}>
              {['AM', 'PM'].map(p => (
                <button key={p} onClick={() => onIsPMChange(p === 'PM')} style={{
                  fontFamily: 'var(--font-tt-norms)', fontSize: '14px', fontWeight: 500,
                  color: (isPM && p === 'PM') || (!isPM && p === 'AM') ? '#000' : 'rgba(0,0,0,0.28)',
                  background: 'none', border: 'none', cursor: 'pointer', padding: '5px 0', lineHeight: '20px',
                }}>{p}</button>
              ))}
            </div>
          </div>
          <button onClick={onBack} style={{
            width: '100%', height: '56px', marginTop: '12px',
            backgroundColor: 'rgb(184,240,79)', color: '#000',
            borderRadius: '10px', border: 'none', cursor: 'pointer',
            fontFamily: 'var(--font-tt-norms)', fontSize: '18px', fontWeight: 500,
            display: 'flex', alignItems: 'center', justifyContent: 'center', lineHeight: 1,
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

function DialDots() {
  const cx = 156.5;
  const cy = 156.5;
  const radius = 126.21;
  const dotRadius = 2.1;
  const dotCount = 9;
  const step = 360 / dotCount;

  return (
    <>
      {Array.from({ length: dotCount }, (_, index) => {
        const angle = (-90 + (index * step)) * (Math.PI / 180);
        const x = cx + radius * Math.cos(angle);
        const y = cy + radius * Math.sin(angle);

        return (
          <circle
            key={index}
            cx={x}
            cy={y}
            r={dotRadius}
            fill="rgba(0, 0, 0, 0.5)"
            style={{ pointerEvents: 'none' }}
          />
        );
      })}
    </>
  );
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
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '18px 14px 10px' }}>
        <span style={{ fontFamily: 'var(--font-tt-norms)', fontSize: '15px', fontWeight: 600, color: '#000' }}>
          {MONTH_NAMES[viewMonth]} {viewYear}
        </span>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button onClick={onPrevMonth} style={{ width: '20px', height: '20px', backgroundColor: 'transparent', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 0 }}>
            <ChevronIcon dir="left" />
          </button>
          <button onClick={onNextMonth} style={{ width: '20px', height: '20px', backgroundColor: 'transparent', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 0 }}>
            <ChevronIcon dir="right" />
          </button>
        </div>
      </div>

      {/* Selected range label — full date inside calendar */}
      {rangeStart && (
        <div style={{ textAlign: 'center', fontFamily: 'var(--font-tt-norms)', fontSize: '12px', color: 'rgba(0,0,0,0.45)', padding: '0 14px 4px' }}>
          {fmtDateFull(rangeStart)}{rangeEnd ? ` - ${fmtDateFull(rangeEnd)}` : ' - pick end date'}
        </div>
      )}

      {/* Day headers */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', padding: '0 14px' }}>
        {['S','M','T','W','T','F','S'].map((d, i) => (
          <div key={i} style={{ height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-tt-norms)', fontSize: '14px', fontWeight: 500, color: 'rgba(0,0,0,0.85)' }}>{d}</div>
        ))}
      </div>

      {/* Day cells */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', padding: '0 14px' }}>
        {days.map((d, i) => {
          const start   = d !== null && isStart(d);
          const end     = d !== null && isEnd(d);
          const inRange = d !== null && isInRange(d);
          const colIndex = i % 7;
          return (
            <div key={i} style={{
              height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center',
              backgroundColor: inRange ? 'rgba(0,0,0,0.06)' : 'transparent',
              borderRadius: inRange ? (colIndex === 0 ? '8px 0 0 8px' : colIndex === 6 ? '0 8px 8px 0' : '0') : undefined,
            }}>
              {d !== null ? (
                <button onClick={() => onDayClick(tsFor(d))} style={{
                  width: '40px', height: '40px',
                  borderRadius: start || end ? '8px' : '50%',
                  backgroundColor: start || end ? '#000' : 'transparent',
                  color: start || end ? '#fff' : 'rgba(0,0,0,0.5)',
                  fontFamily: 'var(--font-tt-norms)', fontSize: '16px', fontWeight: start || end ? 600 : 500,
                  border: 'none', cursor: 'pointer', transition: 'all 0.15s', position: 'relative', zIndex: 1,
                }}>{d}</button>
              ) : null}
            </div>
          );
        })}
      </div>

      {/* Done button */}
      {rangeStart && (
        <div style={{ marginTop: '12px', borderTop: '1px solid #E7E7E7', padding: '14px 14px 12px' }}>
          <button onClick={onBack} style={{
            width: '100%', height: '48px',
            backgroundColor: 'rgb(184,240,79)', color: '#000',
            borderRadius: '10px', border: 'none', cursor: rangeEnd ? 'pointer' : 'default',
            fontFamily: 'var(--font-tt-norms)', fontSize: '16px', fontWeight: 500,
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
  const size = 313;
  const cx = 156.5; const cy = 156.5;
  const r = 124.53;
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
    const scaleX = size / rect.width;
    const scaleY = size / rect.height;
    const x = (clientX - rect.left) * scaleX - cx;
    const y = (clientY - rect.top) * scaleY - cy;
    let angle = Math.atan2(y, x) * (180 / Math.PI) + 90;
    if (angle < 0) angle += 360;
    return Math.max(1, Math.min(MAX, Math.round((angle / 360) * MAX)));
  }, [months, cx, cy, MAX, size]);

  const onHandlePointerDown = useCallback((e: React.PointerEvent<SVGImageElement>) => {
    e.stopPropagation();
    (e.currentTarget as SVGImageElement).setPointerCapture(e.pointerId);
    isDragging.current = true;
  }, []);

  const onSvgPointerMove = useCallback((e: React.PointerEvent<SVGSVGElement>) => {
    if (!isDragging.current) return;
    onChange(angleToMonths(e.clientX, e.clientY));
  }, [angleToMonths, onChange]);

  const onPointerUp = useCallback(() => { isDragging.current = false; }, []);

  return (
    <div style={{ position: 'relative', width: `${size}px`, height: `${size}px`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <svg ref={svgRef} width={size} height={size} viewBox={`0 0 ${size} ${size}`}
        style={{ touchAction: 'none', cursor: 'default' }}
        onPointerMove={onSvgPointerMove} onPointerUp={onPointerUp} onPointerCancel={onPointerUp}
      >
        <defs>
          <filter id="monthArcGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feDropShadow dx="0" dy="-1.5" stdDeviation="3" floodColor="#C4F46B" floodOpacity="0.55" />
            <feDropShadow dx="0" dy="2.5" stdDeviation="4" floodColor="#90D516" floodOpacity="0.45" />
          </filter>
          <linearGradient id="monthArcGradient" x1="154" y1="4" x2="309" y2="187" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#C0F15A" />
            <stop offset="55%" stopColor="#B7ED3F" />
            <stop offset="100%" stopColor="#A6E922" />
          </linearGradient>
        </defs>
        <image
          href="/assets/calendar/Ellipse%20(2).svg"
          x="0"
          y="0"
          width="313"
          height="313"
          preserveAspectRatio="xMidYMid meet"
          style={{ pointerEvents: 'none' }}
        />
        <DialDots />
        <circle
          cx={cx}
          cy={cy}
          r={r}
          fill="none"
          stroke="url(#monthArcGradient)"
          strokeWidth={63}
          strokeLinecap="round"
          strokeDasharray={`${arcLength} ${circumference}`}
          transform={`rotate(-90 ${cx} ${cy})`}
          filter="url(#monthArcGlow)"
          style={{ pointerEvents: 'none' }}
        />
        <image
          href="/assets/calendar/Ellipse.svg"
          x="37.12"
          y="54.41"
          width="238.76"
          height="238.76"
          preserveAspectRatio="xMidYMid meet"
          style={{ pointerEvents: 'none' }}
        />
        <image
          href="/assets/calendar/Handle.svg"
          x={hx - 27.02}
          y={hy - 27.02}
          width="54.04"
          height="54.04"
          preserveAspectRatio="xMidYMid meet"
          style={{ cursor: 'grab' }}
          onPointerDown={onHandlePointerDown}
        />
        {/* Center number */}
        <text x={cx} y={cy - 12} textAnchor="middle" dominantBaseline="middle"
          style={{ fontFamily: 'var(--font-tt-norms)', fontSize: '60px', fontWeight: 700, fill: 'rgb(30,30,30)', pointerEvents: 'none' }}
        >{months}</text>
        {/* Center label */}
        <text x={cx} y={cy + 27} textAnchor="middle" dominantBaseline="middle"
          style={{ fontFamily: 'var(--font-tt-norms)', fontSize: '18px', fontWeight: 700, fill: 'rgb(34,34,34)', pointerEvents: 'none' }}
        >months</text>
      </svg>
    </div>
  );
}

/* ── HourlyDial – circular arc knob with full mouse drag support ─────────── */
function HourlyDial({ hours, onChange }: { hours: number; onChange: (h: number) => void }) {
  const MAX = 12;
  const size = 313;
  const cx = 156.5; const cy = 156.5;
  const r = 124.53;

  const svgRef = useRef<SVGSVGElement>(null);
  const isDragging = useRef(false);

  const fraction = hours / MAX;
  const circumference = 2 * Math.PI * r;
  const arcLength = fraction * circumference;

  const handleAngle = (fraction * 360 - 90) * (Math.PI / 180);
  const hx = cx + r * Math.cos(handleAngle);
  const hy = cy + r * Math.sin(handleAngle);

  const angleToHours = useCallback((clientX: number, clientY: number) => {
    if (!svgRef.current) return hours;
    const rect = svgRef.current.getBoundingClientRect();
    const scaleX = size / rect.width;
    const scaleY = size / rect.height;
    const x = (clientX - rect.left) * scaleX - cx;
    const y = (clientY - rect.top) * scaleY - cy;
    let angle = Math.atan2(y, x) * (180 / Math.PI) + 90;
    if (angle < 0) angle += 360;
    return Math.max(1, Math.round((angle / 360) * MAX));
  }, [hours, cx, cy, MAX, size]);

  const onHandlePointerDown = useCallback((e: React.PointerEvent<SVGImageElement>) => {
    e.stopPropagation();
    (e.currentTarget as SVGImageElement).setPointerCapture(e.pointerId);
    isDragging.current = true;
  }, []);

  const onSvgPointerMove = useCallback((e: React.PointerEvent<SVGSVGElement>) => {
    if (!isDragging.current) return;
    onChange(angleToHours(e.clientX, e.clientY));
  }, [angleToHours, onChange]);

  const onPointerUp = useCallback(() => {
    isDragging.current = false;
  }, []);

  return (
    <div style={{ position: 'relative', width: `${size}px`, height: `${size}px`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <svg
        ref={svgRef}
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        style={{ touchAction: 'none', cursor: 'default' }}
        onPointerMove={onSvgPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      >
        <defs>
          <filter id="hourArcGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feDropShadow dx="0" dy="-1.5" stdDeviation="3" floodColor="#C4F46B" floodOpacity="0.55" />
            <feDropShadow dx="0" dy="2.5" stdDeviation="4" floodColor="#90D516" floodOpacity="0.45" />
          </filter>
          <linearGradient id="hourArcGradient" x1="154" y1="4" x2="309" y2="187" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#C0F15A" />
            <stop offset="55%" stopColor="#B7ED3F" />
            <stop offset="100%" stopColor="#A6E922" />
          </linearGradient>
        </defs>
        <image href="/assets/calendar/Ellipse%20(2).svg" x="0" y="0" width="313" height="313" preserveAspectRatio="xMidYMid meet" style={{ pointerEvents: 'none' }} />
        <DialDots />
        <circle
          cx={cx}
          cy={cy}
          r={r}
          fill="none"
          stroke="url(#hourArcGradient)"
          strokeWidth={63}
          strokeLinecap="round"
          strokeDasharray={`${arcLength} ${circumference}`}
          transform={`rotate(-90 ${cx} ${cy})`}
          filter="url(#hourArcGlow)"
          style={{ pointerEvents: 'none' }}
        />
        <image href="/assets/calendar/Ellipse.svg" x="37.12" y="54.41" width="238.76" height="238.76" preserveAspectRatio="xMidYMid meet" style={{ pointerEvents: 'none' }} />
        <image href="/assets/calendar/Handle.svg" x={hx - 27.02} y={hy - 27.02} width="54.04" height="54.04" preserveAspectRatio="xMidYMid meet" style={{ cursor: 'grab' }} onPointerDown={onHandlePointerDown} />
        <text x={cx} y={cy - 12} textAnchor="middle" dominantBaseline="middle"
          style={{ fontFamily: 'var(--font-tt-norms)', fontSize: '60px', fontWeight: 700, fill: 'rgb(30,30,30)', pointerEvents: 'none' }}
        >{hours}</text>
        <text x={cx} y={cy + 27} textAnchor="middle" dominantBaseline="middle"
          style={{ fontFamily: 'var(--font-tt-norms)', fontSize: '18px', fontWeight: 700, fill: 'rgb(34,34,34)', pointerEvents: 'none' }}
        >hours</text>
      </svg>
    </div>
  );
}

function DrumScroll({ value, min, max, onChange, pad }: {
  value: number; min: number; max: number;
  onChange: (v: number) => void; pad?: boolean;
}) {
  const fmt = (n: number) => pad ? String(n).padStart(2, '0') : String(n);
  const prev = value <= min ? max : value - 1;
  const next = value >= max ? min : value + 1;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', cursor: 'pointer', width: '42px' }}
      onWheel={e => { e.preventDefault(); onChange(e.deltaY > 0 ? (value >= max ? min : value + 1) : (value <= min ? max : value - 1)); }}
    >
      <span onClick={() => onChange(prev)} style={{ fontFamily: 'var(--font-tt-norms)', fontSize: '12px', fontWeight: 400, color: 'rgba(0,0,0,0.16)', textAlign: 'center', lineHeight: '22px', cursor: 'pointer' }}>{fmt(prev)}</span>
      <span style={{ fontFamily: 'var(--font-tt-norms)', fontSize: '18px', fontWeight: 500, color: '#000', textAlign: 'center', lineHeight: '30px' }}>{fmt(value)}</span>
      <span onClick={() => onChange(next)} style={{ fontFamily: 'var(--font-tt-norms)', fontSize: '12px', fontWeight: 400, color: 'rgba(0,0,0,0.16)', textAlign: 'center', lineHeight: '22px', cursor: 'pointer' }}>{fmt(next)}</span>
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

