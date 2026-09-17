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
} from './pages';
import { BottomNavigation, Sidebar } from './components';

function App() {
  const { isAuthenticated, currentPage, preferences } = useAppStore();
  const hasApiSession = Boolean(localStorage.getItem('gift-genie-token'));

  // Redirect to login if not authenticated
  if (!isAuthenticated || !hasApiSession) {
    if (currentPage === 'signup') {
      return <SignUpPage />;
    }
    return <LoginPage />;
  }

  // Render the appropriate page
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
      default:
        // Handle gift detail pages
        if (currentPage.startsWith('gift-')) {
          const giftId = parseInt(currentPage.split('-')[1]);
          return <GiftDetailPage giftId={giftId} />;
        }
        return <HomePage />;
    }
  };

  return (
    <div
      className={`min-h-screen bg-cream text-mauve ${
        preferences.highContrast ? 'high-contrast' : ''
      } ${preferences.reduceMotion ? 'reduce-motion' : ''} ${
        preferences.simplifiedMode ? 'simplified-mode' : ''
      } text-size-${preferences.textSize}`}
    >
      <Sidebar />
      <BottomNavigation />
      {renderPage()}
    </div>
  );
}

export default App;
