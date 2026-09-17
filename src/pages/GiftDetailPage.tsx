import React from 'react';
import { ArrowLeft, Heart, Share2, Star, Award, ThumbsUp } from 'lucide-react';
import { Button } from '../components';
import { useAppStore } from '../store';
import { MOCK_PRODUCTS } from '../constants';

interface GiftDetailPageProps {
  giftId: number;
}

export const GiftDetailPage: React.FC<GiftDetailPageProps> = ({ giftId }) => {
  const { setCurrentPage, savedGifts, toggleSaveGift } = useAppStore();
  const [shareMessage, setShareMessage] = React.useState<string | null>(null);
  const product = MOCK_PRODUCTS.find((p) => p.id === giftId);

  if (!product) {
    return (
      <main className="md:ml-64 pb-20 md:pb-0">
        <div className="page-container">
          <button
            onClick={() => setCurrentPage('home')}
            className="flex items-center gap-2 text-coral mb-8"
          >
            <ArrowLeft size={20} />
            Back
          </button>
          <p>Product not found</p>
        </div>
      </main>
    );
  }

  const isSaved = savedGifts.includes(product.id);

  return (
    <main className="md:ml-64 pb-20 md:pb-0">
      {/* Header with Back Button */}
      <div className="bg-white border-b border-olive/20">
        <div className="page-container flex items-center justify-between py-4">
          <button
            onClick={() => setCurrentPage('home')}
            className="flex items-center gap-2 text-coral hover:text-coral/80"
          >
            <ArrowLeft size={20} />
            Back
          </button>
          <span className="text-sm text-mauve/60">Gift Details</span>
        </div>
      </div>

      <div className="page-container">
        {/* Product Image and Details */}
        <div className="grid md:grid-cols-2 gap-8 my-8">
          {/* Image */}
          <div className="flex items-center justify-center bg-olive/10 rounded-2xl h-96">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover rounded-2xl"
            />
          </div>

          {/* Details */}
          <div>
            <h1 className="heading-2 mb-4">{product.name}</h1>

            {/* Rating */}
            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center gap-1">
                <Star size={20} className="fill-coral text-coral" />
                <span className="font-bold text-mauve">{product.rating}</span>
              </div>
              <span className="text-mauve/70">
                ({product.reviews.toLocaleString()} reviews)
              </span>
            </div>

            {/* Price */}
            <div className="text-4xl font-bold text-mauve mb-6">
              ₹{product.price.toLocaleString()}
            </div>

            {/* Explanation */}
            <div className="bg-coral/10 rounded-xl p-4 mb-6">
              <p className="text-mauve font-semibold mb-2">Why you'll love this</p>
              <p className="text-mauve/80">{product.explanation}</p>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-8">
              {product.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-sage text-mauve rounded-full text-sm font-semibold"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="space-y-3 mb-8">
              <Button
                variant="primary"
                className="w-full"
                onClick={() => setShareMessage('Purchase links are ready in the “Where to Buy” section below.')}
              >
                Buy Now
              </Button>
              <div className="flex gap-3">
                <button
                  onClick={() => toggleSaveGift(product.id)}
                  className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-semibold transition-all ${
                    isSaved
                      ? 'bg-coral text-white'
                      : 'bg-olive text-mauve hover:bg-olive/70'
                  }`}
                >
                  <Heart size={20} className={isSaved ? 'fill-current' : ''} />
                  {isSaved ? 'Saved' : 'Save Gift'}
                </button>
                <button
                  onClick={async () => {
                    const shareText = `Check out ${product.name} on Gift Genie`;
                    try {
                      if (navigator.share) {
                        await navigator.share({ title: product.name, text: shareText });
                      } else {
                        await navigator.clipboard.writeText(window.location.href);
                        setShareMessage('Gift link copied to your clipboard.');
                      }
                    } catch {
                      setShareMessage('Sharing was cancelled.');
                    }
                  }}
                  className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-semibold bg-olive text-mauve hover:bg-olive/70 transition-all"
                >
                  <Share2 size={20} />
                  Share
                </button>
              </div>
              {shareMessage && (
                <p className="mt-3 rounded-xl bg-sage/40 px-4 py-3 text-sm text-mauve">{shareMessage}</p>
              )}
            </div>
          </div>
        </div>

        {/* Why We Picked It */}
        <div className="bg-white rounded-2xl shadow-soft p-6 sm:p-8 mb-8">
          <h3 className="heading-3 mb-6">Why we picked this for you</h3>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="flex gap-3">
              <Award className="text-coral flex-shrink-0" size={24} />
              <div>
                <p className="font-semibold text-mauve mb-1">Perfect for them</p>
                <p className="text-sm text-mauve/70">Matches their interests and lifestyle</p>
              </div>
            </div>
            <div className="flex gap-3">
              <ThumbsUp className="text-coral flex-shrink-0" size={24} />
              <div>
                <p className="font-semibold text-mauve mb-1">Highly rated</p>
                <p className="text-sm text-mauve/70">Customers love this product</p>
              </div>
            </div>
          </div>
        </div>

        {/* Product Description */}
        <div className="bg-white rounded-2xl shadow-soft p-6 sm:p-8 mb-8">
          <h3 className="heading-3 mb-4">Description</h3>
          <p className="text-mauve/80 leading-relaxed mb-6">
            This is a high-quality product that combines style and functionality. Perfect for
            someone who appreciates both aesthetics and practicality. It's designed to last and
            makes a thoughtful gift for any occasion.
          </p>

          <h4 className="font-semibold text-mauve mb-3">Key Features:</h4>
          <ul className="space-y-2 text-mauve/80 mb-6">
            <li>✨ Premium quality materials</li>
            <li>✨ Stylish and modern design</li>
            <li>✨ Durable and long-lasting</li>
            <li>✨ Perfect for gifting</li>
          </ul>
        </div>

        {/* Where to Buy */}
        <div className="bg-white rounded-2xl shadow-soft p-6 sm:p-8 mb-8">
          <h3 className="heading-3 mb-6">Where to Buy</h3>
          <div className="space-y-3">
            {[
              { name: 'Amazon', price: `₹${product.price}`, delivery: '2-3 days' },
              { name: 'Flipkart', price: `₹${product.price - 100}`, delivery: '3-4 days' },
              { name: 'Official Store', price: `₹${product.price}`, delivery: '5-7 days' },
            ].map(({ name, price, delivery }) => (
              <div
                key={name}
                className="flex items-center justify-between p-4 border border-olive/20 rounded-xl hover:bg-olive/5 transition-colors"
              >
                <div>
                  <p className="font-semibold text-mauve">{name}</p>
                  <p className="text-sm text-mauve/60">{delivery}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-mauve">{price}</p>
                  <button className="text-coral font-semibold hover:text-coral/80">
                    Check →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Similar Gifts */}
        <div className="mb-16">
          <h3 className="heading-3 mb-6">You may also like</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {MOCK_PRODUCTS.filter((p) => p.id !== product.id)
              .slice(0, 4)
              .map((similar) => (
                <button
                  key={similar.id}
                  onClick={() => setCurrentPage(`gift-${similar.id}`)}
                  className="card text-left hover:-translate-y-1"
                >
                  <img
                    src={similar.image}
                    alt={similar.name}
                    className="w-full h-40 object-cover rounded-lg mb-3"
                  />
                  <h4 className="font-semibold text-mauve line-clamp-2 mb-2">
                    {similar.name}
                  </h4>
                  <p className="font-bold text-mauve">₹{similar.price.toLocaleString()}</p>
                </button>
              ))}
          </div>
        </div>
      </div>
    </main>
  );
};
