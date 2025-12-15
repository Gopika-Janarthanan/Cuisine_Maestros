export interface ApiResponse<T> {
    data: T;
    success: boolean;
    message?: string;
}

const BASE_URL = 'http://localhost:8080/api';

export const apiClient = {
    get: async <T>(endpoint: string): Promise<T> => {
        try {
            const response = await fetch(`${BASE_URL}${endpoint}`);
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
            const response = await fetch(`${BASE_URL}${endpoint}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
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
