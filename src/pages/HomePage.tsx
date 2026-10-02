import React from 'react';
import { Search, Sparkles, Plus, Bell } from 'lucide-react';
import {
  Button,
  GiftCard,
  GenieMascot,
} from '../components';
import { useAppStore } from '../store';
import {
  MOCK_PRODUCTS,
  OCCASIONS_WITH_EMOJI,
  getCountdownInfo,
} from '../constants';

type WheelProfile = {
  recipientName: string;
  relationship: string;
  ageRange: string;
  occasion: string;
  budget: string;
  interests: string[];
};

type WheelGift = {
  name: string;
  reason: string;
  priceRange: string;
  tag: string;
};

const INTEREST_CHOICES = [
  'Books',
  'Tech',
  'Fitness',
  'Cooking',
  'Gaming',
  'Travel',
  'Fashion',
  'Art',
  'Music',
  'Plants',
  'Coffee/Tea',
  'Pets',
];

const DEFAULT_WHEEL_PROFILE: WheelProfile = {
  recipientName: 'Your lucky person',
  relationship: 'Friend',
  ageRange: '18-29',
  occasion: 'Birthday',
  budget: '2500-5000',
  interests: ['Books', 'Coffee/Tea', 'Travel'],
};

const DEFAULT_WHEEL_ITEMS: WheelGift[] = [
  { name: 'Pour-over coffee kit', reason: 'Because they love coffee', priceRange: '₹1,200-₹2,500', tag: 'Coffee/Tea' },
  { name: 'Hardcover novel duo', reason: 'Because they always have a book on the go', priceRange: '₹900-₹2,200', tag: 'Books' },
  { name: 'Travel journal set', reason: 'Because every trip deserves a keepsake', priceRange: '₹800-₹1,800', tag: 'Travel' },
  { name: 'Watercolor set', reason: 'Because they love creative downtime', priceRange: '₹1,000-₹2,800', tag: 'Art' },
  { name: 'Fitness water bottle', reason: 'Because they are always on the move', priceRange: '₹700-₹1,600', tag: 'Fitness' },
  { name: 'Mechanical keyboard', reason: 'Because they appreciate clever gadgets', priceRange: '₹3,000-₹6,500', tag: 'Tech' },
  { name: 'Indoor plant pot', reason: 'Because they love a fresh little corner', priceRange: '₹800-₹2,000', tag: 'Plants' },
  { name: 'Playlist-inspired tote', reason: 'Because their style feels personal and fun', priceRange: '₹1,200-₹3,500', tag: 'Fashion' },
];

const budgetLabels: Record<string, string> = {
  '500-1000': '₹500-₹1,000',
  '1000-2500': '₹1,000-₹2,500',
  '2500-5000': '₹2,500-₹5,000',
  '5000-10000': '₹5,000-₹10,000',
  '10000+': '₹10,000+',
  flexible: 'Flexible',
};

const readStoredProfile = (): WheelProfile => {
  try {
    const stored = localStorage.getItem('gift-genie-spin-profile');
    if (!stored) return DEFAULT_WHEEL_PROFILE;
    const parsed = JSON.parse(stored) as Partial<WheelProfile>;
    return {
      ...DEFAULT_WHEEL_PROFILE,
      ...parsed,
      interests: parsed.interests?.length ? parsed.interests : DEFAULT_WHEEL_PROFILE.interests,
    };
  } catch {
    return DEFAULT_WHEEL_PROFILE;
  }
};

const readSavedWheelIdeas = (): string[] => {
  try {
    const stored = localStorage.getItem('gift-genie-saved-wheel-ideas');
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

const buildWheelIdeas = (profile: WheelProfile): WheelGift[] => {
  const interestMap: Record<string, WheelGift[]> = {
    Books: [
      { name: 'Hardcover novel duo', reason: 'Because they love getting lost in a good story', priceRange: '₹900-₹2,200', tag: 'Books' },
      { name: 'Book nook reading lamp', reason: 'Because cozy reading time deserves beautiful light', priceRange: '₹1,400-₹3,000', tag: 'Books' },
      { name: 'Personalized bookplate set', reason: 'Because every favorite title deserves a personal touch', priceRange: '₹600-₹1,500', tag: 'Books' },
    ],
    Tech: [
      { name: 'Mechanical keyboard', reason: 'Because they appreciate neat details and smooth typing', priceRange: '₹3,000-₹6,500', tag: 'Tech' },
      { name: 'Wireless earbuds', reason: 'Because they love their soundtracks and calls', priceRange: '₹2,500-₹7,000', tag: 'Tech' },
      { name: 'Mini projector', reason: 'Because movie nights feel extra special', priceRange: '₹5,500-₹12,000', tag: 'Tech' },
    ],
    Fitness: [
      { name: 'Gym bag essentials kit', reason: 'Because they always stay active and prepared', priceRange: '₹1,200-₹3,500', tag: 'Fitness' },
      { name: 'Insulated water bottle', reason: 'Because they are all about healthy routines', priceRange: '₹700-₹1,600', tag: 'Fitness' },
      { name: 'Yoga mat bundle', reason: 'Because wellness is their kind of self-care', priceRange: '₹1,800-₹4,000', tag: 'Fitness' },
    ],
    Cooking: [
      { name: 'Premium spice box', reason: 'Because they love making meals feel special', priceRange: '₹1,200-₹3,200', tag: 'Cooking' },
      { name: 'Ceramic cookware set', reason: 'Because their kitchen deserves beautiful tools', priceRange: '₹2,000-₹5,500', tag: 'Cooking' },
      { name: 'Chef-approved apron set', reason: 'Because they always cook with flair', priceRange: '₹900-₹2,300', tag: 'Cooking' },
    ],
    Gaming: [
      { name: 'Cozy gaming headset', reason: 'Because the vibe matters as much as the score', priceRange: '₹2,000-₹5,500', tag: 'Gaming' },
      { name: 'Console stand kit', reason: 'Because their setup deserves a polished look', priceRange: '₹1,500-₹3,800', tag: 'Gaming' },
      { name: 'Retro controller sleeve', reason: 'Because they love standout details', priceRange: '₹800-₹2,100', tag: 'Gaming' },
    ],
    Travel: [
      { name: 'Travel journal set', reason: 'Because every trip deserves a keepsake', priceRange: '₹800-₹1,800', tag: 'Travel' },
      { name: 'Carry-on organizer', reason: 'Because they keep things neat on the move', priceRange: '₹1,300-₹3,000', tag: 'Travel' },
      { name: 'Weekend getaway tote', reason: 'Because small adventures deserve extra charm', priceRange: '₹1,500-₹4,500', tag: 'Travel' },
    ],
    Fashion: [
      { name: 'Statement tote', reason: 'Because they love expressive accessories', priceRange: '₹1,200-₹3,500', tag: 'Fashion' },
      { name: 'Silk scarf set', reason: 'Because their style is all about little details', priceRange: '₹900-₹2,600', tag: 'Fashion' },
      { name: 'Style capsule pouch', reason: 'Because they make everyday outfits feel intentional', priceRange: '₹1,000-₹2,700', tag: 'Fashion' },
    ],
    Art: [
      { name: 'Watercolor set', reason: 'Because creativity is their happy place', priceRange: '₹1,000-₹2,800', tag: 'Art' },
      { name: 'Mini art desk kit', reason: 'Because they love making time for creativity', priceRange: '₹1,600-₹4,000', tag: 'Art' },
      { name: 'Framed sketchbook', reason: 'Because their ideas deserve to be displayed beautifully', priceRange: '₹1,200-₹3,000', tag: 'Art' },
    ],
    Music: [
      { name: 'Vinyl-inspired speaker', reason: 'Because every playlist matters', priceRange: '₹2,200-₹5,000', tag: 'Music' },
      { name: 'Listening session gift card', reason: 'Because they deserve a treat while they listen', priceRange: '₹1,000-₹3,000', tag: 'Music' },
      { name: 'Aesthetic headphones stand', reason: 'Because their setup should feel as good as the music', priceRange: '₹900-₹2,200', tag: 'Music' },
    ],
    Plants: [
      { name: 'Indoor plant pot', reason: 'Because they enjoy a little calm and greenery', priceRange: '₹800-₹2,000', tag: 'Plants' },
      { name: 'Herb starter set', reason: 'Because a small green ritual makes the day better', priceRange: '₹1,000-₹2,600', tag: 'Plants' },
      { name: 'Plant care journal', reason: 'Because they love nurturing new things', priceRange: '₹700-₹1,800', tag: 'Plants' },
    ],
    'Coffee/Tea': [
      { name: 'Pour-over coffee kit', reason: 'Because they love a slow, thoughtful ritual', priceRange: '₹1,200-₹2,500', tag: 'Coffee/Tea' },
      { name: 'Ceramic tea set', reason: 'Because cozy little moments are their favorite', priceRange: '₹1,600-₹4,200', tag: 'Coffee/Tea' },
      { name: 'Brewing accessory bundle', reason: 'Because their daily cup deserves flair', priceRange: '₹800-₹2,200', tag: 'Coffee/Tea' },
    ],
    Pets: [
      { name: 'Pet care bundle', reason: 'Because they treat their pets like family', priceRange: '₹1,200-₹3,500', tag: 'Pets' },
      { name: 'Cozy pet blanket', reason: 'Because their favorite companion deserves a touch of comfort', priceRange: '₹900-₹2,300', tag: 'Pets' },
      { name: 'Custom pet tag set', reason: 'Because they love celebrating their little family members', priceRange: '₹700-₹1,900', tag: 'Pets' },
    ],
  };

  const selectedInterests = profile.interests.length ? profile.interests : DEFAULT_WHEEL_PROFILE.interests;
  const interestPool: WheelGift[] = [];

  selectedInterests.forEach((interest) => {
    interestPool.push(...(interestMap[interest] ?? DEFAULT_WHEEL_ITEMS.filter((item) => item.tag === interest)));
  });

  const occasionBoost = profile.occasion?.toLowerCase();
  const occasionIdeas: WheelGift[] = occasionBoost === 'anniversary'
    ? [
        { name: 'Keepsake framed print', reason: 'Because anniversaries deserve meaningful keepsakes', priceRange: '₹1,500-₹5,000', tag: 'Memory' },
        { name: 'Couples date jar', reason: 'Because lovely rituals make the occasion memorable', priceRange: '₹900-₹2,600', tag: 'Memory' },
      ]
    : occasionBoost === 'birthday'
      ? [
          { name: 'Birthday surprise hamper', reason: 'Because every birthday deserves a little joy', priceRange: '₹1,800-₹5,500', tag: 'Celebration' },
          { name: 'Custom cake stand', reason: 'Because the moment deserves a festive touch', priceRange: '₹1,200-₹3,200', tag: 'Celebration' },
        ]
      : [
          { name: 'Thoughtful little treat', reason: 'Because a sweet surprise makes any occasion feel special', priceRange: '₹900-₹2,500', tag: 'Occasion' },
        ];

  const combined = [...interestPool, ...occasionIdeas];
  const deduped: WheelGift[] = [];
  const seen = new Set<string>();

  combined.forEach((item) => {
    if (!seen.has(item.name)) {
      seen.add(item.name);
      deduped.push(item);
    }
  });

  while (deduped.length < 8) {
    DEFAULT_WHEEL_ITEMS.forEach((item) => {
      if (!seen.has(item.name)) {
        seen.add(item.name);
        deduped.push(item);
      }
    });
  }

  return deduped.slice(0, 10);
};

export const HomePage: React.FC = () => {
  const { user, setCurrentPage, addSearch, giftTracker } = useAppStore();
  const [searchQuery, setSearchQuery] = React.useState('');
  const [surpriseMessage, setSurpriseMessage] = React.useState<string | null>(null);
  const [spinResult, setSpinResult] = React.useState<string | null>(null);
  const [spinRotation, setSpinRotation] = React.useState(0);
  const [isSpinning, setIsSpinning] = React.useState(false);
  const [showSetup, setShowSetup] = React.useState(true);
  const [customInterest, setCustomInterest] = React.useState('');
  const [wheelProfile, setWheelProfile] = React.useState<WheelProfile>(readStoredProfile);
  const [wheelIdeas, setWheelIdeas] = React.useState<WheelGift[]>(() => buildWheelIdeas(readStoredProfile()));
  const [winner, setWinner] = React.useState<WheelGift | null>(null);
  const [savedWheelIdeas, setSavedWheelIdeas] = React.useState<string[]>(readSavedWheelIdeas);

  const occasions = Object.entries(OCCASIONS_WITH_EMOJI).slice(0, 8);
  const suggestionChips = ['Birthday', 'Anniversary', 'Under $50', 'For Mom'];
  const occasionHighlights = [
    { name: 'Birthday', emoji: '🎉', label: 'Celebrate in style' },
    { name: 'Anniversary', emoji: '💍', label: 'Meaningful keepsakes' },
    { name: 'Wedding', emoji: '💒', label: 'Shared moments' },
    { name: 'Graduation', emoji: '🎓', label: 'A proud milestone' },
    { name: 'Thank You', emoji: '🌷', label: 'Sweet appreciation' },
  ];
  const trendingIdeas = MOCK_PRODUCTS.slice(0, 4);
  const filteredProducts = searchQuery.trim()
    ? MOCK_PRODUCTS.filter((product) =>
        `${product.name} ${product.category} ${product.explanation ?? ''}`
          .toLowerCase()
          .includes(searchQuery.toLowerCase())
      )
    : MOCK_PRODUCTS;

  React.useEffect(() => {
    try {
      localStorage.setItem('gift-genie-spin-profile', JSON.stringify(wheelProfile));
    } catch {
      // Ignore storage failures.
    }
  }, [wheelProfile]);

  React.useEffect(() => {
    try {
      localStorage.setItem('gift-genie-saved-wheel-ideas', JSON.stringify(savedWheelIdeas));
    } catch {
      // Ignore storage failures.
    }
  }, [savedWheelIdeas]);

  React.useEffect(() => {
    setWheelIdeas(buildWheelIdeas(wheelProfile));
  }, [wheelProfile]);

  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (searchQuery.trim()) {
      addSearch(searchQuery.trim());
      setCurrentPage('discover');
    }
  };

  const handleSurpriseMe = () => {
    const available = MOCK_PRODUCTS.filter((product) => !giftTracker.includes(product.id));
    const basePool = available.length > 0 ? available : MOCK_PRODUCTS;
    const surpriseGift = basePool[Math.floor(Math.random() * basePool.length)];
    setSurpriseMessage(`The genie whispered: “${surpriseGift.name} is a delightfully chaotic match.”`);
    setCurrentPage(`gift-${surpriseGift.id}`);
  };

  const updateWheelProfile = (updates: Partial<WheelProfile>) => {
    setWheelProfile((current) => ({ ...current, ...updates }));
  };

  const toggleInterest = (interest: string) => {
    setWheelProfile((current) => {
      const exists = current.interests.includes(interest);
      return {
        ...current,
        interests: exists
          ? current.interests.filter((item) => item !== interest)
          : [...current.interests, interest],
      };
    });
  };

  const addCustomInterest = () => {
    const interest = customInterest.trim();
    if (!interest) return;
    setWheelProfile((current) => ({
      ...current,
      interests: current.interests.includes(interest)
        ? current.interests
        : [...current.interests, interest],
    }));
    setCustomInterest('');
  };

  const handleLuckySpin = () => {
    if (isSpinning) return;

    const activeItems = wheelIdeas.length ? wheelIdeas : DEFAULT_WHEEL_ITEMS;
    if (!activeItems.length) return;

    const prizeIndex = Math.floor(Math.random() * activeItems.length);
    const prize = activeItems[prizeIndex];
    const segmentAngle = 360 / activeItems.length;
    const spins = 6;
    const targetRotation = spinRotation + spins * 360 + (360 - prizeIndex * segmentAngle - segmentAngle / 2);

    setIsSpinning(true);
    setSpinResult(null);
    setWinner(null);
    setSpinRotation(targetRotation);

    window.setTimeout(() => {
      setIsSpinning(false);
      setWinner(prize);
      setSpinResult(`${prize.name} is your lucky match! The genie approves.`);
    }, 2400);
  };

  const handleSkipGift = () => {
    const target = winner ?? wheelIdeas[0] ?? DEFAULT_WHEEL_ITEMS[0];
    const remaining = wheelIdeas.filter((item) => item.name !== target.name);
    setWheelIdeas(remaining.length ? remaining : DEFAULT_WHEEL_ITEMS);
    setWinner(null);
    setSpinResult('Skip gift activated. The genie is pretending this one was never a thing.');
  };

  const handleSaveWinner = () => {
    if (!winner) return;
    setSavedWheelIdeas((current) =>
      current.includes(winner.name) ? current : [...current, winner.name]
    );
  };

  const handleUseDefaultProfile = () => {
    setWheelProfile(DEFAULT_WHEEL_PROFILE);
    setShowSetup(false);
  };

  const countdown = getCountdownInfo();
  const wheelGradient = `conic-gradient(${wheelIdeas.map((_, index) => {
    const colors = ['#F8D9E0', '#C7E9FF', '#F9D9FF', '#D3F3D7', '#FDE1B7', '#C7D9FF', '#BFE9DB', '#F7C7D9', '#BFD8FF', '#FEE0C7'];
    const start = (360 / wheelIdeas.length) * index;
    const end = (360 / wheelIdeas.length) * (index + 1);
    return `${colors[index % colors.length]} ${start}deg ${end}deg`;
  }).join(', ')})`;

  return (
    <main className="pb-20 md:pb-0">
      <div className="sticky top-0 z-40 border-b border-white/60 bg-white/72 backdrop-blur-md">
        <div className="page-container flex items-center justify-between gap-4 py-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-mauve/60">Perfect picks</p>
            <h1 className="heading-2 mt-1">Welcome, {user?.name}!</h1>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              aria-label="Notifications"
              className="relative inline-flex h-11 w-11 items-center justify-center rounded-full border border-olive/50 bg-white/80 text-mauve shadow-soft-sm transition-all hover:-translate-y-0.5"
            >
              <Bell size={18} />
              <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-coral px-1 text-[10px] font-bold text-white">
                3
              </span>
            </button>

            {user?.avatar ? (
              <div className="relative">
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="h-12 w-12 rounded-full border-2 border-white shadow-soft-sm ring-2 ring-[#f2d6bb]"
                />
                <span className="absolute bottom-0 right-0 h-3.5 w-3.5 rounded-full border-2 border-white bg-[#7ac891]" />
              </div>
            ) : (
              <div className="rounded-full border border-olive/40 bg-cream/60 p-2 shadow-soft-sm">
                <GenieMascot size="sm" animated={false} className="!w-8 !h-8" />
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="bg-transparent">
        <div className="page-container py-4 pt-0">
          <form onSubmit={handleSearch} className="relative mb-4">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-mauve/55" size={20} />
            <input
              type="text"
              placeholder="Search gifts, occasions, or interests…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input-field pl-12 shadow-soft-sm focus:shadow-[0_0_0_4px_rgba(239,139,154,0.10)]"
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded-xl bg-mauve px-3 py-2 text-sm font-semibold text-white shadow-soft-sm hover:bg-mauve/90"
            >
              Search
            </button>
          </form>

          <div className="mb-6 flex flex-wrap gap-2">
            {suggestionChips.map((chip) => (
              <button
                key={chip}
                type="button"
                onClick={() => setSearchQuery(chip)}
                className="rounded-full border border-olive/40 bg-white/70 px-3 py-1.5 text-xs font-semibold text-mauve/75 transition-all hover:bg-white hover:text-mauve"
              >
                {chip}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="page-container -mt-2">
        <div className="hero-panel mb-8 grid items-center gap-8 md:grid-cols-2">
          <div className="relative z-10">
            <p className="mb-2 text-sm font-semibold uppercase tracking-[0.16em] text-mauve/60">Gift matching</p>
            <h2 className="heading-1 mb-4">
              Who are you <span className="text-gradient-accent">shopping for</span>?
            </h2>
            <p className="mb-7 max-w-xl text-body text-mauve/80">
              Tell us a little about them. We'll do the rest and find gifts they'll absolutely love.
            </p>
            <div className="mb-5 flex flex-wrap gap-3">
              <Button variant="primary" size="md" className="min-w-[220px]" onClick={() => setCurrentPage('gift-finder')}>
                <Sparkles size={20} />
                Find the Perfect Gift
              </Button>
              <Button variant="secondary" size="md" onClick={handleSurpriseMe}>
                Surprise Me ✨
              </Button>
              <Button variant="ghost" size="md" onClick={handleLuckySpin}>
                Spin the Wheel 🎡
              </Button>
            </div>
            {surpriseMessage && <p className="text-sm font-semibold text-coral">{surpriseMessage}</p>}
            {spinResult && <p className="mt-2 text-sm font-medium text-mauve/80">{spinResult}</p>}
          </div>
          <div className="relative z-10 hidden text-center md:block">
            <div className="relative mx-auto inline-flex">
              <span className="absolute -left-8 top-10 h-12 w-12 rounded-full bg-[#fff0cf] opacity-80 blur-xl" />
              <span className="absolute -right-8 bottom-10 h-12 w-12 rounded-full bg-[#dff2e3] opacity-80 blur-xl" />
              <GenieMascot size="lg" variant="celebrating" animated />
            </div>
            <p className="mt-2 text-sm font-medium text-mauve/70">The genie is ready to cast a magical suggestion.</p>
          </div>
        </div>

        <section className="mb-8">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="heading-3">Quick picks by occasion</h3>
            <button type="button" onClick={() => setCurrentPage('discover')} className="text-sm font-semibold text-coral">
              View all
            </button>
          </div>
          <div className="flex gap-4 overflow-x-auto pb-2">
            {occasionHighlights.map((occasion) => (
              <button
                key={occasion.name}
                type="button"
                onClick={() => setCurrentPage('discover')}
                className="min-w-[180px] rounded-[24px] border border-white/60 bg-white/80 p-4 text-left shadow-soft transition-all hover:-translate-y-1 hover:shadow-soft-lg"
              >
                <div className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#f9e9d7] to-[#e9f7eb] text-2xl shadow-soft-sm">
                  {occasion.emoji}
                </div>
                <p className="font-bold text-mauve">{occasion.name}</p>
                <p className="mt-1 text-sm text-mauve/65">{occasion.label}</p>
              </button>
            ))}
          </div>
        </section>

        <section className="mb-8">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="heading-3">Trending gifts</h3>
            <button type="button" onClick={() => setCurrentPage('discover')} className="text-sm font-semibold text-coral">
              See all →
            </button>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {trendingIdeas.map((product) => (
              <GiftCard
                key={product.id}
                {...product}
                onViewDetails={() => setCurrentPage(`gift-${product.id}`)}
              />
            ))}
          </div>
        </section>

        <section className="mb-8">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="heading-3">Recently saved</h3>
          </div>
          {savedWheelIdeas.length > 0 ? (
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {savedWheelIdeas.slice(0, 3).map((item, index) => (
                <div key={`${item}-${index}`} className="rounded-[24px] border border-white/60 bg-white/80 p-4 shadow-soft">
                  <p className="font-semibold text-mauve">{item}</p>
                  <p className="mt-1 text-sm text-mauve/60">Saved from your lucky spin</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="rounded-[24px] border border-dashed border-olive/50 bg-white/60 p-8 text-center shadow-soft-sm">
              <div className="mx-auto mb-3 inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#fff0cf] text-2xl">✨</div>
              <p className="font-semibold text-mauve">No favorites yet</p>
              <p className="mt-1 text-sm text-mauve/65">Save a lucky pick to build your dreamy gift list.</p>
            </div>
          )}
        </section>

        <section className="mb-16 grid items-center gap-6 md:grid-cols-[1.2fr_0.8fr]">
          <div className="card bg-gradient-to-br from-sage/20 to-olive/20 p-4 sm:p-6">
            <div className="mb-4 flex items-center justify-between gap-3">
              <div>
                <p className="text-sm font-semibold uppercase tracking-wide text-mauve/60">Magic Wheel</p>
                <h3 className="heading-3 mt-1">Spin for a surprise</h3>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleSkipGift}
                  className="rounded-full border border-mauve/20 bg-white px-3 py-2 text-xs font-semibold text-mauve/80"
                >
                  Skip gift
                </button>
                <button
                  type="button"
                  onClick={handleLuckySpin}
                  disabled={isSpinning}
                  className="rounded-full bg-coral px-4 py-2 text-sm font-semibold text-white disabled:opacity-60"
                >
                  {isSpinning ? 'Spinning...' : 'Spin'}
                </button>
              </div>
            </div>

            <div className="mb-4 rounded-2xl border border-white/60 bg-white/60 p-4">
              <div className="mb-3 flex items-center justify-between gap-2">
                <p className="text-sm font-semibold text-mauve">Personalize this spin</p>
                <button
                  type="button"
                  onClick={() => setShowSetup((value) => !value)}
                  className="text-xs font-semibold text-coral underline-offset-2 hover:underline"
                >
                  {showSetup ? 'Hide setup' : 'Show setup'}
                </button>
              </div>

              {showSetup && (
                <div className="space-y-4">
                  <div className="grid gap-3 md:grid-cols-2">
                    <label className="text-sm font-medium text-mauve/80">
                      <span className="mb-1 block">Recipient</span>
                      <input
                        value={wheelProfile.recipientName}
                        onChange={(event) => updateWheelProfile({ recipientName: event.target.value })}
                        placeholder="Maya"
                        className="input-field"
                      />
                    </label>

                    <label className="text-sm font-medium text-mauve/80">
                      <span className="mb-1 block">Relationship</span>
                      <select
                        value={wheelProfile.relationship}
                        onChange={(event) => updateWheelProfile({ relationship: event.target.value })}
                        className="input-field"
                      >
                        <option>Friend</option>
                        <option>Partner</option>
                        <option>Family</option>
                        <option>Parent</option>
                        <option>Colleague</option>
                        <option>Pet parent</option>
                      </select>
                    </label>
                  </div>

                  <div className="grid gap-3 md:grid-cols-2">
                    <label className="text-sm font-medium text-mauve/80">
                      <span className="mb-1 block">Age range</span>
                      <select
                        value={wheelProfile.ageRange}
                        onChange={(event) => updateWheelProfile({ ageRange: event.target.value })}
                        className="input-field"
                      >
                        <option value="18-29">18-29</option>
                        <option value="30-39">30-39</option>
                        <option value="40-49">40-49</option>
                        <option value="50-59">50-59</option>
                        <option value="60+">60+</option>
                      </select>
                    </label>

                    <label className="text-sm font-medium text-mauve/80">
                      <span className="mb-1 block">Occasion</span>
                      <select
                        value={wheelProfile.occasion}
                        onChange={(event) => updateWheelProfile({ occasion: event.target.value })}
                        className="input-field"
                      >
                        <option>Birthday</option>
                        <option>Anniversary</option>
                        <option>Graduation</option>
                        <option>Just Because</option>
                        <option>Housewarming</option>
                        <option>Thank You</option>
                      </select>
                    </label>
                  </div>

                  <label className="text-sm font-medium text-mauve/80">
                    <span className="mb-1 block">Budget</span>
                    <select
                      value={wheelProfile.budget}
                      onChange={(event) => updateWheelProfile({ budget: event.target.value })}
                      className="input-field"
                    >
                      <option value="500-1000">₹500-₹1,000</option>
                      <option value="1000-2500">₹1,000-₹2,500</option>
                      <option value="2500-5000">₹2,500-₹5,000</option>
                      <option value="5000-10000">₹5,000-₹10,000</option>
                      <option value="10000+">₹10,000+</option>
                      <option value="flexible">Flexible</option>
                    </select>
                  </label>

                  <div>
                    <p className="mb-2 text-sm font-medium text-mauve/80">Interests</p>
                    <div className="flex flex-wrap gap-2">
                      {INTEREST_CHOICES.map((interest) => {
                        const selected = wheelProfile.interests.includes(interest);
                        return (
                          <button
                            key={interest}
                            type="button"
                            onClick={() => toggleInterest(interest)}
                            className={`rounded-full px-3 py-1.5 text-xs font-semibold transition-all ${
                              selected ? 'bg-coral text-white' : 'bg-white text-mauve/75 ring-1 ring-olive/50 hover:bg-olive/20'
                            }`}
                          >
                            {interest}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <input
                      value={customInterest}
                      onChange={(event) => setCustomInterest(event.target.value)}
                      placeholder="Add custom interest"
                      className="input-field"
                    />
                    <button
                      type="button"
                      onClick={addCustomInterest}
                      className="inline-flex items-center rounded-xl bg-mauve px-3 py-2 text-sm font-semibold text-white"
                    >
                      <Plus size={16} className="mr-1" />
                      Add
                    </button>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <button type="button" onClick={handleUseDefaultProfile} className="rounded-full border border-mauve/20 bg-white px-3 py-2 text-xs font-semibold text-mauve/80">
                      Use default gift mix
                    </button>
                    <button type="button" onClick={() => setShowSetup(false)} className="rounded-full bg-sage px-3 py-2 text-xs font-semibold text-mauve">
                      Keep this profile
                    </button>
                  </div>
                </div>
              )}
            </div>

            <div className="mb-4 flex flex-wrap gap-2">
              {['Lucky vibes only', 'Gift roulette', 'Nope, not this one', 'Perfectly personal'].map((tag) => (
                <span key={tag} className="rounded-full bg-white/70 px-3 py-1 text-xs font-semibold text-mauve/75">
                  {tag}
                </span>
              ))}
            </div>

            <div className="relative flex items-center justify-center py-4">
              <div className="wheel-pointer" aria-hidden="true" />
              <div
                className="spin-wheel"
                style={{ transform: `rotate(${spinRotation}deg)`, background: wheelGradient }}
              >
                {wheelIdeas.map((segment, index) => {
                  const segmentAngle = 360 / wheelIdeas.length;
                  const midAngle = index * segmentAngle + segmentAngle / 2;
                  const isLeftHalf = midAngle > 90 && midAngle < 270;
                  const labelRadius = 120;

                  return (
                    <span
                      key={`${segment.name}-${index}`}
                      className="wheel-label"
                      style={{
                        transform: `translate(-50%, -50%) rotate(${midAngle}deg) translateY(-${labelRadius}px) rotate(${isLeftHalf ? 180 : 0}deg)`,
                      }}
                    >
                      {segment.name}
                    </span>
                  );
                })}
              </div>
              <div className="wheel-center">✨</div>
            </div>

            {spinResult && (
              <div className="mt-3 rounded-xl bg-white/80 px-4 py-3 text-sm font-semibold text-mauve">
                {spinResult}
              </div>
            )}

            {winner && (
              <div className="mt-4 overflow-hidden rounded-2xl border border-white/70 bg-white/90 p-4 shadow-soft">
                <div className="mb-3 flex items-center justify-between gap-3">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.12em] text-mauve/60">Winning pick</p>
                    <h4 className="mt-1 text-lg font-bold text-mauve">{winner.name}</h4>
                  </div>
                  <span className="rounded-full bg-coral/10 px-2.5 py-1 text-xs font-semibold text-coral">{winner.tag}</span>
                </div>

                <p className="text-sm text-mauve/80">{winner.reason}.</p>
                <div className="mt-3 flex items-center justify-between gap-3 text-sm font-medium text-mauve/75">
                  <span>Estimated price: {winner.priceRange}</span>
                  <span>{budgetLabels[wheelProfile.budget] ?? 'Flexible'}</span>
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  <button type="button" onClick={handleSaveWinner} className="rounded-full bg-sage px-3 py-2 text-sm font-semibold text-mauve">
                    Save
                  </button>
                  <button type="button" onClick={handleLuckySpin} className="rounded-full bg-coral px-3 py-2 text-sm font-semibold text-white">
                    Spin again
                  </button>
                  <button type="button" onClick={() => setCurrentPage('discover')} className="rounded-full border border-mauve/20 bg-white px-3 py-2 text-sm font-semibold text-mauve/80">
                    Find similar
                  </button>
                </div>
              </div>
            )}

            <div className="mt-3 flex flex-wrap gap-2 text-xs text-mauve/70">
              <span>Profile:</span>
              <span className="rounded-full bg-white/70 px-2 py-1">{wheelProfile.recipientName || 'Your person'}</span>
              <span className="rounded-full bg-white/70 px-2 py-1">{wheelProfile.relationship}</span>
              <span className="rounded-full bg-white/70 px-2 py-1">{wheelProfile.occasion}</span>
            </div>

            <p className="mt-3 text-xs italic text-mauve/65">
              “The genie has spoken. Choose wisely, or at least choose dramatically.”
            </p>
          </div>

          <div className="card bg-gradient-to-br from-coral/10 to-cream">
            <p className="text-sm font-semibold uppercase tracking-wide text-mauve/60">Countdown timer</p>
            <div className="mt-3 flex items-end gap-3">
              <span className="text-4xl font-bold text-mauve">{countdown.daysLeft}</span>
              <span className="text-mauve/70">days left</span>
            </div>
            <p className="mt-3 font-semibold text-mauve">{countdown.title}</p>
            <p className="text-sm text-mauve/70">{countdown.dateLabel}</p>

            <div className="mt-6 rounded-xl bg-white/80 p-4">
              <p className="text-sm font-semibold uppercase tracking-wide text-mauve/60">Gift story generator</p>
              <p className="mt-3 text-mauve/80">
                “This cozy blanket is like a warm hug for your best friend.”
              </p>
            </div>
          </div>
        </section>

        {searchQuery && (
          <section className="mb-16">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h3 className="heading-3">Quick matches</h3>
                <p className="text-caption mt-1">{filteredProducts.length} gifts match “{searchQuery}”</p>
              </div>
              <button
                onClick={() => setSearchQuery('')}
                className="text-sm font-semibold text-coral hover:text-coral/80"
              >
                Clear
              </button>
            </div>
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {filteredProducts.slice(0, 4).map((product) => (
                  <GiftCard
                    key={product.id}
                    {...product}
                    onViewDetails={() => setCurrentPage(`gift-${product.id}`)}
                  />
                ))}
              </div>
            ) : (
              <div className="card text-center">
                <p className="font-semibold text-mauve">No quick matches yet.</p>
                <p className="mt-1 text-caption">Try “books”, “home”, or “technology”.</p>
              </div>
            )}
          </section>
        )}

        <section className="mb-16">
          <h3 className="heading-3 mb-6">Browse by Occasion</h3>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
            {occasions.map(([occasion, emoji]) => (
              <button
                key={occasion}
                onClick={() => setCurrentPage('discover')}
                className="card text-center hover:-translate-y-1"
              >
                <div className="text-4xl mb-3">{emoji}</div>
                <p className="font-semibold text-mauve">{occasion}</p>
              </button>
            ))}
            <button className="card text-center hover:-translate-y-1">
              <div className="text-4xl mb-3">•••</div>
              <p className="font-semibold text-mauve">More</p>
            </button>
          </div>
        </section>

        <section className="mb-16">
          <div className="mb-6 flex items-center justify-between">
            <h3 className="heading-3">Popular Gifts</h3>
            <button onClick={() => setCurrentPage('discover')} className="text-coral font-semibold hover:text-coral/80">
              See all →
            </button>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {MOCK_PRODUCTS.slice(0, 4).map((product) => (
              <GiftCard
                key={product.id}
                {...product}
                onViewDetails={() => setCurrentPage(`gift-${product.id}`)}
              />
            ))}
          </div>
        </section>

        <section className="mb-16">
          <div className="mb-6 flex items-center justify-between">
            <h3 className="heading-3">Trending Gifts</h3>
            <button onClick={() => setCurrentPage('discover')} className="text-coral font-semibold hover:text-coral/80">
              See all →
            </button>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {MOCK_PRODUCTS.slice(4, 8).map((product) => (
              <GiftCard
                key={product.id}
                {...product}
                onViewDetails={() => setCurrentPage(`gift-${product.id}`)}
              />
            ))}
          </div>
        </section>

        <section>
          <div className="mb-6 flex items-center justify-between">
            <h3 className="heading-3">Recommended for You</h3>
            <button onClick={() => setCurrentPage('discover')} className="text-coral font-semibold hover:text-coral/80">
              See all →
            </button>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {MOCK_PRODUCTS.slice(8, 12).map((product) => (
              <GiftCard
                key={product.id}
                {...product}
                onViewDetails={() => setCurrentPage(`gift-${product.id}`)}
              />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
};
