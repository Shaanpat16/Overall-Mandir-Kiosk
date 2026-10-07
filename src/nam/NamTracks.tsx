import { useState } from 'react';
import { motion } from 'motion/react';
import { appleEase } from '../motion/easing';
import BackHome from './BackHome';
import { DAYS, TRACKS, type TrackId } from './data';
import { useLiveClock } from '../clock';
import { namDayId, sessionsForDay } from './liveBoard';

interface Props {
  onBack: () => void;
}

export default function NamTracks({ onBack }: Props) {
  const clock = useLiveClock();
  const dayId = namDayId(clock);
  const [active, setActive] = useState<Exclude<TrackId, 'all'>>('bhaio');
  const track = TRACKS.find((t) => t.id === active)!;
  const sessions = dayId ? sessionsForDay(dayId, active) : [];

  return (
    <div className="view-container" style={{ background: 'var(--canvas)' }}>
      <div className="content-well">
        <BackHome onBack={onBack} />
        <motion.h1
          className="text-heading"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: appleEase }}
        >
          Bhaio &amp; <em>Behno</em>
        </motion.h1>
        <motion.p className="text-body" style={{ marginTop: 8, marginBottom: 28, fontSize: 20 }}>
          Combined keynotes sit together. Travel, arti halls, and Friday afternoon split.
        </motion.p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 32 }}>
          {TRACKS.map((t) => {
            const on = t.id === active;
            return (
              <motion.button
                key={t.id}
                onClick={() => setActive(t.id)}
                whileTap={{ scale: 0.97 }}
                style={{
                  textAlign: 'left',
                  border: 'none',
                  cursor: 'pointer',
                  borderRadius: 'var(--card-radius)',
                  padding: '24px 22px',
                  background: on ? 'var(--ink)' : 'var(--surface)',
                  color: on ? 'var(--surface)' : 'var(--ink)',
                  minHeight: 150,
                  WebkitTapHighlightColor: 'transparent',
                }}
              >
                <p
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 28,
                    fontWeight: 600,
                    lineHeight: 1.15,
                  }}
                >
                  {t.label}
                </p>
                <p
                  style={{
                    fontFamily: 'var(--font-ui)',
                    fontSize: 16,
                    marginTop: 10,
                    opacity: 0.72,
                    lineHeight: 1.4,
                  }}
                >
                  {t.blurb}
                </p>
              </motion.button>
            );
          })}
        </div>

        <p
          style={{
            fontFamily: 'var(--font-ui)',
            fontSize: 14,
            fontWeight: 600,
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: 'var(--accent)',
            marginBottom: 16,
          }}
        >
          {track.label} · today
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {sessions.length === 0 && (
            <p className="text-body" style={{ fontSize: 18, color: 'var(--muted)' }}>
              Today&apos;s {track.label} blocks appear here during NAAM.
            </p>
          )}
          {sessions.map((s) => {
            const day = DAYS.find((d) => d.id === s.dayId);
            return (
              <div
                key={s.id}
                style={{
                  background: 'var(--surface)',
                  borderRadius: 'var(--card-radius)',
                  padding: '22px 26px',
                  opacity: s.track === 'all' ? 1 : 1,
                  outline: s.track === active ? '2px solid var(--accent-soft)' : 'none',
                }}
              >
                <p
                  style={{
                    fontFamily: 'var(--font-ui)',
                    fontSize: 14,
                    color: 'var(--muted)',
                  }}
                >
                  {day?.label} · {s.start} – {s.end} · {s.location}
                  {s.track === 'all' ? ' · Combined' : ''}
                </p>
                <p
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 22,
                    fontWeight: 600,
                    color: 'var(--ink)',
                    marginTop: 6,
                  }}
                >
                  {s.title}
                </p>
                <p
                  style={{
                    fontFamily: 'var(--font-ui)',
                    fontSize: 16,
                    color: 'var(--muted)',
                    marginTop: 8,
                    lineHeight: 1.5,
                  }}
                >
                  {s.description}
                </p>
              </div>
            );
          })}
        </div>
        <div style={{ height: 100 }} />
      </div>
    </div>
  );
}
