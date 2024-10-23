"use client";



import { formDataToJSON } from "@/utils/functions";
// Imports

import { useFetch } from "@/utils/hooks/use-fetch";
import { t } from "@/utils/i18n";
import { HTTPMethod } from "@/utils/types";
import { Button, Checkbox, FormControlLabel, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";

// Types

interface ICredentials{
    email: string;
    password: string;
}



// Component

export default (): React.ReactNode => {

    const [credentials, setCredentials] = useState<ICredentials>();
    const [error, setError] = useState<string>();

    const {
        loading,
        data,
        call
    } = useFetch<string>(["Auth", "SignIn"], {
        method: HTTPMethod.POST,
        body: credentials,
        onError: console.log
    });

    useEffect((): void => {
        if(credentials) call();
    }, [credentials]);

    useEffect((): void => {
        if(!data) return;

        window.localStorage.setItem("token", data);
        window.location.href = "/";
    }, [data]);

    function onSubmit(event: React.FocusEvent<HTMLFormElement>): void{
        event.preventDefault();

        const formData: FormData =
            new FormData(event.currentTarget);
        
        const parse: ICredentials =
            formDataToJSON<ICredentials>(formData);
        
        setCredentials(parse);
    }

    return (
        <form className="box w-96 flex flex-col gap-4" onSubmit={onSubmit}>
            <Typography variant="h1">
                {t("Sign in")}
            </Typography>

            <TextField
                required
                label={t("Email")}
                placeholder={t("Email")}
                type="email"
                name="email"
            />

            <TextField
                required
                label={t("Password")}
                placeholder={t("Password")}
                type="password"
                name="password"
            />

            <FormControlLabel
                control={<Checkbox/>}
                label={t("Stay signed in")}
            />

            <Button
                variant="contained"
                type="submit"
            >
                {t("Sign in")}
            </Button>
        </form>
    );
};