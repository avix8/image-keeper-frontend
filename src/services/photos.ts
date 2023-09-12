import axios from "./init";

export const getPhotos = () => {
    return axios
        .get("/image/getAll")
        .then(({ data }) => data)
        .catch();
};

export const uploadPhoto = async (
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
