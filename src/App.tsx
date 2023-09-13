import React, { useState } from "react";

import styles from "./App.module.css";
import Header from "./components/Header";
import ImageGroup from "./components/ImageGroup/ImageGroup";

import app from "./store/app";
import { observer } from "mobx-react-lite";
import ModalWindow from "./components/ModalWindow";
import ImageDrop from "./components/ImageDrop";
import EditLabel from "./components/EditLabel";
import Button from "./components/Button";
import Notifications from "./components/Notifications";
import DragOverContent from "./components/DragOverContent";
import EmptyContent from "./components/EmptyContent";

const getModalContent = (
    isDragOver: boolean,
    isEditing: boolean,
    isEmpty: boolean
) => {
    if (isDragOver) return <DragOverContent />;
    if (isEmpty) return <EmptyContent />;
    if (isEditing) return <EditLabel />;
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
            <Notifications />
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
                    children={modalContent}
                />

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
