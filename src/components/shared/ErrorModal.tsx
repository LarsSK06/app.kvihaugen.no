// Imports

import { t } from "@/utils/i18n";
import { Typography } from "@mui/material";

import Modal from "./Modal";



// Types

interface IProps{
    id: string;
    open: boolean;
    loading?: boolean;
    error?: string;
    onClose: () => void;
}



// Component

export default ({
    id,
    open,
    loading,
    error,
    onClose
}: IProps): React.ReactNode => (
    <Modal
        id={id}
        open={open}
        loading={loading}
        cancel={t("all.Decline")}
        heading={t("errors.AnErrorOccured")}
        onClose={onClose}
        onCancel={onClose}
    >
        <Typography>
            {error ?? t("errors.SystemHasABadDay")}
        </Typography>
    </Modal>
);