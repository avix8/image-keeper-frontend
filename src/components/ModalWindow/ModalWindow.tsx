import styles from "./ModalWindow.module.css";

type ModalWindowProps = {
    children: React.ReactNode;
    visible: boolean;
    closeButton?: React.ReactNode;
};

const ModalWindow = (props: ModalWindowProps) => {
    return (
        <div
            className={styles.modalWindow}
            style={{ visibility: props.visible ? "visible" : "hidden" }}
        >
            {props.children}
            <div className={styles.closeButton}>{props.closeButton}</div>
        </div>
    );
};

export default ModalWindow;
