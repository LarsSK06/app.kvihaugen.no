// Imports

import { IParentProps } from "@/utils/types";

import "@/utils/css/globals.css";



// Component

export default async ({ children }: IParentProps): Promise<React.ReactNode> => (
    <html lang="en">
        <body>
            {children}
        </body>
    </html>
);