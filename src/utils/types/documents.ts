// Imports

import { IPublicUser } from "./users";



// Interfaces

export interface IPublicDocument{
    id: number;
    name: string;
    lines: string[];
    publicity: PublicityStatus;
    owner: IPublicUser;
}

export interface IMutableDocument{
    name: string;
    lines: string[];
    publicity: PublicityStatus;
}



// Enums

export enum PublicityStatus{
    Public = "Public",
    Private = "Private"
}