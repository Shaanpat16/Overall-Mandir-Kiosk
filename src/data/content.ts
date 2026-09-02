export const MANDIR_INFO = {
  name: 'BAPS Shri Swaminarayan Mandir',
  city: 'Edison',
  state: 'New Jersey',
  shortName: 'Edison, NJ',
  address: '2500 Woodbridge Avenue, Edison, NJ 08817',
  phone: '(732) 572-1234',
  email: 'info.edison@usa.baps.org',
  website: 'baps.org/edison',
  tagline: 'A Hindu temple for prayer, learning, and community.',
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
    weekday: { morning: '7:00 AM – 11:00 AM', evening: '4:00 PM – 6:00 PM' },
    weekend: { morning: '7:00 AM – 11:00 AM', evening: '7:00 PM – 8:00 PM' },
    label: 'Nilkanth Varni Abhishek',
  },
} as const;

export const RITUALS = [
  {
    id: 'darshan',
    title: 'Sacred Shrines Darshan',
    times: ['7 AM – 11 AM', '4 PM – 8 PM'],
    image: '/images/home-events.jpg',
  },
  {
    id: 'arti',
    title: 'Aarti',
    times: ['7 AM Daily', '6:30 PM Daily'],
  },
  {
    id: 'abhishek',
    title: 'Nilkanth Varni Abhishek',
    times: ['Mon–Fri: 7–11 AM & 4–6 PM', 'Sat–Sun: 7–11 AM & 7–8 PM'],
  },
  {
    id: 'chestha',
    title: 'Chestha',
    times: ['7 PM – 7:30 PM Saturday', '6 PM – 6:30 PM Sunday'],
    image: '/images/ritual-chopdapujan.jpg',
  },
  {
    id: 'mahapuja',
    title: 'Punam Mahapuja',
    times: ['Every Punam from 6 PM to 7:45 PM', 'Aarti, Abhishek, and Mahapuja'],
    image: '/images/ritual-mahapuja.jpg',
  },
  {
    id: 'ekadashi',
    title: 'Ekadashi Bhajan Sandhya',
    times: ['Every Ekadashi from 7 PM to 7:45 PM'],
  },
] as const;

export const ACTIVITIES = [
  {
    id: 'balbalika',
    title: 'Bal-Balika',
    subtitle: 'Pre-K to 8th grade',
    image: '/images/activity-balbalika.jpg',
    schedule: ['Saturday: 5:00 PM – 7:00 PM', 'Sunday: 4:00 PM – 6:00 PM'],
    description:
      'A nurturing environment for children to learn about Hindu culture, values, and traditions through engaging activities, stories, games, shlokas, and bhajans.',
  },
  {
    id: 'kishorekishori',
    title: 'Kishore-Kishori',
    subtitle: '9th grade to College Senior',
    image: '/images/activity-kishorekishori.jpg',
    schedule: ['Saturday: 1:30 PM – 2:45 PM', 'Sunday: 12:30 PM – 1:45 PM'],
    description:
      'Helps teenagers develop strong values, leadership skills, and spiritual awareness through discussions, community service, and sports.',
  },
  {
    id: 'yuvakyuvati',
    title: 'Yuvak-Yuvati',
    subtitle: '23–30 years old',
    image: '/images/home-activities.jpg',
    schedule: ['Saturday: 3:30 PM – 5:00 PM', 'Sunday: 2:30 PM – 4:00 PM'],
    description:
      'Provides young adults with spiritual guidance, career mentorship, and opportunities for personal growth in a supportive community.',
  },
  {
    id: 'sanyukta',
    title: 'Sanyukta Sabha',
    subtitle: '30 years+',
    image: '/images/activity-sanyukta.jpg',
    schedule: ['Scheduled throughout the year'],
    description:
      'Brings the mandir community together for katha, bhajans, aarti, and shared satsang. Check the welcome desk for dates.',
  },
  {
    id: 'international',
    title: 'International Students',
    subtitle: 'Students away from home',
    image: '/images/home-upcoming.jpg',
    schedule: ['Weekly gatherings'],
    description:
      'A home away from home for students pursuing their education in the United States, with gatherings, festivals, and academic support.',
  },
  {
    id: 'betterliving',
    title: 'Better Living Seminar',
    subtitle: 'Personal development',
    image: '/images/activity-betterliving.jpg',
    schedule: ['Saturday: 5:00 PM – 7:00 PM in Yogi Hall'],
    description:
      'Practical workshops on applying Hindu values to daily life — stress management, relationships, parenting, and wellness.',
  },
] as const;

export const CHARITIES = [
  {
    id: 'fooddrive',
    title: 'Food Drive',
    image: '/images/charity-fooddrive.jpg',
    description:
      'Our food drives collect non-perishable food items and organize distribution to local food banks and families in need, ensuring no one in our community goes hungry.',
  },
  {
    id: 'walkathon',
    title: 'Walkathon',
    image: '/images/event-walkathon.jpg',
    description:
      'Our annual charity walkathon brings the community together to promote health, wellness, and raise funds for important charitable causes.',
  },
  {
    id: 'blooddrive',
    title: 'Blood Drive',
    image: '/images/charity-blooddrive.jpg',
    description:
      'Our regular blood drives partner with local blood banks to help save lives in our community. Every donation can save up to three lives.',
  },
] as const;

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
    quote: 'Stay connected to God and the guru, and you will never be alone.',
  },
] as const;

export const ABOUT_TEXT =
  'BAPS Shri Swaminarayan Mandir in Edison is a sacred Hindu place of worship. Since 1996, it has served as the spiritual home for thousands of families across central New Jersey, offering daily worship, cultural education, and community service. The Mandir is open to all, every day of the year.';

export const HOME_TILES = [
  { id: 'activities', label: 'Activities', image: '/images/home-activities.jpg', view: 'activities' as const },
  { id: 'rituals', label: 'Rituals', image: '/images/home-events.jpg', view: 'rituals' as const },
  { id: 'charities', label: 'BAPS Charities', image: '/images/event-walkathon.jpg', view: 'charities' as const },
] as const;

export type ViewName = 'attract' | 'home' | 'activities' | 'rituals' | 'charities' | 'about';
