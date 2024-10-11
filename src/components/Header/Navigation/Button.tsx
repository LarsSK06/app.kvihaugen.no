"use client";



// Imports

import { preventDefault } from "@/utils/functions";
import { useAnchorRouter, UseAnchorRouterFunction } from "@/utils/hooks/use-anchor-router";
import { IParentProps } from "@/utils/types";



// Types

interface IProps extends IParentProps<string>{
    href: string;
}



// Component

export default ({ href, children }: IProps): React.ReactNode => {

    const route: UseAnchorRouterFunction = useAnchorRouter();

    return (
        <li className="h-full flex items-center transition-all">
            <a href={href} onClick={route} onMouseDown={preventDefault} className="h-fit px-2 text-xl rounded-default outline-on-focus transition-all">
                {children}
            </a>
        </li>
    );
};