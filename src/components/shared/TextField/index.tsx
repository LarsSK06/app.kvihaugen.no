// Imports

import styles from "./styles.module.css";

import { HTMLInputTypeAttribute } from "react";
import { nanoid } from "nanoid";



// Types

interface IProps{
    id?: string;
    label?: string;
    name?: string;
    placeholder?: string;
    defaultValue?: string;
    type?: HTMLInputTypeAttribute;
    required?: boolean;
    disabled?: boolean;
    props?: {
        div?: React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;
        label?: React.DetailedHTMLProps<React.HTMLAttributes<HTMLLabelElement>, HTMLLabelElement>;
        input?: React.DetailedHTMLProps<React.HTMLAttributes<HTMLInputElement>, HTMLInputElement>;
    };
    onChange?: (value: React.ChangeEvent<HTMLInputElement>) => void;
    onFocus?: (value: React.FocusEvent<HTMLInputElement>) => void;
    onBlur?: (value: React.FocusEvent<HTMLInputElement>) => void;
}



// Component

export default ({
    id = nanoid(),
    label,
    name,
    placeholder,
    defaultValue,
    type,
    required,
    disabled,
    props,
    onChange,
    onFocus,
    onBlur
}: IProps): React.ReactNode => (
    <div className="w-80 h-fit flex flex-col" {...props?.div}>
        <label htmlFor={id} className={styles.label} {...props?.label}>
            {label}
        </label>
        <input
            id={id}
            name={name}
            placeholder={placeholder}
            defaultValue={defaultValue}
            type={type}
            required={required}
            disabled={disabled}
            onChange={onChange}
            onFocus={onFocus}
            onBlur={onBlur}
            className={styles.input}
            {...props?.input}
        />
    </div>
);