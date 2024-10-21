"use client";



// Imports

import { useAnchorRouter, UseAnchorRouterFunction } from "@/utils/hooks/use-anchor-router";
import { t } from "@/utils/i18n";
import { Button } from "@mui/material";



// Component

export default (): React.ReactNode => {

    const route: UseAnchorRouterFunction = useAnchorRouter();

    return (
        <nav className="h-full">
            <ul className="h-full flex items-center gap-8">
                <Button href="/" onClick={route} variant="text" className="h-fit" color="primary">
                    {t("Home")}
                </Button>
                <Button href="/users" onClick={route} variant="text" className="h-fit">
                    {t("Users")}
                </Button>
            </ul>
        </nav>
    );
};