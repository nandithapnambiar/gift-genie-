import React from 'react';
import { Home, Compass, Heart, User, Menu, X } from 'lucide-react';
import { useAppStore } from '../store';

interface BottomNavProps {}

export const BottomNavigation: React.FC<BottomNavProps> = () => {
  const { currentPage, setCurrentPage } = useAppStore();

  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'discover', label: 'Discover', icon: Compass },
    { id: 'saved', label: 'Saved', icon: Heart },
    { id: 'profile', label: 'Profile', icon: User },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-olive/20 flex md:hidden">
      <div className="flex w-full">
        {navItems.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setCurrentPage(id)}
            className={`flex-1 flex flex-col items-center justify-center py-3 transition-all ${
              currentPage === id ? 'text-coral' : 'text-mauve/60 hover:text-mauve'
            }`}
          >
            <Icon size={24} />
            <span className="text-xs mt-1">{label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
};

interface SidebarProps {}

export const Sidebar: React.FC<SidebarProps> = () => {
  const { currentPage, setCurrentPage, user, logout } = useAppStore();
  const [isOpen, setIsOpen] = React.useState(false);
  const [notice, setNotice] = React.useState<string | null>(null);

  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'discover', label: 'Discover', icon: Compass },
    { id: 'saved', label: 'Saved', icon: Heart },
    { id: 'profile', label: 'Profile', icon: User },
  ];

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex fixed left-0 top-0 h-screen w-64 bg-white border-r border-olive/20 flex-col">
        {/* Logo */}
        <div className="px-6 py-8">
          <div className="text-2xl font-bold text-mauve">
            ✨ Gift Genie
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 space-y-2">
          {navItems.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setCurrentPage(id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                currentPage === id
                  ? 'bg-sage text-mauve font-semibold'
                  : 'text-mauve/70 hover:bg-olive/20'
              }`}
            >
              <Icon size={20} />
              <span>{label}</span>
            </button>
          ))}
        </nav>

        {/* Bottom Menu */}
        <div className="px-4 py-4 border-t border-olive/20 space-y-2">
          <button
            onClick={() => setNotice('Need help? Start by exploring Discover or Gift Finder.')}
            className="w-full flex items-center gap-3 px-4 py-2 text-mauve/70 hover:bg-olive/20 rounded-xl transition-all text-sm"
          >
            Help & Support
          </button>
          <button
            onClick={() => setCurrentPage('profile')}
            className="w-full flex items-center gap-3 px-4 py-2 text-mauve/70 hover:bg-olive/20 rounded-xl transition-all text-sm"
          >
            Accessibility
          </button>
          <button
            onClick={() => setCurrentPage('profile')}
            className="w-full flex items-center gap-3 px-4 py-2 text-mauve/70 hover:bg-olive/20 rounded-xl transition-all text-sm"
          >
            Settings
          </button>
          {user && (
            <button
              onClick={logout}
              className="w-full flex items-center gap-3 px-4 py-2 text-coral hover:bg-coral/10 rounded-xl transition-all text-sm font-semibold"
            >
              Log Out
            </button>
          )}
        </div>
        {notice && (
          <div className="absolute bottom-20 left-4 right-4 rounded-xl bg-mauve p-3 text-xs text-white shadow-soft-lg">
            <div className="flex items-start gap-2">
              <span className="flex-1">{notice}</span>
              <button onClick={() => setNotice(null)} aria-label="Dismiss help message">×</button>
            </div>
          </div>
        )}
      </aside>

      {/* Mobile Menu Button */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 bg-white rounded-lg shadow-soft"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Sidebar */}
      {isOpen && (
        <aside className="fixed inset-0 z-40 bg-black/50 md:hidden">
          <div className="w-64 h-screen bg-white flex flex-col">
            <div className="px-6 py-8">
              <div className="text-2xl font-bold text-mauve">✨ Gift Genie</div>
            </div>
            <nav className="flex-1 px-4 space-y-2">
              {navItems.map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => {
                    setCurrentPage(id);
                    setIsOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                    currentPage === id
                      ? 'bg-sage text-mauve font-semibold'
                      : 'text-mauve/70 hover:bg-olive/20'
                  }`}
                >
                  <Icon size={20} />
                  <span>{label}</span>
                </button>
              ))}
            </nav>
            <div className="border-t border-olive/20 p-4">
              <button
                onClick={() => {
                  setCurrentPage('profile');
                  setIsOpen(false);
                }}
                className="w-full rounded-xl px-4 py-3 text-left text-sm font-semibold text-mauve/70 hover:bg-olive/20"
              >
                Settings & Accessibility
              </button>
            </div>
          </div>
        </aside>
      )}
    </>
  );
};
