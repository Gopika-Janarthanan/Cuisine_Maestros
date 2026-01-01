import { apiClient } from './api';

export interface LoginPayload { email: string; password: string }
export interface RegisterPayload { name: string; email: string; password: string; role?: "USER" | "CHEF" | "ADMIN" }

export interface AuthResponse {
  id?: string;
  userId?: number;
  name: string;
  email?: string;
  role: "USER" | "CHEF" | "ADMIN";
  chefId?: number;
  token?: string;
}

const MOCK_USER_KEY = 'chef_connect_mock_user';

export const authService = {
  login: async (payload: LoginPayload): Promise<AuthResponse> => {
    try {
      return await apiClient.post<AuthResponse>('/auth/login', payload);
    } catch (err) {
      // Fallback: Check if user exists in localStorage from previous registration
      const existingUser = localStorage.getItem(MOCK_USER_KEY);
      if (existingUser) {
        try {
          const parsedUser = JSON.parse(existingUser) as AuthResponse;
          // Verify email matches
          if (parsedUser.email === payload.email) {
            return parsedUser;
          }
        } catch (e) {
          console.error('Failed to parse existing user');
        }
      }
      // If no existing user, we should NOT create a new one automatically with USER role on login
      // That would overwrite the correct role if the backend is down but the user registered previously
      // Simulate backend behavior: if not found, fail.
      throw new Error("Invalid credentials or backend unavailable");
    }
  },

  register: async (payload: RegisterPayload): Promise<AuthResponse> => {
    try {
      return await apiClient.post<AuthResponse>('/auth/register', payload);
    } catch (err) {
      const mock: AuthResponse = {
        id: 'u' + Date.now(),
        name: payload.name,
        email: payload.email,
        role: payload.role || 'USER',
        chefId: payload.role === 'CHEF' ? Date.now() : undefined
      };
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
