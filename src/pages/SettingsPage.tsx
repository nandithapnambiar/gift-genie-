import React from 'react';
import { ArrowLeft, Bell, Palette, Shield, SlidersHorizontal } from 'lucide-react';
import { useAppStore } from '../store';

export const SettingsPage: React.FC = () => {
  const { setCurrentPage, preferences, updatePreferences, userMood, setUserMood } = useAppStore();

  const settingsOptions = [
    { icon: Bell, title: 'Notifications', value: 'Enabled' },
    { icon: Palette, title: 'Theme', value: preferences.darkMode ? 'Dark mode' : 'Pastel magic' },
    { icon: SlidersHorizontal, title: 'Preferences', value: 'Saved locally' },
    { icon: Shield, title: 'Privacy', value: 'Protected' },
  ];

  return (
    <main className="md:ml-64 pb-20 md:pb-0">
      <div className="page-container max-w-2xl py-8">
        <button
          type="button"
          onClick={() => setCurrentPage('home')}
          className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-mauve/75 hover:text-mauve"
        >
          <ArrowLeft size={18} />
          Back home
        </button>

        <div className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-[0.12em] text-mauve/60">Settings</p>
          <h1 className="heading-2 mt-2">Your preferences</h1>
        </div>

        <div className="space-y-3">
          {settingsOptions.map(({ icon: Icon, title, value }) => (
            <div key={title} className="flex items-center justify-between gap-4 rounded-2xl bg-white/80 p-4 shadow-soft backdrop-blur-sm">
              <div className="flex items-center gap-3">
                <div className="rounded-xl bg-olive/50 p-2 text-mauve">
                  <Icon size={18} />
                </div>
                <div>
                  <p className="font-semibold text-mauve">{title}</p>
                </div>
              </div>
              <span className="text-sm font-medium text-mauve/70">{value}</span>
            </div>
          ))}

          <div className="flex items-center justify-between gap-4 rounded-2xl bg-white/80 p-4 shadow-soft backdrop-blur-sm">
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-olive/50 p-2 text-mauve">
                <Palette size={18} />
              </div>
              <div>
                <p className="font-semibold text-mauve">Dark mode</p>
                <p className="text-sm text-mauve/70">Follows your system preference by default.</p>
              </div>
            </div>

            <button
              type="button"
              aria-pressed={preferences.darkMode}
              aria-label={`Dark mode ${preferences.darkMode ? 'enabled' : 'disabled'}`}
              onClick={() => updatePreferences({ darkMode: !preferences.darkMode })}
              className={`relative h-7 w-12 flex-shrink-0 rounded-full border border-mauve/10 transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-coral focus-visible:ring-offset-2 ${preferences.darkMode ? 'bg-coral' : 'bg-olive/80'}`}
            >
              <span
                className={`absolute top-1 h-5 w-5 rounded-full bg-white shadow-sm transition-transform duration-200 ${preferences.darkMode ? 'translate-x-6' : 'translate-x-1'}`}
              />
            </button>
          </div>

          <div className="rounded-2xl bg-white/80 p-4 shadow-soft backdrop-blur-sm">
            <div className="mb-3 flex items-center gap-3">
              <div className="rounded-xl bg-olive/50 p-2 text-mauve">
                <SlidersHorizontal size={18} />
              </div>
              <div>
                <p className="font-semibold text-mauve">Genie mood</p>
                <p className="text-sm text-mauve/70">Switch the genie to match your energy.</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {(['happy', 'excited', 'calm', 'thoughtful'] as const).map((mood) => (
                <button
                  key={mood}
                  type="button"
                  onClick={() => setUserMood(mood)}
                  className={`rounded-full px-3 py-2 text-sm font-semibold capitalize transition-all ${
                    userMood === mood
                      ? 'bg-coral text-white shadow-[0_10px_20px_rgba(239,149,157,0.28)]'
                      : 'bg-[#f7f0ff] text-mauve hover:bg-[#efe7fa]'
                  }`}
                >
                  {mood}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
