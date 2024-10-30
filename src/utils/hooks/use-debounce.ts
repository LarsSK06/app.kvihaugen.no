// Imports

import { useEffect, useState } from "react";



// Types

export type UseDebounceCallback<T> = (value: T) => void;



// Functions

export function useDebounce<T>(callback: UseDebounceCallback<T>, seconds: number, dependency: T): void{
    const [delay, setDelay] = useState<NodeJS.Timeout>();
    const [first, setFirst] = useState<boolean>(true);

    useEffect((): void => {
        if(first) return setFirst(false);

        if(delay){
            clearTimeout(delay);
            setDelay(undefined);
            return;
        }

        setDelay(setTimeout((): void => {
            callback(dependency);
        }, seconds * 1000));
    }, [dependency]);
}