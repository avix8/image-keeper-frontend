import styles from "./Button.module.css";

import classnames from "classnames";

import Icon from "../Icon";

export type ButtonProps = {
    children?: string;
    text?: boolean;
    prependIcon?: string;
    disabled?: boolean;
    onClick?: () => void;
};

const Button = (props: ButtonProps) => {
    return (
        <button
            className={classnames(styles.button, {
                [styles.text]: props.text,
            })}
            onClick={props.onClick}
            disabled={props.disabled}
        >
            {props.prependIcon && <Icon name={props.prependIcon} />}
            {props.children}
        </button>
    );
};

export default Button;
