import {
    createContext,
    ReactNode,
    useContext,
    useEffect,
    useState,
    useCallback,
} from "react";
import { IUserData } from "../../hooks/useUserForm";
import { useProgress } from "../ProgressContext";

interface IAppData {
    userData: IUserData | null;
    imageData: {
        file: File | null;
        previewUrl: string | null;
        fileName: string;
    } | null;
}

interface IAppDataContext {
    appData: IAppData;
    updateUserData: (userData: IUserData) => void;
    updateImageData: (file: File, previewUrl: string, fileName: string) => void;
    resetAppData: () => void;
}

interface IAppDataProviderProps {
    children: ReactNode;
}

const AppDataContext = createContext<IAppDataContext | null>(null);

const AppDataProvider = ({ children }: IAppDataProviderProps) => {
    const { resetProgress } = useProgress();

    const [appData, setAppData] = useState<IAppData>({
        userData: {
            name: "",
            surname: "",
            patronymic: "",
            dateOfBth: "",
            gender: false,
        },
        imageData: { file: null, previewUrl: null, fileName: "" },
    });

    useEffect(() => {
        const savedAppData = localStorage.getItem("appData");

        if (savedAppData) {
            setAppData(JSON.parse(savedAppData));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("appData", JSON.stringify(appData));
    }, [appData]);

    const updateUserData = useCallback((userData: IUserData) => {
        setAppData((prev) => ({
            ...prev,
            userData,
        }));
    }, []);

    const updateImageData = useCallback(
        (file: File, previewUrl: string, fileName: string) => {
            setAppData((prev) => ({
                ...prev,
                imageData: { file, previewUrl, fileName },
            }));
        },
        []
    );

    const resetAppData = () => {
        setAppData({
            userData: null,
            imageData: null,
        });

        resetProgress();

        localStorage.removeItem("userData");
        localStorage.removeItem("userImage");
        localStorage.removeItem("userImageName");

        console.log("All data has been reset");
    };

    return (
        <AppDataContext.Provider
            value={{ appData, updateUserData, updateImageData, resetAppData }}
        >
            {children}
        </AppDataContext.Provider>
    );
};

const useAppData = () => {
    const context = useContext(AppDataContext);

    if (context == null) {
        throw new Error("useAppData must be used within a AppDataProvider");
    }

    return context;
};

export { AppDataProvider, useAppData };
