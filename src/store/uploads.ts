import { makeAutoObservable } from "mobx";
import * as imageService from "../services/images";
import app from "./app";
import { v4 as uuidv4 } from "uuid";

class Uploads {
    loaded = new Map<string, number>();
    total = new Map<string, number | undefined>();

    constructor() {
        makeAutoObservable(this);
    }

    setProgress(id: string, loaded: number, total: number | undefined) {
        this.loaded.set(id, loaded);
        this.total.set(id, total);
    }

    clear(id: string) {
        this.loaded.delete(id);
        this.total.delete(id);
    }

    uploadImage(file: File) {
        const tmpId = uuidv4();
        this.setProgress(tmpId, 0, file.size);
        imageService
            .uploadImage(file, ({ loaded, total }) => {
                this.setProgress(tmpId, loaded, total);
            })
            .then((id: string) => {
                app.updateId(tmpId, id);
            })
            .finally(() => {
                this.clear(tmpId);
            });
        return tmpId;
    }

    upload(files: File[]) {
        app.addImages(
            files.map((file) => {
                const tmpId = this.uploadImage(file);

                return {
                    name: file.name,
                    _id: tmpId,
                    src: URL.createObjectURL(file),
                    uploadDate: Date.now(),
                };
            })
        );
    }
}

const uploads = new Uploads();
export default uploads;
