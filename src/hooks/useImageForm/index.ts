import { ChangeEvent, useEffect, useState } from "react";

interface IUseImageFormReturn {
    selectedFile: File | null;
    previewUrl: string | null;
    fileName: string;
    isValid: boolean;
    error: string | null;
    handleImageChange: (event: ChangeEvent<HTMLInputElement>) => void;
    handleResetImage: () => void;
}

const VALIDATION_CONFIG = {
    maxFileSize: 5 * 1024 * 1024,
    allowedTypes: ["image/jpeg", "image/jpg", "image/png"],
    allowedExtensions: [".jpg", ".jpeg", ".png"],
};

export const useImageForm = (): IUseImageFormReturn => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [fileName, setFileName] = useState<string>("");
    const [isValid, setIsValid] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const savedImageUrl = localStorage.getItem("userImageUrl");
        const savedFileName = localStorage.getItem("userImageName");

        if (savedImageUrl && savedFileName) {
            setPreviewUrl(savedImageUrl);
            setFileName(savedFileName);
            setIsValid(true);
        }
    }, []);

    useEffect(() => {
        return () => {
            if (previewUrl) {
                URL.revokeObjectURL(previewUrl);
            }
        };
    }, [previewUrl]);

    const checkIsFileValid = (
        file: File
    ): { isValid: boolean; error: string | null } => {
        if (!VALIDATION_CONFIG.allowedTypes.includes(file.type)) {
            return {
                isValid: false,
                error: `Invalid file type. Allowed types: ${VALIDATION_CONFIG.allowedExtensions.join(
                    ", "
                )}`,
            };
        }

        if (file.size > VALIDATION_CONFIG.maxFileSize) {
            const maxSizeMB = VALIDATION_CONFIG.maxFileSize / (1024 * 1024);

            return {
                isValid: false,
                error: `File too large. Maximum size is ${maxSizeMB}MB`,
            };
        }

        return { isValid: true, error: null };
    };

    const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];

        setError(null);

        if (!file) {
            setIsValid(false);
            return;
        }

        const validation = checkIsFileValid(file);
        if (!validation.isValid) {
            setError(validation.error);

            setIsValid(false);

            return;
        }

        setSelectedFile(file);
        setFileName(file.name);
        setIsValid(true);

        const objectUrl = URL.createObjectURL(file);
        setPreviewUrl(objectUrl);

        const reader = new FileReader();

        reader.onload = (event) => {
            const base64 = event.target?.result as string;

            localStorage.setItem("userImageUrl", base64);

            localStorage.setItem("userImageName", file.name);
        };

        reader.readAsDataURL(file);
    };

    const handleResetImage = () => {
        setSelectedFile(null);
        setPreviewUrl(null);
        setFileName("");
        setIsValid(false);
        setError(null);

        localStorage.removeItem("userImage");
        localStorage.removeItem("userImageName");
    };

    return {
        selectedFile,
        previewUrl,
        fileName,
        isValid,
        error,
        handleImageChange,
        handleResetImage,
    };
};
