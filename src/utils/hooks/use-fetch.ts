// Imports

import { BackendAddress, HTTPMethod, IAny } from "../types";
import { useStaticState } from "./use-static-state";



// Types

export interface IUseFetchOutput<Success, Error>{
    ok: boolean;
    code: number;
    body: Success | Error;
}



// Variables

const [token, setToken] = useStaticState<string | undefined>(undefined);



// Functions

export const setAuthToken = setToken;

export async function useFetch<Success, Error = string>(
    endpoint: string | string[],
    queryParams: IAny,
    method: HTTPMethod = HTTPMethod.GET,
    body?: any
): Promise<IUseFetchOutput<Success, Error | string>>{
    const address: string = [
        process.env.NODE_ENV == "production"
            ? BackendAddress.Prod.toString()
            : BackendAddress.Prod.toString()
    ]
    .concat(
        endpoint instanceof Array
            ? endpoint
            : []
    )
    .join("/");

    try{
        const response: globalThis.Response =
            await fetch(address, {
                method,
                headers: token
                    ? { "Authorization": `Bearer ${token}` }
                    : {},
                body
            });
        
        return {
            ok: response.ok,
            code: response.status,
            body: response.ok
                ? await response.json() as Success
                : await response.json() as Error
        };
    }
    catch(error){
        return {
            ok: false,
            code: 400,
            body: `${error}`
        };
    }
}