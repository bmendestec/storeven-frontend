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
        const { name, value } = e.target;
        setUser((prevUser) => ({
            ...prevUser,
            [name]: value,
        }));

        if (name === "birth_date") {
            const today = new Date();
            const age = today.getFullYear() - new Date(e.target.value).getFullYear();
            const monthDiff = today.getMonth() - new Date(e.target.value).getMonth();
            const calculatedAge =
                monthDiff < 0 || (monthDiff === 0 && today.getDate() < new Date(e.target.value).getDate())
                    ? age - 1
                    : age;

            setUser((prevUser) => ({
                ...prevUser,
                age: calculatedAge
            }));
        }
    }

    const handleSubmit = async () => {        

        try {
            const response = await apiClient.put(`/usuarios/${user.id}`, user, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('authToken')}`,
                }
            })   
            
            if (response.status === 200) {
                setUser(response.data.user);
            }
        } catch (error) {
                console.log('User edit error:', error.message);            
        }
        
        // .then((response) => {
        //     console.log('User edited:', response.data);
        //     router.push('/home/usuarios');
        // }).catch((error) => {
        // });
    };

    return {
        user,
        formatDate,
        handleChange,
        handleSubmit
    }
}