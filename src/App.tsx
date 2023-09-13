import React, { useEffect, useState } from "react";

import styles from "./App.module.css";
import Header from "./components/Header";
import ImageGroup from "./components/ImageGroup/ImageGroup";

import app from "./store/app";
import { observer } from "mobx-react-lite";
import EmptyApp from "./components/EmptyApp/EmptyApp";

function App() {
    const showApp = true || app.isLoading || app.images.length !== 0;

    return (
        <div className={styles.app}>
            <div style={{ visibility: showApp ? "visible" : "hidden" }}>
                <Header
                    isLoading={app.isLoading}
                    imageAmount={app.images.length}
                />
                {Array.from(app.groups.values()).map(({ title, images }) => (
                    <ImageGroup key={title} title={title} images={images} />
                ))}
            </div>
        </div>
    );
}

export default observer(App);
