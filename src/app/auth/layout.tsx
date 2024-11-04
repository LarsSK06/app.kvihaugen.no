// Imports

import Poster from "@/utils/components/Poster";

import { IParentProps } from "@/utils/types";



// Component

export default async ({ children }: IParentProps): Promise<React.ReactNode> => (
    <Poster>
        {children}
    </Poster>
);