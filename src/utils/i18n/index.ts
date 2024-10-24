// Imports

import i18next from "i18next";

import en from "./langs/en.json";
import no from "./langs/no.json";



// Init

i18next.init({
    lng: "no",
    fallbackLng: "en",
    debug: true,
    resources: {
        en: { translation: en },
        no: { translation: no }
    }
});