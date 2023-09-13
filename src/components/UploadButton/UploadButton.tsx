import { useCallback, useRef } from "react";
import upload from "../../store/uploads";
import Button from "../Button";

const UploadButton = (props: Parameters<typeof Button>[0]) => {
    const ref = useRef<HTMLInputElement>(null);

    const openDialog = useCallback(() => {
        ref.current?.click();
    }, []);

    return (
        <>
            <Button
                prependIcon="upload"
                children="Upload image"
                onClick={openDialog}
                {...props}
            />
            <input
                type="file"
                multiple
                hidden
                ref={ref}
                accept="image/*"
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    if (!event.target.files) return;
                    upload.upload(Array.from(event.target.files));
                }}
            />
        </>
    );
};

export default UploadButton;
