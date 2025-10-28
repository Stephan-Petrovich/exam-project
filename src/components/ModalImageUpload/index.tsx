import Input from "../Input";
import { ReactElement, useState } from "react";
import "./style.css";

const ModalImageUpload = (): ReactElement => {
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const [fileName, setFileName] = useState<string>("");

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0] || null;

        if (file) {
            const allowedFileTypes = [
                "image/jpeg",
                "image/jpg",
                "image/png",
                "application/pdf",
            ];
            if (!allowedFileTypes.includes(file.type)) {
                alert("Please select only JPG, PNG or PDF files");
                return;
            }

            setSelectedImage(file);
            setFileName(file.name);
        }
    };
    return (
        <div className="modal-image-upload">
            <form className="image-upload-form">
                <Input
                    type="file"
                    value={fileName}
                    onChange={() => {}}
                    onChangeEvent={handleFileChange}
                />
            </form>

            {selectedImage && (
                <div>
                    <p>Selected file: {selectedImage.name}</p>
                    <p>Type: {selectedImage.type}</p>
                    <p>Size: {(selectedImage.size / 1024).toFixed(2)} KB</p>
                </div>
            )}
        </div>
    );
};

export default ModalImageUpload;
