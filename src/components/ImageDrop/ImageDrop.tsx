import uploads from "../../store/uploads";
import { FileDrop } from "../FileDrop/FileDrop";

type ImageDropProps = {
    children: React.ReactNode;
    setIsDragOver: (value: boolean) => void;
};

const ImageDrop = (props: ImageDropProps) => {
    const onDrop = (files: FileList | null) => {
        onFrameDragLeave();
        if (files) uploads.upload(Array.from(files));
    };

    const onFrameDragLeave = () => {
        props.setIsDragOver(false);
    };

    const onFrameDragEnter = () => {
        props.setIsDragOver(true);
    };

    return (
        <FileDrop
            {...props}
            onFrameDragLeave={onFrameDragLeave}
            onFrameDragEnter={onFrameDragEnter}
            onDrop={onDrop}
        />
    );
};

export default ImageDrop;
