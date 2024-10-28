// Imports

import { useState } from "react";
import { BackendAddress, HTTPMethod } from "../types";
import { t } from "@/utils/i18n";



// Types

type URLSection =
    | string
    | number
    | undefined
    | null;

export interface IUseFetchOutput{
    loading: boolean;
    call: () => Promise<void>;
}

export interface IUseFetchInput<Receive, Send>{
    endpoint: string | string[],
    method?: HTTPMethod;
    body?: Send;
    onSuccess: (value: Receive) => void;
    onError: (error: string) => void;
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
            window.sessionStorage.getItem("token") ??
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
            
            const contentType: string = response.headers.get("Content-Type") ?? "";
            const json: boolean =
                contentType == "application/json; charset=utf-8" ||
                contentType == "application/problem+json; charset=utf-8";

            if(response.ok){
                if(json) onSuccess(await response.json() as Receive);
                else onSuccess(await response.text() as Receive);
            }
            else{
                if(json){
                    const parse: { title?: string; } = await response.json();

                    onError(t(parse.title ?? "errors.SystemHasABadDay"));
                }
                else onError(t(await response.text()));
            }
        }
        catch(error){ onError(t(`${error}`)); }

        setLoading(false);
    }

    return {
        loading,
        call
    };
}