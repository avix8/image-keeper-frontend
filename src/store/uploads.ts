import { makeAutoObservable } from "mobx";
import { uploadImage } from "../services/images";

class Uploads {
    constructor() {
        makeAutoObservable(this);
    }

    upload(files: File[]) {
        uploadImage(files[0], (percent) => {
            console.log(percent);
        });
    }
}

const uploads = new Uploads();
export default uploads;
