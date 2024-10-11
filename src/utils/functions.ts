// Functions

export function preventDefault(event: React.SyntheticEvent): void{
    event.preventDefault();
}

export function crossMatch<T>(a: T[], b: T[]): number{
    return a
        .filter((i: T): boolean => b.includes(i))
        .length
}