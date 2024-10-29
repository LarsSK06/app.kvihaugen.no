// Imports

import { IParentProps } from "@/utils/types";
import { MutableRefObject, useEffect, useRef, useState, } from "react";

import Foot from "./Foot";
import Head from "./Head";
import classNames from "classnames";
import styles from "./styles.module.css";



// Types

interface IProps extends IParentProps{
    id: string;
    open: boolean;
    loading?: boolean;
    heading?: string;
    cancel?: string;
    accept?: string;
    onClose?: () => void;
    onCancel?: () => void;
    onAccept?: () => void;
}



// Component

export default ({
    id,
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

    const [showActiveState, setShowActiveState] = useState<boolean>(false);

    const labelId: string = `${id}:label`;
    const dialog: MutableRefObject<HTMLDialogElement | null> = useRef<HTMLDialogElement | null>(null);

    useEffect((): void => {
        if(open) dialog.current?.showModal();
        else setTimeout((): void => dialog.current?.close(), 150);

        setShowActiveState(open);
    }, [open]);

    function onDialogCancel(event: React.SyntheticEvent<HTMLDialogElement>): void{
        event.preventDefault();

        if(onClose) onClose();
    }

    return (
        <dialog onCancel={onDialogCancel} aria-labelledby={labelId} ref={dialog} className={classNames("max-w-full box bg-color-1 m-auto opacity-0 transition-all", showActiveState && styles.open)}>
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