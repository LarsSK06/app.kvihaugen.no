"use client";



// Imports

import { formDataToJSON } from "@/utils/functions";
import { useFetch } from "@/utils/hooks/use-fetch";
import { t } from "@/utils/i18n";
import { HTTPMethod } from "@/utils/types";
import { Button, Checkbox, FormControlLabel, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";

import ErrorModal from "@/components/shared/ErrorModal";

// Types

interface ICredentials{
    email: string;
    password: string;
}



// Component

export default (): React.ReactNode => {

    const [error, setError] = useState<string>();
    const [credentials, setCredentials] = useState<ICredentials>();
    const [staySignedIn, setStaySignedIn] = useState<boolean>(false);
    const [showErrorModal, setShowErrorModal] = useState<boolean>(false);

    const {
        loading,
        call
    } = useFetch<string, ICredentials>({
        endpoint: ["Auth", "SignIn"],
        method: HTTPMethod.POST,
        body: credentials,
        stringifyRequestBody: true,
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

    function onSuccess(response: string): void{
        if(staySignedIn) window.localStorage.setItem("token", response);
        else window.sessionStorage.setItem("token", response);

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

    function onCheckboxChange(event: React.ChangeEvent<HTMLInputElement>): void{
        setStaySignedIn(event.target.checked);
    }

    return (
        <>
            <ErrorModal
                open={showErrorModal}
                error={error}
                onClose={(): void => setShowErrorModal(false)}
            />
            <form className="box box-p w-96 flex flex-col gap-4" onSubmit={onSubmit}>
                <Typography variant="h1">
                    {t("auth.SignIn")}
                </Typography>

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

                <FormControlLabel
                    control={
                        <Checkbox
                            onChange={onCheckboxChange}
                            disabled={loading}
                        />
                    }
                    label={t("auth.StaySignedIn")}
                />

                <Button
                    variant="contained"
                    type="submit"
                    disabled={loading}
                >
                    {t("auth.SignIn")}
                </Button>
            </form>
        </>
    );
};