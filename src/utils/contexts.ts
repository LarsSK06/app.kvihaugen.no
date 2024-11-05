// Imports

import { createContext, Context } from "react";
import { IPublicUser } from "./types/users";



// Types

export type UserContextType = {
    user: IPublicUser | null;
    setUser: ((value: IPublicUser | null) => void) | null;
};

export type TokenContextType = {
    token: string | null;
    setToken: ((value: string | null) => void) | null;
};



// Contexts

export const UserContext: Context<UserContextType>
    = createContext<UserContextType>({ user: null, setUser: null });

export const TokenContext: Context<TokenContextType>
    = createContext<TokenContextType>({ token: null, setToken: null });