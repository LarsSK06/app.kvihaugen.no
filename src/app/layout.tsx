// Imports

import ThemeProfileProvider from "@/utils/components/ThemeProfileProvider";

import { IParentProps } from "@/utils/types";

import "@/utils/styles/globals.css";



// Component

export default async ({ children }: IParentProps): Promise<React.ReactNode> => (
    <html lang="en">
        <body className="bg-color-1">
            <ThemeProfileProvider>
                {children}
            </ThemeProfileProvider>
        </body>
    </html>
);