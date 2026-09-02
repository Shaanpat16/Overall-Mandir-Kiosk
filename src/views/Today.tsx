import { motion } from 'motion/react';
import { useState, useEffect } from 'react';
import { appleEase } from '../motion/easing';
import { TIMINGS } from '../data/content';

interface TodayProps {
  onBack: () => void;
}

function parseTime(str: string): { hours: number; minutes: number } {
  const match = str.match(/(\d+):(\d+)\s*(AM|PM)/i);
  if (!match) return { hours: 0, minutes: 0 };
  let hours = parseInt(match[1]);
  const minutes = parseInt(match[2]);
  const period = match[3].toUpperCase();
  if (period === 'PM' && hours !== 12) hours += 12;
  if (period === 'AM' && hours === 12) hours = 0;
  return { hours, minutes };
}

function getNextArti(): { label: string; target: Date } {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  const morning = parseTime(TIMINGS.arti.morning);
  const evening = parseTime(TIMINGS.arti.evening);

  const morningDate = new Date(today);
  morningDate.setHours(morning.hours, morning.minutes, 0, 0);

  const eveningDate = new Date(today);
  eveningDate.setHours(evening.hours, evening.minutes, 0, 0);

  if (now < morningDate) return { label: 'Morning Arti', target: morningDate };
  if (now < eveningDate) return { label: 'Evening Arti', target: eveningDate };

  const tomorrowMorning = new Date(morningDate);
  tomorrowMorning.setDate(tomorrowMorning.getDate() + 1);
  return { label: 'Morning Arti', target: tomorrowMorning };
}

function isDarshanOpen(): { open: boolean; label: string } {
  const now = new Date();
  const h = now.getHours();
  const m = now.getMinutes();
  const time = h * 60 + m;

  const mornOpen = parseTime(TIMINGS.darshan.morning.open);
  const mornClose = parseTime(TIMINGS.darshan.morning.close);
  const eveOpen = parseTime(TIMINGS.darshan.evening.open);
  const eveClose = parseTime(TIMINGS.darshan.evening.close);

  const mornStart = mornOpen.hours * 60 + mornOpen.minutes;
  const mornEnd = mornClose.hours * 60 + mornClose.minutes;
  const eveStart = eveOpen.hours * 60 + eveOpen.minutes;
  const eveEnd = eveClose.hours * 60 + eveClose.minutes;

  if (time >= mornStart && time < mornEnd) return { open: true, label: 'Morning Darshan' };
  if (time >= eveStart && time < eveEnd) return { open: true, label: 'Evening Darshan' };
  if (time < mornStart) return { open: false, label: `Darshan opens at ${TIMINGS.darshan.morning.open}` };
  if (time >= mornEnd && time < eveStart) return { open: false, label: `Darshan resumes at ${TIMINGS.darshan.evening.open}` };
  return { open: false, label: `Darshan opens tomorrow at ${TIMINGS.darshan.morning.open}` };
}

function formatCountdown(ms: number): string {
  if (ms <= 0) return '00:00:00';
  const totalSec = Math.floor(ms / 1000);
  const h = Math.floor(totalSec / 3600);
  const m = Math.floor((totalSec % 3600) / 60);
  const s = totalSec % 60;
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

export default function Today({ onBack }: TodayProps) {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const nextArti = getNextArti();
  const countdown = nextArti.target.getTime() - now.getTime();
  const darshan = isDarshanOpen();

  return (
    <div className="view-container" style={{ background: 'var(--canvas)' }}>
      <div className="content-well">
        <motion.button
          onClick={onBack}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, ease: appleEase }}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            fontFamily: 'var(--font-ui)',
            fontSize: 15,
            color: 'var(--muted)',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            padding: 'var(--s-16) 0',
            marginBottom: 'var(--s-16)',
            WebkitTapHighlightColor: 'transparent',
          }}
        >
          ← Back
        </motion.button>

        {/* Heading */}
        <motion.h1
          className="text-heading"
          style={{ marginBottom: 'var(--s-48)' }}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: appleEase, delay: 0.05 }}
        >
          {darshan.open ? (
            <>Darshan is <em>open</em></>
          ) : (
            <em>{darshan.label}</em>
          )}
        </motion.h1>

        {/* Next arti countdown */}
        <motion.div
          style={{
            background: 'var(--surface)',
            borderRadius: 'var(--card-radius)',
            padding: 'var(--s-48)',
            marginBottom: 'var(--s-32)',
            textAlign: 'center',
          }}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: appleEase, delay: 0.12 }}
        >
          <p className="text-nav" style={{ color: 'var(--saffron)', marginBottom: 'var(--s-24)' }}>
            Next — {nextArti.label}
          </p>
          <p
            style={{
              fontFamily: 'var(--font-ui)',
              fontSize: 96,
              fontWeight: 700,
              color: 'var(--ink)',
              fontVariantNumeric: 'tabular-nums',
              letterSpacing: '-0.02em',
              lineHeight: 1,
            }}
          >
            {formatCountdown(countdown)}
          </p>
          <p className="text-body" style={{ marginTop: 'var(--s-16)', fontSize: 18 }}>
            until {nextArti.label.toLowerCase()}
          </p>
        </motion.div>

        {/* Darshan windows */}
        <motion.div
          style={{ display: 'flex', flexDirection: 'column', gap: 'var(--s-16)' }}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: appleEase, delay: 0.2 }}
        >
          <div
            style={{
              background: darshan.open && now.getHours() < 12 ? 'var(--saffron-soft)' : 'var(--surface)',
              borderRadius: 'var(--pill-radius)',
              padding: 'var(--s-24) var(--s-40)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              border: darshan.open && now.getHours() < 12 ? '2px solid var(--saffron)' : '2px solid transparent',
            }}
          >
            <span style={{ fontFamily: 'var(--font-ui)', fontSize: 20, fontWeight: 500, color: 'var(--ink)' }}>
              Morning Darshan
            </span>
            <span style={{ fontFamily: 'var(--font-ui)', fontSize: 20, fontWeight: 600, color: 'var(--ink)', fontVariantNumeric: 'tabular-nums' }}>
              {TIMINGS.darshan.morning.open} – {TIMINGS.darshan.morning.close}
            </span>
          </div>
          <div
            style={{
              background: darshan.open && now.getHours() >= 12 ? 'var(--saffron-soft)' : 'var(--surface)',
              borderRadius: 'var(--pill-radius)',
              padding: 'var(--s-24) var(--s-40)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              border: darshan.open && now.getHours() >= 12 ? '2px solid var(--saffron)' : '2px solid transparent',
            }}
          >
            <span style={{ fontFamily: 'var(--font-ui)', fontSize: 20, fontWeight: 500, color: 'var(--ink)' }}>
              Evening Darshan
            </span>
            <span style={{ fontFamily: 'var(--font-ui)', fontSize: 20, fontWeight: 600, color: 'var(--ink)', fontVariantNumeric: 'tabular-nums' }}>
              {TIMINGS.darshan.evening.open} – {TIMINGS.darshan.evening.close}
            </span>
          </div>
        </motion.div>

        {/* Abhishek info */}
        <motion.div
          style={{
            background: 'var(--surface)',
            borderRadius: 'var(--card-radius)',
            padding: 'var(--s-40)',
            marginTop: 'var(--s-32)',
          }}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: appleEase, delay: 0.28 }}
        >
          <p className="text-nav" style={{ marginBottom: 'var(--s-16)', color: 'var(--muted)' }}>
            {TIMINGS.abhishek.label}
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--s-12)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span className="text-body" style={{ fontSize: 18 }}>Mon – Fri</span>
              <span style={{ fontFamily: 'var(--font-ui)', fontSize: 18, fontWeight: 500, color: 'var(--ink)' }}>
                {TIMINGS.abhishek.weekday.morning} &amp; {TIMINGS.abhishek.weekday.evening}
              </span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span className="text-body" style={{ fontSize: 18 }}>Sat – Sun</span>
              <span style={{ fontFamily: 'var(--font-ui)', fontSize: 18, fontWeight: 500, color: 'var(--ink)' }}>
                {TIMINGS.abhishek.weekend.morning} &amp; {TIMINGS.abhishek.weekend.evening}
              </span>
            </div>
          </div>
        </motion.div>

        <div style={{ height: 120 }} />
      </div>
    </div>
  );
}
