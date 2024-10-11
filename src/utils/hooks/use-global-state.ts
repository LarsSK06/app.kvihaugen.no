// Types

export type StateSetter<T> = (value?: T) => void;



// Variables

const states: { [key: string]: any } = {};



// Functions

export function useGlobalState<T>(name: string, initialValue?: T): [T | undefined, StateSetter<T>]{

    if(initialValue || !(name in states))
        states[name] = initialValue;

    return [states[name], (value?: T): void => { states[name] = value }];
}