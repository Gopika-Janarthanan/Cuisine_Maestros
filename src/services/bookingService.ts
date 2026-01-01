import { apiClient } from './api';

export interface Booking {
  id: number;
  userId: number;
  chefId: number;
  address: any; // Address type
  date: string;
  time: string;
  guests: number;
  notes: string;
  status: 'PENDING' | 'CONFIRMED' | 'REJECTED' | 'PAID' | 'COMPLETED' | 'CANCELLED';
  groceryOption: 'USER_PROVIDED' | 'CHEF_PROVIDED';
  cookingCharge?: number;
  groceryCost?: number;
  totalAmount?: number;
  chef?: any;
  user?: any;
}

export interface CreateBookingRequest {
  userId: number;
  chefId: number;
  addressId: number;
  date: string;
  time: string;
  guests: number;
  notes: string;
  groceryOption: 'USER_PROVIDED' | 'CHEF_PROVIDED';
}

export interface ConfirmBookingRequest {
  status: 'CONFIRMED' | 'REJECTED';
  cookingCharge?: number;
  groceryCost?: number;
}

export const bookingService = {
  createBooking: async (bookingData: CreateBookingRequest) => {
    return await apiClient.post<Booking>('/bookings', bookingData);
  },

  getBookingsForChef: async (chefId: string) => {
    return await apiClient.get<Booking[]>(`/bookings/chef/${chefId}`);
  },

  getBookingsForUser: async (userId: string) => {
    return await apiClient.get<Booking[]>(`/bookings/user/${userId}`);
  },

  confirmBooking: async (id: number, data: ConfirmBookingRequest) => {
    return await apiClient.put<Booking>(`/bookings/${id}/confirm`, data);
  },

  updateStatus: async (id: number, status: string) => {
    return await apiClient.put<Booking>(`/bookings/${id}/status`, { status });
  }
};
