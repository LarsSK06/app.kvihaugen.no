"use client";



// Imports

import HorizontalRule from "@/utils/components/HorizontalRule";
import Poster from "@/utils/components/Poster";

import { formDataToJSON } from "@/utils/functions";
import { useFetch } from "@/utils/hooks/use-fetch";
import { t } from "@/utils/i18n";
import { Endpoint, HTTPMethod } from "@/utils/types";
import { Gender, ISignUpData } from "@/utils/types/auth";
import { Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";



// Component

export default (): React.ReactNode => {

    const router: AppRouterInstance = useRouter();

    const [showErrorMessage, setShowErrorMessage] = useState<boolean>(false);
    const [requestOk, setRequestOk] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [payload, setPayload] = useState<ISignUpData | null>(null);

    const { loading, call } = useFetch<undefined, ISignUpData>({
        endpoint: [Endpoint.Auth, Endpoint.SignUp],
        method: HTTPMethod.POST,
        body: payload ?? undefined,
        onSuccess: (): void => setRequestOk(true),
        onError: (value: string): void => {
            if(error === value) setShowErrorMessage(true);
            else setError(value);
        }
    });

    useEffect((): void => {
        if(window.localStorage.getItem("token"))
            router.push("/");
    }, []);

    useEffect((): void => {
        if(payload) call();
    }, [payload]);

    function onSubmit(event: React.FormEvent<HTMLFormElement>): void{
        event.preventDefault();

        setPayload(formDataToJSON(new FormData(event.currentTarget)));
    }

    return (
        <Poster>
            {requestOk ? (
                <Typography variant="h1">
                    {t("messages.ConfirmationSentToAdmin")}
                </Typography>
            ) : (
                <form onSubmit={onSubmit} className="box flex flex-col gap-4">
                    <Typography variant="h1">
                        {t("auth.SignUp")}
                    </Typography>

                    <HorizontalRule/>

                    <div className="w-64 mx-auto aspect-square rounded-full bg-color-2">
                        <svg></svg>
                    </div>

                    <HorizontalRule/>

                    <div className="flex gap-4">
                        <TextField
                            id="firstName"
                            name="firstName"
                            variant="filled"
                            label={t("all.FirstName")}
                            placeholder={t("all.FirstName")}
                            disabled={loading}
                        />
                        <TextField
                            id="lastName"
                            name="lastName"
                            variant="filled"
                            label={t("all.LastName")}
                            placeholder={t("all.LastName")}
                            disabled={loading}
                        />
                    </div>

                    <FormControl>
                        <InputLabel variant="filled">
                            {t("all.Gender")}
                        </InputLabel>
                        <Select
                            id="gender"
                            name="gender"
                            label={t("all.Gender")}
                            placeholder={t("all.Gender")}
                            variant="filled"
                            defaultValue={Gender.Male}
                            disabled={loading}
                        >
                            <MenuItem value={Gender.Male}>
                                {t("all.Male")}
                            </MenuItem>
                            <MenuItem value={Gender.Female}>
                                {t("all.Female")}
                            </MenuItem>
                            <MenuItem value={Gender.Other}>
                                {t("all.Other")}
                            </MenuItem>
                            <MenuItem value={Gender.Undefined}>
                                {t("all.Undefined")}
                            </MenuItem>
                        </Select>
                    </FormControl>

                    <TextField
                        id="email"
                        name="email"
                        variant="filled"
                        label={t("all.Email")}
                        placeholder={t("all.Email")}
                        type="email"
                        disabled={loading}
                    />

                    <TextField
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
                        {t("auth.SignUp")}
                    </Button>
                </form>   
            )}
        </Poster>
    );
};