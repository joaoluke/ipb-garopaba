import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter  } from 'expo-router';

interface AuthContextType {
    isAuthenticated: boolean;
    login: (token: string) => void;
    logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
    isAuthenticated: false,
    login: () => {},
    logout: () => {},
});;

export const AuthProvider = ({ children }: {
    children: React.ReactNode;
}) => {
    const router = useRouter();
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const checkAuthStatus = async () => {
            const token = false
            if (token) {
                setIsAuthenticated(true);
            }
        };
        checkAuthStatus();
    }, []);

    const login = async (token: string) => {
        await AsyncStorage.setItem('userToken', token);
        setIsAuthenticated(true);
        router.push('/(tabs)');
    };

    const logout = async () => {
        setIsAuthenticated(false);
        await AsyncStorage.removeItem('userToken');
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
