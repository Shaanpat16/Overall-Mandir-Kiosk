export { NAM, TRACKS, DAYS, SESSIONS } from './official';
export type { TrackId, NamSession } from './official';

export type NamView =
  | 'attract'
  | 'home'
  | 'info'
  | 'menu'
  | 'schedule'
  | 'tracks'
  | 'campus'
  | 'guide'
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

export const HOME_TILES = [
  { id: 'info', label: 'Common Info', image: '/images/nam/nc18-k1-welcome.jpg', view: 'info' as const },
] as const;

export const AGENDA_KEY = 'naam-2026-agenda';

export type MenuSlot = 'breakfast' | 'lunch' | 'snack' | 'dinner';

export const MENU_DAYS = [
  {
    id: 'wed',
    short: 'Wed',
    label: 'Wednesday',
    date: 'Oct 7',
    iso: '2026-10-07',
    kicker: 'Team hangouts',
    tote: false,
    meals: [
      {
        slot: 'dinner' as const,
        name: 'Dinner',
        window: '6:00–9:30 PM',
        start: '6:00 PM',
        end: '9:30 PM',
        place: 'Hangouts',
        headline: 'Black bean burgers',
        items: ['Black bean burgers', 'Fries', 'Secret sauce', 'Jalapeño coins', 'Milkshake'],
      },
    ],
  },
  {
    id: 'thu',
    short: 'Thu',
    label: 'Thursday',
    date: 'Oct 8',
    iso: '2026-10-08',
    kicker: 'Arrival day',
    tote: true,
    meals: [
      {
        slot: 'breakfast' as const,
        name: 'Breakfast',
        window: '8:00–10:00 AM',
        start: '8:00 AM',
        end: '10:00 AM',
        place: 'Dining Hall',
        headline: 'Fruit, muffins & cereal',
        items: ['Whole apples & bananas', 'Muffins', 'Milk & cereal', 'Black hot coffee'],
      },
      {
        slot: 'lunch' as const,
        name: 'Lunch',
        window: '12:00–2:00 PM',
        start: '12:00 PM',
        end: '2:00 PM',
        place: 'Dining Hall',
        headline: 'Cold sandwiches',
        items: ['6" cold sandwiches', 'Deep River jalapeño chips', 'Variety CLIF bars', 'Gatorade', 'Water'],
      },
      {
        slot: 'snack' as const,
        name: 'Welcome snack',
        window: '5:00–7:00 PM',
        start: '5:00 PM',
        end: '7:00 PM',
        place: 'Lobby',
        headline: 'Blueberry lemonade',
        items: ['Welcome drink · blueberry lemonade', 'Skinny Pop'],
      },
      {
        slot: 'dinner' as const,
        name: 'Dinner',
        window: '7:30–9:00 PM',
        start: '7:30 PM',
        end: '9:00 PM',
        place: 'Dining Hall',
        headline: 'Pasta night',
        items: [
          'Pasta with red, white, and veggie sauces',
          'Fresh breadsticks',
          'Salad with dressing',
          'Soda (regular & zero sugar)',
          'Cheesecake cups',
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
    iso: '2026-10-09',
    kicker: 'Keynotes 1 & 2',
    tote: true,
    meals: [
      {
        slot: 'breakfast' as const,
        name: 'Breakfast',
        window: '7:45–9:00 AM',
        start: '7:45 AM',
        end: '9:00 AM',
        place: 'Dining Hall',
        headline: 'Bagels & moong',
        items: [
          'Sliced apples, banana, yogurt parfait',
          'Bagels with sun-dried tomato, jalapeño & plain cream cheese',
          'Moong with dahi & Ratlami sev',
          'Milk, Indian chai, black coffee & creamer',
        ],
      },
      {
        slot: 'lunch' as const,
        name: 'Lunch',
        window: '12:30–2:00 PM',
        start: '12:30 PM',
        end: '2:00 PM',
        place: 'Dining Hall',
        headline: 'Falafel bowls',
        items: [
          'Strawberry mint lemonade',
          'Falafel bowl · pita, bhajiya, salad, red chutney / tahini',
          'Baklava, hummus, pita chips',
        ],
      },
      {
        slot: 'snack' as const,
        name: 'Snack',
        window: '4:30–5:00 PM',
        start: '4:30 PM',
        end: '5:00 PM',
        place: 'Campus',
        headline: 'Aloo puff',
        items: ['Cold coffee, hot coffee, masala chai', 'Aloo puff & ketchup'],
      },
      {
        slot: 'dinner' as const,
        name: 'Dinner',
        window: '7:30–9:00 PM',
        start: '7:30 PM',
        end: '9:00 PM',
        place: 'Dining Hall',
        headline: 'Taco night',
        items: [
          'Mango nada',
          'Paneer & cauliflower tacos',
          'Poblano enchiladas, Mexican rice',
          'Salsa & guacamole with chips',
          'Elote cups',
          'Tiramisu cups',
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
    iso: '2026-10-10',
    kicker: 'Keynotes 3 & 4',
    tote: true,
    meals: [
      {
        slot: 'breakfast' as const,
        name: 'Breakfast',
        window: '7:45–9:00 AM',
        start: '7:45 AM',
        end: '9:00 AM',
        place: 'Dining Hall',
        headline: 'Croissants & tofu scramble',
        items: [
          'Sliced apples, banana, yogurt parfait',
          'Croissants with butter, jam, Nutella',
          'Scrambled tofu',
          'Milk, Indian chai, black coffee & creamer',
        ],
      },
      {
        slot: 'lunch' as const,
        name: 'Lunch',
        window: '12:30–2:00 PM',
        start: '12:30 PM',
        end: '2:00 PM',
        place: 'Dining Hall',
        headline: 'Indo-Chinese',
        items: ['Refresher drinks', 'Manchow soup', 'Spring rolls with duck sauce', 'Chinese noodles', 'Manchurian & chili paneer'],
      },
      {
        slot: 'snack' as const,
        name: 'Snack',
        window: '4:30–5:00 PM',
        start: '4:30 PM',
        end: '5:00 PM',
        place: 'Campus',
        headline: 'Chana ni daal garam',
        items: ['Cold coffee, hot coffee, masala chai', 'Chana ni daal garam · tomato, lime, cilantro'],
      },
      {
        slot: 'dinner' as const,
        name: 'Dinner',
        window: '7:30–9:00 PM',
        start: '7:30 PM',
        end: '9:00 PM',
        place: 'Dining Hall',
        headline: 'North Indian thali',
        items: [
          'Mango lassi',
          'Paratha, paneer tikka, mushroom masala',
          'Jeera rice, dal fry, ras malai cups, masala papad',
          'Amul jalapeño samosa with green & sweet chutney',
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
    iso: '2026-10-11',
    kicker: 'Departures',
    tote: false,
    meals: [
      {
        slot: 'breakfast' as const,
        name: 'Breakfast',
        window: '6:45–8:30 AM',
        start: '6:45 AM',
        end: '8:30 AM',
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
        window: '12:30–2:00 PM',
        start: '12:30 PM',
        end: '2:00 PM',
        place: 'Departures',
        headline: 'Veggie wraps to-go',
        items: ['Cold veggie wraps', 'Potato chips', 'Chocolate chip bars', 'Gatorade', 'Water'],
      },
    ],
  },
] as const;

export const MENU_TOTE = ['Oreos / Chips Ahoy', 'Popcorners', 'Pirate’s Booty', 'Water bottles'] as const;

/** @deprecated use MENU_DAYS — kept so hot-reload never crashes mid-session */
export const MENU = MENU_DAYS;

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
    prompt: 'Edison mandir stands on which street?',
    choices: ['Oak Tree Road', 'Woodbridge Avenue', 'Route 1'],
    answer: 1,
    why: 'BAPS Shri Swaminarayan Mandir, 2500 Woodbridge Avenue, Edison, NJ.',
  },
  {
    id: 'q6',
    prompt: 'Friday afternoon, Behno are in…',
    choices: ['Team Breakouts', 'Mahila Program (Main Hall)', 'Regional Review'],
    answer: 1,
    why: '3:00–4:15 PM Friday: Bhaiyo stay in team breakouts; Behno go to the Mahila Program.',
  },
] as const;
