import styles from "./UploadImage.module.css";

import { ReactComponent as UploadLarge } from "../../assets/icons/uploadLarge.svg";
import UploadButton from "../UploadButton";

type UploadImageProps = {
    style?: React.CSSProperties;
};

const UploadImage = (props: UploadImageProps) => {
    return (
        <div className={styles.container} {...props}>
            <UploadLarge />
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

export default UploadImage;
