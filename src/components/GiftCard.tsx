import React from 'react';
import { Heart, Star } from 'lucide-react';
import { useAppStore } from '../store';

interface GiftCardProps {
  id: number;
  name: string;
  price: number;
  image: string;
  rating: number;
  reviews: number;
  badge?: string;
  explanation?: string;
  onViewDetails?: () => void;
}

export const GiftCard: React.FC<GiftCardProps> = ({
  id,
  name,
  price,
  image,
  rating,
  reviews,
  badge,
  explanation,
  onViewDetails,
}) => {
  const { savedGifts, toggleSaveGift } = useAppStore();
  const isSaved = savedGifts.includes(id);

  return (
    <article className="bg-white rounded-2xl shadow-soft overflow-hidden hover:-translate-y-1 hover:shadow-soft-lg transition-all group">
      {/* Image Container */}
      <div className="relative h-48 sm:h-56 overflow-hidden bg-olive/20">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {badge && (
          <div className="absolute top-3 right-3 bg-coral text-white px-3 py-1 rounded-full text-xs font-semibold">
            {badge}
          </div>
        )}
        <button
          onClick={() => toggleSaveGift(id)}
          className={`absolute top-3 left-3 bg-white rounded-full p-2 hover:scale-110 transition-transform ${
            isSaved ? 'animate-heart-pop' : ''
          }`}
          aria-label={isSaved ? 'Remove from saved' : 'Save gift'}
        >
          <Heart
            size={20}
            className={`transition-all ${isSaved ? 'fill-coral text-coral' : 'text-mauve'}`}
          />
        </button>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-semibold text-mauve line-clamp-2 mb-2">{name}</h3>

        {/* Rating */}
        <div className="flex items-center gap-1 mb-3">
          <Star size={16} className="fill-coral text-coral" />
          <span className="text-sm font-semibold text-mauve">{rating}</span>
          <span className="text-xs text-mauve/60">({reviews.toLocaleString()} reviews)</span>
        </div>

        {/* Price */}
        <p className="text-lg font-bold text-mauve mb-2">₹{price.toLocaleString()}</p>

        {/* Explanation */}
        {explanation && (
          <p className="text-sm text-mauve/70 mb-3 line-clamp-2">{explanation}</p>
        )}

        {/* CTA */}
        <button
          onClick={onViewDetails}
          className="w-full bg-sage hover:bg-sage/80 text-mauve font-semibold py-2 rounded-xl transition-colors"
        >
          View Details
        </button>
      </div>
    </article>
  );
};
