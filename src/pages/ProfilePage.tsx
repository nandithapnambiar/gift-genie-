import React from 'react';
import { Heart, History, Bell, Settings, HelpCircle, LogOut, CheckCircle2 } from 'lucide-react';
import { useAppStore } from '../store';
import { MOCK_PRODUCTS } from '../constants';

export const ProfilePage: React.FC = () => {
  const {
    user,
    logout,
    setCurrentPage,
    preferences,
    updatePreferences,
    savedGifts,
    searchHistory,
    giftTracker,
    giftMemories,
    giftReminders,
    addGiftReminder,
  } = useAppStore();
  const [message, setMessage] = React.useState<string | null>(null);
  const accessibilityOptions: Array<{
    key: 'highContrast' | 'reduceMotion' | 'simplifiedMode' | 'screenReaderLabels';
    label: string;
    description: string;
  }> = [
    {
      key: 'highContrast',
      label: 'High Contrast',
      description: 'Increase color contrast for better readability',
    },
    {
      key: 'reduceMotion',
      label: 'Reduce Motion',
      description: 'Minimize animations and transitions',
    },
    {
      key: 'simplifiedMode',
      label: 'Simplified Experience',
      description: 'Fewer options, larger buttons, simpler navigation',
    },
    {
      key: 'screenReaderLabels',
      label: 'Screen Reader Labels',
      description: 'Enhanced labels for screen readers',
    },
  ];

  const trackedProducts = MOCK_PRODUCTS.filter((product) => giftTracker.includes(product.id));
  const upcomingReminders = giftReminders.slice(0, 3);
  const recentMemories = giftMemories.slice(0, 3);

  const menuItems = [
    { icon: Heart, label: 'Saved Gifts', action: () => setCurrentPage('saved') },
    {
      icon: History,
      label: 'Previous Searches',
      action: () => setMessage(searchHistory.length ? searchHistory.join(' • ') : 'No searches yet.'),
    },
    {
      icon: Bell,
      label: 'Notifications',
      action: () => setMessage('Notifications are enabled for new gift matches.'),
    },
    {
      icon: Settings,
      label: 'Account Settings',
      action: () => setMessage('Your account preferences are saved automatically.'),
    },
  ];

  return (
    <main className="md:ml-64 pb-20 md:pb-0">
      <div className="page-container max-w-2xl">
        {/* Profile Header */}
        <div className="bg-white rounded-2xl shadow-soft p-6 sm:p-8 mb-8 mt-8">
          <div className="flex items-center gap-6 mb-6">
            {user?.avatar && (
              <img
                src={user.avatar}
                alt={user.name}
                className="w-20 h-20 rounded-full"
              />
            )}
            <div>
              <h1 className="heading-2">{user?.name}</h1>
              <p className="text-mauve/70">{user?.email}</p>
            </div>
          </div>
          <button
            className="btn-ghost"
            onClick={() => setMessage('Profile editing will be available when accounts are connected to a backend.')}
          >
            Edit Profile
          </button>
        </div>

        {message && (
          <div className="mb-8 flex items-start gap-3 rounded-2xl border border-sage bg-sage/30 p-4 text-sm text-mauve">
            <CheckCircle2 size={20} className="mt-0.5 shrink-0 text-coral" />
            <p className="flex-1">{message}</p>
            <button onClick={() => setMessage(null)} className="font-bold text-mauve/60" aria-label="Dismiss message">×</button>
          </div>
        )}

        {/* Menu */}
        <div className="space-y-3 mb-8">
          {menuItems.map(({ icon: Icon, label, action }) => (
            <button
              key={label}
              onClick={action}
              className="w-full flex items-center gap-4 p-4 bg-white rounded-xl hover:bg-olive/10 transition-colors"
            >
              <Icon size={20} className="text-coral" />
              <span className="font-semibold text-mauve flex-1 text-left">{label}</span>
              <span className="text-mauve/50">→</span>
            </button>
          ))}
        </div>

        <div className="bg-white rounded-2xl shadow-soft p-6 sm:p-8 mb-8">
          <h3 className="heading-3 mb-6">Gift Tracker</h3>
          <p className="mb-4 text-sm text-mauve/70">
            {trackedProducts.length} {trackedProducts.length === 1 ? 'gift logged' : 'gifts logged'} as already given.
          </p>
          {trackedProducts.length > 0 ? (
            <div className="space-y-2">
              {trackedProducts.slice(0, 4).map((product) => (
                <div key={product.id} className="flex items-center justify-between rounded-xl bg-olive/20 px-3 py-2 text-sm text-mauve">
                  <span>{product.name}</span>
                  <span className="text-coral font-semibold">Marked done</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-mauve/70">No gifts logged yet. Mark one as given from a gift detail page to keep your list fresh.</p>
          )}
        </div>

        <div className="bg-white rounded-2xl shadow-soft p-6 sm:p-8 mb-8">
          <h3 className="heading-3 mb-6">Gift reminders</h3>
          <div className="space-y-3">
            {upcomingReminders.map((reminder) => (
              <div key={reminder.id} className="rounded-xl border border-olive/20 bg-olive/10 p-3">
                <p className="font-semibold text-mauve">{reminder.title}</p>
                <p className="text-sm text-mauve/70">{reminder.message}</p>
              </div>
            ))}
          </div>
          <button
            onClick={() => addGiftReminder({
              title: 'Upcoming birthday',
              date: '2026-11-02',
              message: 'A cheerful surprise reminder is ready to be sent.',
            })}
            className="mt-4 text-sm font-semibold text-coral"
          >
            + Add reminder
          </button>
        </div>

        <div className="bg-white rounded-2xl shadow-soft p-6 sm:p-8 mb-8">
          <h3 className="heading-3 mb-6">Memory vault</h3>
          <div className="space-y-4">
            {recentMemories.map((memory) => (
              <div key={memory.id} className="flex gap-3 rounded-xl border border-olive/20 p-3">
                <img src={memory.image} alt={memory.title} className="h-16 w-16 rounded-lg object-cover" />
                <div className="min-w-0">
                  <p className="font-semibold text-mauve">{memory.title}</p>
                  <p className="text-xs text-mauve/60">{memory.date}</p>
                  <p className="text-sm text-mauve/70">{memory.note}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Preferences */}
        <div className="bg-white rounded-2xl shadow-soft p-6 sm:p-8 mb-8">
          <h3 className="heading-3 mb-6">Preferences</h3>
          <p className="mb-6 text-sm text-mauve/70">
            {savedGifts.length} saved {savedGifts.length === 1 ? 'gift' : 'gifts'} • {searchHistory.length} recent {searchHistory.length === 1 ? 'search' : 'searches'}
          </p>

          {/* Text Size */}
          <div className="mb-6 pb-6 border-b border-olive/20">
            <label className="block font-semibold text-mauve mb-3">Text Size</label>
            <div className="flex gap-2">
              {['sm', 'base', 'lg', 'xl'].map((size) => (
                <button
                  key={size}
                  onClick={() =>
                    updatePreferences({ textSize: size as 'sm' | 'base' | 'lg' | 'xl' })
                  }
                  className={`w-10 h-10 rounded-lg font-bold transition-all ${
                    preferences.textSize === size
                      ? 'bg-coral text-white'
                      : 'bg-olive text-mauve'
                  }`}
                >
                  A
                </button>
              ))}
            </div>
          </div>

          {/* Accessibility Options */}
          <div className="space-y-4">
            {accessibilityOptions.map(({ key, label, description }) => (
              <div key={key} className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-mauve">{label}</p>
                  <p className="text-sm text-mauve/60">{description}</p>
                </div>
                <button
                  type="button"
                  aria-pressed={preferences[key]}
                  aria-label={`${label} ${preferences[key] ? 'enabled' : 'disabled'}`}
                  onClick={() =>
                    updatePreferences({
                      [key]: !preferences[key],
                    })
                  }
                  className={`relative h-7 w-12 flex-shrink-0 rounded-full border border-mauve/10 transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-coral focus-visible:ring-offset-2 ${
                    preferences[key]
                      ? 'bg-coral'
                      : 'bg-olive'
                  }`}
                >
                  <div
                    className={`absolute top-1 h-5 w-5 rounded-full bg-white shadow-sm transition-transform duration-200 ${
                      preferences[key]
                        ? 'translate-x-6'
                        : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="space-y-3 mb-8">
          <button className="w-full flex items-center gap-3 p-4 bg-white rounded-xl hover:bg-olive/10 transition-colors">
            <HelpCircle size={20} className="text-mauve" />
            <span className="font-semibold text-mauve">Help & Support</span>
          </button>
          <button
            onClick={() => {
              logout();
              setCurrentPage('login');
            }}
            className="w-full flex items-center gap-3 p-4 bg-white rounded-xl hover:bg-coral/10 transition-colors"
          >
            <LogOut size={20} className="text-coral" />
            <span className="font-semibold text-coral">Log Out</span>
          </button>
        </div>
      </div>
    </main>
  );
};
