// Imports

import { IAny } from "../types";

import en from "./langs/en.json";
import no from "./langs/no.json";



// Variables

const lng: string = "no";
const lngs: IAny = { en, no };



// Functions

export function t(phrase: string): string{
    if(!(lng in lngs))
        return phrase;

    const split: string[] = phrase.split(".");

    if(split.length > 1){
        let cursor: any = lngs[lng];

        for(let i = 0; i < split.length - 1; i++){
            if(split[i] in cursor) cursor = cursor[split[i]];
            else return phrase;
        }

        return cursor[split[split.length - 1]] ?? phrase;
    }
    else if(
        "$" in lngs[lng] &&
        phrase in lngs[lng]["$"] &&
        split.length == 1
    ) return lngs[lng]["$"][phrase];
    else return lngs[lng][phrase] ?? phrase;
}