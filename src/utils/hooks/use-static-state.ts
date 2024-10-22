// Functions

export function useStaticState<T>(initialValue: T): [T, (value: T) => void]{

    let state: T = initialValue;

    return [state, (value: T) => { value = state; }];
}