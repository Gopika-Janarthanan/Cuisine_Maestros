import { apiClient } from './api';

export interface Address {
    id?: number;
    userId?: number;
    street: string;
    city: string;
    state: string;
    zipCode: string;
    isDefault: boolean;
}

export const addressService = {
    addAddress: async (address: Address) => {
        return await apiClient.post<Address>('/addresses', address);
    },
    getUserAddresses: async (userId: string) => {
        return await apiClient.get<Address[]>(`/addresses/user/${userId}`);
    }
};
