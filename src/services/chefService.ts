import { apiClient } from './api';

export interface Chef {
    id: string;
    name: string;
    image: string;
    specialty: string;
    cuisines: string[];
    rating: number;
    reviewCount: number;
    pricePerHour: number;
    location: string;
    available: boolean;
    gender: "Male" | "Female";
}

// Mock data (fallback)
const MOCK_CHEFS: Chef[] = [
    {
        id: "1",
        name: "Chef Alessandro Romano",
        image: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=600&h=450&fit=crop",
        specialty: "Michelin-trained Italian cuisine specialist",
        cuisines: ["Italian", "Mediterranean", "French"],
        rating: 4.9,
        reviewCount: 127,
        pricePerHour: 85,
        location: "New York, NY",
        available: true,
        gender: "Male",
    },
    {
        id: "2",
        name: "Chef Yuki Tanaka",
        image: "https://images.unsplash.com/photo-1581299894007-aaa50297cf16?w=600&h=450&fit=crop",
        specialty: "Authentic Japanese omakase experience",
        cuisines: ["Japanese", "Sushi", "Kaiseki"],
        rating: 4.8,
        reviewCount: 89,
        pricePerHour: 120,
        location: "Los Angeles, CA",
        available: true,
        gender: "Female",
    },
    {
        id: "3",
        name: "Chef Maria Santos",
        image: "https://images.unsplash.com/photo-1595273670150-bd0c3c392e46?w=600&h=450&fit=crop",
        specialty: "Farm-to-table Mexican fusion",
        cuisines: ["Mexican", "Latin American", "Fusion"],
        rating: 4.9,
        reviewCount: 156,
        pricePerHour: 75,
        location: "Miami, FL",
        available: false,
        gender: "Female",
    },
    {
        id: "4",
        name: "Chef Pierre Dubois",
        image: "https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?w=600&h=450&fit=crop",
        specialty: "Classic French fine dining",
        cuisines: ["French", "Contemporary", "European"],
        rating: 5.0,
        reviewCount: 203,
        pricePerHour: 150,
        location: "Chicago, IL",
        available: true,
        gender: "Male",
    },
    {
        id: "5",
        name: "Chef Raj Patel",
        image: "https://images.unsplash.com/photo-1507048331197-7d4ac70811cf?w=600&h=450&fit=crop",
        specialty: "Modern Indian cuisine with traditional roots",
        cuisines: ["Indian", "Asian Fusion", "Vegetarian"],
        rating: 4.7,
        reviewCount: 94,
        pricePerHour: 70,
        location: "San Francisco, CA",
        available: true,
        gender: "Male"
    },
    {
        id: "6",
        name: "Chef Emma Wilson",
        image: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=600&h=450&fit=crop",
        specialty: "Contemporary American farm-to-table",
        cuisines: ["American", "Farm-to-Table", "Seasonal"],
        rating: 4.8,
        reviewCount: 112,
        pricePerHour: 90,
        location: "Seattle, WA",
        available: true,
        gender: "Female"
    },
    {
        id: "7",
        name: "Chef Carlos Mendez",
        image: "https://images.unsplash.com/photo-1466637574441-749b8f19452f?w=600&h=450&fit=crop",
        specialty: "Spanish tapas and paella expert",
        cuisines: ["Spanish", "Mediterranean", "Seafood"],
        rating: 4.6,
        reviewCount: 78,
        pricePerHour: 80,
        location: "Austin, TX",
        available: false,
        gender: "Male"
    },
    {
        id: "8",
        name: "Chef Lisa Chen",
        image: "https://images.unsplash.com/photo-1551218372-a8789b81b253?w=600&h=450&fit=crop",
        specialty: "Authentic Cantonese dim sum master",
        cuisines: ["Chinese", "Dim Sum", "Cantonese"],
        rating: 4.9,
        reviewCount: 167,
        pricePerHour: 95,
        location: "Boston, MA",
        available: true,
        gender: "Female"
    }
];

export const chefService = {
    getFeaturedChefs: async (): Promise<Chef[]> => {
        try {
            return await apiClient.get<Chef[]>('/chefs/featured');
        } catch (error) {
            console.log("Backend offline, using mock data");
            return MOCK_CHEFS;
        }
    },

    getChefById: async (id: string): Promise<Chef | undefined> => {
        try {
            return await apiClient.get<Chef>(`/chefs/${id}`);
        } catch (error) {
            console.log("Backend offline, using mock data");
            return MOCK_CHEFS.find(c => c.id === id);
        }
    }
};
