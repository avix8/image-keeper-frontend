import styles from "./EmptyApp.module.css";

import { ReactComponent as Logo } from "../../assets/logo.svg";
import UploadButton from "../UploadButton";

const EmptyApp = () => {
    return (
        <div className={styles.container}>
            <Logo />
            <div className={styles.info}>
                <div className={styles.title}>No images uploaded yet</div>
                <div className={styles.subTitle}>
                    Upload your first image by drag and dropping the file on the
                    screen or click the button below
                </div>
            </div>
            <UploadButton />
        </div>
    );
};

export default EmptyApp;
