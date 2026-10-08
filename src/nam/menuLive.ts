import { nyWall, parseClockToMinutes } from '../clock';
import { MENU_DAYS } from './data';

/** A meal’s menu appears 20 minutes before service and hides when that window ends. */
export const MENU_LEAD_MIN = 20;

type Day = (typeof MENU_DAYS)[number];
type Meal = Day['meals'][number];

function timed(day: Day, meal: Meal) {
  return {
    day,
    meal,
    startMin: parseClockToMinutes(meal.start),
    endMin: parseClockToMinutes(meal.end),
  };
}

export function visibleNamMeal(now: Date) {
  const wall = nyWall(now);
  const dayIdx = MENU_DAYS.findIndex((d) => d.iso === wall.isoDate);
  const today = dayIdx >= 0 ? MENU_DAYS[dayIdx] : null;
  const todayMeals = today ? today.meals.map((m) => timed(today, m)) : [];

  const showing = todayMeals.find(
    (m) => wall.minutes >= m.startMin - MENU_LEAD_MIN && wall.minutes < m.endMin,
  );
  if (showing) {
    return {
      day: showing.day,
      meal: showing.meal,
      phase: (wall.minutes < showing.startMin ? 'soon' : 'now') as 'soon' | 'now',
      wait: Math.max(0, showing.startMin - wall.minutes),
      next: null as Meal | null,
      nextDay: null as Day | null,
    };
  }

  const nextToday = todayMeals.find((m) => m.startMin - MENU_LEAD_MIN > wall.minutes);
  const tomorrow = dayIdx >= 0 ? (MENU_DAYS[dayIdx + 1] ?? null) : wall.isoDate < MENU_DAYS[0].iso ? MENU_DAYS[0] : null;
  const next = nextToday ?? (tomorrow ? timed(tomorrow, tomorrow.meals[0]) : null);

  return {
    day: today ?? tomorrow ?? MENU_DAYS[MENU_DAYS.length - 1],
    meal: null as Meal | null,
    phase: 'closed' as const,
    wait: 0,
    next: next?.meal ?? null,
    nextDay: next?.day ?? null,
  };
}
