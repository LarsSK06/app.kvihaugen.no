// Interfaces

/* SERVER SIDE OBJECT
{
    id: number;
    avatar: string;
    name: string;
    email: string;
    password: string;
    admin: boolean;
}
*/

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

export interface IGetLoan{
    id: {
        self: number;
        user: number;
    };
    name: string;
    description: string;
    subject: string;
    indirectObject: string;
    object: string;
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

export enum BaseURL{
    Production = "http://api.kvihaugen.no",
    Development = "http://127.0.0.1:4000"
}

export enum GlobalState{
    User = "user"
}



// Types

export type Func<T = void> = () => T;
export type AFunc<T = void> = () => Promise<T>;

export type UserId = "@me" | number;