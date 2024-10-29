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
                contrastText: "#fff"
            }
        },
        typography: {
            h1: { fontSize: 56 },
            h2: { fontSize: 48 },
            h3: { fontSize: 40 },
            h4: { fontSize: 32 },
            h5: { fontSize: 24 },
            h6: { fontSize: 16 }
        },
        defaultColorScheme: "dark"
    });

    return (
        <ThemeProvider theme={theme}>
            {children}
        </ThemeProvider>
    );
};