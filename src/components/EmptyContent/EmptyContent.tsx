import ModalContent from "../ModalContent";
import { ReactComponent as Logo } from "../../assets/logo.svg";
import UploadButton from "../UploadButton";

const EmptyContent = () => (
    <ModalContent
        icon={<Logo style={{ paddingBottom: 45 }} />}
        title="No images uploaded yet"
        subTitle="Upload your first image by drag and dropping the file on the
screen or click the button below"
        action={<UploadButton />}
    />
);

export default EmptyContent;
