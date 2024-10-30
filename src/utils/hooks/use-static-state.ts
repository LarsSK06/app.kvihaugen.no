// Functions

export function useStaticState<T>(initialValue: T): [T | typeof initialValue, (value: T) => void]{
    type TT = T | typeof initialValue;
    
    let state: TT = initialValue;

    return [state, (value: TT) => { state = value; }];
}