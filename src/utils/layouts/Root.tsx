"use client";



// Imports

import { createTheme, Theme, ThemeProvider } from "@mui/material";
import { IParentProps } from "../types";
import { useState } from "react";
import { IPassport } from "../types/auth";
import { PassportContext } from "../contexts";

import Header from "../components/Header";



// Component

export default ({ children }: IParentProps): React.ReactNode => {

    const [passport, setPassport] = useState<IPassport | null>(null);

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
            <PassportContext.Provider value={{ passport, setPassport }}>
                <Header/>
                {children}
            </PassportContext.Provider>
        </ThemeProvider>
    );
};