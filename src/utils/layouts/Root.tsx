"use client";



// Imports

import { createTheme, Theme, ThemeProvider } from "@mui/material";
import { Endpoint, IParentProps } from "../types";
import { useEffect } from "react";
import { IPublicUser } from "../types/users";
import { useFetch } from "../hooks/use-fetch";
import { useUserStore } from "../zustand";

import Header from "../components/Header";



// Component

export default ({ children }: IParentProps): React.ReactNode => {

    const { put: setUser } = useUserStore();
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
            <Header/>
            {children}
        </ThemeProvider>
    );
};