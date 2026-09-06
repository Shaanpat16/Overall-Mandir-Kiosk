export const MANDIR_INFO = {
  name: 'BAPS Shri Swaminarayan Mandir',
  city: 'Edison',
  state: 'New Jersey',
  shortName: 'Edison, NJ',
  address: '2500 Woodbridge Avenue, Edison, NJ 08817',
  phone: '(732) 572-1234',
  email: 'info.edison@usa.baps.org',
  website: 'baps.org/edison',
  tagline: 'A Hindu house of worship. Come join us for prayer ceremonies, festivals, and activities.',
} as const;

export const TIMINGS = {
  campus: { open: '7:00 AM', close: '8:00 PM', label: 'Campus Open' },
  darshan: {
    morning: { open: '7:00 AM', close: '11:00 AM' },
    evening: { open: '4:00 PM', close: '8:00 PM' },
    label: 'Murti Darshan',
  },
  arti: {
    morning: '7:00 AM',
    evening: '6:30 PM',
    label: 'Daily Arti',
  },
  abhishek: {
    weekday: { morning: '7:15 AM – 11:00 AM', evening: '4:00 PM – 6:00 PM' },
    weekend: { morning: '7:00 AM – 11:00 AM', evening: '7:00 PM – 8:00 PM' },
    label: 'Nilkanth Varni Abhishek',
  },
} as const;

/* ─── Rituals ────────────────────────────────────────────────── */
export const RITUALS = [
  {
    id: 'darshan',
    title: 'Sacred Shrines Darshan',
    times: ['AM: 7:00 AM – 11:00 AM', 'PM: 4:00 PM – 8:00 PM'],
    image: '/images/home-events.jpg',
  },
  {
    id: 'arti',
    title: 'Aarti',
    times: ['Morning Aarti: 7:00 AM', 'Evening Aarti: 6:30 PM'],
  },
  {
    id: 'abhishek',
    title: 'Nilkanth Varni Abhishek',
    times: [
      'Weekday Mornings: 7:15 AM – 11:00 AM',
      'Weekday Evenings: 4:00 PM – 6:00 PM',
      'Weekends: 7:00 AM – 11:00 AM & 7:00 PM – 8:00 PM',
    ],
  },
  {
    id: 'chestha',
    title: 'Chestha',
    times: ['Saturday: 7:00 PM – 7:30 PM', 'Sunday: 6:00 PM – 6:30 PM'],
    image: '/images/ritual-chopdapujan.jpg',
  },
  {
    id: 'mahapuja',
    title: 'Punam Mahapuja',
    times: ['Every Punam: 6:00 PM – 7:45 PM', 'Includes Aarti, Abhishek & Mahapuja'],
    image: '/images/ritual-mahapuja.jpg',
  },
  {
    id: 'ekadashi',
    title: 'Ekadashi Bhajan Sandhya',
    times: ['Every Ekadashi: 7:00 PM – 7:45 PM'],
  },
] as const;

/* ─── Upcoming Event ─────────────────────────────────────────── */
export const UPCOMING_EVENT = {
  title: 'Janmashtami Celebration',
  image: '/images/event-diwali.jpg',
  dates: [
    { label: 'Saturday, September 5', time: '5:00 PM – 7:15 PM' },
    { label: 'Sunday, September 6', time: '4:00 PM – 6:15 PM' },
  ],
} as const;

/* ─── Activities & Sabha ─────────────────────────────────────── */
export const ACTIVITIES = [
  {
    id: 'balbalika',
    title: 'Bal-Balika Sabha',
    demographic: 'Children · Pre-K – 8th grade',
    image: '/images/activity-balbalika.jpg',
    schedule: [
      { day: 'Saturday', time: '5:15 PM – 7:00 PM' },
      { day: 'Sunday', time: '4:15 PM – 6:00 PM' },
    ],
    description:
      'A nurturing environment for children to learn about Hindu culture, values, and traditions through engaging activities, stories, games, shlokas, and bhajans.',
  },
  {
    id: 'kishorekishori',
    title: 'Kishore-Kishori Sabha',
    demographic: 'Teens · 9th grade – College',
    image: '/images/activity-kishorekishori.jpg',
    schedule: [
      { day: 'Saturday', time: '1:00 PM – 2:30 PM' },
      { day: 'Sunday', time: '12:30 PM – 2:00 PM' },
    ],
    description:
      'Helps teenagers develop strong values, leadership skills, and spiritual awareness through discussions, community service, and sports.',
  },
  {
    id: 'yuvakyuvati',
    title: 'Yuvak-Yuvati Sabha',
    demographic: 'Young Adults · 21–35',
    image: '/images/home-activities.jpg',
    schedule: [
      { day: 'Saturday', time: '3:30 PM – 5:00 PM' },
      { day: 'Sunday', time: '2:30 PM – 4:00 PM' },
    ],
    description:
      'Provides young adults with spiritual guidance, career mentorship, and opportunities for personal growth in a supportive community.',
  },
  {
    id: 'satsang',
    title: 'Satsang Sabha',
    demographic: 'All Ages',
    image: '/images/activity-sanyukta.jpg',
    schedule: [
      { day: 'Saturday', time: '5:00 PM – 7:00 PM' },
      { day: 'Sunday', time: '4:00 PM – 6:00 PM' },
    ],
    description:
      'The heart of the mandir community — weekly assembly bringing everyone together for katha, bhajans, aarti, and shared spiritual fellowship.',
  },
  {
    id: 'betterliving',
    title: 'Better Living Seminar',
    demographic: 'Open to All · Bi-Weekly',
    image: '/images/activity-betterliving.jpg',
    schedule: [{ day: 'Saturday (Bi-Weekly)', time: '5:30 PM – 7:00 PM' }],
    description:
      'Practical workshops on applying Hindu values to daily life — stress management, relationships, parenting, and wellness. Held in Yogi Hall.',
  },
  {
    id: 'gujarati',
    title: 'Gujarati Classes',
    demographic: 'Children',
    image: '/images/home-upcoming.jpg',
    schedule: [
      { day: 'Saturday', time: '4:00 PM – 5:00 PM' },
      { day: 'Sunday', time: '3:00 PM – 4:00 PM' },
    ],
    description:
      'Language classes for children to learn Gujarati reading, writing, and conversation skills, helping preserve cultural heritage and family connections.',
  },
] as const;

/* ─── BAPS Charities ─────────────────────────────────────────── */
export const CHARITY_IMPACT = [
  { number: '1,000+', label: 'Walk-Runs' },
  { number: '500+', label: 'Health Fairs' },
  { number: '2M+', label: 'Trees Planted' },
] as const;

export const CHARITIES = [
  {
    id: 'walkrun',
    title: 'Walk Green Walk-Run',
    image: '/images/event-walkathon.jpg',
    stat: '45,000+',
    statLabel: 'participants across 100+ cities',
    description:
      'Annual charity walkathons uniting communities nationwide to raise funds for local hospitals, schools, and health organizations. In over 20 years, BAPS Charities has organized more than 1,000 Walk-Runs supporting causes from cancer research to children\'s education.',
  },
  {
    id: 'fooddrive',
    title: 'Food Drives',
    image: '/images/charity-fooddrive.jpg',
    stat: '100K+',
    statLabel: 'meals provided',
    description:
      'Community food drives collecting non-perishable goods and distributing hot meals to families facing food insecurity. From coast to coast, volunteers mobilize to ensure no one in the community goes hungry.',
  },
  {
    id: 'healthfairs',
    title: 'Health Fairs & Blood Drives',
    image: '/images/charity-blooddrive.jpg',
    stat: '10,000+',
    statLabel: 'served annually',
    description:
      'Free health screenings, consultations, and wellness education run by volunteer medical professionals. Regular blood and bone marrow drives in partnership with local blood banks — every donation can save up to three lives.',
  },
  {
    id: 'education',
    title: 'Education & Youth',
    image: '/images/event-annakut.jpg',
    stat: '5,000',
    statLabel: 'scholarships yearly',
    description:
      'Supporting education through scholarships, school construction, literacy campaigns, and professional development. BAPS Charities has built 55 schools in areas affected by conflict or disaster.',
  },
] as const;

/* ─── Gurus ──────────────────────────────────────────────────── */
export const GURUS = [
  {
    id: 'pramukh-swami',
    name: 'Pramukh Swami Maharaj',
    years: '1921 – 2016',
    image: '/images/guru-pramukh-swami.jpg',
    quote: 'In the joy of others lies our own.',
  },
  {
    id: 'mahant-swami',
    name: 'Mahant Swami Maharaj',
    years: 'Current Spiritual Leader',
    image: '/images/guru-mahant-swami.jpg',
    quote: 'Stay connected to God and the guru.',
  },
] as const;

export const ABOUT_TEXT =
  'BAPS Shri Swaminarayan Mandir in Edison is a sacred Hindu place of worship. Since 1996, it has served as the spiritual home for thousands of families across central New Jersey, offering daily worship, cultural education, and community service. The Mandir is open to all, every day of the year.';

/* ─── Home tiles ─────────────────────────────────────────────── */
export const HOME_TILES = [
  { id: 'activities', label: 'Activities', image: '/images/home-activities.jpg', view: 'activities' as const },
  { id: 'rituals', label: 'Rituals', image: '/images/home-events.jpg', view: 'rituals' as const },
  { id: 'charities', label: 'BAPS Charities', image: '/images/event-walkathon.jpg', view: 'charities' as const },
] as const;

export type ViewName = 'attract' | 'home' | 'activities' | 'rituals' | 'charities' | 'about' | 'news';

/* ─── News ───────────────────────────────────────────────────── */
export interface NewsItem {
  id: string;
  tag: string;
  headline: string;
  date: string;
  image: string;
  body: string;
  /** Optional person spotlight */
  person?: {
    name: string;
    headshot: string;
    caption: string;
  };
}

export const NEWS_ITEMS: NewsItem[] = [
  {
    id: 'karyakar-completion',
    tag: 'Spotlight',
    headline: 'Karyakar Training Completed',
    date: 'September 2026',
    image: '/images/news-placeholder.jpg',
    body: 'Details coming soon.',
    person: {
      name: 'Name TBD',
      headshot: '/images/news-placeholder.jpg',
      caption: 'Successfully completed Karyakar training program',
    },
  },
];
