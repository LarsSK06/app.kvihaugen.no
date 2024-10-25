// Imports

import { nanoid } from "nanoid";
import { t } from "@/utils/i18n";
import { Collapse, Typography } from "@mui/material";
import { useState } from "react";

import Modal from "./Modal";
import HorizontalRule from "./HorizontalRule";



// Types

interface IProps{
    id?: string;
    open: boolean;
    error?: string;
    onClose: () => void;
}



// Component

export default ({
    id = nanoid(6),
    open,
    error,
    onClose
}: IProps): React.ReactNode => {

    const [showDetailedError, setShowDetailedError] = useState<boolean>(false);

    function onShowDetailedErrorClick(): void{
        setShowDetailedError(!showDetailedError);
    }

    const showDetailedErrorCollapsibleId: string = `${id}:detailcollapsible`;

    return (
        <Modal
            id={id}
            open={open}
            cancel={t("all.Decline")}
            heading={t("errors.AnErrorOccured")}
            onClose={onClose}
            onCancel={onClose}
        >
            <Typography>
                {t("errors.SystemHasABadDay")}
            </Typography>
            {error && (
                <div className="mt-4">
                    <button
                        className="underline focus:-translate-y-1 transition-all"
                        onClick={onShowDetailedErrorClick}
                        aria-controls={showDetailedErrorCollapsibleId}
                        aria-expanded={open}
                    >
                        <Typography>
                            {showDetailedError ? (
                                t("errors.HideDetailedError")
                            ) : (
                                t("errors.SeeDetailedError")
                            )}
                        </Typography>
                    </button>
                    <Collapse
                        id={showDetailedErrorCollapsibleId}
                        in={showDetailedError}
                        aria-hidden={!showDetailedError}
                    >
                        <HorizontalRule className="my-2"/>
                        <Typography className="max-w-96">
                            {t(error)}
                        </Typography>
                        <HorizontalRule className="my-2"/>
                    </Collapse>
                </div>
            )}
        </Modal>
    );
};