import { useMemo, useState } from 'react';
import { motion } from 'motion/react';
import { appleEase } from '../motion/easing';
import BackHome from '../nam/BackHome';
import { DAYS, GENERAL } from './data';
import { nyWall, parseClockToMinutes } from '../clock';

interface Props {
  onBack: () => void;
  clock: Date;
}

export default function SantoGeneral({ onBack, clock }: Props) {
  const todayIso = nyWall(clock).isoDate;
  const today = DAYS.find((d) => d.iso === todayIso)?.id ?? 'thu8';
  const [dayId, setDayId] = useState(today);
  const day = DAYS.find((d) => d.id === dayId)!;
  const events = GENERAL[dayId] ?? [];
  const wall = useMemo(() => nyWall(clock), [clock]);

  return (
    <div className="view-container" style={{ background: 'var(--canvas)' }}>
      <div className="content-well" style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <div style={{ flexShrink: 0 }}>
          <BackHome onBack={onBack} />
          <motion.h1
            className="text-heading"
            style={{ fontSize: 48 }}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: appleEase }}
          >
            General <em>board</em>
          </motion.h1>
          <p className="text-body" style={{ marginTop: 8, marginBottom: 16, fontSize: 20 }}>
            Pujya Santo itinerary · Oct 5–15, 2026 · NAAM Edison Oct 8–11
          </p>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(6, minmax(0, 1fr))',
              gap: 8,
              marginBottom: 14,
            }}
          >
            {DAYS.map((d) => {
              const on = d.id === dayId;
              return (
                <button
                  key={d.id}
                  onClick={() => setDayId(d.id)}
                  style={{
                    minWidth: 0,
                    border: 'none',
                    cursor: 'pointer',
                    borderRadius: 16,
                    padding: '12px 4px 14px',
                    background: on ? 'var(--ink)' : 'var(--surface)',
                    color: on ? 'var(--surface)' : 'var(--ink)',
                  }}
                >
                  <p style={{ fontFamily: 'var(--font-ui)', fontSize: 15, fontWeight: 700 }}>{d.short}</p>
                  <p style={{ fontFamily: 'var(--font-ui)', fontSize: 14, opacity: 0.7, marginTop: 4 }}>
                    {d.date.replace('Oct ', '')}
                  </p>
                </button>
              );
            })}
          </div>

          <p
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 22,
              fontStyle: 'italic',
              color: 'var(--muted)',
              marginBottom: 12,
            }}
          >
            {day.kicker}
          </p>
        </div>

        <div style={{ flex: 1, minHeight: 0, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 10, paddingBottom: 24 }}>
          {events.map((ev, i) => {
            const live =
              day.iso === wall.isoDate &&
              wall.minutes >= parseClockToMinutes(ev.start) &&
              wall.minutes < parseClockToMinutes(ev.end);
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
                <p style={{ fontFamily: 'var(--font-display)', fontSize: 26, fontWeight: 600, marginTop: 4, lineHeight: 1.2 }}>
                  {ev.title}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
