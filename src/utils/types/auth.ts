// Imports

import { IPublicUser } from "./users";



// Enums

export enum Gender{
    Male = "Male",
    Female = "Female",
    Other = "Other",
    Undefined = "Undefined"
}



// Interfaces

export interface IPassport{
    token: string;
    user: IPublicUser;
}

export interface ISignUpData{
    firstName: string;
    lastName: string;
    gender: Gender;
    email: string;
    password: string;
}

export interface ISignInData{
    email: string;
    password: string;
}