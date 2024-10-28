// Imports

import { useFetch } from "@/utils/hooks/use-fetch";
import { t } from "@/utils/i18n";
import { IPublicUser, IUserListFilters } from "@/utils/types/users";
import { useEffect, useState } from "react";
import { useAnchorRouter, UseAnchorRouterFunction } from "@/utils/hooks/use-anchor-router";
import { nanoid } from "nanoid";
import { Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";
import { Endpoint } from "@/utils/types/auth";
import { HTTPMethod } from "@/utils/types";

import Link from "next/link";
import Row from "./Row";
import ConfirmModal from "@/components/shared/ConfirmModal";
import ErrorModal from "@/components/shared/ErrorModal";



// Types

export interface IProps{
    filters: IUserListFilters;
}



// Component

export default ({ filters }: IProps): React.ReactNode => {

    const [error, setError] = useState<string>();
    const [users, setUsers] = useState<IPublicUser[]>();
    const [userToDelete, setUserToDelete] = useState<number>();
    const [showDeleteUserModal, setShowDeleteUserModal] = useState<boolean>(false);
    const [showErrorModal, setShowErrorModal] = useState<boolean>(false);

    const {
        loading: areUsersLoading,
        call: fetchUsers
    } = useFetch<IPublicUser[]>({
        endpoint: Endpoint.Users,
        onSuccess: setUsers,
        onError
    });

    const {
        loading: isDeleteUserLoading,
        call: deleteUser
    } = useFetch({
        endpoint: [Endpoint.Users, `${userToDelete}`],
        method: HTTPMethod.DELETE,
        onSuccess: () => {},
        onError
    });

    useEffect((): void => {
        fetchUsers();
    }, [filters]);

    useEffect((): void => {
        if(userToDelete) setShowDeleteUserModal(true);
    }, [userToDelete]);

    useEffect((): void => {
        if(error) setShowErrorModal(true);
    }, [error]);

    function onDeleteClick(id: number): void{
        if(userToDelete !== id) setUserToDelete(id);
        else setShowDeleteUserModal(true);
    }

    async function onDeleteUserModalAccept(): Promise<void>{
        await deleteUser();
        await fetchUsers();
        
        setShowDeleteUserModal(false);
    }

    function onError(value: string): void{
        if(value !== error) setError(value);
        else setShowErrorModal(true);
    }

    const admin: boolean = true;

    return (
        <>
            <ErrorModal
                id="get-users-error-modal"
                open={showErrorModal}
                error={error}
                onClose={(): void => setShowErrorModal(false)}
            />
            <ConfirmModal
                id="confirm-delete-user-modal"
                open={showDeleteUserModal}
                loading={isDeleteUserLoading}
                message={t("confirmations.YouAreAboutToDeleteUser")}
                onClose={(): void => setShowDeleteUserModal(false)}
                onAccept={onDeleteUserModalAccept}
            />
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>
                            <Typography>
                                {t("all.Id")}
                            </Typography>
                        </TableCell>
                        <TableCell>
                            <Typography>
                                {t("all.Name")}
                            </Typography>
                        </TableCell>
                        <TableCell>
                            <Typography>
                                {t("all.Email")}
                            </Typography>
                        </TableCell>
                        {admin && (
                            <TableCell>
                                <Typography>
                                    {t("all.Actions")}
                                </Typography>
                            </TableCell>
                        )}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {users && users.map((i: IPublicUser): React.ReactNode => (
                        <Row
                            id={i.id}
                            name={i.name}
                            email={i.email}
                            admin={admin}
                            onEditClick={() => {}}
                            onDeleteClick={onDeleteClick}
                            key={i.id}
                        />
                    ))}
                </TableBody>
            </Table>
        </>
    );
};