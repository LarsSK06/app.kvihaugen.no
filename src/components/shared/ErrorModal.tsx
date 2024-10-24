// Imports

import { nanoid } from "nanoid";
import { t } from "i18next";
import { Typography } from "@mui/material";

import Modal from "./Modal";



// Types

interface IProps{
    id?: string;
    open: boolean;
    error?: string;
    onClose: () => void;
}



// Component

export default ({
    id = nanoid(),
    open,
    error,
    onClose
}: IProps): React.ReactNode => (
    <Modal id={id} open={open} heading={t("errors.Error")} onClose={onClose}>
        <Typography>
            {error ?? t("errors.AnErrorOccured")}
        </Typography>
    </Modal>
);