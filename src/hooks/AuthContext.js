"use-client";

import { AuthContext } from '@/context/AuthContextProvider';
import { useContext } from 'react';


export const useAuth = () => {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error("useAuth must be used inside of the AuthProvider");
    }
    return context;
};