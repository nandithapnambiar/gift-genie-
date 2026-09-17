import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { api } from './api';

export interface QuestionnaireState {
  recipient: string;
  interests: string[];
  occasion: string;
  budget: string;
  giftStyle: string[];
}

export interface UserPreferences {
  textSize: 'sm' | 'base' | 'lg' | 'xl';
  highContrast: boolean;
  reduceMotion: boolean;
  keyboardNavigationEnabled: boolean;
  screenReaderLabels: boolean;
  simplifiedMode: boolean;
  language: string;
}

interface AppState {
  // Authentication
  isAuthenticated: boolean;
  user: {
    id: string;
    name: string;
    email: string;
    avatar?: string;
  } | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  signup: (name: string, email: string, password: string) => Promise<void>;

  // Questionnaire
  questionnaire: QuestionnaireState;
  updateQuestionnaire: (updates: Partial<QuestionnaireState>) => void;
  resetQuestionnaire: () => void;

  // Saved gifts
  savedGifts: number[];
  toggleSaveGift: (giftId: number) => Promise<void>;

  // Search history
  searchHistory: string[];
  addSearch: (search: string) => void;

  // Preferences
  preferences: UserPreferences;
  updatePreferences: (updates: Partial<UserPreferences>) => void;

  // Current page
  currentPage: string;
  setCurrentPage: (page: string) => void;
}

const initialQuestionnaireState: QuestionnaireState = {
  recipient: '',
  interests: [],
  occasion: '',
  budget: '',
  giftStyle: [],
};

const initialPreferences: UserPreferences = {
  textSize: 'base',
  highContrast: false,
  reduceMotion: false,
  keyboardNavigationEnabled: true,
  screenReaderLabels: false,
  simplifiedMode: false,
  language: 'en',
};

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      // Authentication
      isAuthenticated:
        localStorage.getItem('isAuthenticated') === 'true' &&
        Boolean(localStorage.getItem('gift-genie-token')),
      user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') || 'null') : null,
      login: async (email: string, password: string) => {
        const { token, user } = await api.login(email, password);
        localStorage.setItem('gift-genie-token', token);
        set({ isAuthenticated: true, user });
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('user', JSON.stringify(user));
        const saved = await api.getSaved();
        set({ savedGifts: saved.map((gift) => gift.id) });
      },
      logout: () => {
        void api.logout().catch(() => undefined);
        set({ isAuthenticated: false, user: null, questionnaire: initialQuestionnaireState });
        localStorage.removeItem('isAuthenticated');
        localStorage.removeItem('user');
        localStorage.removeItem('gift-genie-token');
      },
      signup: async (name: string, email: string, password: string) => {
        const { token, user } = await api.signup(name, email, password);
        localStorage.setItem('gift-genie-token', token);
        set({ isAuthenticated: true, user });
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('user', JSON.stringify(user));
      },

      // Questionnaire
      questionnaire: initialQuestionnaireState,
      updateQuestionnaire: (updates) =>
        set((state) => ({
          questionnaire: { ...state.questionnaire, ...updates },
        })),
      resetQuestionnaire: () =>
        set({ questionnaire: initialQuestionnaireState }),

      // Saved gifts
      savedGifts: [],
      toggleSaveGift: async (giftId) => {
        const { saved } = await api.toggleSaved(giftId);
        set((state) => ({
          savedGifts: saved
            ? [...state.savedGifts, giftId]
            : state.savedGifts.filter((id) => id !== giftId),
        }));
      },

      // Search history
      searchHistory: [],
      addSearch: (search) =>
        set((state) => ({
          searchHistory: [search, ...state.searchHistory.filter((s) => s !== search)].slice(0, 10),
        })),

      // Preferences
      preferences: initialPreferences,
      updatePreferences: (updates) =>
        set((state) => ({
          preferences: { ...state.preferences, ...updates },
        })),

      // Current page
      currentPage: 'home',
      setCurrentPage: (page) => set({ currentPage: page }),
    }),
    {
      name: 'gift-genie-storage',
    }
  )
);
