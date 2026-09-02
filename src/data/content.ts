export const MANDIR_INFO = {
  name: 'BAPS Shri Swaminarayan Mandir',
  city: 'Edison',
  state: 'New Jersey',
  address: '2500 Woodbridge Avenue, Edison, NJ 08817',
  phone: '(732) 572-1234',
  email: 'info.edison@usa.baps.org',
  website: 'baps.org/edison',
} as const;

export const TIMINGS = {
  campus: { open: '7:00 AM', close: '8:00 PM', label: 'Campus Hours' },
  darshan: {
    morning: { open: '7:00 AM', close: '11:00 AM' },
    evening: { open: '4:00 PM', close: '8:00 PM' },
    label: 'Sacred Shrine Darshan',
  },
  arti: {
    morning: '7:00 AM',
    evening: '6:30 PM',
    label: 'Daily Arti',
  },
  abhishek: {
    weekday: { morning: '7:00–11:00 AM', evening: '4:00–6:00 PM' },
    weekend: { morning: '7:00–11:00 AM', evening: '7:00–8:00 PM' },
    label: 'Nilkanth Varni Abhishek',
  },
} as const;

export const VISIT_GUIDELINES = [
  {
    title: 'Dress Code',
    description: 'All clothing must cover shoulders and knees. Wraps are provided at the entrance.',
  },
  {
    title: 'Shoes',
    description: 'Please remove shoes before entering the Mandir. Shoe racks are available.',
  },
  {
    title: 'Photography',
    description: 'Photography is not permitted inside the prayer halls.',
  },
  {
    title: 'Mobile Phones',
    description: 'Please silence your phone before entering.',
  },
] as const;

export const EVENTS = [
  {
    id: 'walkathon',
    title: 'Annual Walkathon',
    date: 'October 2026',
    description:
      'Join hundreds of families for a morning of wellness and community. The annual BAPS Charities walkathon raises funds for local community service.',
    image: '/images/event-walkathon.jpg',
  },
  {
    id: 'diwali',
    title: 'Diwali & Annakut',
    date: 'November 2026',
    description:
      'Celebrate the festival of lights with a magnificent display of over 1,000 vegetarian dishes offered to God, followed by fireworks and festivities.',
    image: '/images/event-diwali.jpg',
  },
  {
    id: 'annakut',
    title: 'Satsang Shibir',
    date: 'December 2026',
    description:
      'An immersive weekend of spiritual discourses, workshops, and cultural programs for all ages. Deepen your understanding of Hindu philosophy.',
    image: '/images/event-annakut.jpg',
  },
] as const;

export const ABOUT_TEXT =
  'BAPS Shri Swaminarayan Mandir in Edison is a hari mandir — a sacred Hindu place of worship built with modern materials and traditional devotion. Since 1996, it has served as the spiritual home for thousands of families across central New Jersey, offering daily worship, cultural education, and community service. The Mandir is open to all, every day of the year.';

export const HOME_TILES = [
  { id: 'visit', label: 'Visit', image: '/images/home-activities.jpg', view: 'visit' as const },
  { id: 'today', label: 'Today', image: '/images/home-upcoming.jpg', view: 'today' as const },
  { id: 'events', label: 'Events', image: '/images/home-events.jpg', view: 'events' as const },
] as const;

export type ViewName = 'attract' | 'home' | 'visit' | 'today' | 'events' | 'about';
