import Button from "../Button";
import styles from "./ImageCard.module.css";
import app from "../../store/app";
import { downloadImage } from "../../services/images";
import uploads from "../../store/uploads";
import { observer } from "mobx-react-lite";
import classnames from "classnames";

type ImageProps = {
    _id: string;
    src?: string;
    label?: string;
    date?: number;
    uploadDate: number;
    hideLabel?: boolean;
    disabled?: boolean;
};

const getDefaultLabel = (date: number) => {
    const [month, day] = new Date(date)
        .toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
        })
        .split(" ");
    return `${day} ${month}`;
};

const getProgressInfo = (id: string) => {
    return `${Math.floor(
        (uploads.loaded.get(id) ?? 0) / 1024
    )}kb of ${Math.floor((uploads.total.get(id) ?? 0) / 1024)}kb`;
};

const getPercent = (id: string) => {
    return `${Math.floor(
        ((uploads.loaded.get(id) ?? 0) * 100) / (uploads.total.get(id) ?? 1)
    )}%`;
};

const ImageCard = (props: ImageProps) => {
    const label = props.label?.length
        ? props.label
        : getDefaultLabel(props.uploadDate);

    const download = () => {
        downloadImage(props._id);
    };
    const edit = () => {
        app.editLabel(props._id);
    };
    const deleteAction = () => {
        app.delete(props._id);
    };

    const buttons = [
        { icon: "download", title: "Download", onClick: download },
        { icon: "edit", title: "Edit label", onClick: edit },
        { icon: "delete", title: "Delete", onClick: deleteAction },
    ];

    const isUploading = !!uploads.total.get(props._id);
    if (app.isLoading) return <div className={styles.imageCard}></div>;
    return (
        <div className={styles.imageCard}>
            <img className={styles.image} src={props.src} alt="" />
            {props.disabled ? null : isUploading ? (
                <div className={classnames(styles.overlay, styles.uploading)}>
                    <div
                        className={styles.progress}
                        style={{
                            width: getPercent(props._id),
                        }}
                    ></div>
                    <div className={styles.uploadInfo}>
                        <h3 className={styles.uploadTitle}>Uploading</h3>
                        {getProgressInfo(props._id)}
                    </div>
                </div>
            ) : (
                <div className={styles.overlay}>
                    <div className={styles.buttons}>
                        {buttons.map(({ icon, title, onClick }) => (
                            <Button
                                text
                                prependIcon={icon}
                                children={title}
                                onClick={onClick}
                                key={title}
                            />
                        ))}
                    </div>
                </div>
            )}
            {!props.hideLabel && <div className={styles.label}>{label}</div>}
        </div>
    );
};

export default observer(ImageCard);
