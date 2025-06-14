'use client';

import { useParams } from "next/navigation";

export default function EditUser() {
    const params = useParams();
    const userId = params.userId;
    return (
        <>
            <p>Test edit {userId}</p>
        </>
    )
}