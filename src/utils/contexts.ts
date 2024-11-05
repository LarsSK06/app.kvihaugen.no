// Imports

import { createContext, Context } from "react";
import { IPublicUser } from "./types/users";



// Types

export type UserContextType = IPublicUser | null;



// Contexts

export const UserContext: Context<UserContextType>
    = createContext<UserContextType>(null);