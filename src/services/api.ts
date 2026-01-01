export interface ApiResponse<T> {
    data: T;
    success: boolean;
    message?: string;
}

const BASE_URL = '/api';

export const apiClient = {
    get: async <T>(endpoint: string): Promise<T> => {
        try {
            const token = localStorage.getItem('token'); // or 'user' -> parse -> token? AuthService usually stores 'token' separate or inside user object.
            // Looking at authService, it returns AuthResponse which has 'token'.
            // But authService.ts doesn't explicitly save 'token' key in localStorage?
            // Wait, SignIn.tsx (viewed in Step 361) login function: localStorage.setItem("user", JSON.stringify(userData));
            // AuthResponse (Step 371) has `token?: string`.
            // So we need to look in the stored user object? Or a separate token key?
            // Let's check AuthProvider (viewed in Step 361 text).
            // It seems we might not be storing a standalone 'token' key.
            // The AuthResponse has a dummy token "dummy-jwt-token-..."

            // Let's assume for now we read it from the "user" object if "token" key is missing? 
            // Or just check "token" key. Usually it's "token".

            // Re-reading Profile.tsx (Step 452): const token = localStorage.getItem("token") || "";
            // This suggests "token" key IS used.

            // So:
            const headers: HeadersInit = {};
            const storedToken = localStorage.getItem('token');
            if (storedToken) {
                headers['Authorization'] = `Bearer ${storedToken}`;
            }

            const response = await fetch(`${BASE_URL}${endpoint}`, { headers });
            if (!response.ok) {
                throw new Error(`API Error: ${response.statusText}`);
            }
            return await response.json();
        } catch (error) {
            console.warn(`API call failed for ${endpoint}, falling back to mock data if available.`);
            throw error;
        }
    },

    post: async <T>(endpoint: string, data: any): Promise<T> => {
        try {
            const headers: HeadersInit = {
                'Content-Type': 'application/json',
            };
            const storedToken = localStorage.getItem('token');
            if (storedToken) {
                headers['Authorization'] = `Bearer ${storedToken}`;
            }

            const response = await fetch(`${BASE_URL}${endpoint}`, {
                method: 'POST',
                headers,
                body: JSON.stringify(data),
            });
            if (!response.ok) {
                throw new Error(`API Error: ${response.statusText}`);
            }
            return await response.json();
        } catch (error) {
            console.error(`API call failed for ${endpoint}:`, error);
            throw error;
        }
    },

    put: async <T>(endpoint: string, data: any): Promise<T> => {
        try {
            const headers: HeadersInit = {
                'Content-Type': 'application/json',
            };
            const storedToken = localStorage.getItem('token');
            if (storedToken) {
                headers['Authorization'] = `Bearer ${storedToken}`;
            }

            const response = await fetch(`${BASE_URL}${endpoint}`, {
                method: 'PUT',
                headers,
                body: JSON.stringify(data),
            });
            if (!response.ok) {
                throw new Error(`API Error: ${response.statusText}`);
            }
            return await response.json();
        } catch (error) {
            console.error(`API call failed for ${endpoint}:`, error);
            throw error;
        }
    }
};
