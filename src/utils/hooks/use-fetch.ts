// Imports

import { BackendAddress, AFunc, HTTPMethod } from "../types";
import { useState } from "react";



// Types

export interface IUseFetchInput<T>{
    method?: HTTPMethod;
    body?: T;
    setError?: (value?: string) => void;
}

export interface IUseFetchOutput<T>{
    loading: boolean;
    data?: T;
    call: AFunc;
}



// Functions

export function useFetch<Receive, Send = undefined>(endpoint: string, { method = HTTPMethod.GET, body, setError }: IUseFetchInput<Send>): IUseFetchOutput<Receive>{

    const [loading, setLoading] = useState<boolean>(false);
    const [data, setData] = useState<Receive>();

    async function call(): Promise<void>{
        setLoading(true);

        try{
            const response: globalThis.Response =
                await fetch("http://" + [
                    process.env.NODE_ENV == "production"
                        ? BackendAddress.Prod
                        : BackendAddress.Dev,
                    endpoint
                ].join("/"), {
                    method,
                    body: body as BodyInit
                });
            
            const data: Receive =
                await response.json();

            setData(data as Receive);

            if(setError)
                setError();
        }
        catch(error){
            if(setError)
                setError(`${error}`);
        }
        
        setLoading(false);
    }

    return { loading, data, call };
}