import { Image } from "../../types";
import ImageCard from "../ImageCard";

import styles from "./ImageGroup.module.css";

type ImageGroupProps = {
    title: string;
    images: Image[];
};

const ImageGroup = (props: ImageGroupProps) => {
    return (
        <div className={styles.imageGroup}>
            <div className={styles.title}>
                {props.title}
                <div className={styles.amount}>{props.images.length}</div>
            </div>
            <div className={styles.imageList}>
                {props.images.map((image) => (
                    <ImageCard key={image._id} {...image} />
                ))}
            </div>
        </div>
    );
};

export default ImageGroup;
