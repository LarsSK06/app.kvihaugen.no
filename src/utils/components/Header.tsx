// Imports

import { useEffect, useState } from "react";
import { Button, Typography } from "@mui/material";
import { t } from "../i18n";
import { useFetch } from "../hooks/use-fetch";
import { Endpoint } from "../types";
import { IPublicUser } from "../types/users";
import { useAnchorRouting, UseAnchorRoutingFunction } from "../hooks/use-anchor-routing";



// Types

type Button = [string, string];



// Component

export default (): React.ReactNode => {

    const [user, setUser] = useState<IPublicUser | null>(null);

    const route: UseAnchorRoutingFunction = useAnchorRouting();

    const buttons: Button[] = [
        [t("all.Home"), "/"],
        [t("all.Users"), "/users"],
        user ? [user.firstName, "/users/@me"] : [t("auth.SignIn"), "/auth/sign-in"]
    ];

    const {
        loading: isUserLoading,
        call: fetchUser
    } = useFetch<IPublicUser>({
        endpoint: [Endpoint.Users, Endpoint.Me],
        onSuccess: setUser,
        onError: (): void => {
            setUser(null);
            
            window.localStorage.removeItem("token");
        }
    });

    useEffect((): void => {
        fetchUser();
    }, []);

    return (
        <header className="h-header">
            <nav className="w-main max-w-full h-full px-4 mx-auto">
                <ul className="h-full flex items-center gap-4">
                    {buttons.map((i: Button): React.ReactNode => {
                        const [text, href] = i;

                        return (
                            <li key={href}>
                                <Button href={href} onClick={route}>
                                    <Typography>
                                        {text}
                                    </Typography>
                                </Button>
                            </li>
                        );
                    })}
                </ul>
            </nav>
        </header>
    );
};