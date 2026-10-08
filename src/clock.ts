import { useEffect, useState } from 'react';

/** Edison NJ — never follow the tablet or Render server timezone. */
export const KIOSK_TZ = 'America/New_York';

export function formatKioskTime(d: Date) {
  return d.toLocaleTimeString('en-US', {
    timeZone: KIOSK_TZ,
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
}

/** 0–23 in America/New_York */
export function kioskHour(d: Date) {
  const raw = new Intl.DateTimeFormat('en-US', {
    timeZone: KIOSK_TZ,
    hour: 'numeric',
    hour12: false,
  }).format(d);
  const n = parseInt(raw, 10);
  return n === 24 ? 0 : n;
}

export function isCampusOpen(d: Date) {
  const h = kioskHour(d);
  return h >= 7 && h < 20;
}

export type NyWall = {
  year: number;
  month: number;
  day: number;
  hour: number;
  minute: number;
  second: number;
  isoDate: string;
  minutes: number;
  weekday: string;
};

/** Wall clock in Edison, independent of the tablet timezone. */
export function nyWall(d: Date): NyWall {
  const p = Object.fromEntries(
    new Intl.DateTimeFormat('en-US', {
      timeZone: KIOSK_TZ,
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: 'numeric',
      minute: '2-digit',
      second: '2-digit',
      weekday: 'short',
      hourCycle: 'h23',
    })
      .formatToParts(d)
      .map((x) => [x.type, x.value]),
  );
  const hour = Number(p.hour) % 24;
  const minute = Number(p.minute);
  return {
    year: Number(p.year),
    month: Number(p.month),
    day: Number(p.day),
    hour,
    minute,
    second: Number(p.second),
    isoDate: `${p.year}-${p.month}-${p.day}`,
    minutes: hour * 60 + minute,
    weekday: p.weekday,
  };
}

export function parseClockToMinutes(t: string) {
  const m = t.match(/(\d+):(\d+)\s*(AM|PM)/i);
  if (!m) return 0;
  let h = Number(m[1]);
  const min = Number(m[2]);
  const ap = m[3].toUpperCase();
  if (ap === 'PM' && h !== 12) h += 12;
  if (ap === 'AM' && h === 12) h = 0;
  return h * 60 + min;
}

export function useLiveClock() {
  const [time, setTime] = useState(() => new Date());

  useEffect(() => {
    const tick = () => setTime(new Date());
    tick();
    const id = window.setInterval(tick, 1000);
    const onVis = () => {
      if (document.visibilityState === 'visible') tick();
    };
    document.addEventListener('visibilitychange', onVis);
    window.addEventListener('focus', tick);
    return () => {
      window.clearInterval(id);
      document.removeEventListener('visibilitychange', onVis);
      window.removeEventListener('focus', tick);
    };
  }, []);

  return time;
}
