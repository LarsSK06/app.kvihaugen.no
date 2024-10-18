// Imports

import { IParentProps } from "@/utils/types";

import styles from "./styles.module.css";



// Types

interface IProps extends IParentProps<string>{
    id?: string;
    disabled?: boolean;
    props?: {
        button?: React.DetailedHTMLProps<React.HTMLAttributes<HTMLButtonElement>, HTMLButtonElement>;
        span?: React.DetailedHTMLProps<React.HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>;
    };
    onClick?: (value: React.MouseEvent<HTMLButtonElement>) => void;
    onFocus?: (value: React.FocusEvent<HTMLButtonElement>) => void;
    onBlur?: (value: React.FocusEvent<HTMLButtonElement>) => void;
}



// Component

export default ({
    id,
    disabled,
    props,
    onClick,
    onFocus,
    onBlur,
    children
}: IProps): React.ReactNode => (
    <button
        id={id}
        disabled={disabled}
        className={styles.button}
        onClick={onClick}
        onFocus={onFocus}
        onBlur={onBlur}
        {...props?.button}
    >
        <span className={styles.span} {...props?.span}>
            {children}
        </span>
    </button>
);