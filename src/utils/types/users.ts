// Interfaces

export interface IUserListFilters{
    search?: string;
    admin?: boolean;
}

export interface IGetUser{
    id: string;
    name: string;
    password: string;
    email: string;
}



// Types

export type UserId = number | "@me";