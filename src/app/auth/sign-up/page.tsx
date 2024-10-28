"use client";



// Imports

import { formDataToJSON } from "@/utils/functions";
import { useFetch } from "@/utils/hooks/use-fetch";
import { t } from "@/utils/i18n";
import { HTTPMethod } from "@/utils/types";
import { Button, Checkbox, FormControlLabel, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";

import ErrorModal from "@/components/shared/ErrorModal";
import Link from "next/link";
import { Endpoint, IPassport } from "@/utils/types/auth";

// Types

interface ICredentials{
    email: string;
    password: string;
}



// Component

export default (): React.ReactNode => {

    const [error, setError] = useState<string>();
    const [credentials, setCredentials] = useState<ICredentials>();
    const [showErrorModal, setShowErrorModal] = useState<boolean>(false);

    const {
        loading,
        call
    } = useFetch<IPassport, ICredentials>({
        endpoint: [Endpoint.Auth, Endpoint.SignUp],
        method: HTTPMethod.POST,
        body: credentials,
        onSuccess,
        onError: (error: string): void => {
            setError(error);
            setShowErrorModal(true);
        }
    });

    useEffect((): void => {
        if(credentials) call();
    }, [credentials]);

    useEffect((): void => {
        if(error) setShowErrorModal(true);
    }, [error]);

    function onSuccess(response: IPassport): void{
        window.localStorage.setItem("token", response.token);
        window.localStorage.setItem("userId", response.user.id.toString());
        window.location.href = "/";
    }

    function onSubmit(event: React.FocusEvent<HTMLFormElement>): void{
        event.preventDefault();

        const formData: FormData =
            new FormData(event.currentTarget);
        
        const parse: ICredentials =
            formDataToJSON<ICredentials>(formData);
        
        setCredentials(parse);
    }

    return (
        <>
            <ErrorModal
                id="error-modal"
                open={showErrorModal}
                error={error}
                onClose={(): void => setShowErrorModal(false)}
            />
            <form className="box box-p w-96 flex flex-col gap-4" onSubmit={onSubmit}>
                <Typography variant="h1">
                    {t("auth.SignUp")}
                </Typography>

                <TextField
                    required
                    autoFocus
                    label={t("all.Name")}
                    placeholder={t("all.Name")}
                    type="text"
                    name="name"
                    disabled={loading}
                />

                <TextField
                    required
                    autoFocus
                    label={t("all.Email")}
                    placeholder={t("all.Email")}
                    type="email"
                    name="email"
                    disabled={loading}
                />

                <TextField
                    required
                    label={t("all.Password")}
                    placeholder={t("all.Password")}
                    type="password"
                    name="password"
                    disabled={loading}
                />

                <Button
                    variant="contained"
                    type="submit"
                    disabled={loading}
                >
                    {t("auth.SignIn")}
                </Button>

                <Link href="/auth/sign-in">
                    {t("auth.SwitchToSignIn")}
                </Link>
            </form>
        </>
    );
};