import { apiClient } from './api';

export type BookingStatus = 'PENDING' | 'CONFIRMED' | 'REJECTED';

export interface Booking {
  id: number;
  chefId?: string;
  clientName?: string;
  date: string;
  time: string;
  guests: number;
  occasion?: string;
  notes?: string;
  status: BookingStatus;
  price?: number;
}

const MOCK_BOOKINGS_KEY = 'chef_connect_mock_bookings';

const DEFAULT_MOCK: Booking[] = [
  { id: 1, clientName: 'Alice Johnson', date: '2024-06-15', time: '19:00', guests: 4, occasion: 'Birthday Dinner', status: 'PENDING', price: 340 },
  { id: 2, clientName: 'Michael Smith', date: '2024-06-18', time: '20:00', guests: 2, occasion: 'Anniversary', status: 'PENDING', price: 200 },
  { id: 3, clientName: 'Sarah Williams', date: '2024-06-22', time: '18:30', guests: 6, occasion: 'Family Gathering', status: 'CONFIRMED', price: 510 }
];

function loadMock(): Booking[] {
  try {
    const raw = localStorage.getItem(MOCK_BOOKINGS_KEY);
    if (!raw) {
      localStorage.setItem(MOCK_BOOKINGS_KEY, JSON.stringify(DEFAULT_MOCK));
      return DEFAULT_MOCK.slice();
    }
    return JSON.parse(raw) as Booking[];
  } catch (e) {
    return DEFAULT_MOCK.slice();
  }
}

function saveMock(bookings: Booking[]) {
  try {
    localStorage.setItem(MOCK_BOOKINGS_KEY, JSON.stringify(bookings));
  } catch (e) {
    // ignore
  }
}

export const bookingService = {
  getBookingsForChef: async (chefId: string): Promise<Booking[]> => {
    try {
      // try backend first
      return await apiClient.get<Booking[]>(`/chefs/${chefId}/bookings`);
    } catch (err) {
      const all = loadMock();
      return all.filter(b => !b.chefId || String(b.chefId) === String(chefId));
    }
  },

  createBooking: async (payload: Partial<Booking>): Promise<Booking> => {
    try {
      return await apiClient.post<Booking>('/bookings', payload);
    } catch (err) {
      const all = loadMock();
      const nextId = all.reduce((max, b) => Math.max(max, b.id), 0) + 1;
      const booking: Booking = {
        id: nextId,
        chefId: payload.chefId,
        clientName: payload.clientName || 'Guest',
        date: payload.date || new Date().toISOString().slice(0,10),
        time: payload.time || '19:00',
        guests: payload.guests || 1,
        notes: payload.notes,
        status: 'PENDING',
        occasion: payload.occasion,
        price: payload.price
      };
      all.push(booking);
      saveMock(all);
      return booking;
    }
  },

  updateBookingStatus: async (id: number, status: BookingStatus): Promise<void> => {
    try {
      // prefer backend endpoint
      await apiClient.post(`/bookings/${id}/status`, { status });
    } catch (err) {
      const all = loadMock();
      const idx = all.findIndex(b => b.id === id);
      if (idx !== -1) {
        all[idx].status = status;
        saveMock(all);
      } else {
        throw new Error('Booking not found');
      }
    }
  }
};
