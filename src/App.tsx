import React from 'react';
import { useAppStore } from './store';
import {
  LoginPage,
  SignUpPage,
  OnboardingPage,
  HomePage,
  GiftFinderPage,
  RecommendationsPage,
  DiscoverPage,
  SavedGiftsPage,
  ProfilePage,
  GiftDetailPage,
  HelpSupportPage,
  AccessibilityPage,
  SettingsPage,
} from './pages';
import { BottomNavigation, Sidebar } from './components';

function App() {
  const { isAuthenticated, currentPage, preferences } = useAppStore();
  const [sidebarCollapsed, setSidebarCollapsed] = React.useState<boolean>(() => {
    try {
      const saved = localStorage.getItem('gift-genie-sidebar-collapsed');
      return saved ? JSON.parse(saved) : false;
    } catch {
      return false;
    }
  });

  React.useEffect(() => {
    try {
      localStorage.setItem('gift-genie-sidebar-collapsed', JSON.stringify(sidebarCollapsed));
    } catch {
      // Ignore storage failures.
    }
  }, [sidebarCollapsed]);

  const hasApiSession = Boolean(localStorage.getItem('gift-genie-token'));

  React.useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle('theme-dark', preferences.darkMode);
    root.style.colorScheme = preferences.darkMode ? 'dark' : 'light';
    root.dataset.highContrast = String(preferences.highContrast);
    root.dataset.reduceMotion = String(
      preferences.reduceMotion || window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    );
    root.dataset.simplifiedLayout = String(preferences.simplifiedMode);
  }, [preferences.darkMode, preferences.highContrast, preferences.reduceMotion, preferences.simplifiedMode]);

  if (!isAuthenticated || !hasApiSession) {
    if (currentPage === 'signup') {
      return <SignUpPage />;
    }
    return <LoginPage />;
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'onboarding':
        return <OnboardingPage />;
      case 'home':
        return <HomePage />;
      case 'gift-finder':
        return <GiftFinderPage />;
      case 'recommendations':
        return <RecommendationsPage />;
      case 'discover':
        return <DiscoverPage />;
      case 'saved':
        return <SavedGiftsPage />;
      case 'profile':
        return <ProfilePage />;
      case 'help-support':
        return <HelpSupportPage />;
      case 'accessibility':
        return <AccessibilityPage />;
      case 'settings':
        return <SettingsPage />;
      default:
        if (currentPage.startsWith('gift-')) {
          const giftId = parseInt(currentPage.split('-')[1], 10);
          return <GiftDetailPage giftId={giftId} />;
        }
        return <HomePage />;
    }
  };

  return (
    <div
      className={`app-shell min-h-screen ${
        preferences.darkMode ? 'theme-dark' : 'theme-light'
      } ${preferences.highContrast ? 'high-contrast' : ''} ${
        preferences.reduceMotion ? 'reduce-motion' : ''
      } ${preferences.simplifiedMode ? 'simplified-mode' : ''} text-size-${preferences.textSize}`}
      style={{
        ['--sidebar-width' as string]: sidebarCollapsed ? '72px' : '240px',
      }}
    >
      <Sidebar isCollapsed={sidebarCollapsed} setIsCollapsed={setSidebarCollapsed} />
      <BottomNavigation />
      <div className="app-content md:pl-[var(--sidebar-width)]">{renderPage()}</div>
    </div>
  );
}

export default App;
