// Imports

import { IParentProps } from "@/utils/types";

import Root from "@/utils/layouts/Root";

import "@/utils/styles/globals.css";



// Component

export default async ({ children }: IParentProps): Promise<React.ReactNode> => (
    <html lang="en">
        <body className="bg-color-1">
            <Root>
                {children}
            </Root>
        </body>
    </html>
);