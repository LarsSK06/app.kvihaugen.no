"use client";



// Imports

import { t } from "@/utils/i18n";
import { TextType } from "@/utils/types";
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";



// Types

interface IProps{
    setTextType: (value: TextType) => void;
}



// Component

export default ({ setTextType }: IProps): React.ReactNode => {

    function onTextTypeChange(event: SelectChangeEvent<TextType>): void{
        setTextType(event.target.value as TextType);
    }

    return (
        <div className="w-main bg-color-2 box">
            <FormControl>
                <InputLabel variant="filled">
                    {t("all.Type")}
                </InputLabel>
                <Select variant="filled" placeholder={t("all.Type")} className="w-24" defaultValue={TextType.P} onChange={onTextTypeChange}>
                    {Object.values(TextType).map((i: TextType): React.ReactNode => (
                        <MenuItem key={i} value={i}>
                            {i}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    );
};