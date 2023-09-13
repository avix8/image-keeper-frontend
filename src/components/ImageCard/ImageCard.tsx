import { memo } from "react";
import Button from "../Button";
import styles from "./ImageCard.module.css";
import app from "../../store/app";
import { downloadImage } from "../../services/images";

type ImageProps = {
    _id: string;
    src?: string;
    label?: string;
    date?: number;
    uploadDate: number;
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

const ImageCard = (props: ImageProps) => {
    const label = props.label ?? getDefaultLabel(props.uploadDate);

    const download = () => {
        downloadImage(props._id);
    };
    const edit = () => {};
    const deleteAction = () => {
        app.delete(props._id);
    };

    const buttons = [
        { icon: "download", title: "Download", onClick: download },
        { icon: "edit", title: "Edit label", onClick: edit },
        { icon: "delete", title: "Delete", onClick: deleteAction },
    ];

    return (
        <div className={styles.imageCard}>
            <img className={styles.image} src={props.src} alt="" />
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
            <div className={styles.label}>{label}</div>
        </div>
    );
};

export default memo(ImageCard);
