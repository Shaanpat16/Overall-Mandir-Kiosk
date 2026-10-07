import { useMemo, useState, type PointerEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { appleEase } from '../motion/easing';
import BackHome from './BackHome';
import { DAYS, type TrackId } from './data';
import { useLiveClock, nyWall } from '../clock';
import { liveSession, namDayId } from './liveBoard';
import { parseClockToMinutes as toMin } from '../clock';

interface Props {
  onBack: () => void;
}

function pad(n: number) {
  return String(n).padStart(2, '0');
}

export default function NamNow({ onBack }: Props) {
  const real = useLiveClock();
  const [lane, setLane] = useState<Exclude<TrackId, 'all'>>('bhaio');
  const [ripples, setRipples] = useState<{ id: number; x: number; y: number }[]>([]);

  const wall = nyWall(real);
  const dayId = namDayId(real);
  const day = DAYS.find((d) => d.id === dayId);
  const { current } = liveSession(real, lane);

  const remain = useMemo(() => {
    if (!current || !dayId) return 0;
    const end = toMin(current.end);
    return Math.max(0, (end - wall.minutes) * 60 - wall.second);
  }, [current, dayId, wall.minutes, wall.second]);

  const mins = Math.floor(remain / 60);
  const secs = remain % 60;
  const clock = `${pad(mins)}:${pad(secs)}`;

  const pulse = (e: PointerEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    const id = Date.now();
    setRipples((prev) => [...prev.slice(-4), { id, x: e.clientX - r.left, y: e.clientY - r.top }]);
    setTimeout(() => setRipples((prev) => prev.filter((p) => p.id !== id)), 900);
  };

  return (
    <div className="view-container" style={{ background: '#0c0d12' }} onPointerDown={pulse}>
      <div className="content-well" style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <BackHome onBack={onBack} color="rgba(255,251,245,0.55)" />
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
          <h1
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 52,
              fontWeight: 500,
              color: '#FFFBF5',
            }}
          >
            Be <em style={{ fontStyle: 'italic', fontWeight: 400 }}>here</em>
          </h1>
          <p style={{ fontFamily: 'var(--font-ui)', fontSize: 15, color: 'rgba(255,251,245,0.45)' }}>
            Live · Edison
          </p>
        </div>

        <div style={{ display: 'flex', gap: 10, margin: '20px 0 24px' }}>
          {(['bhaio', 'behno'] as const).map((id) => (
            <button
              key={id}
              onClick={(e) => {
                e.stopPropagation();
                setLane(id);
              }}
              style={{
                flex: 1,
                height: 64,
                border: 'none',
                borderRadius: 999,
                cursor: 'pointer',
                fontFamily: 'var(--font-ui)',
                fontSize: 20,
                fontWeight: 600,
                background: lane === id ? '#FFFBF5' : 'rgba(255,251,245,0.08)',
                color: lane === id ? '#111827' : 'rgba(255,251,245,0.7)',
              }}
            >
              {id === 'bhaio' ? 'Bhaio' : 'Behno'}
            </button>
          ))}
        </div>

        <motion.div
          layout
          style={{
            flex: 1,
            minHeight: 0,
            borderRadius: 36,
            background: 'radial-gradient(circle at 50% 0%, rgba(155,27,48,0.35), transparent 55%), #14151c',
            position: 'relative',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 36,
            textAlign: 'center',
          }}
        >
          {ripples.map((p) => (
            <span
              key={p.id}
              style={{
                position: 'absolute',
                left: p.x,
                top: p.y,
                width: 24,
                height: 24,
                marginLeft: -12,
                marginTop: -12,
                borderRadius: '50%',
                border: '2px solid rgba(255,251,245,0.45)',
                animation: 'namPulse 0.85s ease-out forwards',
                pointerEvents: 'none',
              }}
            />
          ))}

          <p
            style={{
              fontFamily: 'var(--font-ui)',
              fontSize: 14,
              fontWeight: 600,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: '#fda4af',
            }}
          >
            {day?.label ?? wall.weekday} · {current ? 'Happening now' : 'Today'}
          </p>

          <AnimatePresence mode="wait">
            <motion.p
              key={current?.id ?? 'none'}
              initial={{ opacity: 0, y: 30, filter: 'blur(12px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -20, filter: 'blur(8px)' }}
              transition={{ duration: 0.5, ease: appleEase }}
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 56,
                fontWeight: 600,
                color: '#FFFBF5',
                lineHeight: 1.08,
                marginTop: 16,
                maxWidth: 860,
              }}
            >
              {current?.title ?? (dayId ? 'Between blocks' : 'NAAM is not in session')}
            </motion.p>
          </AnimatePresence>

          <p
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 28,
              fontStyle: 'italic',
              color: 'rgba(255,251,245,0.72)',
              marginTop: 14,
            }}
          >
            {current?.location ?? 'Edison campus'}
          </p>

          {current && (
            <>
              <p
                style={{
                  fontFamily: 'var(--font-ui)',
                  fontSize: 72,
                  fontWeight: 600,
                  fontVariantNumeric: 'tabular-nums',
                  color: '#FFFBF5',
                  letterSpacing: '0.06em',
                  marginTop: 28,
                  lineHeight: 1,
                }}
              >
                {clock}
              </p>
              <p
                style={{
                  fontFamily: 'var(--font-ui)',
                  fontSize: 15,
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  color: 'rgba(255,251,245,0.4)',
                  marginTop: 10,
                }}
              >
                Until this block ends
              </p>
            </>
          )}
        </motion.div>
      </div>
    </div>
  );
}
