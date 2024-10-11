// Imports

import { AFunc, BaseURL, HTTPMethod } from "../types";
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
                await fetch([BaseURL.Development, endpoint].join("/"), {
                    method,
                    headers: {
                        authorization: `Bearer ${ null }`
                    },
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