// Imports

import { useContext } from "react";
import { UserContext, UserContextType } from "../contexts";
import { Box, Button, Skeleton, Typography } from "@mui/material";
import { t } from "../i18n";



// Types

interface IButton{
    text: string;
    href: string;
}



// Component

export default (): React.ReactNode => {

    const userContext: UserContextType = useContext(UserContext);

    const buttons: IButton[] = [
        { text: t("all.Home"), href: "/" }
    ];

    return (
        <header className="h-header">
            <nav>
                <ul>
                    {buttons.map((i: IButton): React.ReactNode => (
                        <Button key={i.href} href={i.href}>
                            <Typography>
                                {i.text}
                            </Typography>
                        </Button>
                    ))}
                </ul>
            </nav>
        </header>
    );
};