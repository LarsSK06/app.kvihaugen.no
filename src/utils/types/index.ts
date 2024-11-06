// Interfaces

export interface IAny<T = any>{
    [key: string | number]: T;
}

export interface IParentProps<T = React.ReactNode>{
    children?: T;
}

export interface ICoords{
    x: number;
    y: number;
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
    Prod = "http://api.app.kvihaugen.no"
}

export enum Endpoint{
    Auth = "auth",
    SignIn = "sign-in",
    SignUp = "sign-up",
    Users = "users",
    Me = "@me"
}



// Types

export type Func<T = void> = () => T;
export type AFunc<T = void> = () => Promise<T>;