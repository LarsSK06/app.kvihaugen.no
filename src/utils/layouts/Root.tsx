"use client";



// Imports

import { createTheme, Theme, ThemeProvider } from "@mui/material";
import { Endpoint, IParentProps } from "../types";
import { useEffect, useState } from "react";
import { IPublicUser } from "../types/users";
import { UserContext } from "../contexts";
import { useFetch } from "../hooks/use-fetch";

import Header from "../components/Header";



// Component

export default ({ children }: IParentProps): React.ReactNode => {

    const [user, setUser] = useState<IPublicUser | null>(null);

    const { call: fetchUser } = useFetch<IPublicUser>({
        endpoint: [Endpoint.Users, Endpoint.Me],
        onSuccess: setUser,
        onError: (): void => {}
    });

    useEffect((): void => {
        fetchUser();
    }, []);

    const theme: Theme = createTheme({
        cssVariables: true,
        typography: {
            h1: { fontSize: "3rem" }
        },
        palette: {
            primary: {
                main: "#4338ca",
                contrastText: "#fff"
            },
            secondary: {
                main: "#4338ca",
                contrastText: "#fff"
            }
        },
        defaultColorScheme: "dark"
    });

    return (
        <ThemeProvider theme={theme}>
            <UserContext.Provider value={user}>
                <Header/>
                {children}
            </UserContext.Provider>
        </ThemeProvider>
    );
};