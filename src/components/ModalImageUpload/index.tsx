import AlertError from "../AlertError";
import { useImageData } from "../../contexts/ImageDataContext";
import { ReactElement } from "react";
import "./style.css";

const ModalImageUpload = (): ReactElement => {
    const { imageData, isValid, error, handleImageChange } = useImageData();

    return (
        <div className="modal-image-upload">
            <form className="image-upload-form">
                <input
                    type="file"
                    accept=".jpg,.jpeg,.png"
                    onChange={handleImageChange}
                    className="file-input"
                />

                {error && <AlertError label={error} />}

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

            {imageData.previewUrl && isValid && (
                <div className="file-preview">
                    <h3>Selected file:</h3>
                    <div className="file-info">
                        <p>Name: {imageData.fileName}</p>
                        <p>Type: {imageData.selectedFile?.type || "Image"}</p>
                        <p>
                            Size:{" "}
                            {imageData.selectedFile
                                ? (imageData.selectedFile.size / 1024).toFixed(
                                      2
                                  )
                                : "Unknown"}{" "}
                            KB
                        </p>
                    </div>

                    <div className="preview-container">
                        <div className="image-preview">
                            <img
                                src={imageData.previewUrl}
                                alt="Preview"
                                className="preview-image"
                            />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ModalImageUpload;
