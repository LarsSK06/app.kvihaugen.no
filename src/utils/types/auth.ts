// Imports

import { IPublicUser } from "./users";



// Enums

export enum Endpoint{
    Auth = "Auth",
    SignIn = "SignIn",
    SignUp = "SignUp",
    Users = "Users"
}



// Interfaces

export interface IPassport{
    token: string;
    user: IPublicUser;
}