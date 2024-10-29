// Imports

import { useFetch } from "@/utils/hooks/use-fetch";
import { t } from "@/utils/i18n";
import { IPublicUser, IUserListFilters, IUserToEdit } from "@/utils/types/users";
import { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";
import { Endpoint } from "@/utils/types/auth";
import { HTTPMethod } from "@/utils/types";

import Row from "./Row";
import ConfirmModal from "@/components/shared/ConfirmModal";
import ErrorModal from "@/components/shared/ErrorModal";
import Card from "./Card";
import LoaderModal from "@/components/shared/LoaderModal";
import EditUserModal from "./EditUserModal";



// Types

export interface IProps{
    filters: IUserListFilters;
}



// Component

export default ({ filters }: IProps): React.ReactNode => {

    const [admin, setAdmin] = useState<boolean>(false);
    const [error, setError] = useState<string>();
    const [users, setUsers] = useState<IPublicUser[]>();
    const [userToEdit, setUserToEdit] = useState<IUserToEdit>();
    const [userToDelete, setUserToDelete] = useState<number>();
    const [showEditUserModal, setShowEditUserModal] = useState<boolean>(false);
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
        loading: isEditUserLoading,
        call: editUser
    } = useFetch({
        endpoint: [Endpoint.Users, `${userToEdit?.id}`],
        method: HTTPMethod.PUT,
        onSuccess: fetchUsers,
        onError
    });

    const {
        loading: isDeleteUserLoading,
        call: deleteUser
    } = useFetch({
        endpoint: [Endpoint.Users, `${userToDelete}`],
        method: HTTPMethod.DELETE,
        onSuccess: fetchUsers,
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

    useEffect((): void => {
        setAdmin(window.localStorage.getItem("admin") == "true");
    }, []);

    useEffect((): void => {
        if(!userToEdit) return;
        
        (async (): Promise<void> => {
            await editUser();

            setShowEditUserModal(false);
        })();
    }, [userToEdit]);

    function onEditClick(id: number): void{
        if(userToEdit?.id !== id)
            setUserToEdit({
                ...users?.find((i: IPublicUser): boolean => i.id == id) ??
                { id: -1, name: "", email: "" },
                password: ""
            });
        else setShowEditUserModal(true);
    }

    function onDeleteClick(id: number): void{
        if(userToDelete !== id) setUserToDelete(id);
        else setShowDeleteUserModal(true);
    }

    async function onEditUserModalAccept(value: IUserToEdit): Promise<void>{
        setUserToEdit(value);
    }

    async function onDeleteUserModalAccept(): Promise<void>{
        await deleteUser();
        
        setShowDeleteUserModal(false);
    }

    function onError(value: string): void{
        if(value !== error) setError(value);
        else setShowErrorModal(true);
    }

    const loading: boolean =
        areUsersLoading ||
        isDeleteUserLoading;

    return (
        <>
            <LoaderModal
                id="get-users-loader-modal"
                open={loading}
            />
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
            <EditUserModal
                id="edit-user-modal"
                open={showEditUserModal}
                loading={isEditUserLoading}
                value={userToEdit}
                onClose={(): void => setShowEditUserModal(false)}
                onAccept={onEditUserModalAccept}
            />
            <Table className="hidden md:table">
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
                    {users?.map((i: IPublicUser): React.ReactNode => (
                        <Row
                            id={i.id}
                            name={i.name}
                            email={i.email}
                            admin={admin}
                            onEditClick={onEditClick}
                            onDeleteClick={onDeleteClick}
                            key={i.id}
                        />
                    ))}
                </TableBody>
            </Table>
            <ul className="flex md:hidden flex-col gap-4">
                {users?.map((i: IPublicUser): React.ReactNode => (
                    <Card
                        id={i.id}
                        name={i.name}
                        email={i.email}
                        admin={admin}
                        onEditClick={onEditClick}
                        onDeleteClick={onDeleteClick}
                        key={i.id}
                    />
                ))}
            </ul>
        </>
    );
};