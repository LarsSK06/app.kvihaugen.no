"use client";



// Imports

import { preventDefault } from "@/utils/functions";
import { useAnchorRouter, UseAnchorRouterFunction } from "@/utils/hooks/use-anchor-router";
import { t } from "@/utils/i18n";



// Types

interface IProps{
    avatar?: string;
    name?: string;
}



// Component

export default ({ avatar, name }: IProps): React.ReactNode => {

    const route: UseAnchorRouterFunction = useAnchorRouter();

    return (
        <a href="/user/@me" onClick={route} onMouseDown={preventDefault} className="w-fit h-fit flex gap-2 justify-start items-center group rounded-default transition-all outline-on-focus">
            {avatar ? (
                <img
                    alt={t("Your avatar")}
                    src={avatar}
                    className="w-auto h-12 aspect-square object-cover rounded-default"
                />
            ) : (
                <div className="skeleton w-auto h-12 aspect-square"/>
            )}
            <div className="w-fit h-fit overflow-hidden">
                {name ? (
                    <div className="flex flex-col gap-1 -translate-x-full transition-all group-focus:-translate-x-0 group-hover:-translate-x-0">
                        <span className="text-xl leading-fit">
                            {name}
                        </span>
                        <span className="text-sm leading-fit">
                            {t("Valid login")}
                        </span>
                    </div>
                ) : (
                    <div className="flex flex-col gap-1">
                        <div className="skeleton w-32 h-5"/>
                        <div className="skeleton w-3/4 h-[14px]"/>
                    </div>
                )}
            </div>
            
        </a>
    );
};