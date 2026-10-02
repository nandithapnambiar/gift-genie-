import React from 'react';
import {
  Home,
  Compass,
  Heart,
  User,
  Menu,
  X,
  HelpCircle,
  Accessibility,
  Settings as SettingsIcon,
  LogOut,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { useAppStore } from '../store';
import { GenieMascot } from './GenieMascot';

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
    <nav aria-label="Mobile navigation" className="fixed bottom-0 left-0 right-0 z-40 flex bg-white/95 border-t border-olive/20 md:hidden backdrop-blur-sm">
      <div className="flex w-full">
        {navItems.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            type="button"
            onClick={() => setCurrentPage(id)}
            aria-current={currentPage === id ? 'page' : undefined}
            className={`flex-1 flex flex-col items-center justify-center py-3 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral focus-visible:ring-offset-2 ${
              currentPage === id ? 'text-coral' : 'text-mauve/60 hover:text-mauve'
            }`}
          >
            <Icon size={24} />
            <span className="text-xs mt-1 font-medium">{label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
};

interface SidebarProps {
  isCollapsed: boolean;
  setIsCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Sidebar: React.FC<SidebarProps> = ({ isCollapsed, setIsCollapsed }) => {
  const { currentPage, setCurrentPage, user, logout } = useAppStore();
  const [isMobileOpen, setIsMobileOpen] = React.useState(false);

  const mainNavItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'discover', label: 'Discover', icon: Compass },
    { id: 'saved', label: 'Saved', icon: Heart },
    { id: 'profile', label: 'Profile', icon: User },
  ];

  const secondaryNavItems = [
    { id: 'help-support', label: 'Help & Support', icon: HelpCircle },
    { id: 'accessibility', label: 'Accessibility', icon: Accessibility },
    { id: 'settings', label: 'Settings', icon: SettingsIcon },
  ];

  React.useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsMobileOpen(false);
      }
    };

    if (isMobileOpen) {
      window.addEventListener('keydown', onKeyDown);
    }

    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isMobileOpen]);

  const handleNavClick = (page: string) => {
    setCurrentPage(page);
    setIsMobileOpen(false);
  };

  const handleLogout = () => {
    logout();
    setCurrentPage('login');
    setIsMobileOpen(false);
  };

  const renderNavButton = (item: { id: string; label: string; icon: typeof Home }, isSecondary = false) => {
    const Icon = item.icon;
    const isActive = currentPage === item.id;

    return (
      <button
        key={item.id}
        type="button"
        aria-current={isActive ? 'page' : undefined}
        title={isCollapsed ? item.label : undefined}
        onClick={() => handleNavClick(item.id)}
        className={`sidebar-link group flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left transition-all duration-250 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral focus-visible:ring-offset-2 ${
          isActive
            ? 'bg-sage/90 text-mauve font-semibold shadow-soft'
            : 'text-mauve/70 hover:bg-olive/25 hover:text-mauve'
        } ${isSecondary ? 'text-sm' : 'text-base'} ${isCollapsed ? 'justify-center px-2' : ''}`}
      >
        <Icon size={20} className="shrink-0" />
        {!isCollapsed && <span>{item.label}</span>}
      </button>
    );
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setIsMobileOpen((prev) => !prev)}
        className="fixed left-4 top-4 z-50 inline-flex items-center justify-center rounded-xl bg-white/90 p-2 text-mauve shadow-soft ring-1 ring-olive/60 md:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral focus-visible:ring-offset-2"
        aria-label={isMobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
        aria-expanded={isMobileOpen}
      >
        {isMobileOpen ? <X size={22} /> : <Menu size={22} />}
      </button>

      {isMobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/35 backdrop-blur-[1px] md:hidden"
          onClick={() => setIsMobileOpen(false)}
          aria-hidden="true"
        />
      )}

      <aside
        id="gift-genie-sidebar"
        className={`fixed left-0 top-0 z-40 hidden h-screen flex-col border-r border-olive/20 bg-white/95 shadow-soft transition-all duration-250 ease-out md:flex ${
          isCollapsed ? 'w-[72px]' : 'w-[240px]'
        } ${isMobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}
        aria-label="Sidebar navigation"
      >
        <div className={`flex items-center border-b border-olive/20 ${isCollapsed ? 'justify-center px-2 py-4' : 'justify-between px-3 py-4'}`}>
          <div className={`flex items-center gap-2 ${isCollapsed ? 'justify-center' : ''}`}>
            <GenieMascot size="sm" animated={false} className="!w-9 !h-9" />
            {!isCollapsed && <span className="text-lg font-bold text-mauve">Gift Genie</span>}
          </div>
          <button
            type="button"
            onClick={() => setIsCollapsed((prev) => !prev)}
            aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            aria-expanded={!isCollapsed}
            className="sidebar-toggle inline-flex h-9 w-9 items-center justify-center rounded-full text-mauve transition-all duration-250 hover:bg-olive/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral focus-visible:ring-offset-2"
          >
            {isCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
          </button>
        </div>

        <nav aria-label="Main navigation" className="flex-1 space-y-2 px-3 py-4">
          {mainNavItems.map((item) => renderNavButton(item))}
        </nav>

        <div className="space-y-2 border-t border-olive/20 px-3 py-4">
          {secondaryNavItems.map((item) => renderNavButton(item, true))}

          {user && (
            <div className={`rounded-2xl border border-white/60 bg-gradient-to-r from-white/85 to-[#f9efe9]/85 p-3 shadow-soft-sm backdrop-blur-sm ${isCollapsed ? 'px-2' : ''}`}>
              <div className={`flex items-center gap-3 ${isCollapsed ? 'justify-center' : ''}`}>
                {user.avatar ? (
                  <img src={user.avatar} alt={user.name} className="h-10 w-10 rounded-full ring-2 ring-white shadow-soft-sm" />
                ) : (
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-coral to-[#f7b9c6] text-sm font-bold text-white">
                    {user.name.slice(0, 1).toUpperCase()}
                  </div>
                )}

                {!isCollapsed && (
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-mauve">{user.name}</p>
                    <p className="text-xs text-mauve/60">Free plan</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {user && (
            <button
              type="button"
              onClick={handleLogout}
              title={isCollapsed ? 'Log Out' : undefined}
              className={`sidebar-link flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-coral transition-all duration-250 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral focus-visible:ring-offset-2 hover:bg-coral/10 ${isCollapsed ? 'justify-center px-2' : ''}`}
            >
              <LogOut size={20} className="shrink-0" />
              {!isCollapsed && <span>Log Out</span>}
            </button>
          )}
        </div>
      </aside>

      <aside
        className={`fixed inset-y-0 left-0 z-50 w-[240px] transform bg-white/95 shadow-soft transition-transform duration-250 ease-out md:hidden ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        aria-label="Mobile sidebar navigation"
      >
        <div className="flex items-center justify-between border-b border-olive/20 px-4 py-4">
          <div className="flex items-center gap-2">
            <GenieMascot size="sm" animated={false} className="!w-9 !h-9" />
            <span className="text-lg font-bold text-mauve">Gift Genie</span>
          </div>
          <button
            type="button"
            onClick={() => setIsMobileOpen(false)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full text-mauve hover:bg-olive/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral focus-visible:ring-offset-2"
            aria-label="Close sidebar"
          >
            <X size={20} />
          </button>
        </div>

        <nav aria-label="Mobile main navigation" className="space-y-2 px-3 py-4">
          {[...mainNavItems, ...secondaryNavItems].map((item) => {
            const Icon = item.icon;
            const active = currentPage === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleNavClick(item.id)}
                aria-current={active ? 'page' : undefined}
                className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left transition-all duration-200 ${
                  active ? 'bg-sage/90 text-mauve font-semibold' : 'text-mauve/70 hover:bg-olive/20 hover:text-mauve'
                } focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral focus-visible:ring-offset-2`}
              >
                <Icon size={20} />
                <span>{item.label}</span>
              </button>
            );
          })}

          {user && (
            <button
              type="button"
              onClick={handleLogout}
              className="mt-2 flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-coral hover:bg-coral/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral focus-visible:ring-offset-2"
            >
              <LogOut size={20} />
              <span>Log Out</span>
            </button>
          )}
        </nav>
      </aside>
    </>
  );
};
