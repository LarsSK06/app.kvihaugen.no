// Imports

import { useContext } from "react";
import { UserContext, UserContextType } from "../contexts";
import { Button, Link, Skeleton, Typography } from "@mui/material";
import { t } from "../i18n";

import Image from "next/image";



// Types

// Component

export default async (): Promise<React.ReactNode> => {

    const user: UserContextType = useContext(UserContext);

    return (
        <header className="h-header">
            <nav>
                <ul>

                </ul>

                {user ? (
                    <Button
                        aria-label={t("auth.MyProfile")}
                        className=""
                        href={`/users/${user?.id}`}
                    >
                        <img aria-hidden="true" src="https://loremflickr.com/800/800"/>
                        <div className="">
                            <Typography>
                                {user.firstName}
                            </Typography>
                        </div>
                    </Button>
                ) : (
                    <Skeleton/>
                )}
            </nav>
        </header>
    );
};