// Imports

import HorizontalRule from "../HorizontalRule";

import { t } from "@/utils/i18n";
import { Button } from "@mui/material";



// Types

interface IProps{
    loading?: boolean;
    cancel?: string;
    accept?: string;
    onCancel?: () => void;
    onAccept?: () => void;
}



// Component

export default ({ loading, cancel, accept, onCancel, onAccept }: IProps): React.ReactNode => (
    (onCancel || onAccept) && (
        <>
            <HorizontalRule/>
            <div className="w-fill h-fit flex justify-end items-center gap-1 box-p">
                {onCancel && (
                    <Button onClick={onCancel} variant="outlined" disabled={loading}>
                        {cancel ?? t("all.Cancel")}
                    </Button>
                )}
                {onAccept && (
                    <Button onClick={onAccept} variant="contained" disabled={loading}>
                        {accept ?? t("all.Accept")}
                    </Button>
                )}
            </div>
        </>
    )
);