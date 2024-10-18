// Imports

import styles from "./styles.module.css";



// Types

interface IProps{
    id?: string;
    label?: string;
    name?: string;
    placeholder?: string;
    defaultValue?: string;
    onChange?: (value: React.ChangeEvent<HTMLInputElement>) => void;
    onFocus?: (value: React.FocusEvent<HTMLInputElement>) => void;
    onBlur?: (value: React.FocusEvent<HTMLInputElement>) => void;
}



// Component

export default ({ id, label, name, placeholder, defaultValue, onChange, onFocus, onBlur }: IProps): React.ReactNode => {
    return (
        <div className="w-fit h-fit flex flex-col">
            <label htmlFor={id} className={styles.label}>
                {label}
            </label>
            <input
                id={id}
                name={name}
                placeholder={placeholder}
                defaultValue={defaultValue}
                type="text"
                onChange={onChange}
                onFocus={onFocus}
                onBlur={onBlur}
                className={styles.input}
            />
        </div>
    );
};