// Imports

import { Button, Typography } from "@mui/material";
import { t } from "../i18n";
import { useAnchorRouting, UseAnchorRoutingFunction } from "../hooks/use-anchor-routing";



// Types

type Button = [string, string];



// Component

export default (): React.ReactNode => {

    const route: UseAnchorRoutingFunction = useAnchorRouting();

    const buttons: Button[] = [
        [t("all.Home"), "/"],
        [t("all.Users"), "/users"],
        //user ? [user.firstName, "/users/@me"] : [t("auth.SignIn"), "/auth/sign-in"]
    ];

    return (
        <header className="h-header">
            <nav className="w-main max-w-full h-full px-4 mx-auto">
                <ul className="h-full flex items-center gap-4">
                    {buttons.map((i: Button): React.ReactNode => {
                        const [text, href] = i;

                        return (
                            <li key={href}>
                                <Button href={href} onClick={route}>
                                    <Typography>
                                        {text}
                                    </Typography>
                                </Button>
                            </li>
                        );
                    })}
                </ul>
            </nav>
        </header>
    );
};