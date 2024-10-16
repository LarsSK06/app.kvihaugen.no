// Interfaces

export interface IGetUser{
    id: number;
    avatar: string;
    name: string;
    email: string;
    admin: boolean;
}

export interface IPutUser{
    name: string;
    email: string;
    password: string;
}

export interface IGetLight{
    id: string;
    state: {
        on: boolean;
        reachable: boolean;
    };
    type: string;
    name: string;
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
    Localhost = "127.0.0.1:4000",
    Local = "server.local:4000"
}

export enum GlobalState{
    User = "user"
}



// Types

export type Func<T = void> = () => T;
export type AFunc<T = void> = () => Promise<T>;

export type UserId = "@me" | number;