import React, { useEffect, useState } from 'react';
import { Sparkles } from 'lucide-react';
import { GiftCard, FilterChip } from '../components';
import { useAppStore } from '../store';
import { api, type ApiGift } from '../api';
import { BUDGET_RANGES, getPlayfulErrorMessage } from '../constants';

export const RecommendationsPage: React.FC = () => {
  const { questionnaire, setCurrentPage } = useAppStore();
  const [sortBy, setSortBy] = useState('best-match');
  const [filterBudget, setFilterBudget] = useState<string | null>(null);
  const [products, setProducts] = useState<ApiGift[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;
    setIsLoading(true);
    setError('');
    api.recommendations(questionnaire)
      .then((gifts) => {
        if (active) setProducts(gifts);
      })
      .catch((requestError: Error) => {
        if (active) setError(getPlayfulErrorMessage(requestError.message));
      })
      .finally(() => {
        if (active) setIsLoading(false);
      });
    return () => {
      active = false;
    };
  }, [questionnaire]);

  const filteredProducts = products
    .filter((product) => {
      const activeBudget = filterBudget || questionnaire.budget;
      if (activeBudget) {
      const price = product.price;
        if (activeBudget === '500-1000' && (price < 500 || price > 1000)) return false;
        if (activeBudget === '1000-2500' && (price < 1000 || price > 2500)) return false;
        if (activeBudget === '2500-5000' && (price < 2500 || price > 5000)) return false;
        if (activeBudget === '5000-10000' && (price < 5000 || price > 10000)) return false;
        if (activeBudget === '10000+' && price < 10000) return false;
      }
      return true;
    })
    .sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'trending') return b.reviews - a.reviews;
      return b.rating - a.rating;
    });

  return (
    <main className="md:ml-64 pb-20 md:pb-0">
      <div className="page-container">
        {/* Header */}
        <div className="mb-8 pt-8">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="text-coral" size={28} />
            <h1 className="heading-2">Gifts they'll love</h1>
          </div>
          <p className="text-mauve/70 mb-6">
            Handpicked based on your answers for a {questionnaire.recipient?.toLowerCase() || 'special person'}.
          </p>

          {/* Filters */}
          <div className="flex flex-wrap gap-2 mb-6">
            <select
              value={filterBudget || questionnaire.budget || ''}
              onChange={(event) => setFilterBudget(event.target.value || null)}
              className="rounded-full border-2 border-olive bg-white px-4 py-2 text-sm font-semibold text-mauve focus:border-coral focus:outline-none"
              aria-label="Filter by budget"
            >
              <option value="">All budgets</option>
              {BUDGET_RANGES.filter(({ value }) => value !== 'flexible').map(({ label, value }) => (
                <option key={value} value={value}>{label}</option>
              ))}
            </select>
            {questionnaire.occasion && (
              <FilterChip
                label={questionnaire.occasion}
                selected={true}
                onClick={() => setCurrentPage('gift-finder')}
              />
            )}
          </div>

          {/* Explanation */}
          <div className="bg-olive/10 rounded-xl p-4 mb-6">
            <p className="font-semibold text-mauve mb-3">Why we picked these for you</p>
            <div className="space-y-1 text-sm text-mauve/80">
              {questionnaire.recipient && <p>💚 Perfect for {questionnaire.recipient.toLowerCase()}</p>}
              {questionnaire.interests.length > 0 && (
                <p>📚 They love {questionnaire.interests.slice(0, 2).join(' and ')}</p>
              )}
              {questionnaire.giftStyle.length > 0 && (
                <p>✨ They prefer {questionnaire.giftStyle[0]?.toLowerCase()} gifts</p>
              )}
              <p>💰 Matches your budget</p>
            </div>
          </div>

          {/* Sort */}
          <div className="flex items-center gap-3 mb-6">
            <span className="text-sm font-semibold text-mauve">Sort by:</span>
            <div className="flex gap-2 flex-wrap">
              {[
                { value: 'best-match', label: 'Best Match' },
                { value: 'trending', label: 'Trending' },
                { value: 'price-low', label: 'Price: Low' },
                { value: 'price-high', label: 'Price: High' },
                { value: 'rating', label: 'Rating' },
              ].map(({ value, label }) => (
                <button
                  key={value}
                  onClick={() => setSortBy(value)}
                  className={`px-3 py-1 rounded-full text-sm font-semibold transition-all ${
                    sortBy === value
                      ? 'bg-coral text-white'
                      : 'bg-olive text-mauve hover:bg-olive/70'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Products Grid */}
        {isLoading && <p className="text-mauve/70 mb-8">Your Genie is finding the best matches...</p>}
        {error && <p className="text-coral mb-8">{error}</p>}
        {!isLoading && !error && filteredProducts.length === 0 && (
          <p className="text-mauve/70 mb-8">No exact matches found. Try a wider budget or different preferences.</p>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {filteredProducts.map((product) => (
            <GiftCard
              key={product.id}
              {...product}
              onViewDetails={() => setCurrentPage(`gift-${product.id}`)}
            />
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mb-8">
          <button className="btn-secondary">Load More Gifts</button>
        </div>
      </div>
    </main>
  );
};
