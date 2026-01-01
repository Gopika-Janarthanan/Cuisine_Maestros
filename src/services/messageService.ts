import { apiClient } from './api';

export interface Message {
    id: number;
    senderId: number;
    receiverId: number;
    bookingId?: number;
    content: string;
    sentAt: string;
}

export const messageService = {
    sendMessage: async (message: { senderId: number, receiverId: number, content: string, bookingId?: number }) => {
        return await apiClient.post<Message>('/messages', message);
    },
    getConversation: async (user1: number, user2: number) => {
        return await apiClient.get<Message[]>(`/messages/conversation?user1=${user1}&user2=${user2}`);
    }
};
