"use client";



// Imports

import { MutableRefObject, useRef, useState } from "react";
import { TextType } from "@/utils/types";

import ControlPanel from "./components/ControlPanel";



// Types

type TextElement =
    HTMLHeadingElement |
    HTMLParagraphElement;



// Component

export default () => {

    const [textType, setTextType] = useState<TextType>(TextType.P);
    const [content, setContent] = useState<string>("<p>Hello world!</p>");

    const richTextEditor: MutableRefObject<HTMLDivElement | null> =
        useRef<HTMLDivElement | null>(null);

    function onKeyDown(event: React.KeyboardEvent<HTMLDivElement>): void{
        if(event.key != "Enter") return;
        if(!richTextEditor.current) return;

        event.preventDefault();

        const focusedEl: Element | null = document.activeElement;
        const newEl: TextElement = document.createElement(textType);

        richTextEditor.current.insertBefore(newEl, focusedEl?.nextSibling ?? null);
    }

    return (
        <div className="w-main mx-auto my-12">
            <ControlPanel setTextType={setTextType}/>

            <div
                ref={richTextEditor}
                contentEditable="true"
                dangerouslySetInnerHTML={{ __html: content }}
                className="w-main h-96 p-4 mt-12 mx-auto block bg-white text-black resize-none"
                onKeyDown={onKeyDown}
            ></div>
        </div>
    );
};