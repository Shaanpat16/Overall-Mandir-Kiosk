import { motion } from 'motion/react';
import { appleEase } from '../motion/easing';
import BackHome from '../nam/BackHome';
import { DAYS, type Santo } from './data';
import { nyWall, parseClockToMinutes } from '../clock';

interface Props {
  santo: Santo;
  onBack: () => void;
  onGeneral: () => void;
  clock: Date;
}

function isLive(dayId: string, start: string, end: string, now: Date) {
  const wall = nyWall(now);
  const day = DAYS.find((d) => d.id === dayId);
  if (!day || day.iso !== wall.isoDate) return false;
  return wall.minutes >= parseClockToMinutes(start) && wall.minutes < parseClockToMinutes(end);
}

export default function SantoMine({ santo, onBack, onGeneral, clock }: Props) {
  const byDay = DAYS.map((d) => ({ day: d, events: santo.events.filter((e) => e.dayId === d.id) })).filter((g) => g.events.length);

  return (
    <div className="view-container" style={{ background: 'var(--canvas)' }}>
      <div className="content-well">
        <BackHome onBack={onBack} />
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          style={{
            fontFamily: 'var(--font-ui)',
            fontSize: 14,
            fontWeight: 700,
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: 'var(--accent)',
          }}
        >
          Pujya
        </motion.p>
        <motion.h1
          className="text-heading"
          style={{ fontSize: 48, marginTop: 6 }}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: appleEase }}
        >
          {santo.name}
        </motion.h1>
        <p className="text-body" style={{ marginTop: 8, marginBottom: 22, fontSize: 20 }}>
          Your assigned seva. The shared day board is under General.
        </p>

        <button
          onClick={onGeneral}
          style={{
            width: '100%',
            border: 'none',
            cursor: 'pointer',
            background: 'var(--ink)',
            color: 'var(--surface)',
            borderRadius: 20,
            padding: '18px 24px',
            marginBottom: 24,
            textAlign: 'left',
            fontFamily: 'var(--font-ui)',
            fontSize: 18,
            fontWeight: 600,
          }}
        >
          Open general schedule →
        </button>

        {byDay.map(({ day, events }) => (
          <div key={day.id} style={{ marginBottom: 28 }}>
            <p
              style={{
                fontFamily: 'var(--font-ui)',
                fontSize: 13,
                fontWeight: 700,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: 'var(--accent)',
                marginBottom: 12,
              }}
            >
              {day.label} · {day.date}
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {events.map((ev, i) => {
                const live = isLive(ev.dayId, ev.start, ev.end, clock);
                return (
                  <div
                    key={`${ev.start}-${i}`}
                    style={{
                      background: live ? 'var(--ink)' : 'var(--surface)',
                      color: live ? 'var(--surface)' : 'var(--ink)',
                      borderRadius: 22,
                      padding: '20px 24px',
                    }}
                  >
                    {live && (
                      <p
                        style={{
                          fontFamily: 'var(--font-ui)',
                          fontSize: 12,
                          fontWeight: 700,
                          letterSpacing: '0.14em',
                          textTransform: 'uppercase',
                          color: '#fda4af',
                          marginBottom: 8,
                        }}
                      >
                        Now
                      </p>
                    )}
                    <p style={{ fontFamily: 'var(--font-ui)', fontSize: 15, opacity: 0.7 }}>
                      {ev.start} – {ev.end} · {ev.place}
                    </p>
                    <p style={{ fontFamily: 'var(--font-display)', fontSize: 28, fontWeight: 600, marginTop: 4, lineHeight: 1.15 }}>
                      {ev.title}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
        <div style={{ height: 100 }} />
      </div>
    </div>
  );
}
