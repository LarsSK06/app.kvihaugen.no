// Imports

import { useState } from "react";
import { BackendAddress, HTTPContentType, HTTPMethod } from "../types";
import { useStaticState } from "./use-static-state";
import { t } from "../i18n";



// Types

export interface IUseFetchOutput<T>{
    loading: boolean;
    data: T | undefined;
    call: () => Promise<void>;
}

export interface IUseFetchInput<T>{
    method?: HTTPMethod;
    body?: T;
    onError?: (value: string) => void;
}



// Function

export function useFetch<Receive, Send = any>(endpoint: string | string[], { method = HTTPMethod.GET, body, onError }: IUseFetchInput<Send>): IUseFetchOutput<Receive>{

    const [loading, setLoading] = useState<boolean>(false);
    const [data, setData] = useState<Receive>();

    const address: string = [
        process.env.NODE_ENV == "production"
            ? BackendAddress.Prod.toString()
            : BackendAddress.Dev.toString()
    ]
    .concat(
        endpoint instanceof Array
            ? endpoint
            : [endpoint]
    )
    .join("/");

    async function call(): Promise<void>{
        setLoading(true);

        const token: string | null =
            window.sessionStorage.getItem("token") ??
            window.localStorage.getItem("token");

        try{
            const response: Axios.AxiosXHR<Send> = await axios({
                url: address,
                headers: {
                    "Content-Type": HTTPContentType.JSON,
                    "Authorization": `Bearer ${token}`
                },
                method,
                data: body
            });

            if(response.status >= 200 && response.status < 300){
                setData(response.data as unknown as Receive);
            }
            else if(onError)
                onError(response.data as string ?? t("An error occured"));
        }
        catch(error){
            if(onError) onError(t("An error occured"));
        }

        setLoading(false);
    }

    return {
        loading,
        data,
        call
    };
}