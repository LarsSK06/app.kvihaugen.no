// Imports

import { t } from "@/utils/i18n";
import { Typography } from "@mui/material";

import Modal from "./Modal";



// Types

interface IProps{
    id: string;
    open: boolean;
    loading?: boolean;
    message?: string;
    onClose: () => void;
    onAccept: () => void;
}



// Component

export default ({
    id,
    open,
    loading,
    message,
    onClose,
    onAccept
}: IProps): React.ReactNode => (
    <Modal
        id={id}
        open={open}
        loading={loading}
        heading={t("confirmations.AreYouSure")}
        onClose={onClose}
        onCancel={onClose}
        onAccept={onAccept}
    >
        <Typography>
            {message ?? t("confirmations.AreYouReallySure")}
        </Typography>
    </Modal>
);