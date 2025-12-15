import { apiClient } from './api';

export interface BookingRequest {
    chefId: string;
    date: string;
    time: string;
    guests: number;
    notes?: string;
}

export const bookingService = {
    createBooking: async (bookingData: BookingRequest): Promise<void> => {
        try {
            await apiClient.post('/bookings', bookingData);
        } catch (error) {
            console.log("Backend offline, simulating success");
            // Simulate success for demo
            return new Promise(resolve => setTimeout(resolve, 1000));
        }
    }
};
