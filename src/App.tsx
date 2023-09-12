import React, { useEffect, useState } from "react";
import { getPhotos, uploadPhoto } from "./services/photos";
import { Image } from "./types";

import styles from "./App.module.css";
import Header from "./components/Header";
import ImageGroup from "./components/ImageGroup/ImageGroup";


function App() {
    const [isLoading, setIsLoading] = useState(true);
    const [images, setImages] = useState<Image[]>([]);

    useEffect(() => {
        setIsLoading(true);
        getPhotos()
            .then((data) => {
                setImages(data);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, []);

    return (
        <div className={styles.app}>
            <Header isLoading={isLoading} imageAmount={images.length} />
            <ImageGroup title="September' 23" images={images} />
            <ImageGroup title="August' 23" images={images} />
        </div>
    );
}

export default App;
