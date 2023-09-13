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
    setPercent: (percent: number) => void
) => {
    if (!file) return;
    let form = new FormData();
    form.set("image", file);

    axios.post("/image/upload", form, {
        headers: {
            "content-type": "multipart/form-data",
        },
        onUploadProgress(progressEvent) {
            console.log(progressEvent);

            if (progressEvent.total)
                setPercent(
                    Math.round(
                        (progressEvent.loaded * 100) / progressEvent.total
                    )
                );
        },
    });
};
