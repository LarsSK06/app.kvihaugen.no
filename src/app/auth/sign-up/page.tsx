"use client";



// Imports

import HorizontalRule from "@/utils/components/HorizontalRule";

import { formDataToJSON } from "@/utils/functions";
import { useFetch } from "@/utils/hooks/use-fetch";
import { t } from "@/utils/i18n";
import { Endpoint, HTTPMethod } from "@/utils/types";
import { Gender, IPassport, ISignUpData } from "@/utils/types/auth";
import { Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";



// Component

export default (): React.ReactNode => {

    const [showErrorModal, setShowErrorModal] = useState<boolean>(false);

    const [error, setError] = useState<string>();
    const [payload, setPayload] = useState<ISignUpData>();

    const { loading, call } = useFetch<IPassport, ISignUpData>({
        endpoint: [Endpoint.Auth, Endpoint.SignUp],
        method: HTTPMethod.POST,
        body: payload,
        onSuccess: (value: IPassport) => {},
        onError: (value: string) => {
            if(value === error) setShowErrorModal(true);
            else setError(value);
        }
    });

    useEffect((): void => {
        if(payload) call();
    }, [payload]);

    function onSubmit(event: React.FormEvent<HTMLFormElement>): void{
        event.preventDefault();

        setPayload(formDataToJSON(new FormData(event.currentTarget)));
    }

    return (
        <form onSubmit={onSubmit} className="box flex flex-col gap-4">
            <Typography variant="h1">
                {t("auth.SignUp")}
            </Typography>
            <HorizontalRule/>
            <div className="w-64 mx-auto overflow-hidden rounded-full bg-color-2">
                <svg></svg>
            </div>
            <HorizontalRule/>
            <div className="flex gap-4">
                <TextField
                    id="firstName"
                    name="firstName"
                    label={t("all.FirstName")}
                    placeholder={t("all.FirstName")}
                    variant="filled"
                    type="text"
                    disabled={loading}
                />
                <TextField
                    id="lastName"
                    name="lastName"
                    label={t("all.LastName")}
                    placeholder={t("all.LastName")}
                    variant="filled"
                    type="text"
                    disabled={loading}
                />
            </div>
            <FormControl>
                <InputLabel id="gender-label" variant="filled">
                    {t("all.Gender")}
                </InputLabel>
                <Select
                    id="gender"
                    name="gender"
                    labelId="gender-label"
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
                label={t("all.Email")}
                placeholder={t("all.Email")}
                variant="filled"
                type="email"
                disabled={loading}
            />
            <TextField
                id="password"
                name="password"
                label={t("all.Password")}
                placeholder={t("all.Password")}
                variant="filled"
                type="password"
                disabled={loading}
            />
            <Button
                variant="outlined"
                type="submit"
                disabled={loading}
            >
                <Typography>
                    {t("auth.SignUp")}
                </Typography>
            </Button>
            <Button
                variant="text"
                disabled={loading}
                href="/sign-in"
            >
                <Typography>
                    {t("auth.SwitchToSignIn")}
                </Typography>
            </Button>
        </form>
    );
};