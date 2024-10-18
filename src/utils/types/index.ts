// Interfaces

export interface IAny<T = any>{
    [key: string | number]: T;
}

export interface IParentProps<T = React.ReactNode>{
    children?: T;
}



// Enums

export enum HTTPMethod{
    GET = "GET",
    POST = "POST",
    PUT = "PUT",
    DELETE = "DELETE",
    HEAD = "HEAD",
    OPTIONS = "OPTIONS"
}

export enum BackendAddress{
    Localhost = "localhost:5265",
    Local = "server.local:4000"
}

export enum GlobalState{
    User = "user"
}



// Types

export type Func<T = void> = () => T;
export type AFunc<T = void> = () => Promise<T>;