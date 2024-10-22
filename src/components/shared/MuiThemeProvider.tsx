"use client";



// Imports

import { IParentProps } from "@/utils/types";
import { createTheme, Theme, ThemeProvider } from "@mui/material";



// Component

export default ({ children }: IParentProps): React.ReactNode => {

    const theme: Theme = createTheme({
        cssVariables: true,
        palette: {
            primary: {
                main: "#4338ca",
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