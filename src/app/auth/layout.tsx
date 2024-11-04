"use server";



// Imports

import Poster from "@/utils/components/Poster";

import { IParentProps } from "@/utils/types";



// Component

export default ({ children }: IParentProps): React.ReactNode => (
    <Poster>
        {children}
    </Poster>
);