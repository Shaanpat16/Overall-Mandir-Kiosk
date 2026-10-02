export { NAM, TRACKS, DAYS, SESSIONS } from './official';
export type { TrackId, NamSession } from './official';

export type NamView =
  | 'attract'
  | 'home'
  | 'info'
  | 'schedule'
  | 'tracks'
  | 'campus'
  | 'guide'
  | 'smruti'
  | 'sachu'
  | 'now';

export const ROOMS = [
  {
    id: 'sabha',
    name: 'Sabha Hall',
    hint: 'Keynotes & combined seating',
    image: '/images/nam/nc18-k1-welcome.jpg',
  },
  {
    id: 'main',
    name: 'Main Hall',
    hint: 'Mahila Program · Friday',
    image: '/images/nam/nc18-k1-interaction.jpg',
  },
  {
    id: 'lobby',
    name: 'Lobby',
    hint: 'Check-in & mukhpath testing',
    image: '/images/nam/nc18-k1-welcome-08.jpg',
  },
  {
    id: 'class',
    name: 'Classrooms',
    hint: 'Team breakouts & regional review',
    image: '/images/nam/nc18-bal-03.jpg',
  },
  {
    id: 'dining',
    name: 'Dining Hall',
    hint: 'Breakfast, lunch, dinner',
    image: '/images/charity-fooddrive.jpg',
  },
  {
    id: 'mandir',
    name: 'Mandir',
    hint: 'Arti, darshan, abhishek',
    image: '/images/nam/edison-aerial.jpg',
  },
  {
    id: 'utaro',
    name: 'Utaro',
    hint: 'Night departures to housing',
    image: '/images/nam/nc18-k1-welcome.jpg',
  },
  {
    id: 'rv',
    name: 'Robbinsville',
    hint: 'Sunday Akshardham / airport',
    image: '/images/nam/edison-aerial.jpg',
  },
] as const;

export const ANNOUNCEMENTS = [
  {
    id: 'wifi',
    title: 'Wi-Fi',
    body: 'Guest network details posted at check-in. Use the NAAM SSID for decks.',
  },
  {
    id: 'badges',
    title: 'Badges',
    body: 'Wear your badge in all sessions. Return it Sunday at the lobby before departing.',
  },
  {
    id: 'changes',
    title: 'Schedule changes',
    body: 'Room flips are posted here and on the lobby board. Star sessions in Schedule so your agenda stays current.',
  },
  {
    id: 'phones',
    title: 'Mandir etiquette',
    body: 'No photos inside the shrines. Silent phones during aarti, sabha, and workshops.',
  },
];

export const MEALS = [
  { day: 'Wed Oct 7', items: ['Team hangouts dinner: burgers, fries, milkshake'] },
  { day: 'Thu Oct 8', items: ['Breakfast (arrival)', 'Lunch: cold sandwiches', 'Dinner: pasta 7:15–9:00 PM'] },
  { day: 'Fri Oct 9', items: ['Breakfast ~8:00 AM', 'Lunch 12:30 PM', 'Snack: mini puff', 'Dinner 7:15 PM'] },
  { day: 'Sat Oct 10', items: ['Breakfast ~8:00 AM', 'Lunch 12:30 PM', 'Snack: chana chor garam', 'Dinner 7:00 PM'] },
  { day: 'Sun Oct 11', items: ['Breakfast: bataka pauva / French toast', 'Lunch: veggie wraps to-go'] },
] as const;

export const HOME_TILES = [
  { id: 'info', label: 'Common Info', image: '/images/nam/nc18-k1-welcome.jpg', view: 'info' as const },
  { id: 'smruti', label: 'NC Smruti', image: '/images/nam/nc18-bal-01.jpg', view: 'smruti' as const },
  { id: 'sachu', label: 'Sachu Chhe', image: '/images/nam/nc18-k1-interaction.jpg', view: 'sachu' as const },
] as const;

export const AGENDA_KEY = 'naam-2026-agenda';

export type MenuSlot = 'breakfast' | 'lunch' | 'snack' | 'dinner';

export const MENU_DAYS = [
  {
    id: 'wed',
    short: 'Wed',
    label: 'Wednesday',
    date: 'Oct 7',
    kicker: 'Team hangouts',
    tote: false,
    meals: [
      {
        slot: 'dinner' as const,
        name: 'Dinner',
        window: 'Evening',
        place: 'Hangouts',
        headline: 'Burgers, fries, milkshake',
        items: ['Burgers', 'Fries', 'Milkshake'],
      },
    ],
  },
  {
    id: 'thu',
    short: 'Thu',
    label: 'Thursday',
    date: 'Oct 8',
    kicker: 'Arrival day',
    tote: true,
    meals: [
      {
        slot: 'breakfast' as const,
        name: 'Breakfast',
        window: 'Arrival',
        place: 'Dining Hall',
        headline: 'Fruit, muffins, chai',
        items: ['Whole apples & bananas', 'Muffins', 'Milk & cereal', 'Indian chai', 'Cold coffee & black hot coffee'],
      },
      {
        slot: 'lunch' as const,
        name: 'Lunch',
        window: 'Grab-and-go',
        place: 'Dining Hall',
        headline: 'Cold sandwiches',
        items: ['Cold sandwiches', 'Potato chips', 'Chocolate chip bars', 'Gatorade & water'],
      },
      {
        slot: 'dinner' as const,
        name: 'Dinner',
        window: '7:15–9:00 PM',
        place: 'Dining Hall',
        headline: 'Pasta night',
        items: [
          'Pasta with red, white, and veggie sauces',
          'Fresh breadsticks',
          'Salad with dressing',
          'Soda (regular & zero sugar)',
          'Ice cream with brownies',
          'Fresh baked cookies (vegan)',
        ],
      },
    ],
  },
  {
    id: 'fri',
    short: 'Fri',
    label: 'Friday',
    date: 'Oct 9',
    kicker: 'Keynotes 1 & 2',
    tote: true,
    meals: [
      {
        slot: 'breakfast' as const,
        name: 'Breakfast',
        window: 'Stations',
        place: 'Dining Hall',
        headline: 'Bagels & moong',
        items: [
          'Sliced apples, banana, yogurt parfait',
          'Bagels, cream cheese, butter, jam, peanut butter, dry nasto',
          'Moong with dahi',
          'Milk, Indian chai, black coffee & creamer',
        ],
      },
      {
        slot: 'lunch' as const,
        name: 'Lunch',
        window: '12:30 PM',
        place: 'Dining Hall',
        headline: 'Falafel bowls',
        items: ['Mint lemonade', 'Falafel bowl', 'Baklava', 'Hummus & pita'],
      },
      {
        slot: 'snack' as const,
        name: 'Snack',
        window: '~4:15 PM',
        place: 'Campus',
        headline: 'Mini puff',
        items: ['Cold coffee, hot coffee, masala chai', 'Mini puff & ketchup'],
      },
      {
        slot: 'dinner' as const,
        name: 'Dinner',
        window: '7:15–9:00 PM',
        place: 'Dining Hall',
        headline: 'Taco night',
        items: [
          'Piña colada',
          'Paneer & cauliflower tacos',
          'Poblano enchiladas, Mexican rice',
          'Salsa, chips & guacamole',
          'Street corn (masala corn)',
          'Tiramisu',
          'Fresh baked cookies (vegan)',
        ],
      },
    ],
  },
  {
    id: 'sat',
    short: 'Sat',
    label: 'Saturday',
    date: 'Oct 10',
    kicker: 'Keynotes 3 & 4',
    tote: true,
    meals: [
      {
        slot: 'breakfast' as const,
        name: 'Breakfast',
        window: 'Stations',
        place: 'Dining Hall',
        headline: 'Croissants & tofu scramble',
        items: [
          'Sliced apples, banana, yogurt parfait',
          'Croissants, butter, jam, dry nasto',
          'Scrambled tofu',
          'Milk, Indian chai, black coffee & creamer',
        ],
      },
      {
        slot: 'lunch' as const,
        name: 'Lunch',
        window: '12:30 PM',
        place: 'Dining Hall',
        headline: 'Indo-Chinese',
        items: ['Manchow soup', 'Spring rolls', 'Chinese noodles', 'Manchurian & chili paneer'],
      },
      {
        slot: 'snack' as const,
        name: 'Snack',
        window: '~4:30 PM',
        place: 'Campus',
        headline: 'Chana chor garam',
        items: ['Cold coffee, hot coffee, masala chai', 'Chana chor garam (tomato, lime, cilantro)'],
      },
      {
        slot: 'dinner' as const,
        name: 'Dinner',
        window: '7:00–9:00 PM',
        place: 'Dining Hall',
        headline: 'North Indian thali',
        items: [
          'Mango lassi',
          'Paratha, paneer tikka, mushroom masala',
          'Jeera rice, dal fry, ras malai, roasted papad',
          'Samosa with green & sweet chutney',
          'Punjabi pickle',
          'Gulab jamun cake',
          'Fresh baked cookies (vegan)',
        ],
      },
    ],
  },
  {
    id: 'sun',
    short: 'Sun',
    label: 'Sunday',
    date: 'Oct 11',
    kicker: 'Departures',
    tote: false,
    meals: [
      {
        slot: 'breakfast' as const,
        name: 'Breakfast',
        window: 'Stations',
        place: 'Dining Hall',
        headline: 'French toast & pauva',
        items: [
          'Sliced apples, banana, yogurt parfait',
          'French toast, dry nasto',
          'Bataka pauva',
          'Milk, Indian chai, black coffee & creamer',
        ],
      },
      {
        slot: 'lunch' as const,
        name: 'Lunch',
        window: 'To-go',
        place: 'Departures',
        headline: 'Veggie wraps',
        items: ['Cold veggie wraps', 'Potato chips', 'Chocolate chip bars', 'Gatorade & water'],
      },
    ],
  },
] as const;

export const MENU_TOTE = ['Oreos / Chips Ahoy', 'Popcorners', 'Pirate’s Booty', 'Water bottles'] as const;

/** @deprecated use MENU_DAYS — kept so hot-reload never crashes mid-session */
export const MENU = MENU_DAYS;

export const NC_HISTORY = [
  {
    id: 'nc-2000',
    year: '2000',
    title: 'National Convention era',
    place: 'North America',
    group: 'All ages',
    theme: 'A new century of satsang',
    image: '/images/nam/edison-aerial.jpg',
    blurb:
      'From the first North American convention in Chicago (1984), NCs became the summer gathering where youth and karyakars met their guru’s wish in one campus. The 2000s locked in the pattern NAM still uses: age-group shibirs, classroom, stage, and seva.',
    highlight: false,
  },
  {
    id: 'nc-2007',
    year: '2007',
    title: 'National Kishore-Kishori Convention',
    place: 'Jacksonville, FL',
    group: 'Kishore · Kishori',
    theme: 'Teen shibir with Pramukh Swami Maharaj',
    image: '/images/nam/nc18-k1-welcome-08.jpg',
    blurb:
      '5–8 July 2007. Teenagers from across USA–Canada gathered in Jacksonville for a four-day Kishore-Kishori convention — classroom, evening sabha, and darshan in the presence of Pramukh Swami Maharaj. One of the defining mid-2000s NCs for this generation of admins.',
    source: 'BAPS News · Jacksonville 2007',
    highlight: true,
  },
  {
    id: 'nc-2013',
    year: '2013',
    title: 'NAYC — Bal-Balika',
    place: 'Atlanta, GA',
    group: 'Bal · Balika (ages 8–13)',
    theme: 'Ekantik: My Life with Bapa',
    image: '/images/nam/nc18-bal-01.jpg',
    blurb:
      '7–10 July 2013 at BAPS Shri Swaminarayan Mandir, Atlanta. Nearly 3,000 children explored dharma, gnan, vairagya, and bhakti through classroom, stage, and a bond with Pramukh Swami Maharaj. Part of an 11-day campus that hosted over 8,000 youth in three conventions.',
    source: 'BAPS News · Atlanta Bal-Balika 2013',
    highlight: true,
  },
  {
    id: 'nc-2018',
    year: '2018',
    title: 'NAYC — Kishore-Kishori I',
    place: 'Atlanta, GA',
    group: 'Kishore · Kishori (high school)',
    theme: 'Moksha — ultimate liberation',
    image: '/images/nam/nc18-k1-welcome.jpg',
    blurb:
      '4–7 July 2018. Over 2,800 high-school delegates and 800 volunteers. Theme Moksha, with swamis including Pujya Ishwarcharandas Swami and Pujya Anandswarupdas Swami. Small groups made the teaching practical. Full NAYC18: 1–10 July, 10,000+ youth and volunteers across three conventions.',
    source: 'BAPS News · Atlanta Kishore-Kishori I 2018',
    highlight: true,
  },
  {
    id: 'nc-2026',
    year: '2026',
    title: 'NAAM — North American Activities Meeting',
    place: 'Edison, NJ',
    group: 'Activities karyakars',
    theme: 'Goshthi, breakouts, combined keynotes',
    image: '/images/nam/edison-aerial.jpg',
    blurb:
      '8–11 October 2026 at BAPS Shri Swaminarayan Mandir, Edison. Official block schedule: arrival Thursday evening, four combined i/eBKY keynotes, bhaio/behno stagger, Sunday Akshardham Robbinsville or airport drop-off.',
    highlight: true,
  },
] as const;

export const SACHU = [
  {
    id: 'guru',
    kicker: '01  ·  Guru',
    title: 'A living Satpurush',
    line: 'The guru parampara is not history — it sits in the mandir today.',
    image: '/images/guru-mahant-swami.jpg',
    body: 'From Bhagwan Swaminarayan to Gunatitanand Swami through Pramukh Swami Maharaj to Mahant Swami Maharaj, satsang stays sachu because the Satpurush is present. NC after NC — Jacksonville, Atlanta, Edison — the same wish: come closer to the guru, then take that closer home.',
    proof: 'Every North American convention is inspired by the guru’s agna, not a committee trend.',
  },
  {
    id: 'shastra',
    kicker: '02  ·  Shastra',
    title: 'Vachanamrut to Karika',
    line: 'The philosophy is written, recited, and defended — not improvised.',
    image: '/images/nam/nc18-bal-03.jpg',
    body: 'Akshar-Purushottam Darshan is grounded in the Vachanamrut, Swamini Vato, and texts such as the Swaminarayan-Siddhant-Sudha. When a balak becomes Karika Jayi, or a kishore studies Moksha at NAYC, shastra is not a slogan. It is something the next generation can hold.',
    proof: 'Classroom at NC is the same gnan taught in daily sabha — scaled, never diluted.',
  },
  {
    id: 'anubhav',
    kicker: '03  ·  Anubhav',
    title: 'Lives that change',
    line: 'You can see it: seva, youth, and families who keep returning.',
    image: '/images/nam/nc18-k1-interaction.jpg',
    body: 'Satsang is sachu in the fruit. Thousands of volunteers build an NC in Atlanta. Karyakars fly to Edison to fix a darshan line. Children write letters to Swamishri. That continuity from 1984 Chicago to 2026 Edison is the proof karyakars feel in their own mandir.',
    proof: 'If it were only a program, people would stop coming. They do not.',
  },
] as const;

export const QUIZ = [
  {
    id: 'q1',
    prompt: 'The 2018 North American Youth Convention was held in…',
    choices: ['Chicago, IL', 'Atlanta, GA', 'Edison, NJ'],
    answer: 1,
    why: 'NAYC18 was in Atlanta, 1–10 July 2018, theme Moksha.',
  },
  {
    id: 'q2',
    prompt: 'The 2013 Bal-Balika convention theme was…',
    choices: ['Moksha', 'Ekantik: My Life with Bapa', 'Year of Seva'],
    answer: 1,
    why: 'Nearly 3,000 children explored Ekantik dharma on the Atlanta campus.',
  },
  {
    id: 'q3',
    prompt: 'The 2007 Kishore-Kishori National Convention was in…',
    choices: ['Jacksonville, FL', 'Houston, TX', 'Toronto, ON'],
    answer: 0,
    why: '5–8 July 2007 in Jacksonville, with Pramukh Swami Maharaj.',
  },
  {
    id: 'q4',
    prompt: 'NAAM 2026 is hosted at…',
    choices: ['Robbinsville Mandir', 'Edison Mandir, NJ', 'Atlanta Mandir'],
    answer: 1,
    why: 'BAPS Shri Swaminarayan Mandir, Edison. Sunday includes Robbinsville Akshardham or airport drop-off.',
  },
  {
    id: 'q5',
    prompt: '“Sachu chhe” in this kiosk points to how many proofs?',
    choices: ['One speech', 'Three — guru, shastra, anubhav', 'A quiz score'],
    answer: 1,
    why: 'Tap Sachu Chhe: living guru, written shastra, changed lives.',
  },
  {
    id: 'q6',
    prompt: 'Friday afternoon, Behno are in…',
    choices: ['Team Breakouts', 'Mahila Program (Main Hall)', 'Regional Review'],
    answer: 1,
    why: '3:00–4:15 PM Friday: Bhaio stay in team breakouts; Behno go to the Mahila Program.',
  },
] as const;
