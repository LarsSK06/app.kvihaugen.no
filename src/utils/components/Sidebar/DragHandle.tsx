// Imports

import { t } from "@/utils/i18n";
import { Func } from "@/utils/types";
import { useEffect, useState } from "react";



// Types

interface IProps{
    id?: string;
    minWidth: number;
    maxWidth: number;
    isDragging: boolean;
    width: number;
    setIsDragging: (value: boolean) => void;
    setWidth: (value: number) => void;
}



// Component

export default ({ id, minWidth, maxWidth, isDragging, width, setIsDragging, setWidth }: IProps): React.ReactNode => {

    const [isFocus, setIsFocus] = useState<boolean>(false);
    const [isHover, setIsHover] = useState<boolean>(false);

    useEffect((): Func => {

        function onMouseUp(): void{
            setIsDragging(false);
        }

        function onMouseMove(event: MouseEvent): void{
            if(!isDragging) return;

            let targetWidth: number = event.x;

            targetWidth = Math.min(targetWidth, maxWidth);
            targetWidth = Math.max(targetWidth, minWidth);

            setWidth(targetWidth);
        }

        window.addEventListener("mouseup", onMouseUp);
        window.addEventListener("mousemove", onMouseMove);

        return (): void => {
            window.removeEventListener("mouseup", onMouseUp);
            window.removeEventListener("mousemove", onMouseMove);
        };
    }, [isDragging, width]);

    useEffect((): Func => {

        function onKeyDown(event: KeyboardEvent): void{
            if(!isFocus) return;
            if(!["ArrowLeft", "ArrowRight"].includes(event.key)) return;

            let targetWidth: number = width;

            switch(event.key){
                case "ArrowLeft":
                    if(targetWidth <= minWidth)
                        return;
                    
                    targetWidth -= 5;

                    break;

                case "ArrowRight":
                    if(targetWidth >= maxWidth)
                        return;

                    targetWidth += 5;

                    break;
            }

            setWidth(targetWidth);
        }

        window.addEventListener("keydown", onKeyDown);

        return (): void => {
            window.removeEventListener("keydown", onKeyDown);
        };
    }, [isFocus, width]);

    function onMouseDown(event: React.MouseEvent<HTMLButtonElement>): void{
        event.preventDefault();

        setIsDragging(true);
    }

    const interactiveState: boolean =
        isDragging ||
        isFocus ||
        isHover;

    return (
        <button
            style={{ cursor: isDragging ? "grabbing" : "grab" }}
            aria-controls={id}
            aria-label={t("labels.ResizeSidebar")}
            title={t("labels.ResizeSidebar")}
            className="w-2 h-full absolute -right-1 group"
            onMouseDown={onMouseDown}
            onMouseEnter={(): void => setIsHover(true)}
            onMouseLeave={(): void => setIsHover(false)}
            onFocus={(): void => setIsFocus(true)}
            onBlur={(): void => setIsFocus(false)}
        >
            <div
                style={{ width: interactiveState ? "100%" : 0 }}
                className="w-0 mx-auto h-full bg-accent transition-all"
            />
        </button>
    );
};