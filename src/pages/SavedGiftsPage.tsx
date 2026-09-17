import React from 'react';
import { Heart, Trash2 } from 'lucide-react';
import { GiftCard, EmptyState } from '../components';
import { useAppStore } from '../store';
import { MOCK_PRODUCTS } from '../constants';

export const SavedGiftsPage: React.FC = () => {
  const { savedGifts, toggleSaveGift, setCurrentPage } = useAppStore();

  const savedProducts = MOCK_PRODUCTS.filter((p) => savedGifts.includes(p.id));

  const categories = ['All', 'Technology', 'Fashion', 'Books', 'Home', 'Beauty', 'Personalized'];
  const [selectedCategory, setSelectedCategory] = React.useState('All');
  const filteredProducts = selectedCategory === 'All'
    ? savedProducts
    : savedProducts.filter((product) => product.category === selectedCategory);

  if (savedProducts.length === 0) {
    return (
      <main className="md:ml-64 pb-20 md:pb-0 min-h-screen flex items-center justify-center">
        <div className="page-container">
          <EmptyState
            title="No saved gifts yet. ❤️"
            description="Your next great gift is waiting. Start exploring to find something special!"
            action={{
              label: 'Discover Gifts',
              onClick: () => setCurrentPage('discover'),
            }}
          />
        </div>
      </main>
    );
  }

  return (
    <main className="md:ml-64 pb-20 md:pb-0">
      <div className="page-container">
        {/* Header */}
        <div className="mb-8 pt-8">
          <div className="flex items-center gap-2 mb-6">
            <Heart className="text-coral fill-coral" size={28} />
            <h1 className="heading-2">Saved Gifts</h1>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-2 mb-8">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
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
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {filteredProducts.map((product) => (
            <div key={product.id} className="relative group">
              <GiftCard
                {...product}
                onViewDetails={() => setCurrentPage(`gift-${product.id}`)}
              />
              <button
                onClick={() => toggleSaveGift(product.id)}
                className="absolute top-2 right-2 bg-white rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity"
                title="Remove from saved"
              >
                <Trash2 size={20} className="text-coral" />
              </button>
            </div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="card mb-8 text-center">
            <p className="font-semibold text-mauve">No saved gifts in this category.</p>
            <button
              onClick={() => setSelectedCategory('All')}
              className="mt-2 text-sm font-semibold text-coral"
            >
              Show all saved gifts
            </button>
          </div>
        )}

        {/* Create List CTA */}
        <div className="text-center">
          <button
            onClick={() => window.alert('Custom lists are coming soon. Your saved gifts are already safe here.')}
            className="btn-secondary"
          >
            + Create New List
          </button>
        </div>
      </div>
    </main>
  );
};
