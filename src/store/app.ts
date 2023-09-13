import { makeAutoObservable } from "mobx";
import { getImages, deleteImage } from "../services/images";

import { Image, Group } from "../types";

const getGroupTitle = (date: number) => {
    const [month, year] = new Date(date)
        .toLocaleDateString("en-US", {
            month: "long",
            year: "2-digit",
        })
        .split(" ");
    return `${month} ‘${year}`;
};

class App {
    isLoading: boolean = true;
    images: Image[] = [];
    groups: Map<string, Group> = new Map();

    constructor() {
        makeAutoObservable(this);

        getImages()
            .then(this.setImages)
            .finally(() => this.setLoading(false));
    }

    setLoading = (isLoading: boolean) => {
        this.isLoading = isLoading;
    };

    setImages = (data: Image[]) => {
        this.images = data;

        this.groups = data.reduce(
            (groups: Map<string, Group>, image: Image) => {
                const title = getGroupTitle(image.uploadDate);
                if (!groups.has(title)) {
                    groups.set(title, {
                        title,
                        images: [],
                    });
                }
                groups.get(title)!.images.push(image);
                return groups;
            },
            new Map()
        );
    };

    upload() {}

    deleteSuccess = (id: string) => {
        this.setImages(this.images.filter((image) => image._id !== id));
    };

    delete(id: string) {
        deleteImage(id).then(this.deleteSuccess);
    }
}

const app = new App();
export default app;
