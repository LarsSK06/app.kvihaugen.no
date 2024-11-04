"use client";



// Imports

import { createTheme, Theme, ThemeProvider } from "@mui/material";
import { IParentProps } from "../types";



// Component

export default ({ children }: IParentProps): React.ReactNode => {

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
            {children}
        </ThemeProvider>
    );
};