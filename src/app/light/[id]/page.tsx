"use client";



// Imports

import { t } from "@/utils/i18n";
import { useParams } from "next/navigation";



// Component

export default (): React.ReactNode => {

    const { id } = useParams();

    return(
        <form className="w-full h-full p-4">
            <label htmlFor="name">
                {t("Name")}
            </label>
            <input id="name" name="name" className="styled-text-field"/>
        </form>
    );
};