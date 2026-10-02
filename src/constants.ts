// Design System Constants
export const COLORS = {
  sage: '#B8D8BA',
  olive: '#D9DBBC',
  cream: '#FCDDBC',
  coral: '#EF959D',
  mauve: '#69585F',
};

export const RECIPIENT_TYPES = [
  'Partner',
  'Friend',
  'Family',
  'Colleague',
  'Parent',
  'Other',
] as const;

export const INTERESTS = [
  'Technology',
  'Fashion',
  'Books',
  'Travel',
  'Fitness',
  'Beauty',
  'Food',
  'Music',
  'Gaming',
  'Home Decor',
  'Photography',
  'Art',
] as const;

export const OCCASIONS = [
  'Birthday',
  'Anniversary',
  'Wedding',
  'Graduation',
  'Festival',
  'Thank You',
  'Just Because',
  'Housewarming',
  'Baby Shower',
  'Other',
] as const;

export const BUDGET_RANGES = [
  { label: '₹500 – ₹1,000', value: '500-1000' },
  { label: '₹1,000 – ₹2,500', value: '1000-2500' },
  { label: '₹2,500 – ₹5,000', value: '2500-5000' },
  { label: '₹5,000 – ₹10,000', value: '5000-10000' },
  { label: '₹10,000+', value: '10000+' },
  { label: 'Flexible', value: 'flexible' },
] as const;

export const GIFT_STYLES = [
  'Personalized',
  'Practical',
  'Luxury',
  'Fun',
  'Romantic',
  'Experiential',
  'Handmade',
  'Tech',
  'Self-care',
] as const;

export const BADGES = [
  'Best Match',
  'Trending',
  'Budget Friendly',
  'Personalized',
  'Top Rated',
  'Great for Them',
] as const;

export const MOCK_PRODUCTS = [
  {
    id: 1,
    name: 'Personalized Tumbler Bottle',
    price: 799,
    rating: 4.8,
    reviews: 1200,
    category: 'Home',
    badge: 'Best Match',
    image: 'https://images.unsplash.com/photo-1514432324607-2e467f4af445?w=500&h=500&fit=crop',
    explanation: 'Perfect for their everyday adventures and something they can truly call their own.',
    tags: ['Practical', 'Personalized'],
  },
  {
    id: 2,
    name: 'The Midnight Library',
    price: 499,
    rating: 4.7,
    reviews: 3400,
    category: 'Books',
    badge: 'Trending',
    image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=500&h=500&fit=crop',
    explanation: 'A beautiful novel about second chances and infinite possibilities.',
    tags: ['Books', 'Thoughtful'],
  },
  {
    id: 3,
    name: 'Cute Desk Plant',
    price: 599,
    rating: 4.6,
    reviews: 890,
    category: 'Home',
    badge: 'Budget Friendly',
    image: 'https://images.unsplash.com/photo-1460071712208-8d5668ffd1e4?w=500&h=500&fit=crop',
    explanation: 'Bring life and freshness to their workspace with this adorable plant.',
    tags: ['Home Decor', 'Self-care'],
    ecoFriendly: true,
  },
  {
    id: 4,
    name: 'Custom Photo Frame',
    price: 1199,
    rating: 4.8,
    reviews: 2100,
    category: 'Personalized',
    badge: 'Personalized',
    image: 'https://images.unsplash.com/photo-1532694215381-6d2e3fb6b8b9?w=500&h=500&fit=crop',
    explanation: 'Display your favorite memories in style with this elegant custom frame.',
    tags: ['Personalized', 'Memory'],
    ecoFriendly: true,
  },
  {
    id: 5,
    name: 'Wireless Earbuds',
    price: 2499,
    rating: 4.5,
    reviews: 5600,
    category: 'Technology',
    badge: 'Top Rated',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop',
    explanation: 'Premium audio quality with noise cancellation for music lovers.',
    tags: ['Technology', 'Practical'],
  },
  {
    id: 6,
    name: 'Smart Watch',
    price: 4999,
    rating: 4.7,
    reviews: 3200,
    category: 'Technology',
    badge: 'Great for Them',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=500&fit=crop',
    explanation: 'Stay connected and track fitness with this stylish smartwatch.',
    tags: ['Technology', 'Fitness'],
  },
  {
    id: 7,
    name: 'Coffee Mug Set',
    price: 1299,
    rating: 4.7,
    reviews: 1500,
    category: 'Home',
    badge: 'Trending',
    image: 'https://images.unsplash.com/photo-1514432324607-2e467f4af445?w=500&h=500&fit=crop',
    explanation: 'Start their day right with this beautiful matching mug collection.',
    tags: ['Home', 'Practical'],
  },
  {
    id: 8,
    name: 'Fashion Tote Bag',
    price: 1999,
    rating: 4.5,
    reviews: 2800,
    category: 'Fashion',
    badge: 'Best Match',
    image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=500&h=500&fit=crop',
    explanation: 'A versatile and stylish bag perfect for any occasion.',
    tags: ['Fashion', 'Practical'],
    ecoFriendly: true,
  },
  {
    id: 9,
    name: 'Scented Candle Set',
    price: 1699,
    rating: 4.8,
    reviews: 4100,
    category: 'Self-care',
    badge: 'Trending',
    image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=500&h=500&fit=crop',
    explanation: 'Create a spa-like atmosphere with these luxury scented candles.',
    tags: ['Self-care', 'Luxury'],
    ecoFriendly: true,
  },
  {
    id: 10,
    name: 'Bluetooth Speaker',
    price: 3499,
    rating: 4.6,
    reviews: 2900,
    category: 'Technology',
    badge: 'Budget Friendly',
    image: 'https://images.unsplash.com/photo-1589003077984-894e133814c9?w=500&h=500&fit=crop',
    explanation: 'Portable speaker with incredible sound quality for music enthusiasts.',
    tags: ['Technology', 'Music'],
  },
  {
    id: 11,
    name: 'Skincare Kit',
    price: 2299,
    rating: 4.7,
    reviews: 1800,
    category: 'Beauty',
    badge: 'Best Match',
    image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=500&h=500&fit=crop',
    explanation: 'Complete skincare routine for a healthy, glowing complexion.',
    tags: ['Beauty', 'Self-care'],
  },
  {
    id: 12,
    name: 'Travel Journal',
    price: 899,
    rating: 4.6,
    reviews: 1200,
    category: 'Travel',
    badge: 'Personalized',
    image: 'https://images.unsplash.com/photo-1550399105-dff4a826807a?w=500&h=500&fit=crop',
    explanation: 'Document adventures with this beautiful leather-bound journal.',
    tags: ['Travel', 'Thoughtful'],
    ecoFriendly: true,
  },
  {
    id: 13,
    name: 'Mini Projector',
    price: 6999,
    rating: 4.8,
    reviews: 1800,
    category: 'Technology',
    badge: 'Top Rated',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=500&h=500&fit=crop',
    explanation: 'Turn movie nights into a cozy surprise with portable cinema vibes.',
    tags: ['Technology', 'Experiential'],
  },
  {
    id: 14,
    name: 'Handmade Ceramic Tea Set',
    price: 2499,
    rating: 4.9,
    reviews: 980,
    category: 'Home',
    badge: 'Trending',
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=500&h=500&fit=crop',
    explanation: 'Warm, beautiful, and perfect for slow afternoons and thoughtful rituals.',
    tags: ['Home Decor', 'Handmade'],
    ecoFriendly: true,
  },
  {
    id: 15,
    name: 'Leather Wallet',
    price: 1899,
    rating: 4.7,
    reviews: 2400,
    category: 'Fashion',
    badge: 'Best Match',
    image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=500&h=500&fit=crop',
    explanation: 'A classic everyday essential that feels thoughtful and premium.',
    tags: ['Fashion', 'Luxury'],
  },
  {
    id: 16,
    name: 'Rose Gold Compact Mirror',
    price: 999,
    rating: 4.6,
    reviews: 1100,
    category: 'Beauty',
    badge: 'Budget Friendly',
    image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=500&h=500&fit=crop',
    explanation: 'A polished little luxury for their vanity or handbag.',
    tags: ['Beauty', 'Self-care'],
  },
  {
    id: 17,
    name: 'Adventure Snack Box',
    price: 1499,
    rating: 4.8,
    reviews: 870,
    category: 'Food',
    badge: 'Fun',
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=500&h=500&fit=crop',
    explanation: 'A cheerful gourmet surprise packed with tasty little delights.',
    tags: ['Food', 'Fun'],
  },
  {
    id: 18,
    name: 'Puzzle for Slow Evenings',
    price: 1299,
    rating: 4.7,
    reviews: 1340,
    category: 'Home',
    badge: 'Great for Them',
    image: 'https://images.unsplash.com/photo-1517486800573-0f6c02c7d195?w=500&h=500&fit=crop',
    explanation: 'The perfect cozy gift for relaxing nights and a little brainy fun.',
    tags: ['Home', 'Fun'],
  },
];

export const OCCASIONS_WITH_EMOJI = {
  Birthday: '🎂',
  Anniversary: '❤️',
  Wedding: '💍',
  Graduation: '🎓',
  Festival: '🎉',
  'Thank You': '🌷',
  'Just Because': '🎁',
  Housewarming: '🏠',
  'Baby Shower': '👶',
};

export const GIFT_REACTION_EMOJIS = ['😍', '😂', '🎉', '🤩', '🥳'];
export const GIFT_MESSAGE_SUGGESTIONS = [
  'A little surprise, a lot of heart. This one says “I really know you.”',
  'This is basically a tiny love note wrapped in a gift box.',
  'For the person who makes ordinary days feel extra magical.',
  'The kind of gift that makes them smile before they even open it.',
];

export const getCountdownInfo = (targetDate = '2026-10-08') => {
  const now = new Date();
  const target = new Date(targetDate);
  const diffMs = target.getTime() - now.getTime();
  const daysLeft = Math.max(0, Math.ceil(diffMs / (1000 * 60 * 60 * 24)));

  return {
    title: 'Anniversary',
    dateLabel: target.toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' }),
    daysLeft,
    label: daysLeft === 0 ? 'Today is the day!' : `${daysLeft} day${daysLeft === 1 ? '' : 's'} left`,
  };
};

export const buildGiftStory = (giftName: string, recipient = 'your favorite person') => {
  const stories = [
    `${giftName} is like a warm hug for ${recipient} — thoughtful, cozy, and impossible to ignore.`,
    `This ${giftName.toLowerCase()} feels like the exact kind of surprise that turns “just because” into “you really know me.”`,
    `${giftName} is the kind of gift that says, “I noticed the little things,” and that is always the sweetest magic.`,
  ];
  return stories[Math.floor(Math.random() * stories.length)];
};

export const getPlayfulErrorMessage = (message: string) => {
  const lowered = message.toLowerCase();
  if (lowered.includes('invalid') || lowered.includes('required') || lowered.includes('must be')) {
    return 'Oops, even genies get confused sometimes… try a different combo and we’ll cast a better spell.';
  }
  return message;
};

export const getStoreLinks = (giftName: string) => [
  {
    name: 'Amazon',
    price: 'From ₹999',
    url: `https://www.amazon.in/s?k=${encodeURIComponent(giftName)}`,
  },
  {
    name: 'Flipkart',
    price: 'From ₹899',
    url: `https://www.flipkart.com/search?q=${encodeURIComponent(giftName)}`,
  },
  {
    name: 'Official Store',
    price: 'Gift-ready',
    url: `https://www.google.com/search?q=${encodeURIComponent(`${giftName} online buy`)}`,
  },
];
