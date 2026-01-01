import { apiClient } from './api';

export interface PaymentRequest {
    bookingId: number;
    method: 'CASH' | 'ONLINE';
    cardNumber?: string;
}

export interface Payment {
    id: number;
    amount: number;
    method: 'CASH' | 'ONLINE';
    status: 'PENDING' | 'PAID' | 'FAILED';
    transactionId: string;
    paymentDate: string;
}

export const paymentService = {
    createPayment: async (payment: PaymentRequest) => {
        return await apiClient.post<Payment>('/payments', payment);
    },
    getPaymentByBooking: async (bookingId: number) => {
        return await apiClient.get<Payment>(`/payments/booking/${bookingId}`);
    }
};
