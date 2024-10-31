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

export enum HTTPContentType{
    JSON = "application/json",
    FormData = "multipart/form-data"
}

export enum BackendAddress{
    Dev = "http://localhost:4000",
    Prod = "http://server.local:4000"
}

export enum Endpoint{
    Auth = "Auth",
    SignIn = "SignIn",
    SignUp = "SignUp",
    Users = "Users",
    Documents = "Documents"
}



// Types

export type Func<T = void> = () => T;
export type AFunc<T = void> = () => Promise<T>;