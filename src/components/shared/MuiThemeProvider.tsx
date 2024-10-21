"use client";



// Imports

import { IParentProps } from "@/utils/types";
import { createTheme, Theme, ThemeProvider } from "@mui/material";



// Component

export default ({ children }: IParentProps): React.ReactNode => {

    const theme: Theme = createTheme({});

    return (
        <ThemeProvider theme={theme}>
            {children}
        </ThemeProvider>
    );
};