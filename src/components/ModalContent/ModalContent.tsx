import { ReactNode } from "react";
import styles from "./ModalContent.module.css";

type ModalContentProps = {
    style?: React.CSSProperties;
    title: string;
    icon?: ReactNode;
    subTitle?: string;
    action?: ReactNode;
};

const ModalContent = (props: ModalContentProps) => {
    return (
        <div className={styles.container} style={props.style}>
            {props.icon}
            <div className={styles.title}>{props.title}</div>
            <div className={styles.subTitle}>{props.subTitle}</div>
            <div className={styles.action}>{props.action}</div>
        </div>
    );
};

export default ModalContent;
