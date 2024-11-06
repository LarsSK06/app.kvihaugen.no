// Imports

import { Context, createContext } from "react";
import { IPublicUser } from "./types/users";



// Types

export type UserContextType = IPublicUser | null;



// Contexts

export const UserContext: Context<UserContext> =
    createContext<UserContext>(null);