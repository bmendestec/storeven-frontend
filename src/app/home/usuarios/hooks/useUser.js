import apiClient from "@/service/server";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function useUsers() {
    const [user, setUser] = useState([]);
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const fetchUserData = async () => {
        try {
            const userStored = localStorage.getItem('email');
            const tokenStored = localStorage.getItem('authToken');
            if (!userStored && !tokenStored) {
                setLoading(false);
                router('/login');
            } else {
                const findUserName = await apiClient.get('/usuarios', {
                    headers: {
                        Authorization: `Bearer ${tokenStored}`,
                    }
                });
                if (findUserName.status !== 200) {
                    console.log('Erro ao buscar usuário:', findUserName.message);
                    return;
                } else {
                    setLoading(false);
                    setUser(findUserName.data);
                    return findUserName.data;
                }
            }
        } catch (error) {
            console.log('Erro ao buscar usuário:', error.message);
            return null;
        }
    }

    return {
        user,
        loading,
        fetchUserData
    }
}