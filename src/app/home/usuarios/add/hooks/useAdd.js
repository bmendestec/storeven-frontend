'use client';

import apiClient from "@/service/server";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function useAdd() {
    const [formData, setFormData] = useState({
        fullName: '',
        birth_date: '',
        age: '',
        gender: '',
        email: '',
        password: '',
        confirmPassword: '',
    });
    const router = useRouter();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });

        if (e.target.name === "birth_date") {
            const today = new Date();
            const age = today.getFullYear() - new Date(e.target.value).getFullYear();
            const monthDiff = today.getMonth() - new Date(e.target.value).getMonth();
            const calculatedAge =
                monthDiff < 0 || (monthDiff === 0 && today.getDate() < new Date(e.target.value).getDate())
                    ? age - 1
                    : age;
            setFormData({
                ...formData,
                [e.target.name]: e.target.value,
                age: calculatedAge
            });
        }
    }

    const handleSubmit = async () => {

        if (formData.password !== formData.confirmPassword) {
            alert('As senhas não coincidem.');
            console.log('As senhas não coincidem.');
        } else if (!formData.fullName) {
            alert('Por favor, preencha o nome completo.');
        } else {
            await addUser(
                formData.fullName,
                formData.birth_date,
                formData.age,
                formData.gender,
                formData.email,
                formData.password
            );
        }
    };

    async function addUser(
        fullName, birth_date, age, gender, email, password
    ) {
        try {
            const userData = {
                name: fullName,
                birth_date: birth_date,
                age: age,
                gender: gender,
                email: email,
                password: password,
                active: 'S',
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString(),
                created_by: 'user',
                updated_by: 'user'
            };
            await apiClient.post("/usuarios", userData).then((response) => {
                if (response.status === 201) {
                    router.push('/home/usuarios');
                }
                return response.data;
            }).catch((error) => {
                if (error.response.data.message === "Email already exists") {
                    console.error('Error:', error.response.data.message);
                    alert('E-mail já cadastrado. Tente novamente com outro e-mail.');
                    emailInputRef.current.focus();
                } else {
                    alert('Erro ao cadastrar usuário. Tente novamente.');
                }
            });
        } catch (error) {
            throw new Error('Erro ao cadastrar usuário:', error.message);
        }
    }

    return { formData, handleChange, handleSubmit }
}