import { motion, AnimatePresence } from 'motion/react';
import { transitions, durations, appleEase } from '../motion/easing';
import { DAYS, GENERAL, SANTO_MENU, SANTO_META, type MenuSlot, type SantoEvent } from './data';
import { nyWall, parseClockToMinutes } from '../clock';

interface Props {
  isAttract: boolean;
  onWake: () => void;
  onNames: () => void;
  onGeneral: () => void;
  onMenu: () => void;
  clock: Date;
}

const SLOT_FALLBACK: Record<MenuSlot, { start: string; end: string }> = {
  breakfast: { start: '7:30 AM', end: '8:30 AM' },
  lunch: { start: '12:00 PM', end: '1:00 PM' },
  dinner: { start: '7:30 PM', end: '8:30 PM' },
  sweets: { start: '8:30 PM', end: '9:30 PM' },
};

const SLOT_MATCH: Record<MenuSlot, RegExp> = {
  breakfast: /breakfast/i,
  lunch: /lunch/i,
  dinner: /dinner/i,
  sweets: /dessert|sweet/i,
};

function mealClock(slot: MenuSlot, events: SantoEvent[]) {
  const hit = events.find((ev) => SLOT_MATCH[slot].test(ev.title));
  return hit ? { start: hit.start, end: hit.end } : SLOT_FALLBACK[slot];
}

export default function SantoHome({ isAttract, onWake, onNames, onGeneral, onMenu, clock }: Props) {
  const wall = nyWall(clock);
  const todayIdx = DAYS.findIndex((d) => d.iso === wall.isoDate);
  const today = todayIdx >= 0 ? DAYS[todayIdx] : undefined;
  const tomorrow = todayIdx >= 0 ? DAYS[todayIdx + 1] : undefined;
  const todayEvents = today ? (GENERAL[today.id] ?? []) : [];
  const tomorrowEvents = tomorrow ? (GENERAL[tomorrow.id] ?? []) : [];

  const currentIdx = todayEvents.findIndex(
    (ev) => wall.minutes >= parseClockToMinutes(ev.start) && wall.minutes < parseClockToMinutes(ev.end),
  );
  const nextIdx = todayEvents.findIndex((ev) => parseClockToMinutes(ev.start) > wall.minutes);
  const liveFrom = currentIdx >= 0 ? currentIdx : nextIdx;
  const restOfDay = liveFrom >= 0 ? todayEvents.slice(liveFrom, liveFrom + 6) : [];
  const dayDone = todayEvents.length > 0 && currentIdx < 0 && nextIdx < 0;
  const preview = dayDone ? tomorrowEvents.slice(0, 3) : restOfDay;

  const menuDay = SANTO_MENU.find((d) => d.id === today?.id);
  const mealLive = menuDay
    ? menuDay.meals
        .map((m) => {
          const t = mealClock(m.slot, todayEvents);
          return { ...m, ...t, startMin: parseClockToMinutes(t.start), endMin: parseClockToMinutes(t.end) };
        })
        .find((m) => wall.minutes >= m.startMin && wall.minutes < m.endMin) ??
      menuDay.meals
        .map((m) => {
          const t = mealClock(m.slot, todayEvents);
          return { ...m, ...t, startMin: parseClockToMinutes(t.start), endMin: parseClockToMinutes(t.end) };
        })
        .find((m) => m.startMin > wall.minutes)
    : undefined;

  return (
    <div className="view-container" style={{ background: 'var(--canvas)' }}>
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: isAttract ? '100%' : 280,
          overflow: 'hidden',
          transition: `height ${durations.slow}s cubic-bezier(0.22,1,0.36,1)`,
        }}
      >
        <div
          style={{
            width: '100%',
            height: '100%',
            backgroundImage: 'url(/images/nam/edison-aerial.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center 40%',
            animation: isAttract ? `kenBurns ${durations.attract}s ease-in-out infinite alternate` : 'none',
          }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: isAttract
              ? 'linear-gradient(180deg, rgba(17,24,39,0.35) 0%, rgba(17,24,39,0.72) 100%)'
              : 'linear-gradient(180deg, rgba(17,24,39,0.22) 0%, rgba(17,24,39,0.7) 100%)',
            transition: `background ${durations.slow}s`,
          }}
        />
      </div>

      <AnimatePresence>
        {isAttract && (
          <motion.div
            key="santo-attract"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={transitions.slow}
            onClick={onWake}
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
              zIndex: 10,
              padding: 48,
              pointerEvents: isAttract ? 'auto' : 'none',
            }}
          >
            <p
              style={{
                fontFamily: 'var(--font-ui)',
                fontSize: 16,
                fontWeight: 600,
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                color: 'rgba(255,251,245,0.82)',
                marginBottom: 20,
              }}
            >
              Edison · October
            </p>
            <h1
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 112,
                fontWeight: 600,
                lineHeight: 1.05,
                color: 'var(--surface)',
                textShadow: '0 4px 60px rgba(0,0,0,0.3)',
                letterSpacing: '-0.02em',
              }}
            >
              NAAM <em style={{ fontWeight: 400, fontStyle: 'italic' }}>2026</em>
            </h1>
            <p
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 42,
                fontWeight: 500,
                color: 'var(--surface)',
                marginTop: 16,
              }}
            >
              Pujya Santo
            </p>
            <p
              style={{
                fontFamily: 'var(--font-ui)',
                fontSize: 22,
                color: 'rgba(255,251,245,0.88)',
                marginTop: 14,
              }}
            >
              {SANTO_META.datesLabel} · Edison
            </p>
            <p
              style={{
                fontFamily: 'var(--font-ui)',
                fontSize: 18,
                color: 'rgba(255,251,245,0.72)',
                marginTop: 8,
              }}
            >
              {SANTO_META.itineraryLabel}
            </p>
            <div
              style={{
                marginTop: 64,
                padding: '20px 52px',
                borderRadius: 999,
                background: 'rgba(255,251,245,0.12)',
                border: '1px solid rgba(255,251,245,0.1)',
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-ui)',
                  fontSize: 17,
                  fontWeight: 500,
                  color: 'var(--surface)',
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                }}
              >
                Touch to begin
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {!isAttract && (
          <motion.div
            key="santo-dash"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={transitions.normal}
            style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', zIndex: 20 }}
          >
            <div
              style={{
                height: 280,
                flexShrink: 0,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end',
                padding: '0 48px 28px',
              }}
            >
              <p
                style={{
                  fontFamily: 'var(--font-ui)',
                  fontSize: 14,
                  fontWeight: 600,
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  color: 'rgba(255,251,245,0.78)',
                }}
              >
                NAAM 2026 · Edison · {SANTO_META.datesLabel.replace(', 2026', '')}
              </p>
              <h1
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 56,
                  fontWeight: 600,
                  color: 'var(--surface)',
                  lineHeight: 1,
                  marginTop: 8,
                  textShadow: '0 6px 40px rgba(0,0,0,0.35)',
                }}
              >
                {today ? today.label : 'Pujya Santo'}
              </h1>
              <p style={{ fontFamily: 'var(--font-ui)', fontSize: 22, color: 'rgba(255,251,245,0.88)', marginTop: 8 }}>
                {today ? `${today.date} · ${today.kicker}` : SANTO_META.itineraryLabel}
              </p>
            </div>

            <div
              style={{
                flex: 1,
                minHeight: 0,
                padding: '8px 48px 148px',
                display: 'flex',
                flexDirection: 'column',
                gap: 10,
                overflow: 'hidden',
              }}
            >
              <motion.button
                onClick={onNames}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ ease: appleEase }}
                whileTap={{ scale: 0.985 }}
                style={{
                  flexShrink: 0,
                  border: 'none',
                  cursor: 'pointer',
                  textAlign: 'left',
                  background: 'var(--ink)',
                  color: 'var(--surface)',
                  borderRadius: 26,
                  padding: '22px 26px',
                }}
              >
                <p style={{ fontFamily: 'var(--font-display)', fontSize: 34, fontWeight: 600, lineHeight: 1.1 }}>
                  Tap your name
                </p>
                <p style={{ fontFamily: 'var(--font-ui)', fontSize: 17, opacity: 0.7, marginTop: 6 }}>
                  Open your assigned seva
                </p>
              </motion.button>

              <p
                style={{
                  fontFamily: 'var(--font-ui)',
                  fontSize: 15,
                  color: 'var(--muted)',
                  padding: '6px 4px 0',
                  flexShrink: 0,
                }}
              >
                {dayDone
                  ? tomorrow
                    ? `Day complete · ${tomorrow.label} ${tomorrow.date}`
                    : 'Day complete'
                  : 'Today on the board'}
              </p>

              <motion.button
                onClick={onGeneral}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.04, ease: appleEase }}
                whileTap={{ scale: 0.985 }}
                style={{
                  flexShrink: 0,
                  border: 'none',
                  cursor: 'pointer',
                  textAlign: 'left',
                  background: 'transparent',
                  padding: 0,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 8,
                }}
              >
                {preview.length === 0 && (
                  <p style={{ fontFamily: 'var(--font-display)', fontSize: 26, color: 'var(--ink)', padding: '8px 4px' }}>
                    No blocks on the santo itinerary for this date.
                  </p>
                )}
                {preview.map((ev, i) => {
                  const live =
                    !dayDone &&
                    wall.minutes >= parseClockToMinutes(ev.start) &&
                    wall.minutes < parseClockToMinutes(ev.end);
                  return (
                    <div
                      key={`${ev.dayId}-${ev.start}-${ev.title}`}
                      style={{
                        borderRadius: 18,
                        padding: '14px 18px',
                        background: live ? 'var(--ink)' : 'var(--surface)',
                        color: live ? 'var(--surface)' : 'var(--ink)',
                      }}
                    >
                      <p
                        style={{
                          fontFamily: 'var(--font-ui)',
                          fontSize: 14,
                          opacity: live ? 0.75 : 0.55,
                        }}
                      >
                        {live ? 'Now · ' : i === 0 && !live ? 'Next · ' : ''}
                        {ev.start} – {ev.end} · {ev.place}
                      </p>
                      <p
                        style={{
                          fontFamily: 'var(--font-display)',
                          fontSize: 24,
                          fontWeight: 600,
                          lineHeight: 1.15,
                          marginTop: 2,
                        }}
                      >
                        {ev.title}
                      </p>
                    </div>
                  );
                })}
              </motion.button>

              {mealLive && (
                <motion.button
                  onClick={onMenu}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.08, ease: appleEase }}
                  whileTap={{ scale: 0.985 }}
                  style={{
                    flexShrink: 0,
                    border: 'none',
                    cursor: 'pointer',
                    textAlign: 'left',
                    background: 'var(--surface)',
                    borderRadius: 22,
                    padding: '18px 22px',
                    marginTop: 4,
                  }}
                >
                  <p style={{ fontFamily: 'var(--font-ui)', fontSize: 15, color: 'var(--muted)' }}>
                    {wall.minutes >= mealLive.startMin && wall.minutes < mealLive.endMin ? 'Dining now' : 'Next meal'} ·{' '}
                    {mealLive.start} – {mealLive.end}
                  </p>
                  <p
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: 28,
                      fontWeight: 600,
                      color: 'var(--ink)',
                      marginTop: 4,
                    }}
                  >
                    {mealLive.name}
                  </p>
                  <p style={{ fontFamily: 'var(--font-ui)', fontSize: 17, color: 'var(--muted)', marginTop: 6 }}>
                    {mealLive.items.slice(0, 2).join(' · ')}
                  </p>
                </motion.button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
