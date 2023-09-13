import { makeAutoObservable } from "mobx";
import { getImages, deleteImage, setLabel } from "../services/images";
import { v4 as uuidv4 } from "uuid";

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

const generateImage = () => ({
    _id: uuidv4(),
    uploadDate: Date.now(),
    name: "",
    src: "",
});

class App {
    isLoading: boolean = true;
    editing: Image | null = null;
    images: Image[] = [];
    groups: Map<string, Group> = new Map();

    constructor() {
        makeAutoObservable(this);
        this.setImages(Array(5).fill(0).map(generateImage));
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

    editLabel(id: string) {
        this.editing = this.images.find((image) => image._id === id) ?? null;
    }

    saveLabel(label: string) {
        // if (!this.editing || !label.length) {
        if (!this.editing) {
            this.editing = null;
            return;
        }
        setLabel(this.editing._id, label);
        this.setImages(
            this.images.map((image) =>
                image._id === this.editing?._id ? { ...image, label } : image
            )
        );

        this.editing = null;
    }

    cancelEdit() {
        this.editing = null;
    }

    delete(id: string) {
        this.setImages(this.images.filter((image) => image._id !== id));
        deleteImage(id);
    }

    addImages(images: Image[]) {
        this.setImages(images.concat(this.images));
    }

    updateId(previousId: string, newId: string) {
        this.setImages(
            this.images.map((image) =>
                image._id === previousId ? { ...image, _id: newId } : image
            )
        );
    }
}

const app = new App();
export default app;
