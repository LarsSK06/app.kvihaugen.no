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
    stringifyRequestBody?: boolean;
    parseResponseBody?: boolean;
    authorize?: boolean;
    onSuccess?: (value: Receive) => void;
    onError?: (error: string) => void;
}



// Functions

export function useFetch<Receive, Send = undefined>({
    endpoint,
    method = HTTPMethod.GET,
    body,
    stringifyRequestBody,
    parseResponseBody,
    authorize = true,
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

        const token: string | undefined =
            window.localStorage.getItem("token") ??
            window.sessionStorage.getItem("token") ??
            undefined;

        try{
            const response: globalThis.Response =
                await fetch(address, {
                    method,
                    headers: {
                        "Authorization": authorize
                            ? `Bearer ${token}`
                            : ""
                    },
                    body: stringifyRequestBody
                        ? JSON.stringify(body)
                        : body as BodyInit
                });
            
            if(!response.ok){
                if(onError){
                    try{ onError(await response.text()); }
                    catch{ onError(t("errors.AnErrorOccured")); }
                }

                return;
            }

            if(parseResponseBody){
                try{ if(onSuccess) onSuccess(await response.json() as Receive); }
                catch(error){ if(onError) onError(`${error}`); }
            }
            else{
                try{ if(onSuccess) onSuccess(await response.text() as Receive); }
                catch(error){ if(onError) onError(`${error}`); }
            }
        }
        catch(error){ if(onError) onError(`${error}`); }

        setLoading(false);
    }

    return {
        loading,
        call
    };
}