import {
    createContext,
    ReactNode,
    useContext,
    useEffect,
    useState,
} from "react";

interface IProgressState {
    isInfoCompleted: boolean;
    isLoaderCompleted: boolean;
    isSenderCompleted: boolean;
}

interface IProgressContext {
    progress: IProgressState;
    markStepCompleted: (step: keyof IProgressState) => void;
    markStepIncompleted: (step: keyof IProgressState) => void;
    resetProgress: () => void;
    checkIsCanAccessStep: (path: string) => boolean;
}

interface IProgressProviderProps {
    children: ReactNode;
}

const ProgressContext = createContext<IProgressContext | null>(null);

const ProgressProvider = ({ children }: IProgressProviderProps) => {
    const [progress, setProgress] = useState<IProgressState>({
        isInfoCompleted: false,
        isLoaderCompleted: false,
        isSenderCompleted: false,
    });

    useEffect(() => {
        const savedProgress = localStorage.getItem("progress");

        if (savedProgress) {
            setProgress(JSON.parse(savedProgress));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("progress", JSON.stringify(progress));
    }, [progress]);

    const markStepCompleted = (step: keyof IProgressState): void => {
        setProgress((prev) => ({ ...prev, [step]: true }));
    };

    const markStepIncompleted = (step: keyof IProgressState): void => {
        setProgress((prev) => ({ ...prev, [step]: false }));
    };

    const resetProgress = (): void => {
        setProgress({
            isInfoCompleted: false,
            isLoaderCompleted: false,
            isSenderCompleted: false,
        });
    };

    const checkIsCanAccessStep = (path: string): boolean => {
        const stepAccessRules: Record<string, boolean> = {
            "/": true,
            "/loader": progress.isInfoCompleted,
            "/sender": progress.isInfoCompleted && progress.isLoaderCompleted,
        };

        return stepAccessRules[path];
    };

    return (
        <ProgressContext.Provider
            value={{
                progress,
                markStepCompleted,
                markStepIncompleted,
                resetProgress,
                checkIsCanAccessStep,
            }}
        >
            {children}
        </ProgressContext.Provider>
    );
};

const useProgress = () => {
    const context = useContext(ProgressContext);

    if (context == null) {
        throw new Error("useProgress must be used within a ProgressProvider");
    }

    return context;
};

export { ProgressProvider, useProgress };
