"use client";



// Imports

import { useAnchorRouter, UseAnchorRouterFunction } from "@/utils/hooks/use-anchor-router";
import { t } from "@/utils/i18n";
import { Button } from "@mui/material";
import { nanoid } from "nanoid";



// Types

interface IButton{
    href: string;
    text: string;
}



// Component

export default (): React.ReactNode => {

    const route: UseAnchorRouterFunction = useAnchorRouter();

    const buttons: IButton[] = [
        { href: "/", text: t("all.Home") },
        { href: "/users", text: t("all.Users") }
    ].concat(
        { href: "/auth/sign-in", text: t("auth.SignIn") }
    );

    return (
        <nav className="h-full">
            <ul className="h-full flex items-center gap-8">
                {buttons.map((i: IButton): React.ReactNode => (
                    <li key={nanoid()}>
                        <Button href={i.href} onClick={route}>
                            {i.text}
                        </Button>
                    </li>
                ))}
            </ul>
        </nav>
    );
};