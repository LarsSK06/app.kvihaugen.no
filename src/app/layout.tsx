// Imports

import "@/utils/css/globals.css";
import "@/utils/i18n";

import { IParentProps } from "@/utils/types";
import { Metadata } from "next";

import Header from "@/components/shared/Header";
import MuiThemeProvider from "@/components/shared/MuiThemeProvider";



// Metadata

export const metadata: Metadata = {
    title: "Kvihaugen",
    description: "Appen til Kvihaugen"
};



// Component

export default ({ children }: IParentProps): React.ReactNode => (
    <MuiThemeProvider>
        <html lang="en">
            <body className="bg-color-1">
                <Header/>
                {children}
            </body>
        </html>
    </MuiThemeProvider>
);