import React from 'react';
import { Search, Sparkles } from 'lucide-react';
import {
  Button,
  GiftCard,
  GenieMascot,
} from '../components';
import { useAppStore } from '../store';
import { MOCK_PRODUCTS, OCCASIONS_WITH_EMOJI } from '../constants';

export const HomePage: React.FC = () => {
  const { user, setCurrentPage, addSearch } = useAppStore();
  const [searchQuery, setSearchQuery] = React.useState('');

  const occasions = Object.entries(OCCASIONS_WITH_EMOJI).slice(0, 8);
  const filteredProducts = searchQuery.trim()
    ? MOCK_PRODUCTS.filter((product) =>
        `${product.name} ${product.category} ${product.explanation ?? ''}`
          .toLowerCase()
          .includes(searchQuery.toLowerCase())
      )
    : MOCK_PRODUCTS;

  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (searchQuery.trim()) {
      addSearch(searchQuery.trim());
      setCurrentPage('discover');
    }
  };

  return (
    <main className="md:ml-64 pb-20 md:pb-0">
      {/* Header */}
      <div className="bg-white border-b border-olive/20 sticky top-0 z-40">
        <div className="page-container flex items-center justify-between">
          <div>
            <h1 className="heading-2">Welcome, {user?.name}!</h1>
            <p className="text-mauve/60">Let's find something special today</p>
          </div>
          {user?.avatar && (
            <img
              src={user.avatar}
              alt={user.name}
              className="w-12 h-12 rounded-full"
            />
          )}
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-cream/70">
        <div className="page-container">
          <form onSubmit={handleSearch} className="relative mb-8">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-mauve/50" size={20} />
            <input
              type="text"
              placeholder="Search gifts, occasions, or interests…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input-field pl-12 w-full"
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded-lg bg-mauve px-3 py-2 text-sm font-semibold text-white hover:bg-mauve/90"
            >
              Search
            </button>
          </form>
        </div>
      </div>

      <div className="page-container">
        {/* Hero Section */}
        <div className="hero-panel grid md:grid-cols-2 gap-8 items-center mb-16 p-6 sm:p-10">
          <div className="relative z-10">
            <h2 className="heading-1 mb-4">Who are you shopping for?</h2>
            <p className="text-body text-mauve/80 mb-8">
              Tell us a little about them. We'll do the rest and find gifts they'll absolutely love.
            </p>
            <Button
              variant="primary"
              onClick={() => setCurrentPage('gift-finder')}
              className="mb-4"
            >
              <Sparkles size={20} />
              Find the Perfect Gift
            </Button>
          </div>
          <div className="hidden md:block">
            <GenieMascot size="lg" />
          </div>
        </div>

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
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
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

        {/* Browse by Occasion */}
        <section className="mb-16">
          <h3 className="heading-3 mb-6">Browse by Occasion</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
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

        {/* Popular Gifts */}
        <section className="mb-16">
          <div className="flex justify-between items-center mb-6">
            <h3 className="heading-3">Popular Gifts</h3>
            <button
              onClick={() => setCurrentPage('discover')}
              className="text-coral font-semibold hover:text-coral/80"
            >
              See all →
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {MOCK_PRODUCTS.slice(0, 4).map((product) => (
              <GiftCard
                key={product.id}
                {...product}
                onViewDetails={() => setCurrentPage(`gift-${product.id}`)}
              />
            ))}
          </div>
        </section>

        {/* Trending Gifts */}
        <section className="mb-16">
          <div className="flex justify-between items-center mb-6">
            <h3 className="heading-3">Trending Gifts</h3>
            <button
              onClick={() => setCurrentPage('discover')}
              className="text-coral font-semibold hover:text-coral/80"
            >
              See all →
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {MOCK_PRODUCTS.slice(4, 8).map((product) => (
              <GiftCard
                key={product.id}
                {...product}
                onViewDetails={() => setCurrentPage(`gift-${product.id}`)}
              />
            ))}
          </div>
        </section>

        {/* Recommended for You */}
        <section>
          <div className="flex justify-between items-center mb-6">
            <h3 className="heading-3">Recommended for You</h3>
            <button
              onClick={() => setCurrentPage('discover')}
              className="text-coral font-semibold hover:text-coral/80"
            >
              See all →
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
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
