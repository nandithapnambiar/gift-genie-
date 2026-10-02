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

export type UserMood = 'happy' | 'excited' | 'calm' | 'thoughtful';

export interface UserPreferences {
  textSize: 'sm' | 'base' | 'lg' | 'xl';
  darkMode: boolean;
  highContrast: boolean;
  reduceMotion: boolean;
  keyboardNavigationEnabled: boolean;
  screenReaderLabels: boolean;
  simplifiedMode: boolean;
  language: string;
}

export interface GiftReview {
  id: string;
  name: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export interface GiftMemory {
  id: string;
  title: string;
  date: string;
  note: string;
  image?: string;
}

export interface GiftReminder {
  id: string;
  title: string;
  date: string;
  message: string;
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

  // Gift tracking
  giftTracker: number[];
  toggleGiftTracker: (giftId: number) => void;

  // Reviews
  giftReviews: Record<number, GiftReview[]>;
  addGiftReview: (giftId: number, review: Omit<GiftReview, 'id' | 'createdAt'>) => void;

  // Reactions
  reactionState: Record<number, Record<string, number>>;
  addReaction: (giftId: number, emoji: string) => void;

  // Memory vault
  giftMemories: GiftMemory[];
  addGiftMemory: (memory: Omit<GiftMemory, 'id'>) => void;

  // Reminders
  giftReminders: GiftReminder[];
  addGiftReminder: (reminder: Omit<GiftReminder, 'id'>) => void;

  // Search history
  searchHistory: string[];
  addSearch: (search: string) => void;

  // Preferences
  preferences: UserPreferences;
  updatePreferences: (updates: Partial<UserPreferences>) => void;

  // Current page
  currentPage: string;
  setCurrentPage: (page: string) => void;

  // Genie mood
  userMood: UserMood;
  setUserMood: (mood: UserMood) => void;
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
  darkMode:
    typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches,
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

      // Gift tracking
      giftTracker: [],
      toggleGiftTracker: (giftId) =>
        set((state) => ({
          giftTracker: state.giftTracker.includes(giftId)
            ? state.giftTracker.filter((id) => id !== giftId)
            : [...state.giftTracker, giftId],
        })),

      // Reviews
      giftReviews: {},
      addGiftReview: (giftId, review) =>
        set((state) => ({
          giftReviews: {
            ...state.giftReviews,
            [giftId]: [
              ...(state.giftReviews[giftId] ?? []),
              {
                ...review,
                id: globalThis.crypto?.randomUUID?.() ?? `${Date.now()}-${giftId}`,
                createdAt: new Date().toISOString(),
              },
            ],
          },
        })),

      // Reactions
      reactionState: {},
      addReaction: (giftId, emoji) =>
        set((state) => ({
          reactionState: {
            ...state.reactionState,
            [giftId]: {
              ...(state.reactionState[giftId] ?? {}),
              [emoji]: (state.reactionState[giftId]?.[emoji] ?? 0) + 1,
            },
          },
        })),

      // Memory vault
      giftMemories: [
        {
          id: 'mem-1',
          title: 'Best friend birthday',
          date: '2026-09-12',
          note: 'A candle set and two inside jokes later, it was the perfect cozy gift.',
          image: 'https://images.unsplash.com/photo-1517849845537-4d257902454a?w=500&h=500&fit=crop',
        },
        {
          id: 'mem-2',
          title: 'Anniversary surprise',
          date: '2026-05-02',
          note: 'A custom photo frame and handwritten note made the night unforgettable.',
          image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=500&h=500&fit=crop',
        },
      ],
      addGiftMemory: (memory) =>
        set((state) => ({
          giftMemories: [
            {
              ...memory,
              id: `mem-${Date.now()}`,
            },
            ...state.giftMemories,
          ].slice(0, 6),
        })),

      // Reminders
      giftReminders: [
        {
          id: 'rem-1',
          title: 'Anniversary',
          date: '2026-10-08',
          message: 'Only 14 days left to plan the perfect surprise.',
        },
        {
          id: 'rem-2',
          title: 'Bestie birthday',
          date: '2026-10-16',
          message: 'The celebration countdown begins. A thoughtful gift is waiting.',
        },
      ],
      addGiftReminder: (reminder) =>
        set((state) => ({
          giftReminders: [
            {
              ...reminder,
              id: `rem-${Date.now()}`,
            },
            ...state.giftReminders,
          ].slice(0, 6),
        })),

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

      userMood: 'happy',
      setUserMood: (mood) => set({ userMood: mood }),
    }),
    {
      name: 'gift-genie-storage',
    }
  )
);
