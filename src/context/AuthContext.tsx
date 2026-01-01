import * as React from "react";
import { createContext, useContext, useState, useEffect } from "react";

interface User {
    id: string;
    name: string;
    email: string;
    role: "USER" | "CHEF" | "ADMIN";
    chefId?: number;
}

interface AuthContextType {
    user: User | null;
    login: (user: User & { token?: string }) => void;
    logout: () => void;
    updateProfile: (data: { name: string; imageUrl?: string }) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            try {
                setUser(JSON.parse(storedUser));
            } catch (e) {
                console.error("Failed to parse user from local storage");
            }
        }
    }, []);

    const login = (userData: User & { token?: string }) => {
        const { token, ...userFields } = userData;
        setUser(userFields);
        localStorage.setItem("user", JSON.stringify(userFields));
        if (token) {
            localStorage.setItem("token", token);
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem("user");
        localStorage.removeItem("token");
    };

    const updateProfile = (data: { name: string; imageUrl?: string }) => {
        if (!user) return;
        const newUser = { ...user, ...data };
        setUser(newUser);
        localStorage.setItem("user", JSON.stringify(newUser));
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, updateProfile }}>
            {children}
        </AuthContext.Provider>
    );
};


export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
