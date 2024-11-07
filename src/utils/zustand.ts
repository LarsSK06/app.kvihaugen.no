// Imports

import { create, StoreApi, UseBoundStore } from "zustand";
import { IPublicUser } from "./types/users";
import { persist, createJSONStorage } from "zustand/middleware";



// Types

interface ISetter<T>{
    (partial: T | Partial<T> | ((state: T) => T | Partial<T>), replace?: false): void;
    (state: T | ((state: T) => T), replace: true): void;
}

export interface ITokenState{
    token: string | null;
    put: (value: string) => void;
    delete: () => void;
}

export interface IUserState{
    user: IPublicUser | null;
    put: (value: IPublicUser) => void;
    delete: () => void;
}



// Stores

export const useTokenStore =
    create(
        persist(
            (set: ISetter<ITokenState>): ITokenState => ({
                token: null,
                put: (value: string): void => set({ token: value }),
                delete: (): void => set({ token: null })
            }),
            { name: "zustand-token-store" }
        )
    );

export const useUserStore =
    create(
        persist(
            (set: ISetter<IUserState>): IUserState => ({
                user: null,
                put: (value: IPublicUser): void => set({ user: value }),
                delete: (): void => set({ user: null })
            }),
            { name: "zustand-token-store" }
        )
    );