import {
    ChangeEvent,
    createContext,
    ReactNode,
    useCallback,
    useEffect,
    useState,
    useContext,
} from "react";
import { VALIDATION_CONFIG } from "../../utils/consts";

export interface IImageData {
    selectedFile: File | null;
    previewUrl: string | null;
    fileName: string;
}

interface IImageDataContext {
    imageData: IImageData;
    error: string | null;
    isValid: boolean;
    handleImageChange: (event: ChangeEvent<HTMLInputElement>) => void;
    handleResetImage: () => void;
}

interface IImageDataProviderProps {
    children: ReactNode;
}

const ImageDataContext = createContext<IImageDataContext | null>(null);

const ImageDataProvider = ({ children }: IImageDataProviderProps) => {
    const [imageData, setImageData] = useState<IImageData>({
        selectedFile: null,
        previewUrl: null,
        fileName: "",
    });

    const [isValid, setIsValid] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const savedImageUrl = localStorage.getItem("userImageUrl");
        const savedFileName = localStorage.getItem("userImageName");

        if (savedImageUrl && savedFileName) {
            setImageData({
                selectedFile: null,
                previewUrl: savedImageUrl,
                fileName: savedFileName,
            });

            setIsValid(true);
        }
    }, []);

    useEffect(() => {
        if (imageData.previewUrl && imageData.fileName) {
            localStorage.setItem("userImageUrl", imageData.previewUrl);
            localStorage.setItem("userImageName", imageData.fileName);
        }

        const isDataValid = !!imageData.previewUrl && !!imageData.fileName;
        setIsValid(isDataValid);
    }, [imageData.previewUrl, imageData.fileName]);

    const checkIsFileValid = (file: File): boolean => {
        if (!VALIDATION_CONFIG.allowedTypes.includes(file.type)) {
            setError(`Invalid file type. Allowed types: JPG, PNG`);
            return false;
        }

        if (file.size > VALIDATION_CONFIG.maxFileSize) {
            const maxSizeMB = VALIDATION_CONFIG.maxFileSize / (1024 * 1024);
            setError(`File too large. Maximum size is ${maxSizeMB}MB`);
            return false;
        }

        setError(null);
        return true;
    };

    const handleImageChange = useCallback(
        (event: ChangeEvent<HTMLInputElement>) => {
            const file = event.target.files?.[0];

            setError(null);

            if (!file) {
                setIsValid(false);
                return;
            }

            if (!checkIsFileValid(file)) {
                setIsValid(false);

                return;
            }

            const objectUrl = URL.createObjectURL(file);

            setImageData({
                selectedFile: file,
                previewUrl: objectUrl,
                fileName: file.name,
            });

            const reader = new FileReader();

            reader.onload = (event) => {
                const base64 = event.target?.result as string;

                localStorage.setItem("userImageUrl", base64);

                localStorage.setItem("userImageName", file.name);
            };

            reader.readAsDataURL(file);
        },
        []
    );

    const handleResetImage = () => {
        if (imageData.previewUrl) {
            URL.revokeObjectURL(imageData.previewUrl);
        }

        setImageData({ selectedFile: null, previewUrl: null, fileName: "" });
        setIsValid(false);
        setError(null);

        localStorage.removeItem("userImageUrl");
        localStorage.removeItem("userImageName");
    };

    return (
        <ImageDataContext.Provider
            value={{
                imageData,
                error,
                isValid,
                handleImageChange,
                handleResetImage,
            }}
        >
            {children}
        </ImageDataContext.Provider>
    );
};

const useImageData = () => {
    const context = useContext(ImageDataContext);

    if (context == null) {
        throw new Error("useImageData must be used within a ImageDataProvider");
    }

    return context;
};

export { ImageDataProvider, useImageData };
