// Imports

import { useFetch } from "@/utils/hooks/use-fetch";
import { IGetUser, IParentProps } from "@/utils/types";
import { useParams } from "next/navigation";
import { useEffect } from "react";



// Component

export default ({ children }: IParentProps): React.ReactNode => {

    const { id } = useParams();
    const { data: user, call: getUser } = useFetch<IGetUser>(`user/${id}`, {});

    useEffect((): void => {
        getUser();
    }, []);

    return (
        <>
            <div className="responsive h-9 bg-red-500">
                {user?.avatar ? (
                    <img src={user.avatar} className="w-auto h-24 rounded-default"/>
                ) : (
                    <div className="skeleton w-auto h-24"/>
                )}
            </div>
            {children}
        </>
    );
};