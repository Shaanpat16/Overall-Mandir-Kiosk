import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { appleEase } from '../motion/easing';
import BackHome from './BackHome';
import { DAYS, ROOMS, SESSIONS } from './data';

interface Props {
  onBack: () => void;
}

export default function NamCampus({ onBack }: Props) {
  const [roomId, setRoomId] = useState<string | null>(null);
  const [dayId, setDayId] = useState<(typeof DAYS)[number]['id']>('thu');
  const room = ROOMS.find((r) => r.id === roomId);

  const sessions = room
    ? SESSIONS.filter(
        (s) => s.dayId === dayId && s.location.toLowerCase().includes(room.name.toLowerCase()),
      )
    : [];

  return (
    <div className="view-container" style={{ background: 'var(--canvas)' }}>
      <div className="content-well" style={{ display: 'flex', flexDirection: 'column' }}>
        <BackHome onBack={onBack} />
        <motion.h1
          className="text-heading"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: appleEase }}
        >
          Campus <em>map</em>
        </motion.h1>
        <p className="text-body" style={{ marginTop: 10, marginBottom: 24, fontSize: 20 }}>
          Tap a room, then a day, to see what is happening there.
        </p>

        <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
          {DAYS.map((d) => (
            <button
              key={d.id}
              onClick={() => setDayId(d.id)}
              style={{
                flex: 1,
                border: 'none',
                cursor: 'pointer',
                borderRadius: 999,
                padding: '14px 0',
                fontFamily: 'var(--font-ui)',
                fontSize: 15,
                fontWeight: 600,
                background: dayId === d.id ? 'var(--ink)' : 'var(--surface)',
                color: dayId === d.id ? 'var(--surface)' : 'var(--ink)',
              }}
            >
              {d.short}
            </button>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18, flex: 1 }}>
          {ROOMS.map((r) => (
            <motion.button
              key={r.id}
              onClick={() => setRoomId(r.id === roomId ? null : r.id)}
              whileTap={{ scale: 0.97 }}
              style={{
                position: 'relative',
                height: 240,
                border: 'none',
                padding: 0,
                borderRadius: 'var(--card-radius)',
                overflow: 'hidden',
                cursor: 'pointer',
                outline: r.id === roomId ? '3px solid var(--accent)' : 'none',
                outlineOffset: 2,
              }}
            >
              <img
                src={r.image}
                alt={r.name}
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              />
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(transparent 20%, rgba(17,24,39,0.82))',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-end',
                  padding: 18,
                  textAlign: 'left',
                }}
              >
                <p
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 24,
                    fontWeight: 600,
                    color: 'var(--surface)',
                    textShadow: '0 2px 12px rgba(0,0,0,0.45)',
                    lineHeight: 1.15,
                  }}
                >
                  {r.name}
                </p>
                <p style={{ fontFamily: 'var(--font-ui)', fontSize: 15, color: 'rgba(255,251,245,0.88)', marginTop: 4 }}>
                  {r.hint}
                </p>
              </div>
            </motion.button>
          ))}
        </div>

        <AnimatePresence>
          {room && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              style={{ overflow: 'hidden' }}
            >
              <div
                style={{
                  marginTop: 24,
                  background: 'var(--surface)',
                  borderRadius: 'var(--card-radius)',
                  padding: 28,
                }}
              >
                <p
                  style={{
                    fontFamily: 'var(--font-ui)',
                    fontSize: 13,
                    fontWeight: 600,
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    color: 'var(--accent)',
                    marginBottom: 10,
                  }}
                >
                  {room.name} · {DAYS.find((d) => d.id === dayId)?.label}
                </p>
                {sessions.length === 0 && (
                  <p className="text-body">No listed sessions in this room that day — it may be overflow seating.</p>
                )}
                {sessions.map((s) => (
                  <div key={s.id} style={{ marginTop: 16 }}>
                    <p style={{ fontFamily: 'var(--font-ui)', fontSize: 14, color: 'var(--muted)' }}>
                      {s.start} – {s.end}
                    </p>
                    <p
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: 22,
                        fontWeight: 600,
                        color: 'var(--ink)',
                      }}
                    >
                      {s.title}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <div style={{ height: 100 }} />
      </div>
    </div>
  );
}
