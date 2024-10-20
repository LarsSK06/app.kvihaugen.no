"use client";



// Imports

import { IParentProps } from "@/utils/types";
import { MutableRefObject, useRef, useState } from "react";

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

    const aside: MutableRefObject<HTMLElement | null> = useRef<HTMLElement>(null);

    return (
        <aside
            className="h-full relative border-r border-r-color-2 border-solid"
            style={{ width }}
            ref={aside}
        >
            <Handle
                clientLeft={aside.current?.clientLeft}
                width={width}
                minWidth={minWidth}
                maxWidth={maxWidth}
                setWidth={setWidth}
            />
            {children}
        </aside>
    );
};