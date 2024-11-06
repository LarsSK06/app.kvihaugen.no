"use client";



// Imports

import { UserContext, UserContextType } from "@/utils/contexts";
import { useAnchorRouting, UseAnchorRoutingFunction } from "@/utils/hooks/use-anchor-routing";
import { useFetch } from "@/utils/hooks/use-fetch";
import { t } from "@/utils/i18n";
import { Endpoint, HTTPMethod } from "@/utils/types";
import { IHardMutableUser, IPublicUser } from "@/utils/types/users";
import { Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";

import Row from "./components/Row";
import GenericModal from "@/utils/components/GenericModal";
import HardMutableUserModal from "@/utils/components/HardMutableUserModal";



// Component

export default (): React.ReactNode => {

    const [userDataToEdit, setUserDataToEdit] = useState<IHardMutableUser | null>(null);

    const [userToEdit, setUserToEdit] = useState<number | null>(null);
    const [userToDelete, setUserToDelete] = useState<number | null>(null);

    const [showEditUserModal, setShowEditUserModal] = useState<boolean>(false);
    const [showDeleteUserModal, setShowDeleteUserModal] = useState<boolean>(false);

    const user: UserContextType = useContext<UserContextType>(UserContext);
    const route: UseAnchorRoutingFunction = useAnchorRouting();

    const [users, setUsers] = useState<IPublicUser[] | null>(null);

    const {
        loading: areUsersLoading,
        call: fetchUsers
    } = useFetch<IPublicUser[]>({
        endpoint: Endpoint.Users,
        onSuccess: setUsers,
        onError: (value: string): void => {}
    });

    const {
        loading: isUserToEditLoading,
        call: fetchUserToEdit
    } = useFetch<IPublicUser>({
        endpoint: [Endpoint.Users, `${userToEdit}`],
        onSuccess: setUserDataToEdit,
        onError: console.log
    });

    const {
        loading: isEditUserLoading,
        call: editUser
    } = useFetch<IPublicUser, IHardMutableUser>({
        endpoint: [Endpoint.Users, `${userToEdit}`],
        method: HTTPMethod.PUT,
        body: userDataToEdit ?? undefined,
        onSuccess: setUserDataToEdit,
        onError: console.log
    });

    useEffect((): void => {
        fetchUsers();
    }, []);

    useEffect((): void => {
        if(!userToEdit) return;

        setShowEditUserModal(true);
        fetchUserToEdit();
    }, [userToEdit]);

    function onEditClick(id: number): void{
        if(userToEdit === id) setShowEditUserModal(true);
        else setUserToEdit(id);
    }

    function onDeleteClick(id: number): void{
        
    }

    async function onEditUserModalAccept(): Promise<void>{
        await editUser();
        
        setShowEditUserModal(false);

        await fetchUsers();
    }

    return (
        <>
            <HardMutableUserModal
                show={showEditUserModal}
                loading={isUserToEditLoading || isEditUserLoading}
                defaultValue={userDataToEdit ?? undefined}
                onChange={setUserDataToEdit}
                onClose={(): void => setShowEditUserModal(false)}
                onAccept={onEditUserModalAccept}
            />
            <main className="w-main max-w-full px-4 mx-auto">
                <Typography variant="h1" className="mb-4">
                    {t("all.Users")}
                </Typography>
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
                                    {t("all.Gender")}
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography>
                                    {t("all.Email")}
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography>
                                    {t("all.Administrator")}
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography>
                                    {t("all.Active")}
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography>
                                    {t("all.Actions")}
                                </Typography>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {areUsersLoading || !users ? (
                            <></>
                        ) : (
                            users.map((i: IPublicUser): React.ReactNode => (
                                <Row
                                    key={i.id}
                                    user={i}
                                    admin={user?.administrator ?? false}
                                    onEditClick={onEditClick}
                                    onDeleteClick={onDeleteClick}
                                />
                            ))
                        )}
                    </TableBody>
                </Table>
            </main>
        </>
    );
};