import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const checkAuthStatus = async () => {
            const token = await AsyncStorage.getItem('userToken');
            if (token) {
                setIsAuthenticated(true);
            }
        };
        checkAuthStatus();
    }, []);

    const login = async (token: string) => {
        setIsAuthenticated(true);
        await AsyncStorage.setItem('userToken', token);
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
