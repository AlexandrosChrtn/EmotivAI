
export const labelColors = {
  morning: "bg-yellow-200 text-yellow-800 border-yellow-300",
  apology: "bg-blue-100 text-blue-700 border-blue-200",
  love: "bg-rose-200 text-rose-800 border-rose-300",
  motivation: "bg-teal-200 text-teal-800 border-teal-300",
  knowledge: "bg-violet-200 text-violet-700 border-violet-300",
  night: "bg-blue-800 text-white border-blue-900",
};

export const aiImages = [
  {
    id: "morning-1",
    url: "https://images.unsplash.com/photo-1500673922987-e212871fec22?auto=format&fit=crop&w=900&q=80",
    alt: "Yellow lights between trees in the morning",
    label: "morning",
    description: "Sun-dappled forest at sunrise"
  },
  {
    id: "apology-1",
    url: "https://images.unsplash.com/photo-1518495973542-4542c06a5843?auto=format&fit=crop&w=900&q=80",
    alt: "Sunlight passing through tree leaves (soft forgiving mood)",
    label: "apology",
    description: "Gentle light through leaves, a forgiving scene"
  },
  {
    id: "love-1",
    url: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=900&q=80",
    alt: "A couple holding hands on a bench",
    label: "love",
    description: "Two people together on a bench"
  },
  {
    id: "motivation-1",
    url: "https://images.unsplash.com/photo-1517022812141-23620dba5c23?auto=format&fit=crop&w=900&q=80",
    alt: "Sheep on grass field with mountains",
    label: "motivation",
    description: "A flock moving forward, progress and momentum"
  },
  {
    id: "knowledge-1",
    url: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=900&q=80",
    alt: "Woman reading a book by a window",
    label: "knowledge",
    description: "A scene with books, learning and growth"
  },
  {
    id: "night-1",
    url: "https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?auto=format&fit=crop&w=900&q=80",
    alt: "Blue starry night sky",
    label: "night",
    description: "A calm, starlit night, feeling peaceful"
  },
];

export const aiLabels = [
  { value: "morning", text: "Good Morning" },
  { value: "apology", text: "Apology" },
  { value: "love", text: "Love" },
  { value: "motivation", text: "Motivation" },
  { value: "knowledge", text: "Knowledge" },
  { value: "night", text: "Good Night" },
];

export const aiQuotes = {
  morning: [
    "Good morning! Each sunrise brings a new beginning.",
    "Rise and shine – today is full of possibilities.",
    "Embrace today with a warm heart and an open mind.",
    "Let gentle light and bright moments guide your morning."
  ],
  apology: [
    "I'm sorry. Sometimes words fall short, but my heart is true.",
    "A gentle apology can restore trust.",
    "Forgiveness brings comfort back to any home.",
    "Let's find understanding and start again."
  ],
  love: [
    "Love is the warmth that lights every home.",
    "Let your heart be soft, your words kind, and your love endless.",
    "The simplest things done with love are the most precious.",
    "Spread love like sunshine on an afternoon."
  ],
  motivation: [
    "Little steps can take you to wonderful places.",
    "Moments can spark the greatest dreams.",
    "You are capable of beautiful things – start today.",
    "Every effort brings you closer to your dreams."
  ],
  knowledge: [
    "A curious mind never stops learning.",
    "Knowledge is like a warm cup of tea, enriching and comforting.",
    "Reading fills the soul with the glow of wisdom.",
    "Every question is a door to learning."
  ],
  night: [
    "Good night! Rest your dreams on a bed of possibility.",
    "May your night be filled with peace, warmth and sweet dreams.",
    "The stars are lights comforting you to sleep.",
    "Drift into sleep wrapped in gentle thoughts and calm."
  ]
};

export const demoImages = [
  {
    id: "cozy-1",
    url: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?auto=format&fit=crop&w=900&q=80",
    alt: "A woman sitting on a bed using a laptop"
  },
  {
    id: "cozy-2",
    url: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=900&q=80",
    alt: "Turned on gray laptop computer"
  },
  {
    id: "cozy-3",
    url: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=900&q=80",
    alt: "Woman in white sleeve shirt using black laptop"
  },
  {
    id: "cozy-4",
    url: "https://images.unsplash.com/photo-1500673922987-e212871fec22?auto=format&fit=crop&w=900&q=80",
    alt: "Yellow lights between trees"
  },
  {
    id: "cozy-5",
    url: "https://images.unsplash.com/photo-1517022812141-23620dba5c23?auto=format&fit=crop&w=900&q=80",
    alt: "Herd of sheep on green grass"
  },
  {
    id: "cozy-6",
    url: "https://images.unsplash.com/photo-1582562124811-c09040d0a901?auto=format&fit=crop&w=900&q=80",
    alt: "Orange and white tabby cat lying on floral textile"
  }
];

export const demoQuotes = [
  // Good Morning
  { label: "morning", text: "Good morning! Each sunrise brings a new beginning." },
  { label: "morning", text: "Rise and shine – today is full of possibilities." },
  { label: "morning", text: "Embrace today with a warm heart and an open mind." },
  { label: "morning", text: "Let gentle light and bright moments guide your morning." },

  // Love
  { label: "love", text: "Love is the warmth that lights every home." },
  { label: "love", text: "Let your heart be soft, your words kind, and your love endless." },
  { label: "love", text: "The simplest things done with love are the most precious." },
  { label: "love", text: "Spread love like sunshine on an afternoon." },

  // Knowledge
  { label: "knowledge", text: "A curious mind never stops learning." },
  { label: "knowledge", text: "Knowledge is like a warm cup of tea, enriching and comforting." },
  { label: "knowledge", text: "Reading fills the soul with the glow of wisdom." },
  { label: "knowledge", text: "Every question is a door to learning." },

  // Motivation
  { label: "motivation", text: "Little steps can take you to wonderful places." },
  { label: "motivation", text: "Moments can spark the greatest dreams." },
  { label: "motivation", text: "You are capable of beautiful things – start today." },
  { label: "motivation", text: "Every effort brings you closer to your dreams." },

  // Good night
  { label: "night", text: "Good night! Rest your dreams on a bed of possibility." },
  { label: "night", text: "May your night be filled with peace, warmth and sweet dreams." },
  { label: "night", text: "The stars are lights comforting you to sleep." },
  { label: "night", text: "Drift into sleep wrapped in gentle thoughts and calm." },

  // Anger (playful, generic)
  { label: "anger", text: "I'm so mad. Rawr." },
  { label: "anger", text: "You're not a nice person." },
  { label: "anger", text: "Take a deep breath and let it settle in." },
  { label: "anger", text: "Even on fiery days, find a soft corner." },

  // Disappointment (playful, generic)
  { label: "disappointment", text: "I expected more." },
  { label: "disappointment", text: "Sometimes things don't go as planned and that's okay." },
  { label: "disappointment", text: "Not every day is a win, but tomorrow is a new chance." },
  { label: "disappointment", text: "Give yourself a break and keep moving forward." },
];
