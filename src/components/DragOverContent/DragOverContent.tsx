import ModalContent from "../ModalContent";
import { ReactComponent as UploadLarge } from "../../assets/icons/uploadLarge.svg";

const DragOverContent = () => (
    <ModalContent
        icon={<UploadLarge />}
        title="Upload file"
        subTitle="Drop your file here to start uploading"
    />
);

export default DragOverContent;
