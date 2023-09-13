import React, { useState } from "react";

import styles from "./App.module.css";
import Header from "./components/Header";
import ImageGroup from "./components/ImageGroup/ImageGroup";

import app from "./store/app";
import { observer } from "mobx-react-lite";
import ModalContent from "./components/ModalContent";
import ModalWindow from "./components/ModalWindow";
import ImageDrop from "./components/ImageDrop";
import { ReactComponent as UploadLarge } from "./assets/icons/uploadLarge.svg";
import { ReactComponent as Logo } from "./assets/logo.svg";
import UploadButton from "./components/UploadButton";
import EditLabel from "./components/EditLabel";
import Button from "./components/Button";

const getModalContent = (
    isDragOver: boolean,
    isEditing: boolean,
    isEmpty: boolean
) => {
    if (isDragOver)
        return (
            <ModalContent
                icon={<UploadLarge />}
                title="Upload file"
                subTitle="Drop your file here to start uploading"
            />
        );

    if (isEmpty)
        return (
            <ModalContent
                icon={<Logo style={{ paddingBottom: 45 }} />}
                title="No images uploaded yet"
                subTitle="Upload your first image by drag and dropping the file on the
screen or click the button below"
                action={<UploadButton />}
            />
        );
    if (isEditing) {
        return <EditLabel />;
    }

    return null;
};

function App() {
    const [isDragOver, setIsDragOver] = useState(false);
    const isEmpty = !app.isLoading && app.images.length === 0;

    const style: React.CSSProperties = {
        visibility: isEmpty ? "hidden" : "visible",
    };
    const isEditing = !!app.editing;
    const modalContent = getModalContent(isDragOver, isEditing, isEmpty);

    return (
        <div className={styles.app}>
            <ImageDrop setIsDragOver={setIsDragOver}>
                <ModalWindow
                    visible={!!modalContent}
                    closeButton={
                        isEditing ? (
                            <Button
                                onClick={() => app.cancelEdit()}
                                prependIcon="cross-mark"
                                children="Close editor"
                            />
                        ) : undefined
                    }
                >
                    {modalContent}
                </ModalWindow>

                <div style={style}>
                    <Header
                        isLoading={app.isLoading}
                        imageAmount={app.images.length}
                    />
                </div>

                <div className={styles.container} style={style}>
                    {Array.from(app.groups.values()).map(
                        ({ title, images }) => (
                            <ImageGroup
                                key={title}
                                title={title}
                                images={images}
                            />
                        )
                    )}
                </div>
            </ImageDrop>
        </div>
    );
}

export default observer(App);
