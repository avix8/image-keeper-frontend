import styles from "./EditLabel.module.css";

import ImageCard from "../ImageCard";
import app from "../../store/app";
import Button from "../Button";
import { useState } from "react";

const EditLabel = () => {
    const [newLabel, setNewLabel] = useState(app.editing?.label ?? "");
    if (!app.editing) return <></>;

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.value.length > 100) return;
        setNewLabel(e.target.value);
    };

    return (
        <div className={styles.container}>
            <div className={styles.title}>Set custom label</div>
            <div>
                <ImageCard
                    src={app.editing.src}
                    _id={app.editing._id}
                    uploadDate={0}
                    hideLabel
                    disabled
                />
                <input
                    value={newLabel}
                    onChange={onChange}
                    placeholder="Enter custom label"
                    className={styles.input}
                ></input>
                <div className={styles.details}>100 chars max</div>
            </div>
            <Button
                prependIcon="check-mark"
                onClick={() => app.saveLabel(newLabel)}
                children="Save"
            />
        </div>
    );
};

export default EditLabel;
