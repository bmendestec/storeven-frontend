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

    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        });

        if (e.target.name === 'birth_date') {
            const birth_date = new Date(e.target.value);
            const today = new Date();
            const age = today.getFullYear() - birth_date.getFullYear();
            const monthDiff = today.getMonth() - birth_date.getMonth();
            if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth_date.getDate())) {
                setUser({ ...user, birth_date: e.target.value, age: age - 1 });
            } else {
                setUser({ ...user, birth_date: e.target.value, age: age });
            }
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        apiClient.put(`/usuarios/${userId}`, user, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('authToken')}`,
            }
        }).then((response) => {
            console.log('User edited:', response.data);
            router.push('/home/usuarios');
        }).catch((error) => {
            console.log('User edit error:', error.message);
        });
    };

    return {
        user,
        formatDate,
        handleChange,
        handleSubmit
    }
}