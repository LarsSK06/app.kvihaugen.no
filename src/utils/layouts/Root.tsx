"use client";



// Imports

import { createTheme, Theme, ThemeProvider } from "@mui/material";
import { IParentProps } from "../types";
import { UserContext } from "../contexts";
import { useState } from "react";
import { IPublicUser } from "../types/users";
import Header from "../components/Header";



// Component

export default ({ children }: IParentProps): React.ReactNode => {

    const [token, setToken] = useState<string | null>(null);
    const [user, setUser] = useState<IPublicUser | null>(null);

    const theme: Theme = createTheme({
        cssVariables: true,
        typography: {
            h1: { fontSize: "4rem" }
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
            <UserContext.Provider value={{ user, setUser }}>
                <Header/>
                {children}
            </UserContext.Provider>
        </ThemeProvider>
    );
};