'use client';

import apiClient from "@/service/server";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export function useEdit({ userId } = {}) {
    const [user, setUser] = useState({
        id: null,
        name: '',
        age: '',
        email: '',
        birth_date: '',
        gender: '',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        created_by: 'user',
        updated_by: 'user'
    });

    const router = useRouter();

    useEffect(() => {
        if (!userId) return;
        apiClient.get(`/usuarios/${userId}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('authToken')}`,
            }
        }).then((response) => {
            setUser(response.data.user)
        }).catch((error) => {
            console.log('Error: ', error.message);
        });
    }, [userId]);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    return {
        user,
        formatDate
    }
}