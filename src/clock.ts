import { useEffect, useState } from 'react';

/** Edison NJ — never follow the tablet or Render server timezone. */
export const KIOSK_TZ = 'America/New_York';

export function formatKioskTime(d: Date) {
  return d.toLocaleTimeString('en-US', {
    timeZone: KIOSK_TZ,
    hour: 'numeric',
    minute: '2-digit',
    second: '2-digit',
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
