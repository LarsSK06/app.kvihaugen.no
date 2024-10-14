"use client";



// Imports

import { IGetLight, IParentProps } from "@/utils/types";
import { useEffect, useState } from "react";
import { useFetch } from "@/utils/hooks/use-fetch";

import Sidebar from "@/components/shared/Sidebar";
import Items from "./Items";



// Component

export default ({ children }: IParentProps): React.ReactNode => {

    const [lights, setLights] = useState<IGetLight[]>();

    const { loading, data, call } = useFetch<IGetLight[]>(`light`, {});

    useEffect((): void => {
        if(data) setLights(data);
        else call();
    }, [data]);

    return (
        <div className="h-torso flex">
            <Sidebar>
                <ul className="w-full p-2 flex flex-col gap-2">
                    <Items lights={lights} loading={loading}/>
                </ul>
            </Sidebar>
            <main className="h-full flex-grow">
                {children}
            </main>
        </div>
    );
};