import { observer } from "mobx-react-lite";
import { Image } from "../../types";
import ImageCard from "../ImageCard";

import styles from "./ImageGroup.module.css";
import classnames from "classnames";
import app from "../../store/app";

type ImageGroupProps = {
    title: string;
    images: Image[];
};

const ImageGroup = (props: ImageGroupProps) => {
    return (
        <div className={styles.imageGroup}>
            <div
                className={classnames(styles.title, {
                    [styles.loading]: app.isLoading,
                })}
            >
                {!app.isLoading && (
                    <>
                        <h1>{props.title}</h1>
                        <h3 className={styles.amount}>{props.images.length}</h3>
                    </>
                )}
            </div>
            <div className={styles.imageList}>
                {props.images.map((image) => (
                    <ImageCard key={image._id} {...image} />
                ))}
            </div>
        </div>
    );
};

export default observer(ImageGroup);
