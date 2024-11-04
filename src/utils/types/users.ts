// Imports

import { Gender } from "./auth";



// Interfaces

export interface IPublicUser{
    id: number;
    firstName: string;
    lastName: string;
    gender: Gender;
    email: string;
    administrator: boolean;
}