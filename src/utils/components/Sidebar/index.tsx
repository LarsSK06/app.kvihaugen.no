"use client";



// Imports

import { IParentProps } from "@/utils/types";
import { useState } from "react";

import DragHandle from "./DragHandle";



// Types

interface IProps extends IParentProps{
    id?: string;
    initialWidth?: number;
    minWidth?: number;
    maxWidth?: number;
}



// Component

export default ({
    id,
    initialWidth = 300,
    minWidth = 200,
    maxWidth = 500,
    children
}: IProps): React.ReactNode => {

    const [width, setWidth] = useState<number>(initialWidth);
    const [isDragging, setIsDragging] = useState<boolean>(false);

    return (
        <aside className="h-full relative border-r-color-3 border-r border-solid" style={{ width }}>
            <DragHandle
                id={id}
                minWidth={minWidth}
                maxWidth={maxWidth}
                isDragging={isDragging}
                width={width}
                setIsDragging={setIsDragging}
                setWidth={setWidth}
            />
            <div className="w-full h-full">
                {children}
            </div>
        </aside>
    );
};