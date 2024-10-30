// Imports

import { useFetch } from "@/utils/hooks/use-fetch";
import { t } from "@/utils/i18n";
import { IPublicUser, IUserListFilters } from "@/utils/types/users";
import { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";
import { Endpoint } from "@/utils/types/auth";

import Row from "./Row";
import ErrorModal from "@/components/shared/ErrorModal";
import Card from "./Card";
import LoaderModal from "@/components/shared/LoaderModal";
import Loader from "@/components/shared/Loader";



// Types

export interface IProps{
    filters: IUserListFilters;
}



// Component

export default ({ filters }: IProps): React.ReactNode => {

    const [error, setError] = useState<string>();
    const [users, setUsers] = useState<IPublicUser[]>();
    const [showErrorModal, setShowErrorModal] = useState<boolean>(false);

    const {
        loading: areUsersLoading,
        call: fetchUsers
    } = useFetch<IPublicUser[]>({
        endpoint: Endpoint.Users,
        onSuccess: setUsers,
        onError
    });

    useEffect((): void => {
        fetchUsers();
    }, [filters]);

    useEffect((): void => {
        if(error) setShowErrorModal(true);
    }, [error]);

    function onError(value: string): void{
        if(value !== error) setError(value);
        else setShowErrorModal(true);
    }

    const loading: boolean = areUsersLoading;

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
            {loading ? (
                <div className="w-full py-4">
                    <div className="w-fit mx-auto">
                        <Loader/>
                    </div>
                </div>
            ) : (
                <>
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
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {users?.map((i: IPublicUser): React.ReactNode => (
                                <Row
                                    id={i.id}
                                    name={i.name}
                                    email={i.email}
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
                                key={i.id}
                            />
                        ))}
                    </ul>
                </>
            )}
        </>
    );
};