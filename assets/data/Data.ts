// Mock data for the app

export const moods = [
  { id: '1', image: require('@/assets/icons/happy1.png'), label: 'Happy', count: '14'},
  { id: '2', image: require('@/assets/icons/meh1.png'), label: 'Neutral', count: '20'},
  { id: '3', image: require('@/assets/icons/mad1.png'), label: 'Angry', count: '37' },
  { id: '4', image: require('@/assets/icons/sad1.png'), label: 'Sad', count: '12' },
  { id: '5', image: require('@/assets/icons/anxious1.png'), label: 'Anxious', count:'18' },
  { id: '6', image: require('@/assets/icons/depressed1.png'), label: 'Depressed', count: '5' },
  { id: '7', image: require('@/assets/icons/None.png'), label: 'None', count: '0' },

];

export const dates = [
  { id: '1', month: 'Apr', day: '14', week: 'Mon' },
  { id: '2', month: 'Apr', day: '15', week: 'Tue' },
  { id: '3', month: 'Apr', day: '16', week: 'Wed' },
  { id: '4', month: 'Apr', day: '17', week: 'Thu' },
  { id: '5', month: 'Apr', day: '18', week: 'Fri' },
  { id: '6', month: 'Apr', day: '19', week: 'Sat' },
  { id: '7', month: 'Apr', day: '20', week: 'Sun' },
]

export const progressStats = [
  {
    id: '1',
    title: 'Meditation',
    value: 45,
    target: 60,
    unit: ' min',
    description: 'Weekly meditation goal',
  },
  {
    id: '2',
    title: 'Mood Tracking',
    value: 5,
    target: 7,
    unit: ' days',
    description: 'Days tracked this week',
  },
  {
    id: '3',
    title: 'Journaling',
    value: 3,
    target: 5,
    unit: ' entries',
    description: 'Weekly journaling goal',
  },
];

export const therapists = [
  {
    id: '1',
    name: 'Dr. Sarah Johnson',
    specialty: 'Anxiety & Depression',
    rating: 4.9,
    reviewCount: 124,
    imageUrl: 'https://images.pexels.com/photos/5215024/pexels-photo-5215024.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    available: true,
  },
  {
    id: '2',
    name: 'Dr. Michael Chen',
    specialty: 'Trauma & PTSD',
    rating: 4.8,
    reviewCount: 98,
    imageUrl: 'https://images.pexels.com/photos/6129507/pexels-photo-6129507.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    available: true,
  },
  {
    id: '3',
    name: 'Dr. Amelia Patel',
    specialty: 'Relationship Counseling',
    rating: 4.7,
    reviewCount: 87,
    imageUrl: 'https://images.pexels.com/photos/5327585/pexels-photo-5327585.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    available: false,
  },
  {
    id: '4',
    name: 'Dr. James Wilson',
    specialty: 'Stress Management',
    rating: 4.9,
    reviewCount: 112,
    imageUrl: 'https://images.pexels.com/photos/5490276/pexels-photo-5490276.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    available: true,
  },
];

export const resources = [
  {
    id: '1',
    title: 'Understanding Anxiety',
    description: 'Learn about the causes, symptoms, and management strategies for anxiety disorders.',
    category: 'Education',
    imageUrl: 'https://images.pexels.com/photos/897817/pexels-photo-897817.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  },
  {
    id: '2',
    title: 'The Science of Sleep',
    description: 'Discover how sleep affects mental health and practical tips for better sleep hygiene.',
    category: 'Education',
    imageUrl: 'https://images.pexels.com/photos/1028741/pexels-photo-1028741.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  },
  {
    id: '3',
    title: 'Crisis Hotlines',
    description: 'A comprehensive list of emergency mental health resources available 24/7.',
    category: 'Support',
    imageUrl: 'https://images.pexels.com/photos/4226215/pexels-photo-4226215.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  },
  {
    id: '4',
    title: 'Nutrition & Mental Health',
    description: 'How diet influences mood and mental wellbeing, with practical nutritional advice.',
    category: 'Lifestyle',
    imageUrl: 'https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  },
];
