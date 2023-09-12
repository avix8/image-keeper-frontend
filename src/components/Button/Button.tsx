import styles from "./Button.module.css";

import classnames from "classnames";

import Icon from "../Icon";

export type ButtonProps = {
    children?: string;
    icon?: string;
    small?: boolean;
    prependIcon?: string;
    appendIcon?: string;
    text?: boolean;
    stacked?: boolean;
    block?: boolean;
    rounded?: boolean;
    disabled?: boolean;
    onClick?: () => void;
};

const Button = (props: ButtonProps) => {
    const content = (
        <>
            {props.prependIcon && <Icon name={props.prependIcon} />}
            {props.children ?? (props.icon && <Icon name={props.icon} />)}
            {props.appendIcon && <Icon name={props.appendIcon} />}
        </>
    );

    return (
        <button
            className={classnames(styles.button, {
                [styles.block]: props.block,
                [styles.text]: props.text,
                [styles.rounded]: props.rounded,
                [styles.stacked]: props.stacked,
                [styles.icon]: !!props.icon,
                [styles.small]: props.small,
            })}
            onClick={props.onClick}
            disabled={props.disabled}
        >
            {content}
        </button>
    );
};

export default Button;
