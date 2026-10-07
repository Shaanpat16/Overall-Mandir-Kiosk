import { nyWall, parseClockToMinutes } from '../clock';
import { DAYS, NAM_DAY_ISO, SESSIONS, type NamSession, type TrackId } from './official';

const SOON_MINUTES = 20;

export function namDayId(now: Date) {
  const iso = nyWall(now).isoDate;
  return DAYS.find((d) => d.iso === iso)?.id ?? null;
}

export function inNamWindow(now: Date) {
  const iso = nyWall(now).isoDate;
  return iso >= NAM_DAY_ISO.thu && iso <= NAM_DAY_ISO.sun;
}

export function sessionsForDay(dayId: string, lane: TrackId = 'all') {
  return SESSIONS.filter((s) => {
    if (s.dayId !== dayId) return false;
    if (lane === 'all') return true;
    return s.track === 'all' || s.track === lane;
  });
}

export function isLive(s: NamSession, now: Date) {
  const wall = nyWall(now);
  if (NAM_DAY_ISO[s.dayId] !== wall.isoDate) return false;
  const start = parseClockToMinutes(s.start);
  const end = parseClockToMinutes(s.end);
  return wall.minutes >= start && wall.minutes < end;
}

export function minutesUntil(s: NamSession, now: Date) {
  const wall = nyWall(now);
  if (NAM_DAY_ISO[s.dayId] !== wall.isoDate) return null;
  return parseClockToMinutes(s.start) - wall.minutes;
}

export function liveSession(now: Date, lane: Exclude<TrackId, 'all'> = 'bhaio') {
  const dayId = namDayId(now);
  if (!dayId) return { dayId: null, current: null as NamSession | null, soon: null as NamSession | null };
  const list = sessionsForDay(dayId, lane);
  const current = list.find((s) => isLive(s, now)) ?? null;
  const soon =
    list.find((s) => {
      const wait = minutesUntil(s, now);
      return wait != null && wait > 0 && wait <= SOON_MINUTES;
    }) ?? null;
  return { dayId, current, soon };
}

export function attractNotice(now: Date) {
  const bhaio = liveSession(now, 'bhaio');
  const behno = liveSession(now, 'behno');
  const current = bhaio.current ?? behno.current;
  const soon = bhaio.soon ?? behno.soon;
  if (current) {
    return {
      kind: 'now' as const,
      session: current,
      wait: 0,
      split: Boolean(bhaio.current && behno.current && bhaio.current.id !== behno.current.id),
      bhaio: bhaio.current,
      behno: behno.current,
    };
  }
  if (soon) {
    return {
      kind: 'soon' as const,
      session: soon,
      wait: minutesUntil(soon, now) ?? 0,
      split: Boolean(bhaio.soon && behno.soon && bhaio.soon.id !== behno.soon.id),
      bhaio: bhaio.soon,
      behno: behno.soon,
    };
  }
  return null;
}
