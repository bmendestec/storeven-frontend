'use client';

import { useParams } from "next/navigation";
import FormEdit from "../components/form";

export default function EditUser() {
    const params = useParams();
    const userId = params.userId;
    return (
        <>
            <FormEdit userId={userId} />
        </>
    )
}