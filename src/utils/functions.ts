// Imports

import { IAny } from "./types";



// Functions

export function preventDefault(event: React.SyntheticEvent): void{
    event.preventDefault();
}

export function crossMatch<T>(a: T[], b: T[]): number{
    return a
        .filter((i: T): boolean => b.includes(i))
        .length;
}

export function formDataToJSON<T>(formData: FormData): T{
    const result: IAny = {};

    formData.forEach((value: any, key: string): void => {
        result[key] = value;
    });

    return result as T;
}