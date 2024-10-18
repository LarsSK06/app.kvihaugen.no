// Imports

import TextField from "@/components/shared/TextField";

import { t } from "@/utils/i18n";



// Component

export default (): React.ReactNode => {

    return (
        <form>
            <TextField
                label={t("Search")}
                placeholder="dhhdhd"
            />
        </form>
    );
};