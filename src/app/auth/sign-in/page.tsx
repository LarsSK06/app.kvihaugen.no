"use client";



// Imports

import HorizontalRule from "@/utils/components/HorizontalRule";
import Poster from "@/utils/components/Poster";

import { formDataToJSON } from "@/utils/functions";
import { useFetch } from "@/utils/hooks/use-fetch";
import { t } from "@/utils/i18n";
import { Endpoint, HTTPMethod } from "@/utils/types";
import { ISignInData } from "@/utils/types/auth";
import { useTokenStore } from "@/utils/zustand";
import { Button, TextField, Typography } from "@mui/material";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";



// Component

export default (): React.ReactNode => {

    const router: AppRouterInstance = useRouter();

    const { put: setToken } = useTokenStore();

    const [showErrorMessage, setShowErrorMessage] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [data, setData] = useState<ISignInData | null>(null);

    const { loading, call } = useFetch<string, ISignInData>({
        endpoint: [Endpoint.Auth, Endpoint.SignIn],
        method: HTTPMethod.POST,
        body: data ?? undefined,
        onSuccess: (value: string): void => {
            setToken(value);

            router.replace("/");
        },
        onError: (value: string): void => {
            if(error === value) setShowErrorMessage(true);
            else setError(value);
        }
    });

    useEffect((): void => {
        if(data) call();
    }, [data]);

    useEffect((): void => {
        if(error) setShowErrorMessage(true);
    }, [error]);

    function onSubmit(event: React.FormEvent<HTMLFormElement>): void{
        event.preventDefault();

        setData(formDataToJSON<ISignInData>(new FormData(event.currentTarget)));
    }

    return (
        <Poster>
            <form onSubmit={onSubmit} className="w-96 box flex flex-col gap-4">
                <Typography variant="h1">
                    {t("auth.SignIn")}
                </Typography>

                <HorizontalRule/>

                <div className="w-64 mx-auto aspect-square rounded-full bg-color-2">
                    <svg></svg>
                </div>

                <HorizontalRule/>

                <TextField
                    required
                    id="email"
                    name="email"
                    variant="filled"
                    label={t("all.Email")}
                    placeholder={t("all.Email")}
                    type="email"
                    disabled={loading}
                />

                <TextField
                    required
                    id="password"
                    name="password"
                    variant="filled"
                    label={t("all.Password")}
                    placeholder={t("all.Password")}
                    type="password"
                    disabled={loading}
                />

                {showErrorMessage && (
                    <Typography color="red">
                        {error}
                    </Typography>
                )}

                <Button
                    variant="outlined"
                    type="submit"
                    disabled={loading}
                >
                    {t("auth.SignIn")}
                </Button>
            </form>
        </Poster>
    );
};