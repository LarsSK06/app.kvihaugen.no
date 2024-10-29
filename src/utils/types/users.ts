// Interfaces

export interface IUserListFilters{
    search?: string;
    type?: UserType;
}

export interface IPublicUser{
    id: number;
    name: string;
    email: string;
    admin: boolean;
}

export interface IMutableUser{
    name: string;
    password: string;
    email: string;
}

export interface IUserToEdit extends IMutableUser{
    id: number;
}



// Enums

export enum UserType{
    All,
    Admin,
    Regular
}