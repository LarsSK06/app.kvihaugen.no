// Imports

import "@/utils/css/globals.css";

import { IParentProps } from "@/utils/types";
import { Metadata } from "next";

import Header from "@/components/shared/Header";



// Metadata

export const metadata: Metadata = {
    title: "Kvihaugen",
    description: "Appen til Kvihaugen"
};



// Component

export default ({ children }: IParentProps): React.ReactNode => {
    return (
        <html lang="en">
            <body className="bg-color-1">
                <Header/>
                {children}
            </body>
        </html>
    );
};