// Imports

import { useState } from "react";
import { BackendAddress, HTTPMethod } from "../types";
import { t } from "@/utils/i18n";



// Types

export interface IUseFetchOutput{
    loading: boolean;
    call: () => Promise<void>;
}

export interface IUseFetchInput<Receive, Send>{
    endpoint: string | string[],
    method?: HTTPMethod;
    body?: Send;
    onSuccess: (value: Receive) => void;
    onError: (error: string, code: number) => void;
}



// Functions

export function useFetch<Receive, Send = undefined>({
    endpoint,
    method = HTTPMethod.GET,
    body,
    onSuccess,
    onError
}: IUseFetchInput<Receive, Send>): IUseFetchOutput{

    const [loading, setLoading] = useState<boolean>(false);

    const address: string =
        [
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
            window.localStorage.getItem("token");

        try{
            const response: globalThis.Response =
                await fetch(address, {
                    method,
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": typeof body == "object"
                            ? "application/json"
                            : "text/plain"
                    },
                    body: body && (
                        typeof body == "object"
                            ? JSON.stringify(body)
                            : `${body}`
                    )
                });
            
            //if(response.status == 401){
            //    window.localStorage.removeItem("token");
            //    window.location.href = "/auth/sign-in";

            //    return;
            //}
            
            const contentType: string = response.headers.get("Content-Type") ?? "";
            const json: boolean =
                contentType == "application/json; charset=utf-8" ||
                contentType == "application/problem+json; charset=utf-8";

            if(response.ok){
                if(json) onSuccess(await response.json() as Receive);
                else onSuccess(await response.text() as Receive);
            }
            else if(json){
                const parse: { title?: string; } = await response.json();

                onError(t(parse.title ?? "errors.SystemHasABadDay"), response.status);
            }
            else onError(t(await response.text()), response.status);
        }
        catch(error){ onError(t(`${error}`), 500); }

        setLoading(false);
    }

    return {
        loading,
        call
    };
}