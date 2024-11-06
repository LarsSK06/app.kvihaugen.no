// Imports

import { createContext, Context } from "react";
import { IPassport } from "./types/auth";



// Types

export type PassportContextType = {
    passport: IPassport | null;
    setPassport: ((value: IPassport | null) => void) | null;
};



// Contexts

export const PassportContext: Context<PassportContextType>
    = createContext<PassportContextType>({ passport: null, setPassport: null });