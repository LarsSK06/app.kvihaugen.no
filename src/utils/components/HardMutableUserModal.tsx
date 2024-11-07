// Imports

import { MutableRefObject, useEffect, useRef, useState } from "react";
import { t } from "../i18n";
import { IHardMutableUser } from "../types/users";
import { Checkbox, FormControl, FormControlLabel, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from "@mui/material";
import { Gender } from "../types/auth";

import GenericModal from "./GenericModal";



// Types

interface IProps{
    show: boolean;
    loading?: boolean;
    defaultValue?: IHardMutableUser;
    onChange: (value: IHardMutableUser) => void;
    onClose?: () => void;
    onAccept?: () => void;
}



// Component

export default ({ show, loading, defaultValue, onChange, onClose, onAccept }: IProps): React.ReactNode => {

    const [data, setData] = useState<IHardMutableUser | null>(null);

    useEffect((): void => {
        if(defaultValue) setData(defaultValue);
    }, [defaultValue]);

    useEffect((): void => {
        if(data) onChange(data);
    }, [data]);

    const form: MutableRefObject<HTMLFormElement | null> = useRef<HTMLFormElement>(null);

    return defaultValue && (
        <GenericModal
            show={show}
            loading={loading}
            heading={t("labels.EditUser")}
            onClose={onClose}
            onCancel={onClose}
            onAccept={onAccept}
        >
            <form className="flex flex-col gap-4" ref={form}>
                <div className="flex gap-4">
                    <TextField
                        id="firstName"
                        name="firstName"
                        variant="filled"
                        label={t("all.FirstName")}
                        placeholder={t("all.FirstName")}
                        disabled={loading}
                        value={data?.firstName ?? ""}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>): void => {
                            if(!data) return;

                            setData({
                                ...data,
                                firstName: event.currentTarget.value
                            });
                        }}
                    />

                    <TextField
                        id="lastName"
                        name="lastName"
                        variant="filled"
                        label={t("all.LastName")}
                        placeholder={t("all.LastName")}
                        disabled={loading}
                        value={data?.lastName ?? ""}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>): void => {
                            if(!data) return;

                            setData({
                                ...data,
                                lastName: event.currentTarget.value
                            });
                        }}
                    />
                </div>

                <FormControl>
                    <InputLabel variant="filled">
                        {t("all.Gender")}
                    </InputLabel>
                    <Select
                        id="gender"
                        name="gender"
                        label={t("all.Gender")}
                        placeholder={t("all.Gender")}
                        variant="filled"
                        value={data?.gender ?? Gender.Male}
                        disabled={loading}
                        onChange={(event: SelectChangeEvent<Gender>): void => {
                            if(!data) return;

                            setData({
                                ...data,
                                gender: event.target.value as Gender
                            });
                        }}
                    >
                        <MenuItem value={Gender.Male}>
                            {t("all.Male")}
                        </MenuItem>
                        <MenuItem value={Gender.Female}>
                            {t("all.Female")}
                        </MenuItem>
                        <MenuItem value={Gender.Other}>
                            {t("all.Other")}
                        </MenuItem>
                        <MenuItem value={Gender.Undefined}>
                            {t("all.Undefined")}
                        </MenuItem>
                    </Select>
                </FormControl>

                <TextField
                    id="email"
                    name="email"
                    variant="filled"
                    label={t("all.Email")}
                    placeholder={t("all.Email")}
                    type="email"
                    disabled={loading}
                    value={data?.email ?? ""}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>): void => {
                        if(!data) return;

                        setData({
                            ...data,
                            email: event.currentTarget.value
                        })
                    }}
                />

                <div className="flex gap-4">
                    <FormControlLabel
                        control={
                            <Checkbox
                                id="administrator"
                                name="administrator"
                                checked={data?.administrator ?? false}
                                onChange={(event: React.ChangeEvent<HTMLInputElement>): void => {
                                    if(!data) return;

                                    setData({
                                        ...data,
                                        administrator: event.currentTarget.checked
                                    });
                                }}
                            />
                        }
                        label={t("all.Administrator")}
                    />

                    <FormControlLabel
                        control={
                            <Checkbox
                                id="active"
                                name="active"
                                checked={data?.active ?? false}
                                onChange={(event: React.ChangeEvent<HTMLInputElement>): void => {
                                    if(!data) return;

                                    setData({
                                        ...data,
                                        active: event.currentTarget.checked
                                    });
                                }}
                            />
                        }
                        label={t("all.Active")}
                    />
                </div>
            </form>
        </GenericModal>
    );
};