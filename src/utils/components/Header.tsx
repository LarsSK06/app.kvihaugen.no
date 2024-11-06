// Imports

import { useContext, useEffect } from "react";
import { Box, Button, Skeleton, Typography } from "@mui/material";
import { t } from "../i18n";
import { PassportContext, PassportContextType } from "../contexts";
import { useFetch } from "../hooks/use-fetch";
import { Endpoint } from "../types";
import { IPublicUser } from "../types/users";



// Types

interface IButton{
    text: string;
    href: string;
}



// Component

export default (): React.ReactNode => {

    const passportContext: PassportContextType =
        useContext<PassportContextType>(PassportContext);

    const buttons: IButton[] = [
        { text: t("all.Home"), href: "/" }
    ].concat(
        passportContext.passport
            ? []
            : { text: t("auth.SignIn"), href: "/auth/sign-in" }
    );

    const {
        loading: isUserLoading,
        call: fetchUser
    } = useFetch<IPublicUser>({
        endpoint: [Endpoint.Users, Endpoint.Me],
        onSuccess: (value: IPublicUser): void => {
            if(passportContext.setPassport && passportContext.passport)
                passportContext.setPassport({
                    ...passportContext.passport,
                    user: value
                });
        },
        onError: (): void => {}
    });

    useEffect((): void => {
        fetchUser();
    }, []);

    return (
        <header className="h-header">
            <nav className="w-main max-w-full h-full px-4 mx-auto">
                <ul className="h-full flex items-center gap-4">
                    {buttons.map((i: IButton): React.ReactNode => (
                        <li className="h-fit" key={i.href}>
                            <Button href={i.href}>
                                <Typography>
                                    {i.text}
                                </Typography>
                            </Button>
                        </li>
                    ))}
                    {passportContext.passport?.user && (
                        <li>
                            {isUserLoading ? (
                                <Skeleton/>
                            ) : (
                                <Button href="/users/@me">
                                    <img src="https://loremflickr.com/800/800"/>
                                    <div>
                                        <Typography>
                                            {passportContext.passport.user.firstName}
                                        </Typography>
                                    </div>
                                </Button>
                            )}
                        </li>
                    )}
                </ul>
            </nav>
        </header>
    );
};