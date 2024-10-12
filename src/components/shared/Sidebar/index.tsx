"use client";



// Imports

import { IParentProps } from "@/utils/types";
import { useState } from "react";

import Handle from "./Handle";



// Types

interface IProps extends IParentProps{
    initialWidth?: number;
    minWidth?: number;
    maxWidth?: number;
}



// Component

export default ({ initialWidth = 300, minWidth = 200, maxWidth = 400, children }: IProps): React.ReactNode => {

    const [width, setWidth] = useState<number>(initialWidth);

    return (
        <aside
            className="h-full relative border-r border-r-glass border-solid"
            style={{ width }}
        >
            <Handle
                width={width}
                minWidth={minWidth}
                maxWidth={maxWidth}
                setWidth={setWidth}
            />
            {children}
        </aside>
    );
};