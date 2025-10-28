import { ReactElement, ChangeEvent } from "react";
import "./style.css";

interface IModalImageUploadProps {
    selectedFile: File | null;
    previewUrl: string | null;
    fileName: string;
    error: string | null;
    isValid: boolean;
    handleImageChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const ModalImageUpload = ({
    selectedFile,
    previewUrl,
    fileName,
    error,
    isValid,
    handleImageChange,
}: IModalImageUploadProps): ReactElement => {
    return (
        <div className="modal-image-upload">
            <form className="image-upload-form">
                <input
                    type="file"
                    accept=".jpg,.jpeg,.png"
                    onChange={handleImageChange}
                />

                {error && <div className="error-message">{error}</div>}

                <div className="file-requirements">
                    <p>
                        <strong>📋 File requirements:</strong>
                    </p>
                    <ul className="requirements-list">
                        <li>Allowed formats: JPG, PNG, PDF</li>
                        <li>Maximum file size: 5MB</li>
                    </ul>
                </div>
            </form>

            {previewUrl && isValid && (
                <div className="file-preview">
                    <h3>Selected file:</h3>
                    <div className="file-info">
                        <p>Name: {fileName}</p>
                        <p>Type: {selectedFile?.type}</p>
                        <p>
                            Size:{" "}
                            {(selectedFile
                                ? selectedFile.size / 1024
                                : 0
                            ).toFixed(2)}
                            KB
                        </p>
                    </div>

                    <div className="preview-container">
                        {selectedFile?.type.startsWith("image/") && (
                            <div className="image-preview">
                                <img
                                    src={previewUrl}
                                    alt="Preview"
                                    className="preview-image"
                                />
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default ModalImageUpload;
