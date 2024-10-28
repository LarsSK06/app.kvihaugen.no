// Imports

import { IParentProps } from "@/utils/types";
import { Button, Typography } from "@mui/material";
import { t } from "@/utils/i18n";
import { nanoid } from "nanoid";
import { MutableRefObject, useEffect, useRef } from "react";
import HorizontalRule from "../HorizontalRule";
import Foot from "./Foot";
import Head from "./Head";



// Types

interface IProps extends IParentProps{
    id?: string;
    open: boolean;
    loading?: boolean;
    heading?: string;
    cancel?: string;
    accept?: string;
    onClose: () => void;
    onCancel?: () => void;
    onAccept?: () => void;
}



// Component

export default ({
    id = nanoid(6),
    open,
    loading,
    heading,
    cancel,
    accept,
    onClose,
    onCancel,
    onAccept,
    children
}: IProps): React.ReactNode => {

    const labelId: string = `${id}:label`;
    const dialog: MutableRefObject<HTMLDialogElement | null> = useRef<HTMLDialogElement | null>(null);

    useEffect((): void => {
        if(open) dialog.current?.showModal();
        else dialog.current?.close();
    }, [open]);

    return (
        <dialog aria-labelledby={labelId} ref={dialog} className="max-w-full box bg-color-1 m-auto">
            <Head
                id={id}
                heading={heading}
                onClose={onClose}
            />
            <div className="w-fit min-w-full box-p">
                {children}
            </div>
            <Foot
                loading={loading}
                cancel={cancel}
                accept={accept}
                onCancel={onCancel}
                onAccept={onAccept}
            />
        </dialog>
    );
};