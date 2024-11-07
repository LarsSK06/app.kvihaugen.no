// Imports

import { MutableRefObject, useEffect, useRef } from "react";
import { IParentProps } from "../types";
import { Button, IconButton, Modal, Typography } from "@mui/material";
import { t } from "../i18n";

import HorizontalRule from "./HorizontalRule";



// Types

interface IProps extends IParentProps{
    show: boolean;
    loading?: boolean;
    heading: string;
    cancel?: string;
    accept?: string;
    onClose?: () => void;
    onCancel?: () => void;
    onAccept?: () => void;
}



// Component

export default ({
    show,
    loading,
    heading,
    cancel,
    accept,
    onClose,
    onCancel,
    onAccept,
    children
}: IProps): React.ReactNode => {

    return (
        <Modal open={show} className="flex justify-center items-center">
            <div className="w-fit h-fit box-no-padding bg-color-1">
                <div className="p-4 flex justify-between items-center gap-12">
                    <Typography variant="h1">
                        {heading}
                    </Typography>
                    {onClose && (
                        <IconButton onClick={onClose} disabled={loading} aria-label={t("labels.CloseModal")}>
                            <img src="/icons/cross.svg" className="h-4"/>
                        </IconButton>
                    )}
                </div>

                <HorizontalRule/>

                <div className="w-full p-4">
                    {children}
                </div>

                {(onCancel || onAccept) && (
                    <>
                        <HorizontalRule/>
                        <div className="w-full p-4">
                            <div className="w-fit ml-auto flex gap-2">
                                {onCancel && (
                                    <Button variant="outlined" onClick={onCancel} disabled={loading}>
                                        {cancel ?? t("all.Cancel")}
                                    </Button>
                                )}
                                {onAccept && (
                                    <Button variant="contained" onClick={onAccept} disabled={loading}>
                                        {accept ?? t("all.Accept")}
                                    </Button>
                                )}
                            </div>
                        </div>
                    </>
                )}
            </div>
        </Modal>
    );
};