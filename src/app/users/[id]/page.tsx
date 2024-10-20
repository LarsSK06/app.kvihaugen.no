"use client";



// Imports

import { useFetch } from "@/utils/hooks/use-fetch";
import { IPublicUser } from "@/utils/types/users";
import { useParams } from "next/navigation";
import { useEffect } from "react";

// Component

export default (): React.ReactNode => {

    const { id } = useParams();

    const {
        loading,
        data: user,
        call: fetchUser
    } = useFetch<IPublicUser>(`Users/${id}`, {});

    useEffect((): void => {
        fetchUser();
    }, []);

    return (
        <></>
    );
};