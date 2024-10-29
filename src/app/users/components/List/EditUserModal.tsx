"use client";



// Imports

import Modal from "@/components/shared/Modal";

import { formDataToJSON } from "@/utils/functions";
import { t } from "@/utils/i18n";
import { IUserToEdit } from "@/utils/types/users";
import { TextField } from "@mui/material";
import { MutableRefObject, useRef } from "react";



// Types

interface IProps{
    id: string;
    open: boolean;
    loading: boolean;
    value?: IUserToEdit;
    onClose: () => void;
    onAccept: (value: IUserToEdit) => void;
}



// Component

export default ({ id, open, loading, value, onClose, onAccept }: IProps): React.ReactNode => {

    const form: MutableRefObject<HTMLFormElement | null> = useRef<HTMLFormElement | null>(null);

    function onModalAccept(): void{
        form.current?.submit();
    }

    function onFormSubmit(event: React.FormEvent<HTMLFormElement>): void{
        event.preventDefault();        

        const parse: any = formDataToJSON(new FormData(event.currentTarget));

        onAccept({ ...value, ...parse });
    }

    return (
        <Modal
            id={id}
            open={open}
            loading={loading}
            heading={t("users.EditUser")}
            onCancel={onClose}
            onClose={onClose}
            onAccept={onModalAccept}
        >
            <form className="flex flex-col" onSubmit={onFormSubmit}>
                <TextField
                    name="name"
                    type="text"
                    placeholder={t("all.Name")}
                    label={t("all.Name")}
                    defaultValue={value?.name}
                />
                <TextField
                    name="password"
                    type="password"
                    placeholder={t("all.Password")}
                    label={t("all.Password")}
                    defaultValue={value?.password}
                />
                <TextField
                    name="email"
                    type="email"
                    placeholder={t("all.Email")}
                    label={t("all.Email")}
                    defaultValue={value?.email}
                />
            </form>
        </Modal>
    );
};