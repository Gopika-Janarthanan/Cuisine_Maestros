import { apiClient } from './api';

export interface LoginPayload { email: string; password: string }
export interface RegisterPayload { name: string; email: string; password: string; role?: string }

export interface AuthResponse { id: string; name: string; email: string; role: string; chefId?: number; token?: string }

const MOCK_USER_KEY = 'chef_connect_mock_user';

export const authService = {
  login: async (payload: LoginPayload): Promise<AuthResponse> => {
    try {
      return await apiClient.post<AuthResponse>('/auth/login', payload);
    } catch (err) {
      // Fallback: simple local mock
      const mock = { id: 'u1', name: payload.email.split('@')[0], email: payload.email, role: 'USER' } as AuthResponse;
      localStorage.setItem(MOCK_USER_KEY, JSON.stringify(mock));
      return mock;
    }
  },

  register: async (payload: RegisterPayload): Promise<AuthResponse> => {
    try {
      return await apiClient.post<AuthResponse>('/auth/register', payload);
    } catch (err) {
      const mock = { id: 'u' + Date.now(), name: payload.name, email: payload.email, role: payload.role || 'USER' } as AuthResponse;
      localStorage.setItem(MOCK_USER_KEY, JSON.stringify(mock));
      return mock;
    }
  },

  logout: async (): Promise<void> => {
    try {
      await apiClient.post('/auth/logout', {});
    } catch (err) {
      localStorage.removeItem(MOCK_USER_KEY);
    }
  },

  getCurrentUser: async (): Promise<AuthResponse | null> => {
    try {
      return await apiClient.get<AuthResponse>('/auth/me');
    } catch (err) {
      const raw = localStorage.getItem(MOCK_USER_KEY);
      if (!raw) return null;
      try {
        return JSON.parse(raw) as AuthResponse;
      } catch (e) {
        return null;
      }
    }
  }
};
