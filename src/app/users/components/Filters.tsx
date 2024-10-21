// Imports

import { t } from "@/utils/i18n";
import { IUserListFilters } from "@/utils/types/users";
import { TextField } from "@mui/material";



// Types

interface IProps{
    filters: IUserListFilters;
    setFilters: (value: IUserListFilters) => void;
}



// Component

export default ({ filters, setFilters }: IProps): React.ReactNode => {

    function onSearchChange(event: React.ChangeEvent<HTMLInputElement>): void{
        const value: string = event.currentTarget.value;

        if(value == "")
            setFilters({ ...filters, search: undefined });

        setFilters({ ...filters, search: value });
    }

    return (
        <form className="py-4">
            <TextField
                placeholder={t("Search")}
            />
        </form>
    );
};