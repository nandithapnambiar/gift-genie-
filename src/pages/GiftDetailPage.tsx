import React from 'react';
import { ArrowLeft, Heart, Share2, Star, Award, ThumbsUp, Check, ShoppingBag } from 'lucide-react';
import { Button } from '../components';
import { useAppStore } from '../store';
import {
  MOCK_PRODUCTS,
  getPlayfulErrorMessage,
  getStoreLinks,
  GIFT_REACTION_EMOJIS,
  GIFT_MESSAGE_SUGGESTIONS,
  buildGiftStory,
  getCountdownInfo,
} from '../constants';

interface GiftDetailPageProps {
  giftId: number;
}

export const GiftDetailPage: React.FC<GiftDetailPageProps> = ({ giftId }) => {
  const {
    setCurrentPage,
    savedGifts,
    toggleSaveGift,
    giftTracker,
    toggleGiftTracker,
    giftReviews,
    addGiftReview,
    user,
    reactionState,
    addReaction,
  } = useAppStore();
  const [shareMessage, setShareMessage] = React.useState<string | null>(null);
  const [reviewMessage, setReviewMessage] = React.useState<string | null>(null);
  const [reviewRating, setReviewRating] = React.useState(5);
  const [reviewComment, setReviewComment] = React.useState('');
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
  const isTracked = giftTracker.includes(product.id);
  const storeLinks = getStoreLinks(product.name);
  const existingReviews = giftReviews[product.id] ?? [];
  const countdown = getCountdownInfo();
  const story = buildGiftStory(product.name, 'your favorite person');
  const averageReviewScore = existingReviews.length
    ? existingReviews.reduce((sum, review) => sum + review.rating, 0) / existingReviews.length
    : product.rating;

  const handleReviewSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!reviewComment.trim()) {
      setReviewMessage(getPlayfulErrorMessage('Invalid review input'));
      return;
    }

    addGiftReview(product.id, {
      name: user?.name ?? 'Guest',
      rating: reviewRating,
      comment: reviewComment.trim(),
    });
    setReviewComment('');
    setReviewRating(5);
    setReviewMessage('Your review has been added to the spellbook of great gifts.');
  };

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
                <span className="font-bold text-mauve">{averageReviewScore.toFixed(1)}</span>
              </div>
              <span className="text-mauve/70">
                ({(product.reviews + existingReviews.length).toLocaleString()} reviews)
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
                onClick={() => {
                  window.open(storeLinks[0].url, '_blank', 'noopener,noreferrer');
                  setShareMessage('Purchase links are ready in the “Where to Buy” section below.');
                }}
              >
                <ShoppingBag size={18} />
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
                  onClick={() => toggleGiftTracker(product.id)}
                  className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-semibold transition-all ${
                    isTracked
                      ? 'bg-sage text-mauve'
                      : 'bg-olive text-mauve hover:bg-olive/70'
                  }`}
                >
                  <Check size={20} className={isTracked ? 'text-coral' : ''} />
                  {isTracked ? 'Logged' : 'Gift Given'}
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

        <div className="bg-white rounded-2xl shadow-soft p-6 sm:p-8 mb-8">
          <h3 className="heading-3 mb-6">Gift magic</h3>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="rounded-xl bg-sage/20 p-4">
              <p className="text-sm uppercase tracking-wide text-mauve/60">Countdown</p>
              <p className="mt-2 text-2xl font-bold text-mauve">{countdown.daysLeft}</p>
              <p className="text-sm text-mauve/70">days left until {countdown.title}</p>
            </div>
            <div className="rounded-xl bg-coral/10 p-4">
              <p className="text-sm uppercase tracking-wide text-mauve/60">Eco pick</p>
              <p className="mt-2 text-base font-semibold text-mauve">{product.ecoFriendly ? 'Thoughtful and sustainable' : 'Classic pick'}</p>
              <p className="text-sm text-mauve/70">{product.ecoFriendly ? 'Handmade or mindful by design.' : 'A solid favorite with timeless appeal.'}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-soft p-6 sm:p-8 mb-8">
          <h3 className="heading-3 mb-6">Gift story</h3>
          <p className="text-mauve/80 leading-relaxed">{story}</p>
        </div>

        <div className="bg-white rounded-2xl shadow-soft p-6 sm:p-8 mb-8">
          <h3 className="heading-3 mb-6">Personalized message ideas</h3>
          <div className="space-y-3">
            {GIFT_MESSAGE_SUGGESTIONS.map((message) => (
              <button
                key={message}
                type="button"
                onClick={() => setShareMessage(message)}
                className="w-full rounded-xl border border-olive/30 bg-olive/10 px-4 py-3 text-left text-sm text-mauve hover:bg-olive/20"
              >
                {message}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-soft p-6 sm:p-8 mb-8">
          <h3 className="heading-3 mb-6">Reaction emojis</h3>
          <div className="flex flex-wrap gap-3">
            {GIFT_REACTION_EMOJIS.map((emoji) => (
              <button
                key={emoji}
                type="button"
                onClick={() => addReaction(product.id, emoji)}
                className="rounded-full border border-olive bg-olive/10 px-3 py-2 text-sm font-semibold text-mauve hover:bg-olive/20"
              >
                {emoji} {reactionState[product.id]?.[emoji] ?? 0}
              </button>
            ))}
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
            {storeLinks.map(({ name, price, url }) => (
              <a
                key={name}
                href={url}
                target="_blank"
                rel="noreferrer noopener"
                className="flex items-center justify-between p-4 border border-olive/20 rounded-xl hover:bg-olive/5 transition-colors"
              >
                <div>
                  <p className="font-semibold text-mauve">{name}</p>
                  <p className="text-sm text-mauve/60">Fast shipping</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-mauve">{price}</p>
                  <span className="text-coral font-semibold">Check →</span>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Reviews */}
        <div className="bg-white rounded-2xl shadow-soft p-6 sm:p-8 mb-8">
          <h3 className="heading-3 mb-6">Reviews & Ratings</h3>
          <form onSubmit={handleReviewSubmit} className="mb-8">
            <label className="block font-semibold text-mauve mb-2">Your rating</label>
            <div className="flex gap-2 mb-4">
              {[1, 2, 3, 4, 5].map((score) => (
                <button
                  key={score}
                  type="button"
                  onClick={() => setReviewRating(score)}
                  aria-label={`Rate ${score} stars`}
                  className={`rounded-full p-2 ${reviewRating >= score ? 'bg-coral text-white' : 'bg-olive text-mauve'}`}
                >
                  <Star size={18} className={reviewRating >= score ? 'fill-current' : ''} />
                </button>
              ))}
            </div>
            <textarea
              rows={4}
              value={reviewComment}
              onChange={(event) => setReviewComment(event.target.value)}
              placeholder="Tell us why this gift feels magical…"
              className="input-field mb-3"
            />
            <div className="flex items-center justify-between gap-4">
              <Button type="submit" variant="primary">Submit Review</Button>
              {reviewMessage && <span className="text-sm text-mauve/70">{reviewMessage}</span>}
            </div>
          </form>

          <div className="space-y-4">
            {(existingReviews.length > 0 ? existingReviews : [
              {
                id: 'sample',
                name: 'Gift Genie fan',
                rating: 5,
                comment: 'This one feels thoughtful, stylish, and easy to personalize.',
                createdAt: new Date().toISOString(),
              },
            ]).map((review) => (
              <div key={review.id} className="rounded-xl border border-olive/20 p-4">
                <div className="flex items-center justify-between mb-2">
                  <p className="font-semibold text-mauve">{review.name}</p>
                  <div className="flex items-center gap-1 text-coral">
                    {[...Array(review.rating)].map((_, index) => (
                      <Star key={`${review.id}-${index}`} size={14} className="fill-current" />
                    ))}
                  </div>
                </div>
                <p className="text-sm text-mauve/70">{review.comment}</p>
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
