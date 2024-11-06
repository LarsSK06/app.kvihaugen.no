"use client";



// Imports

import HorizontalRule from "@/utils/components/HorizontalRule";
import Poster from "@/utils/components/Poster";

import { formDataToJSON } from "@/utils/functions";
import { useFetch } from "@/utils/hooks/use-fetch";
import { t } from "@/utils/i18n";
import { Endpoint, HTTPMethod } from "@/utils/types";
import { ISignUpData } from "@/utils/types/auth";
import { Button, TextField, Typography } from "@mui/material";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";



// Component

export default (): React.ReactNode => {

    const router: AppRouterInstance = useRouter();

    //if(window.localStorage.getItem("token") != null){
    //    window.location.href = "/";

    //    return <></>;
    //}

    const [showErrorMessage, setShowErrorMessage] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [payload, setPayload] = useState<ISignUpData | null>(null);

    const { loading, call } = useFetch<string, ISignUpData>({
        endpoint: [Endpoint.Auth, Endpoint.SignIn],
        method: HTTPMethod.POST,
        body: payload ?? undefined,
        onSuccess: (value: string): void => {
            window.localStorage.setItem("token", value);

            router.refresh();
        },
        onError: (value: string): void => {
            if(error === value) setShowErrorMessage(true);
            else setError(value);
        }
    });

    useEffect((): void => {
        if(payload) call();
    }, [payload]);

    useEffect((): void => {
        if(error) setShowErrorMessage(true);
    }, [error]);

    function onSubmit(event: React.FormEvent<HTMLFormElement>): void{
        event.preventDefault();

        setPayload(formDataToJSON(new FormData(event.currentTarget)));
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