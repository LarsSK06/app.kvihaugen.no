// Imports

import { IParentProps } from "@/utils/types";
import { Button, Typography } from "@mui/material";
import { t } from "i18next";
import { nanoid } from "nanoid";



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
    id = nanoid(),
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

    return (
        <div className="w-full h-vp fixed left-0 top-0 justify-center items-center bg-blur z-10" style={{ display: open ? "flex" : "none" }}>
            <div id={id} role="dialog" aria-labelledby={labelId} aria-modal="true" className="w-fit min-w-96 h-fit overflow-hidden box bg-color-1">
                <div className="w-full h-fit box-p flex justify-between items-start">
                    {heading && (
                        <Typography id={labelId} variant="h2">
                            {heading}
                        </Typography>
                    )}
                    <Button onClick={onClose} className="ml-auto">
                        X
                    </Button>
                </div>
                <hr className="w-full border-solid border-t border-t-color-2"/>
                <div className="w-fit min-w-full box-p">
                    {children}
                </div>
                {(onCancel || onAccept) && (
                    <>
                        <hr className="w-full border-solid border-t border-t-color-2"/>
                        <div className="w-fill h-fit flex justify-end items-center gap-1 box-p">
                            {onCancel && (
                                <Button onClick={onCancel}>
                                    {cancel ?? t("all.Cancel")}
                                </Button>
                            )}
                            {onAccept && (
                                <Button onClick={onAccept}>
                                    {accept ?? t("all.Accept")}
                                </Button>
                            )}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};