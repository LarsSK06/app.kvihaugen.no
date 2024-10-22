// Imports

import { useFetch } from "@/utils/hooks/use-fetch";
import { t } from "@/utils/i18n";
import { IPublicUser, IUserListFilters } from "@/utils/types/users";
import React, { useEffect } from "react";
import { useAnchorRouter, UseAnchorRouterFunction } from "@/utils/hooks/use-anchor-router";
import { nanoid } from "nanoid";
import { Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";



// Types

export interface IProps{
    filters: IUserListFilters;
}



// Component

export default ({ filters }: IProps): React.ReactNode => {

    const route: UseAnchorRouterFunction = useAnchorRouter();

    //const {
    //    loading,
    //    data: users,
    //    call: fetchUsers
    //} = useFetch<IPublicUser[]>("users", {});

    const users: IPublicUser[] = [
        {
            id: 0,
            name: "Lars Kvihaugen",
            email: "lars@kvihaugen.no",
            admin: true
        },
        {
            id: 0,
            name: "Lars Kvihaugen",
            email: "lars@kvihaugen.no",
            admin: true
        }
    ];

    //useEffect((): void => {
    //    fetchUsers();
    //}, [filters]);

    return (
        <>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>
                            <Typography>
                                {t("Id")}
                            </Typography>
                        </TableCell>
                        <TableCell>
                            <Typography>
                                {t("Name")}
                            </Typography>
                        </TableCell>
                        <TableCell>
                            <Typography>
                                {t("Email")}
                            </Typography>
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {users && users.map((i: IPublicUser): React.ReactNode => (
                        <TableRow>
                            <TableCell>
                                <Typography>
                                    {i.id}
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography>
                                    {i.name}
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography>
                                    {i.email}
                                </Typography>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </>
    );
};