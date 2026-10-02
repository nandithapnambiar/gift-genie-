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
    <article className="gift-card group overflow-hidden">
      <div className="relative h-48 sm:h-56 overflow-hidden bg-olive/20">
        <img
          src={image}
          alt={name}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {badge && (
          <div className="absolute right-3 top-3 rounded-full bg-coral px-3 py-1 text-xs font-semibold text-white shadow-soft-sm">
            {badge}
          </div>
        )}
        <button
          onClick={() => toggleSaveGift(id)}
          className={`absolute left-3 top-3 rounded-full border border-white/60 bg-white/85 p-2.5 shadow-soft-sm transition-all hover:scale-110 ${
            isSaved ? 'animate-heart-pop' : ''
          }`}
          aria-label={isSaved ? 'Remove from saved' : 'Save gift'}
        >
          <Heart
            size={18}
            className={`transition-all ${isSaved ? 'fill-coral text-coral' : 'text-mauve'}`}
          />
        </button>
      </div>

      <div className="p-4">
        <h3 className="mb-2 line-clamp-2 text-base font-semibold text-mauve">{name}</h3>

        <div className="mb-3 flex items-center gap-1">
          <Star size={15} className="fill-coral text-coral" />
          <span className="text-sm font-semibold text-mauve">{rating}</span>
          <span className="text-xs text-mauve/60">({reviews.toLocaleString()} reviews)</span>
        </div>

        <p className="mb-3 text-lg font-bold text-mauve">₹{price.toLocaleString()}</p>

        {explanation && (
          <p className="mb-3 text-sm text-mauve/70 line-clamp-2">{explanation}</p>
        )}

        <button
          onClick={onViewDetails}
          className="w-full rounded-xl bg-sage/80 px-3 py-2.5 text-sm font-semibold text-mauve transition-colors hover:bg-sage"
        >
          View Details
        </button>
      </div>
    </article>
  );
};
