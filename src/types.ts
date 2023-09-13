export type Image = {
    _id: string;
    name: string;
    src: string;
    uploadDate: number;
};

export type Group = {
    title: string;
    images: Image[];
};
