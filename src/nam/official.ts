export const NAM = {
  name: 'North American Activities Meeting',
  short: 'NAAM 2026',
  host: 'BAPS Shri Swaminarayan Mandir',
  city: 'Edison, NJ',
  tagline: 'Four days of goshthi, breakouts, and seva for karyakars across North America.',
  datesLabel: 'October 8 – 11, 2026',
  venue: '2500 Woodbridge Avenue, Edison, NJ 08817',
  draftNote: 'Official block schedule as of October 5, 2026. Bhaiyo and Behno run staggered on Friday and Saturday.',
} as const;

export type TrackId = 'all' | 'bhaiyo' | 'behno';

export const TRACKS: { id: Exclude<TrackId, 'all'>; label: string; blurb: string }[] = [
  {
    id: 'bhaiyo',
    label: 'Bhaiyo',
    blurb: 'Earlier mandir block, Sabha Hall arti after Keynotes 2 and 4, group photo before snacks on Friday.',
  },
  {
    id: 'behno',
    label: 'Behno',
    blurb: 'Later travel into mandir, Mahila Program Friday afternoon, stay in hall through the end of Keynotes 2 and 4.',
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
  { id: 'thu', short: 'Thu', label: 'Thursday', date: 'Oct 8', theme: 'Arrival & Check-in', iso: '2026-10-08' },
  { id: 'fri', short: 'Fri', label: 'Friday', date: 'Oct 9', theme: 'Keynotes 1 & 2', iso: '2026-10-09' },
  { id: 'sat', short: 'Sat', label: 'Saturday', date: 'Oct 10', theme: 'Keynotes 3 & 4', iso: '2026-10-10' },
  { id: 'sun', short: 'Sun', label: 'Sunday', date: 'Oct 11', theme: 'Akshardham', iso: '2026-10-11' },
] as const;

export const NAM_DAY_ISO: Record<string, string> = {
  thu: '2026-10-08',
  fri: '2026-10-09',
  sat: '2026-10-10',
  sun: '2026-10-11',
};

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
  row('thu-arrival-check-in', 'thu', '5:00 PM', '7:00 PM', 'Arrival & Check-in', 'Lobby', 'all', 'arrive', 'Ongoing arrival. Mukhpath testing opens with check-in.'),
  row('thu-arti', 'thu', '7:00 PM', '7:30 PM', 'Arti', 'Mandir', 'all', 'worship', 'Arti'),
  row('thu-dinner-dessert', 'thu', '7:30 PM', '9:00 PM', 'Dinner & Dessert', 'Dining Hall', 'all', 'meal', 'Ongoing arrival and check-in continue through dinner. Mukhpath testing 8:00–9:00 PM. Flights after 7:00 PM go straight to utaro.'),
  row('thu-depart-to-utaro', 'thu', '9:00 PM', '9:30 PM', 'Depart to Utaro', 'Utaro', 'all', 'travel', 'Depart to Utaro'),
  row('fri-travel-to-mandir-b', 'fri', '6:30 AM', '7:45 AM', 'Travel to Mandir', 'Mandir', 'behno', 'travel', 'Travel to Mandir'),
  row('fri-travel-to-mandir-2-b', 'fri', '6:30 AM', '7:00 AM', 'Travel to Mandir', 'Mandir', 'bhaiyo', 'travel', 'Travel to Mandir'),
  row('fri-mandir-arti-darshan-abhishek-b', 'fri', '7:00 AM', '7:45 AM', 'Mandir Arti, Darshan, Abhishek', 'Mandir', 'bhaiyo', 'worship', 'Mandir Arti, Darshan, Abhishek'),
  row('fri-delegate-breakfast-b', 'fri', '7:45 AM', '8:30 AM', 'Delegate Breakfast', 'Dining Hall', 'behno', 'meal', 'Delegate Breakfast'),
  row('fri-murti-darshan-abhishek-b', 'fri', '7:45 AM', '8:15 AM', 'Murti Darshan + Abhishek', 'Mandir', 'bhaiyo', 'worship', 'Murti Darshan + Abhishek'),
  row('fri-delegate-breakfast-2-b', 'fri', '8:15 AM', '9:00 AM', 'Delegate Breakfast', 'Dining Hall', 'bhaiyo', 'meal', 'Delegate Breakfast'),
  row('fri-murti-darshan-b', 'fri', '8:30 AM', '9:00 AM', 'Murti Darshan', 'Mandir', 'behno', 'worship', 'Murti Darshan'),
  row('fri-seating', 'fri', '9:00 AM', '9:15 AM', 'Seating', 'Sabha Hall', 'all', 'arrive', 'Seating'),
  row('fri-keynote-program-1-i-ebky-com', 'fri', '9:15 AM', '10:45 AM', 'Keynote Program 1 · (i/eBKY combined)', 'Sabha Hall', 'all', 'plenary', 'Keynote Program 1 · (i/eBKY combined)'),
  row('fri-travel', 'fri', '10:45 AM', '11:00 AM', 'Travel', 'Campus', 'all', 'travel', 'Travel'),
  row('fri-team-breakouts', 'fri', '11:00 AM', '12:30 PM', 'Team Breakouts', 'Classrooms', 'all', 'breakout', 'Team Breakouts'),
  row('fri-delegate-lunch-break', 'fri', '12:30 PM', '2:00 PM', 'Delegate Lunch / Break', 'Dining Hall', 'all', 'meal', 'Lunch plus mukhpath testing during the break.'),
  row('fri-goshthi-1', 'fri', '2:00 PM', '2:45 PM', 'Goshthi 1', 'Classrooms', 'all', 'breakout', 'Goshthi 1'),
  row('fri-travel-2', 'fri', '2:45 PM', '3:00 PM', 'Travel', 'Campus', 'all', 'travel', 'Travel'),
  row('fri-mahila-program-b', 'fri', '3:00 PM', '4:30 PM', 'Mahila Program', 'Main Hall', 'behno', 'plenary', 'Behno program in the Main Hall.'),
  row('fri-team-breakouts-2-b', 'fri', '3:00 PM', '4:30 PM', 'Team Breakouts', 'Classrooms', 'bhaiyo', 'breakout', 'Team Breakouts'),
  row('fri-snacks-b', 'fri', '4:30 PM', '4:45 PM', 'Snacks', 'Campus', 'behno', 'meal', 'Snacks'),
  row('fri-group-photo-b', 'fri', '4:30 PM', '4:45 PM', 'Group Photo', 'Campus', 'bhaiyo', 'arrive', 'Group Photo'),
  row('fri-group-photo-2-b', 'fri', '4:45 PM', '5:00 PM', 'Group Photo', 'Campus', 'behno', 'arrive', 'Group Photo'),
  row('fri-snacks-2-b', 'fri', '4:45 PM', '5:00 PM', 'Snacks', 'Campus', 'bhaiyo', 'meal', 'Snacks'),
  row('fri-seating-2', 'fri', '5:00 PM', '5:15 PM', 'Seating', 'Sabha Hall', 'all', 'arrive', 'Seating'),
  row('fri-keynote-program-2-i-ebky-com-b', 'fri', '5:15 PM', '7:00 PM', 'Keynote Program 2 · (i/eBKY combined)', 'Sabha Hall', 'behno', 'plenary', 'Keynote Program 2 · (i/eBKY combined)'),
  row('fri-keynote-program-2-i-ebky-com-2-b', 'fri', '5:15 PM', '6:45 PM', 'Keynote Program 2 · (i/eBKY combined)', 'Sabha Hall', 'bhaiyo', 'plenary', 'Keynote Program 2 · (i/eBKY combined)'),
  row('fri-sabha-hall-arti-b', 'fri', '6:45 PM', '7:00 PM', 'Sabha Hall Arti', 'Sabha Hall', 'bhaiyo', 'worship', 'Sabha Hall Arti'),
  row('fri-travel-3-b', 'fri', '7:00 PM', '7:30 PM', 'Travel', 'Campus', 'behno', 'travel', 'Travel'),
  row('fri-charansparsh-b', 'fri', '7:00 PM', '7:15 PM', 'Charansparsh', 'Sabha Hall', 'bhaiyo', 'worship', 'Charansparsh'),
  row('fri-travel-4-b', 'fri', '7:15 PM', '7:30 PM', 'Travel', 'Campus', 'bhaiyo', 'travel', 'Travel'),
  row('fri-dinner-dessert', 'fri', '7:30 PM', '9:00 PM', 'Dinner & Dessert', 'Dining Hall', 'all', 'meal', 'Dinner & Dessert'),
  row('fri-depart-to-utaro', 'fri', '9:00 PM', '9:30 PM', 'Depart to Utaro', 'Utaro', 'all', 'travel', 'Depart to Utaro'),
  row('sat-travel-to-mandir-b', 'sat', '6:30 AM', '7:45 AM', 'Travel to Mandir', 'Mandir', 'behno', 'travel', 'Travel to Mandir'),
  row('sat-travel-to-mandir-2-b', 'sat', '6:30 AM', '7:00 AM', 'Travel to Mandir', 'Mandir', 'bhaiyo', 'travel', 'Travel to Mandir'),
  row('sat-mandir-arti-darshan-abhishek-b', 'sat', '7:00 AM', '7:45 AM', 'Mandir Arti, Darshan, Abhishek', 'Mandir', 'bhaiyo', 'worship', 'Mandir Arti, Darshan, Abhishek'),
  row('sat-murti-darshan-abhishek-b', 'sat', '7:45 AM', '8:15 AM', 'Murti Darshan + Abhishek', 'Mandir', 'behno', 'worship', 'Murti Darshan + Abhishek'),
  row('sat-delegate-breakfast-b', 'sat', '7:45 AM', '8:30 AM', 'Delegate Breakfast', 'Dining Hall', 'bhaiyo', 'meal', 'Delegate Breakfast'),
  row('sat-delegate-breakfast-2-b', 'sat', '8:15 AM', '9:00 AM', 'Delegate Breakfast', 'Dining Hall', 'behno', 'meal', 'Delegate Breakfast'),
  row('sat-murti-darshan-b', 'sat', '8:30 AM', '9:00 AM', 'Murti Darshan', 'Mandir', 'bhaiyo', 'worship', 'Murti Darshan'),
  row('sat-seating', 'sat', '9:00 AM', '9:15 AM', 'Seating', 'Sabha Hall', 'all', 'arrive', 'Seating'),
  row('sat-keynote-program-3-i-ebky-com', 'sat', '9:15 AM', '10:45 AM', 'Keynote Program 3 · (i/eBKY combined)', 'Sabha Hall', 'all', 'plenary', 'Keynote Program 3 · (i/eBKY combined)'),
  row('sat-travel', 'sat', '10:45 AM', '11:00 AM', 'Travel', 'Campus', 'all', 'travel', 'Travel'),
  row('sat-team-breakouts', 'sat', '11:00 AM', '12:30 PM', 'Team Breakouts', 'Classrooms', 'all', 'breakout', 'Team Breakouts'),
  row('sat-delegate-lunch-break', 'sat', '12:30 PM', '2:00 PM', 'Delegate Lunch / Break', 'Dining Hall', 'all', 'meal', 'Lunch plus mukhpath testing during the break.'),
  row('sat-goshthi-2', 'sat', '2:00 PM', '2:45 PM', 'Goshthi 2', 'Classrooms', 'all', 'breakout', 'Goshthi 2'),
  row('sat-travel-2', 'sat', '2:45 PM', '3:00 PM', 'Travel', 'Campus', 'all', 'travel', 'Travel'),
  row('sat-regional-review', 'sat', '3:00 PM', '4:30 PM', 'Regional Review', 'Classrooms', 'all', 'breakout', 'Regional Review'),
  row('sat-snacks-travel', 'sat', '4:30 PM', '5:00 PM', 'Snacks & Travel', 'Campus', 'all', 'meal', 'Snacks & Travel'),
  row('sat-seating-2', 'sat', '5:00 PM', '5:15 PM', 'Seating', 'Sabha Hall', 'all', 'arrive', 'Seating'),
  row('sat-keynote-program-4-i-ebky-com-b', 'sat', '5:15 PM', '7:00 PM', 'Keynote Program 4 · (i/eBKY combined)', 'Sabha Hall', 'behno', 'plenary', 'Keynote Program 4 · (i/eBKY combined)'),
  row('sat-keynote-program-4-i-ebky-com-2-b', 'sat', '5:15 PM', '6:45 PM', 'Keynote Program 4 · (i/eBKY combined)', 'Sabha Hall', 'bhaiyo', 'plenary', 'Keynote Program 4 · (i/eBKY combined)'),
  row('sat-sabha-hall-arti-b', 'sat', '6:45 PM', '7:00 PM', 'Sabha Hall Arti', 'Sabha Hall', 'bhaiyo', 'worship', 'Sabha Hall Arti'),
  row('sat-travel-3-b', 'sat', '7:00 PM', '7:30 PM', 'Travel', 'Campus', 'behno', 'travel', 'Travel'),
  row('sat-charansparsh-b', 'sat', '7:00 PM', '7:15 PM', 'Charansparsh', 'Sabha Hall', 'bhaiyo', 'worship', 'Charansparsh'),
  row('sat-travel-4-b', 'sat', '7:15 PM', '7:30 PM', 'Travel', 'Campus', 'bhaiyo', 'travel', 'Travel'),
  row('sat-dinner-dessert', 'sat', '7:30 PM', '9:00 PM', 'Dinner & Dessert', 'Dining Hall', 'all', 'meal', 'Dinner & Dessert'),
  row('sat-depart-to-utaro', 'sat', '9:00 PM', '9:30 PM', 'Depart to Utaro', 'Utaro', 'all', 'travel', 'Depart to Utaro'),
  row('sun-travel-to-robbinsville-aksha-b', 'sun', '6:00 AM', '6:30 AM', 'Travel to Robbinsville / Departures', 'Robbinsville', 'behno', 'travel', 'Travel to Robbinsville / Departures'),
  row('sun-travel-to-robbinsville-aksha-2-b', 'sun', '6:00 AM', '7:00 AM', 'Travel to Robbinsville / Departures', 'Robbinsville', 'bhaiyo', 'travel', 'Travel to Robbinsville / Departures'),
  row('sun-luggage-storage-in-tent-b', 'sun', '6:30 AM', '6:45 AM', 'Luggage Storage in Tent', 'Tent', 'behno', 'arrive', 'Luggage Storage in Tent'),
  row('sun-delegate-breakfast-b', 'sun', '6:45 AM', '7:15 AM', 'Delegate Breakfast', 'Dining Hall', 'behno', 'meal', 'Delegate Breakfast'),
  row('sun-luggage-storage-in-tent-2-b', 'sun', '7:00 AM', '7:15 AM', 'Luggage Storage in Tent', 'Tent', 'bhaiyo', 'arrive', 'Luggage Storage in Tent'),
  row('sun-am-museum-tour-or-mandir-dar-b', 'sun', '7:15 AM', '9:00 AM', 'AM Museum Tour or Mandir Darshan', 'Akshardham', 'behno', 'worship', 'AM Museum Tour or Mandir Darshan'),
  row('sun-delegate-breakfast-2-b', 'sun', '7:15 AM', '7:45 AM', 'Delegate Breakfast', 'Dining Hall', 'bhaiyo', 'meal', 'Delegate Breakfast'),
  row('sun-am-museum-tour-or-mandir-dar-2-b', 'sun', '7:45 AM', '9:30 AM', 'AM Museum Tour or Mandir Darshan', 'Akshardham', 'bhaiyo', 'worship', 'AM Museum Tour or Mandir Darshan'),
  row('sun-travel-b', 'sun', '9:00 AM', '9:30 AM', 'Travel', 'Campus', 'behno', 'travel', 'Travel'),
  row('sun-special-program-i-ebkys-comb', 'sun', '9:30 AM', '12:30 PM', 'Special Program · (i/eBKYS combined)', 'Sabha Hall', 'all', 'plenary', 'Special Program · (i/eBKYS combined)'),
  row('sun-delegate-lunch-b', 'sun', '12:30 PM', '1:15 PM', 'Delegate Lunch', 'Dining Hall', 'behno', 'meal', 'Delegate Lunch'),
  row('sun-delegate-lunch-2-b', 'sun', '12:30 PM', '2:00 PM', 'Delegate Lunch', 'Dining Hall', 'bhaiyo', 'meal', 'Delegate Lunch'),
  row('sun-pm-museum-tour-b', 'sun', '1:15 PM', '2:30 PM', 'PM Museum Tour', 'Akshardham', 'behno', 'breakout', 'PM Museum Tour'),
  row('sun-pm-museum-tour-2-b', 'sun', '2:00 PM', '3:45 PM', 'PM Museum Tour', 'Akshardham', 'bhaiyo', 'breakout', 'PM Museum Tour'),
  row('sun-departures-b', 'sun', '2:30 PM', '9:30 PM', 'Departures', 'Robbinsville', 'behno', 'travel', 'Departures'),
  row('sun-departures-2-b', 'sun', '3:45 PM', '9:30 PM', 'Departures', 'Robbinsville', 'bhaiyo', 'travel', 'Departures'),
];
