"use client";



// Imports

import TextButton from "@/components/shared/TextButton";
import TextField from "@/components/shared/TextField";
import TorsoCenterContent from "@/components/shared/TorsoCenterContent";
import { formDataToJSON } from "@/utils/functions";

import { useFetch } from "@/utils/hooks/use-fetch";
import { t } from "@/utils/i18n";
import { HTTPMethod } from "@/utils/types";
import { useEffect, useState } from "react";



// Types

interface ICredentials{
    email: string;
    password: string;
}



// Component

export default (): React.ReactNode => {

    const [credentials, setCredentials] = useState<ICredentials>();

    const { loading, data, call } = useFetch<unknown, ICredentials>("Users/LogIn", {
        method: HTTPMethod.POST,
        body: credentials
    });

    async function onSubmit(event: React.FormEvent<HTMLFormElement>): Promise<void>{
        event.preventDefault();

        const parse: ICredentials =
            formDataToJSON(new FormData(event.currentTarget));

        setCredentials(parse);
    }

    useEffect((): void => {
        if(credentials) call();
    }, [credentials]);

    return (
        <TorsoCenterContent>
            <form className="flex flex-col gap-4 box" onSubmit={onSubmit}>
                <h1 className="mx-auto text-4xl">
                    {t("Log in")}
                </h1>
                <TextField
                    required
                    label={t("Email")}
                    placeholder={t("Email...")}
                    type="email"
                />
                <TextField
                    required
                    label={t("Password")}
                    placeholder={t("Password...")}
                    type="password"
                />
                <TextButton>
                    {t("Log in")}
                </TextButton>
            </form>
        </TorsoCenterContent>
    );
};