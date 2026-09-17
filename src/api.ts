import type { QuestionnaireState } from './store';

export interface ApiGift {
  id: number;
  name: string;
  price: number;
  rating: number;
  reviews: number;
  category: string;
  badge?: string;
  image: string;
  explanation: string;
  tags: string[];
}

export interface ApiUser {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8787/api';

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const token = localStorage.getItem('gift-genie-token');
  const response = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  });
  if (!response.ok) {
    const body = await response.json().catch(() => ({ error: 'Request failed' }));
    throw new Error(body.error || 'Request failed');
  }
  return response.status === 204 ? (undefined as T) : response.json();
}

export const api = {
  login: (email: string, password: string) =>
    request<{ token: string; user: ApiUser }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    }),
  signup: (name: string, email: string, password: string) =>
    request<{ token: string; user: ApiUser }>('/auth/signup', {
      method: 'POST',
      body: JSON.stringify({ name, email, password }),
    }),
  logout: () => request<void>('/auth/logout', { method: 'POST' }),
  getSaved: () => request<ApiGift[]>('/me/saved'),
  toggleSaved: (giftId: number) => request<{ saved: boolean }>(`/me/saved/${giftId}`, { method: 'PUT' }),
  recommendations: (questionnaire: QuestionnaireState) =>
    request<ApiGift[]>('/recommendations', {
      method: 'POST',
      body: JSON.stringify(questionnaire),
    }),
};
