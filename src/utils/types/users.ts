// Interfaces

export interface IUserListFilters{
    search?: string;
    admin?: boolean;
}

export interface IPublicUser extends IPublicUserEmbed{
    loans: {}[];
}

export interface IPublicUserEmbed{
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



// Types

export type UserId = number | "@me";