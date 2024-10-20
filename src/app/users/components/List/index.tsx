// Imports

import { useFetch } from "@/utils/hooks/use-fetch";
import { t } from "@/utils/i18n";
import { IPublicUser, IUserListFilters } from "@/utils/types/users";
import { useEffect } from "react";
import { useAnchorRouter, UseAnchorRouterFunction } from "@/utils/hooks/use-anchor-router";
import { nanoid } from "nanoid";

import Row from "./Row";



// Types

export interface IProps{
    filters: IUserListFilters;
}



// Component

export default ({ filters }: IProps): React.ReactNode => {

    const route: UseAnchorRouterFunction = useAnchorRouter();

    const {
        loading,
        data: users,
        call: fetchUsers
    } = useFetch<IPublicUser[]>("users", {});

    useEffect((): void => {
        fetchUsers();
    }, [filters]);

    return (
        <table className="w-full">
            <thead className="bg-color-2">
                <Row>{[
                    t("Id"),
                    t("Name"),
                    t("Email"),
                    t("Admin"),
                    t("Loans")
                ]}</Row>
            </thead>
            <tbody>
                {
                    users && users
                        .filter((i: IPublicUser): boolean => {
                            if(filters.search == undefined) return true;

                            return i.name.toLowerCase().includes(filters.search.toLowerCase()) ||
                                i.email.toLowerCase().includes(filters.search.toLowerCase());
                        })
                        .filter((i: IPublicUser): boolean => {
                            if(filters.admin == undefined) return true;

                            return i.admin == filters.admin;
                        })
                        .map((i: IPublicUser): React.ReactNode => (
                            <Row key={nanoid()}>{[
                                i.id,
                                (
                                    <a href={`/users/${i.id}`} onClick={route}>
                                        {i.name}
                                    </a>
                                ),
                                (
                                    <a href={`mailto:${i.email}`} onClick={route}>
                                        {i.email}
                                    </a>
                                ),
                                t(i.admin ? "Yes" : "No"),
                                (
                                    <a href={`/users/${i.id}/loans`} onClick={route}>
                                        {i.loans.length}
                                    </a>
                                )
                            ]}</Row>
                        )
                )}
            </tbody>
        </table>
    );
};