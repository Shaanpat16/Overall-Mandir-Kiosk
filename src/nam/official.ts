export const NAM = {
  name: 'North American Activities Meeting',
  short: 'NAAM 2026',
  host: 'BAPS Shri Swaminarayan Mandir',
  city: 'Edison, NJ',
  tagline: 'Four days of goshthi, breakouts, and seva for karyakars across North America.',
  datesLabel: 'October 8 – 11, 2026',
  venue: '2500 Woodbridge Avenue, Edison, NJ 08817',
  draftNote: 'Official block schedule as of July 11, 2026. Bhaio and Behno run staggered on Friday and Saturday.',
} as const;

export type TrackId = 'all' | 'bhaio' | 'behno';

export const TRACKS: { id: Exclude<TrackId, 'all'>; label: string; blurb: string }[] = [
  {
    id: 'bhaio',
    label: 'Bhaio',
    blurb: 'Earlier mandir block, Sabha Hall arti on Friday, Mandir arti on Saturday, group photo before snacks.',
  },
  {
    id: 'behno',
    label: 'Behno',
    blurb: 'Later travel to mandir, Mahila Program Friday afternoon, Mandir arti Friday, Sabha Hall arti Saturday.',
  },
];

export interface NamSession {
  id: string;
  dayId: string;
  start: string;
  end: string;
  title: string;
  location: string;
  track: TrackId;
  kind: 'plenary' | 'breakout' | 'worship' | 'meal' | 'arrive' | 'travel';
  description: string;
}

export const DAYS = [
  { id: 'thu', short: 'Thu', label: 'Thursday', date: 'Oct 8', theme: 'Arrival & Check-in' },
  { id: 'fri', short: 'Fri', label: 'Friday', date: 'Oct 9', theme: 'Keynotes 1 & 2' },
  { id: 'sat', short: 'Sat', label: 'Saturday', date: 'Oct 10', theme: 'Keynotes 3 & 4' },
  { id: 'sun', short: 'Sun', label: 'Sunday', date: 'Oct 11', theme: 'Departures' },
] as const;

function row(
  id: string,
  dayId: string,
  start: string,
  end: string,
  title: string,
  location: string,
  track: TrackId,
  kind: NamSession['kind'],
  description: string,
): NamSession {
  return { id, dayId, start, end, title, location, track, kind, description };
}

export const SESSIONS: NamSession[] = [
  row('thu-arrive', 'thu', '5:00 PM', '7:00 PM', 'Arrival & Check-in', 'Lobby', 'all', 'arrive', 'Ongoing arrival. Mukhpath testing opens with check-in.'),
  row('thu-arti', 'thu', '7:00 PM', '7:15 PM', 'Arti', 'Mandir', 'all', 'worship', 'Short arti after the first wave of arrivals.'),
  row('thu-dinner', 'thu', '7:15 PM', '9:00 PM', 'Dinner & Dessert', 'Dining Hall', 'all', 'meal', 'Ongoing arrival and check-in continue through dinner. Mukhpath testing 8:00–9:00 PM.'),
  row('thu-mukhpath', 'thu', '8:00 PM', '9:00 PM', 'Mukhpath Testing', 'Campus', 'all', 'breakout', 'Evening testing window during dinner.'),
  row('thu-utaro', 'thu', '9:00 PM', '9:30 PM', 'Depart to Utaro', 'Utaro', 'all', 'travel', 'Buses to overnight housing.'),

  row('fri-travel-b', 'fri', '6:00 AM', '7:00 AM', 'Travel to Mandir', 'Mandir', 'bhaio', 'travel', 'Bhaio depart utaro for the mandir.'),
  row('fri-travel-n', 'fri', '6:15 AM', '7:30 AM', 'Travel to Mandir', 'Mandir', 'behno', 'travel', 'Behno travel block starts later than bhaio.'),
  row('fri-arti-b', 'fri', '7:00 AM', '8:00 AM', 'Arti, Darshan, Abhishek', 'Mandir', 'bhaio', 'worship', 'Morning worship before breakfast.'),
  row('fri-breakfast-n', 'fri', '7:30 AM', '8:30 AM', 'Delegate Breakfast', 'Dining Hall', 'behno', 'meal', 'Behno breakfast while bhaio finish worship.'),
  row('fri-breakfast-b', 'fri', '8:00 AM', '8:45 AM', 'Delegate Breakfast', 'Dining Hall', 'bhaio', 'meal', 'Bhaio breakfast after arti / darshan / abhishek.'),
  row('fri-darshan-n', 'fri', '8:30 AM', '8:45 AM', 'Darshan, Abhishek', 'Mandir', 'behno', 'worship', 'Short darshan and abhishek after breakfast.'),
  row('fri-seat', 'fri', '8:45 AM', '9:00 AM', 'Seating', 'Sabha Hall', 'all', 'arrive', 'Move into the hall for Keynote 1.'),
  row('fri-k1', 'fri', '9:00 AM', '10:45 AM', 'Keynote Program 1', 'Sabha Hall', 'all', 'plenary', 'i/eBKY combined — bhaio and behno together.'),
  row('fri-tr1-b', 'fri', '10:45 AM', '11:00 AM', 'Travel', 'Campus', 'bhaio', 'travel', 'Move to breakout rooms.'),
  row('fri-tr1-n', 'fri', '10:45 AM', '11:00 AM', 'Travel', 'Campus', 'behno', 'travel', 'Move to breakout rooms.'),
  row('fri-bo1-b', 'fri', '11:00 AM', '12:30 PM', 'Team Breakouts', 'Classrooms', 'bhaio', 'breakout', 'Morning team sessions.'),
  row('fri-bo1-n', 'fri', '11:00 AM', '12:30 PM', 'Team Breakouts', 'Classrooms', 'behno', 'breakout', 'Morning team sessions.'),
  row('fri-lunch', 'fri', '12:30 PM', '2:00 PM', 'Delegate Lunch / Break', 'Dining Hall', 'all', 'meal', 'Lunch plus mukhpath testing during the break.'),
  row('fri-g1-b', 'fri', '2:00 PM', '2:45 PM', 'Goshthi 1', 'Campus', 'bhaio', 'breakout', 'First goshthi of NAAM.'),
  row('fri-g1-n', 'fri', '2:00 PM', '2:45 PM', 'Goshthi 1', 'Campus', 'behno', 'breakout', 'First goshthi of NAAM.'),
  row('fri-tr2-b', 'fri', '2:45 PM', '3:00 PM', 'Travel', 'Campus', 'bhaio', 'travel', 'To afternoon sessions.'),
  row('fri-tr2-n', 'fri', '2:45 PM', '3:00 PM', 'Travel', 'Campus', 'behno', 'travel', 'To Mahila Program.'),
  row('fri-bo2-b', 'fri', '3:00 PM', '4:15 PM', 'Team Breakouts', 'Classrooms', 'bhaio', 'breakout', 'Afternoon team sessions.'),
  row('fri-mahila', 'fri', '3:00 PM', '4:15 PM', 'Mahila Program', 'Main Hall', 'behno', 'plenary', 'Behno program in the Main Hall.'),
  row('fri-photo-b', 'fri', '4:15 PM', '4:30 PM', 'Group Photo', 'Campus', 'bhaio', 'arrive', 'Bhaio group photo, then snacks.'),
  row('fri-snacks-n', 'fri', '4:15 PM', '4:45 PM', 'Snacks', 'Campus', 'behno', 'meal', 'Snack block before the group photo.'),
  row('fri-snacks-b', 'fri', '4:30 PM', '4:45 PM', 'Snacks', 'Campus', 'bhaio', 'meal', 'Snacks after the group photo.'),
  row('fri-photo-n', 'fri', '4:45 PM', '5:00 PM', 'Group Photo', 'Campus', 'behno', 'arrive', 'Behno group photo, then seating.'),
  row('fri-seat2', 'fri', '4:45 PM', '5:00 PM', 'Seating', 'Sabha Hall', 'bhaio', 'arrive', 'Seating for Keynote 2. Behno join after photo.'),
  row('fri-k2', 'fri', '5:00 PM', '6:45 PM', 'Keynote Program 2', 'Sabha Hall', 'all', 'plenary', 'i/eBKY combined.'),
  row('fri-arti-pm-b', 'fri', '6:45 PM', '7:00 PM', 'Sabha Hall Arti', 'Sabha Hall', 'bhaio', 'worship', 'Bhaio arti in the sabha hall, then travel to dinner.'),
  row('fri-tr3-n', 'fri', '6:45 PM', '7:00 PM', 'Travel', 'Mandir', 'behno', 'travel', 'Behno travel to mandir arti.'),
  row('fri-tr3-b', 'fri', '7:00 PM', '7:15 PM', 'Travel', 'Dining Hall', 'bhaio', 'travel', 'To dinner.'),
  row('fri-arti-pm-n', 'fri', '7:00 PM', '7:15 PM', 'Mandir Arti', 'Mandir', 'behno', 'worship', 'Behno evening arti at the mandir.'),
  row('fri-dinner', 'fri', '7:15 PM', '9:00 PM', 'Dinner & Dessert', 'Dining Hall', 'all', 'meal', 'Full dinner service.'),
  row('fri-utaro', 'fri', '9:00 PM', '9:30 PM', 'Depart to Utaro', 'Utaro', 'all', 'travel', 'Return to overnight housing.'),

  row('sat-travel-b', 'sat', '6:00 AM', '7:00 AM', 'Travel to Mandir', 'Mandir', 'bhaio', 'travel', 'Bhaio to mandir.'),
  row('sat-travel-n', 'sat', '6:15 AM', '7:30 AM', 'Travel to Mandir', 'Mandir', 'behno', 'travel', 'Behno travel starts later.'),
  row('sat-arti-b', 'sat', '7:00 AM', '8:00 AM', 'Arti, Darshan, Abhishek', 'Mandir', 'bhaio', 'worship', 'Morning worship.'),
  row('sat-arti-n', 'sat', '7:30 AM', '8:00 AM', 'Arti, Darshan, Abhishek', 'Mandir', 'behno', 'worship', 'Morning worship after travel.'),
  row('sat-bfast-b', 'sat', '8:00 AM', '8:45 AM', 'Delegate Breakfast', 'Dining Hall', 'bhaio', 'meal', 'Breakfast after worship.'),
  row('sat-bfast-n', 'sat', '8:00 AM', '8:45 AM', 'Delegate Breakfast', 'Dining Hall', 'behno', 'meal', 'Breakfast after worship.'),
  row('sat-seat', 'sat', '8:45 AM', '9:00 AM', 'Seating', 'Sabha Hall', 'all', 'arrive', 'Seating for Keynote 3.'),
  row('sat-k3', 'sat', '9:00 AM', '10:45 AM', 'Keynote Program 3', 'Sabha Hall', 'all', 'plenary', 'i/eBKY combined.'),
  row('sat-tr1-b', 'sat', '10:45 AM', '11:00 AM', 'Travel', 'Campus', 'bhaio', 'travel', 'To breakouts.'),
  row('sat-tr1-n', 'sat', '10:45 AM', '11:00 AM', 'Travel', 'Campus', 'behno', 'travel', 'To breakouts.'),
  row('sat-bo-b', 'sat', '11:00 AM', '12:30 PM', 'Team Breakouts', 'Classrooms', 'bhaio', 'breakout', 'Saturday morning breakouts.'),
  row('sat-bo-n', 'sat', '11:00 AM', '12:30 PM', 'Team Breakouts', 'Classrooms', 'behno', 'breakout', 'Saturday morning breakouts.'),
  row('sat-lunch', 'sat', '12:30 PM', '2:00 PM', 'Delegate Lunch / Break', 'Dining Hall', 'all', 'meal', 'Lunch plus mukhpath testing.'),
  row('sat-g2-b', 'sat', '2:00 PM', '2:45 PM', 'Goshthi 2', 'Campus', 'bhaio', 'breakout', 'Second goshthi.'),
  row('sat-g2-n', 'sat', '2:00 PM', '2:45 PM', 'Goshthi 2', 'Campus', 'behno', 'breakout', 'Second goshthi.'),
  row('sat-tr2-b', 'sat', '2:45 PM', '3:00 PM', 'Travel', 'Campus', 'bhaio', 'travel', 'To regional review.'),
  row('sat-tr2-n', 'sat', '2:45 PM', '3:00 PM', 'Travel', 'Campus', 'behno', 'travel', 'To regional review.'),
  row('sat-reg-b', 'sat', '3:00 PM', '4:30 PM', 'Regional Review', 'Classrooms', 'bhaio', 'breakout', 'Region meetings.'),
  row('sat-reg-n', 'sat', '3:00 PM', '4:30 PM', 'Regional Review', 'Classrooms', 'behno', 'breakout', 'Region meetings.'),
  row('sat-snack', 'sat', '4:30 PM', '4:45 PM', 'Snacks & Travel', 'Campus', 'all', 'meal', 'Snack and move toward the hall.'),
  row('sat-seat2', 'sat', '4:45 PM', '5:00 PM', 'Seating', 'Sabha Hall', 'all', 'arrive', 'Seating for Keynote 4.'),
  row('sat-k4', 'sat', '5:00 PM', '6:30 PM', 'Keynote Program 4', 'Sabha Hall', 'all', 'plenary', 'i/eBKY combined.'),
  row('sat-tr3-b', 'sat', '6:30 PM', '6:45 PM', 'Travel', 'Mandir', 'bhaio', 'travel', 'Bhaio to mandir arti.'),
  row('sat-arti-pm-n', 'sat', '6:30 PM', '6:45 PM', 'Sabha Hall Arti', 'Sabha Hall', 'behno', 'worship', 'Behno arti in the sabha hall.'),
  row('sat-arti-pm-b', 'sat', '6:45 PM', '7:00 PM', 'Mandir Arti', 'Mandir', 'bhaio', 'worship', 'Bhaio mandir arti.'),
  row('sat-tr3-n', 'sat', '6:45 PM', '7:00 PM', 'Travel', 'Dining Hall', 'behno', 'travel', 'Behno to dinner.'),
  row('sat-dinner', 'sat', '7:00 PM', '9:00 PM', 'Dinner & Dessert', 'Dining Hall', 'all', 'meal', 'Saturday dinner.'),
  row('sat-utaro', 'sat', '9:00 PM', '9:30 PM', 'Depart to Utaro', 'Utaro', 'all', 'travel', 'Return to overnight housing.'),

  row('sun-travel', 'sun', '6:00 AM', '7:00 AM', 'Travel to Robbinsville / Airport', 'Robbinsville', 'all', 'travel', 'Airport drop-offs and Akshardham shuttles.'),
  row(
    'sun-akshardham',
    'sun',
    '7:00 AM',
    '5:00 PM',
    'Akshardham Robbinsville',
    'Robbinsville',
    'all',
    'arrive',
    'TBD. Akshardham Robbinsville for all delegates departing after 5:00 PM; otherwise airport drop-off.',
  ),
  row('sun-depart', 'sun', '5:00 PM', '9:30 PM', 'Departures', 'Airport', 'all', 'arrive', 'Remaining departures after the Akshardham window.'),
];
