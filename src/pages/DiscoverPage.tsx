import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { GiftCard } from '../components';
import { useAppStore } from '../store';
import { MOCK_PRODUCTS } from '../constants';

export const DiscoverPage: React.FC = () => {
  const { setCurrentPage } = useAppStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = [
    'All',
    'Technology',
    'Fashion',
    'Books',
    'Home',
    'Beauty',
    'Personalized',
  ];

  const filteredProducts = MOCK_PRODUCTS.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCategory = !selectedCategory ||
      selectedCategory === 'All' ||
      product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <main className="md:ml-64 pb-20 md:pb-0">
      <div className="page-container">
        {/* Header */}
        <div className="mb-8 pt-8">
          <h1 className="heading-2 mb-6">Discover Gifts</h1>

          {/* Search */}
          <div className="relative mb-8">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-mauve/50" size={20} />
            <input
              type="text"
              placeholder="Search gifts, occasions, or interests…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input-field pl-12 w-full"
            />
          </div>

          {/* Categories */}
          <div className="flex flex-wrap gap-2 mb-8">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() =>
                  setSelectedCategory(
                    selectedCategory === category ? null : category
                  )
                }
                className={`px-4 py-2 rounded-full font-semibold text-sm transition-all ${
                  selectedCategory === category
                    ? 'bg-coral text-white'
                    : 'bg-olive text-mauve hover:bg-olive/70'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          <p className="text-mauve/70 mb-6">
            {filteredProducts.length} gifts found
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {filteredProducts.map((product) => (
            <GiftCard
              key={product.id}
              {...product}
              onViewDetails={() => setCurrentPage(`gift-${product.id}`)}
            />
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-mauve/60">No gifts found. Try a different search.</p>
          </div>
        )}
      </div>
    </main>
  );
};
