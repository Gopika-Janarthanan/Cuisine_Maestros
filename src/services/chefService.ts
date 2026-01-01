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
    // Detailed profile fields (optional as they differ between summary and detail views)
    coverImage?: string;
    bio?: string;
    specialties?: string[];
    menuHighlights?: string[];
    reviews?: any[];
    languages?: string[];
    experience?: string;
    user?: { id: number; name: string; email: string; imageUrl?: string };
}

// Mock data (fallback)
const MOCK_CHEFS: Chef[] = [
    {
        id: "1",
        name: "Chef Sanjeev Kumar",
        image: "https://images.unsplash.com/photo-1583394293214-28ded15ee548?w=600&h=450&fit=crop",
        specialty: "Master of Awadhi & Mughlai Cuisine",
        cuisines: ["Mughlai", "North Indian", "Awadhi"],
        rating: 4.9,
        reviewCount: 215,
        pricePerHour: 2500,
        location: "New Delhi, Delhi",
        available: true,
        gender: "Male"
    },
    {
        id: "2",
        name: "Chef Anjali Menon",
        image: "https://images.unsplash.com/photo-1607631568010-a87245c0daf8?w=600&h=450&fit=crop",
        specialty: "Authentic South Indian Coastal Flavors",
        cuisines: ["South Indian", "Kerala", "Coastal"],
        rating: 4.8,
        reviewCount: 142,
        pricePerHour: 2000,
        location: "Kochi, Kerala",
        available: true,
        gender: "Female"
    },
    {
        id: "3",
        name: "Chef Vikram Rathore",
        image: "https://images.unsplash.com/photo-1566554273541-37a9ca77b91f?w=600&h=450&fit=crop",
        specialty: "Royal Rajasthani Thali Specialist",
        cuisines: ["Rajasthani", "North Indian", "Vegetarian"],
        rating: 4.9,
        reviewCount: 180,
        pricePerHour: 3000,
        location: "Jaipur, Rajasthan",
        available: true,
        gender: "Male"
    },
    {
        id: "4",
        name: "Chef Priya Sharma",
        image: "https://images.unsplash.com/photo-1595273670150-bd0c3c392e46?w=600&h=450&fit=crop",
        specialty: "Contemporary Fusion & Baking",
        cuisines: ["Bakery", "Fusion", "Desserts"],
        rating: 4.7,
        reviewCount: 98,
        pricePerHour: 1800,
        location: "Bangalore, Karnataka",
        available: true,
        gender: "Female"
    },
    {
        id: "5",
        name: "Chef Arjun Das",
        image: "https://images.unsplash.com/photo-1512485694743-9c9538b4e6e0?w=600&h=450&fit=crop",
        specialty: "Traditional Bengali Feast Expert",
        cuisines: ["Bengali", "Seafood", "East Indian"],
        rating: 4.8,
        reviewCount: 110,
        pricePerHour: 2200,
        location: "Kolkata, West Bengal",
        available: true,
        gender: "Male"
    },
    {
        id: "6",
        name: "Chef Sneha Patel",
        image: "https://images.unsplash.com/photo-1581299894007-aaa50297cf16?w=600&h=450&fit=crop",
        specialty: "Gujarati & Jain Cuisine Expert",
        cuisines: ["Gujarati", "Jain", "Vegetarian"],
        rating: 4.9,
        reviewCount: 155,
        pricePerHour: 1500,
        location: "Ahmedabad, Gujarat",
        available: true,
        gender: "Female"
    },
    {
        id: "7",
        name: "Chef Kabir Khan",
        image: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=600&h=450&fit=crop",
        specialty: "Hyderabadi Biryani & Nizami Dishes",
        cuisines: ["Hyderabadi", "Mughlai", "Biryani"],
        rating: 4.9,
        reviewCount: 230,
        pricePerHour: 2800,
        location: "Hyderabad, Telangana",
        available: true,
        gender: "Male"
    },
    {
        id: "8",
        name: "Chef Meera Kapoor",
        image: "https://images.unsplash.com/photo-1507048331197-7d4ac70811cf?w=600&h=450&fit=crop",
        specialty: "Modern Ind-Chinese & Pan Asian",
        cuisines: ["Indo-Chinese", "Pan Asian", "Thai"],
        rating: 4.6,
        reviewCount: 88,
        pricePerHour: 1800,
        location: "Mumbai, Maharashtra",
        available: false,
        gender: "Female"
    },
    {
        id: "9",
        name: "Chef Rohan D'Souza",
        image: "https://images.unsplash.com/photo-1574966743779-994625b29354?w=600&h=450&fit=crop",
        specialty: "Goan Vindaloo & Portuguese Fusion",
        cuisines: ["Goan", "Portuguese", "Seafood"],
        rating: 4.8,
        reviewCount: 95,
        pricePerHour: 2100,
        location: "Panaji, Goa",
        available: true,
        gender: "Male"
    },
    {
        id: "10",
        name: "Chef Kashmir Singh",
        image: "https://images.unsplash.com/photo-1620706857370-e1b9fb604471?w=600&h=450&fit=crop",
        specialty: "Authentic Kashmiri Wazwan Master",
        cuisines: ["Kashmiri", "Wazwan", "North Indian"],
        rating: 5.0,
        reviewCount: 160,
        pricePerHour: 3500,
        location: "Srinagar, J&K",
        available: true,
        gender: "Male"
    },
    {
        id: "11",
        name: "Chef Aditi Joshi",
        image: "https://images.unsplash.com/photo-1595273670150-bd0c3c392e46?w=600&h=450&fit=crop",
        specialty: "Traditional Maharashtrian & Konkan Fare",
        cuisines: ["Maharashtrian", "Konkan", "Coastal"],
        rating: 4.7,
        reviewCount: 115,
        pricePerHour: 1700,
        location: "Pune, Maharashtra",
        available: true,
        gender: "Female"
    },
    {
        id: "12",
        name: "Chef Liang Zhang",
        image: "https://images.unsplash.com/photo-1551218372-a8789b81b253?w=600&h=450&fit=crop",
        specialty: "Kolkata Style Indo-Chinese Expert",
        cuisines: ["Indo-Chinese", "Hakka", "Asian"],
        rating: 4.8,
        reviewCount: 205,
        pricePerHour: 1600,
        location: "Tangra, Kolkata",
        available: true,
        gender: "Male",
        user: { id: 112, name: "Chef Liang Zhang", email: "liang@example.com" }
    }
];

export const chefService = {
    getFeaturedChefs: async (): Promise<Chef[]> => {
        try {
            // return await apiClient.get<Chef[]>('/chefs/featured');
            // For demo purposes, returning mock data directly
            return MOCK_CHEFS;
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
    },

    searchChefs: async (filters: any): Promise<Chef[]> => {
        try {
            return await apiClient.post<Chef[]>('/chefs/search', filters);
        } catch (error) {
            console.log("Backend offline or error, using mock filtering");
            return MOCK_CHEFS.filter(chef => {
                const matchesQuery = !filters.query ||
                    chef.name.toLowerCase().includes(filters.query.toLowerCase()) ||
                    chef.specialty.toLowerCase().includes(filters.query.toLowerCase());

                const matchesCuisine = !filters.cuisine || filters.cuisine === "All Cuisines" ||
                    chef.cuisines.some(c => c.toLowerCase() === filters.cuisine.toLowerCase());

                const matchesGender = !filters.gender || filters.gender === "All" ||
                    chef.gender === filters.gender;

                const matchesLocation = !filters.location ||
                    chef.location.toLowerCase().includes(filters.location.toLowerCase());

                // Note: Price range and sorting could be added here for a better mock experience
                return matchesQuery && matchesCuisine && matchesGender && matchesLocation;
            });
        }
    },
    updateChef: async (id: string, updates: Partial<Chef>) => {
        try {
            return await apiClient.put<Chef>(`/chefs/${id}`, updates);
        } catch (error) {
            console.log("Backend offline, cannot update mock data persistently");
            // Mock update for session
            const chefIndex = MOCK_CHEFS.findIndex(c => c.id === id);
            if (chefIndex >= 0) {
                MOCK_CHEFS[chefIndex] = { ...MOCK_CHEFS[chefIndex], ...updates };
                return MOCK_CHEFS[chefIndex];
            }
            throw error;
        }
    }
};
