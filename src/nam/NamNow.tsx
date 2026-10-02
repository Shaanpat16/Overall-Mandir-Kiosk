import { useEffect, useMemo, useState, type PointerEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { appleEase } from '../motion/easing';
import BackHome from './BackHome';
import { DAYS, SESSIONS, type NamSession, type TrackId } from './data';

interface Props {
  onBack: () => void;
}

const DAY_ISO: Record<string, string> = {
  thu: '2026-10-08',
  fri: '2026-10-09',
  sat: '2026-10-10',
  sun: '2026-10-11',
};

function parseClock(t: string) {
  const m = t.match(/(\d+):(\d+)\s*(AM|PM)/i);
  if (!m) return { h: 0, min: 0 };
  let h = Number(m[1]);
  const min = Number(m[2]);
  const ap = m[3].toUpperCase();
  if (ap === 'PM' && h !== 12) h += 12;
  if (ap === 'AM' && h === 12) h = 0;
  return { h, min };
}

function at(dayId: string, time: string) {
  const { h, min } = parseClock(time);
  const d = new Date(`${DAY_ISO[dayId]}T00:00:00`);
  d.setHours(h, min, 0, 0);
  return d;
}

/** During NAAM use wall clock; otherwise map today's time onto Friday so the board stays alive. */
function kioskNow(real: Date) {
  const start = new Date('2026-10-08T00:00:00');
  const end = new Date('2026-10-12T00:00:00');
  if (real >= start && real < end) return real;
  const demo = new Date('2026-10-09T00:00:00');
  demo.setHours(real.getHours(), real.getMinutes(), real.getSeconds(), 0);
  return demo;
}

function laneSessions(lane: Exclude<TrackId, 'all'>) {
  return SESSIONS.filter((s) => s.track === 'all' || s.track === lane).map((s) => ({
    ...s,
    startAt: at(s.dayId, s.start),
    endAt: at(s.dayId, s.end),
  }));
}

function pad(n: number) {
  return String(n).padStart(2, '0');
}

export default function NamNow({ onBack }: Props) {
  const [lane, setLane] = useState<Exclude<TrackId, 'all'>>('bhaio');
  const [real, setReal] = useState(() => new Date());
  const [ripples, setRipples] = useState<{ id: number; x: number; y: number }[]>([]);

  useEffect(() => {
    const id = setInterval(() => setReal(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const now = kioskNow(real);
  const live = real >= new Date('2026-10-08T00:00:00') && real < new Date('2026-10-12T00:00:00');

  const { current, next, remain } = useMemo(() => {
    const list = laneSessions(lane).sort((a, b) => a.startAt.getTime() - b.startAt.getTime());
    const current =
      list.find((s) => now >= s.startAt && now < s.endAt) ?? null;
    const next = list.find((s) => s.startAt > now) ?? null;
    const target = current ? current.endAt : next?.startAt;
    const remain = target ? Math.max(0, target.getTime() - now.getTime()) : 0;
    return { current, next, remain };
  }, [lane, now]);

  const mins = Math.floor(remain / 60000);
  const secs = Math.floor((remain % 60000) / 1000);
  const clock = `${pad(mins)}:${pad(secs)}`;
  const day = DAYS.find((d) => d.id === (current ?? next)?.dayId);

  const pulse = (e: PointerEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    const id = Date.now();
    setRipples((prev) => [...prev.slice(-4), { id, x: e.clientX - r.left, y: e.clientY - r.top }]);
    setTimeout(() => setRipples((prev) => prev.filter((p) => p.id !== id)), 900);
  };

  return (
    <div className="view-container" style={{ background: '#0c0d12' }} onPointerDown={pulse}>
      <div
        className="content-well"
        style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden' }}
      >
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
          <p
            style={{
              fontFamily: 'var(--font-ui)',
              fontSize: 15,
              color: 'rgba(255,251,245,0.45)',
            }}
          >
            {live ? 'Live' : 'Preview · Friday mapped to now'}
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
            {day?.label ?? 'Between days'} · {current ? 'Happening now' : 'Up next'}
          </p>

          <AnimatePresence mode="wait">
            <motion.p
              key={(current ?? next)?.id ?? 'none'}
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
              {(current ?? next)?.title ?? 'See you at NAAM'}
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
            {(current ?? next)?.location ?? 'Edison campus'}
          </p>

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
            {current ? 'Until this block ends' : 'Until you need to move'}
          </p>
        </motion.div>

        <NextStrip current={current} next={next} />
      </div>
    </div>
  );
}

function NextStrip({
  current,
  next,
}: {
  current: NamSession | null;
  next: NamSession | null;
}) {
  const row = next ?? current;
  if (!row) return <div style={{ height: 16 }} />;
  return (
    <div
      style={{
        flexShrink: 0,
        marginTop: 16,
        padding: '22px 28px',
        borderRadius: 28,
        background: 'rgba(255,251,245,0.06)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 16,
      }}
    >
      <div>
        <p
          style={{
            fontFamily: 'var(--font-ui)',
            fontSize: 13,
            fontWeight: 600,
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: '#fda4af',
          }}
        >
          {next ? 'Then' : 'This block'}
        </p>
        <p
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 26,
            fontWeight: 600,
            color: '#FFFBF5',
            marginTop: 4,
          }}
        >
          {row.title}
        </p>
      </div>
      <p
        style={{
          fontFamily: 'var(--font-ui)',
          fontSize: 16,
          color: 'rgba(255,251,245,0.55)',
          textAlign: 'right',
          flexShrink: 0,
        }}
      >
        {row.start}
        <br />
        {row.location}
      </p>
    </div>
  );
}
