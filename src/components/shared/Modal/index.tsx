// Imports

import { IParentProps } from "@/utils/types";
import { Button, Typography } from "@mui/material";
import { t } from "@/utils/i18n";
import { nanoid } from "nanoid";
import { MutableRefObject, useEffect, useRef } from "react";
import HorizontalRule from "../HorizontalRule";



// Types

interface IProps extends IParentProps{
    id?: string;
    open: boolean;
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
            <div className="w-full h-fit box-p flex justify-between items-start gap-8">
                {heading && (
                    <Typography id={labelId} variant="h2">
                        {heading}
                    </Typography>
                )}
                <Button onClick={onClose} className="ml-auto">
                    X
                </Button>
            </div>
            <HorizontalRule/>
            <div className="w-fit min-w-full box-p">
                {children}
            </div>
            {(onCancel || onAccept) && (
                <>
                    <HorizontalRule/>
                    <div className="w-fill h-fit flex justify-end items-center gap-1 box-p">
                        {onCancel && (
                            <Button onClick={onCancel} variant="outlined">
                                {cancel ?? t("all.Cancel")}
                            </Button>
                        )}
                        {onAccept && (
                            <Button onClick={onAccept} variant="contained">
                                {accept ?? t("all.Accept")}
                            </Button>
                        )}
                    </div>
                </>
            )}
        </dialog>
    );
};