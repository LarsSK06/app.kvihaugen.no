// Imports

import { preventDefault } from "@/utils/functions";
import { Func } from "@/utils/types";
import { useEffect, useState } from "react";



// Types

interface IProps{
    clientLeft?: number;
    width: number;
    minWidth: number;
    maxWidth: number;
    setWidth: (value: number) => void;
}



// Component

export default ({ clientLeft = 0, width, minWidth, maxWidth, setWidth }: IProps): React.ReactNode => {

    const [dragging, setDragging] = useState<boolean>(false);
    const [focused, setFocused] = useState<boolean>(false);
    const [hovered, setHovered] = useState<boolean>(false);

    useEffect((): Func => {

        function onMouseMove(event: MouseEvent): void{
            if(!dragging) return;

            let targetWidth: number = clientLeft + event.clientX;

            targetWidth = Math.min(targetWidth, maxWidth);
            targetWidth = Math.max(targetWidth, minWidth);

            setWidth(targetWidth);
        }

        function onMouseUp(): void{
            setDragging(false);
        }

        window.addEventListener("mousemove", onMouseMove);
        window.addEventListener("mouseup", onMouseUp);

        return (): void => {
            window.removeEventListener("mousemove", onMouseMove);
            window.removeEventListener("mouseup", onMouseUp);
        };
    }, [width, dragging]);

    useEffect((): Func => {

        function onKeyDown(event: KeyboardEvent): void{
            if(!focused) return;

            let targetWidth: number = width;

            switch(event.key){
                case "ArrowRight":
                    targetWidth += 5;
                    break;

                case "ArrowLeft":
                    targetWidth -= 5;
                    break;
            }

            if(targetWidth <= minWidth) return;
            if(targetWidth >= maxWidth) return;

            setWidth(targetWidth);
        }

        window.addEventListener("keydown", onKeyDown);

        return (): void => {
            window.removeEventListener("keydown", onKeyDown);
        };
    }, [width, focused]);

    function onMouseDown(event: React.MouseEvent): void{
        event.preventDefault();

        setDragging(true);
    }

    return (
        <button
            className="w-3 h-full absolute top-0 -right-1.5"
            onClick={preventDefault}
            onFocus={(): void => setFocused(true)}
            onBlur={(): void => setFocused(false)}
            onMouseEnter={(): void => setHovered(true)}
            onMouseLeave={(): void => setHovered(false)}
            onMouseDown={onMouseDown}
            style={{
                cursor: dragging
                    ? "grabbing"
                    : "grab"  
            }}
        >
            <div
                className="h-full mx-auto bg-accent transition-all"
                style={{
                    width: focused || hovered || dragging
                        ? "100%"
                        : 0
                }}
            />
        </button>
    );
};