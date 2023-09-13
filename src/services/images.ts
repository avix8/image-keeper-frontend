import { AxiosProgressEvent } from "axios";
import axios from "./init";

export const getImages = () => {
    return axios
        .get("/image/getAll")
        .then(({ data }) => data)
        .catch();
};

export const downloadImage = (id: string) => {
    const a = document.createElement("a");
    a.href = `${axios.defaults.baseURL}image/file/${id}`;
    document.body.appendChild(a);
    a.click();
    a.remove();
};

export const deleteImage = (id: string) => {
    return axios
        .delete("/image", {
            data: {
                id,
            },
        })
        .then(() => id);
};

export const uploadImage = async (
    file: File | undefined,
    onUploadProgress: (event: AxiosProgressEvent) => void
) => {
    if (!file) return;
    let form = new FormData();
    form.set("image", file);

    return axios
        .post("/image/upload", form, {
            headers: {
                "content-type": "multipart/form-data",
            },
            onUploadProgress,
        })
        .then(({ data }) => data.id);
};

export const setLabel = (id: string, label: string) => {
    return axios
        .post("/image/setLabel", {
            id,
            label,
        })
        .then(({ data }) => data);
};
