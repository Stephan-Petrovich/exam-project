import { DIRECTION_DEGREES, DIRECTIONS } from "../../utils/consts";
import { useProgress } from "../../contexts/ProgressContext";
import { useCallback, useEffect, useState } from "react";
import { Direction } from "../../domains/types";

interface IUseCaptchaReturn {
    generatedDirection: Direction;
    currentRotation: number;
    isVerified: boolean;

    initializeCaptcha: () => void;
    handleRotateLeft: () => void;
    handleRotateRight: () => void;
    checkIsRightDirection: () => boolean;
}

export const useCaptcha = (): IUseCaptchaReturn => {
    const { markStepIncompleted } = useProgress();

    const [generatedDirection, setGeneratedDirection] =
        useState<Direction>("north");
    const [currentRotation, setCurrentRotation] = useState<number>(0);
    const [isVerified, setIsVerified] = useState<boolean>(false);

    useEffect(() => {
        const savedStatusOfCaptch = localStorage.getItem("savedStatus");

        if (savedStatusOfCaptch) {
            setIsVerified(JSON.parse(savedStatusOfCaptch));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("savedStatus", JSON.stringify(isVerified));
    }, [isVerified]);

    const generateRandomDirection = () => {
        const randomIndex = Math.floor(Math.random() * DIRECTIONS.length);

        return DIRECTIONS[randomIndex];
    };

    const initializeCaptcha = () => {
        localStorage.removeItem("savedStatus");

        markStepIncompleted("isCaptchaCompleted");

        const newDirection = generateRandomDirection();

        const randomStartRotation = Math.floor(Math.random() * 4) * 90;

        setGeneratedDirection(newDirection);
        setCurrentRotation(randomStartRotation);
        setIsVerified(false);
    };

    const handleRotateLeft = useCallback((): void => {
        setCurrentRotation((prev) => (prev - 90 + 360) % 360);
    }, []);

    const handleRotateRight = useCallback((): void => {
        setCurrentRotation((prev) => (prev + 90) % 360);
    }, []);

    const checkIsRightDirection = (): boolean => {
        const expectedRotation: number = DIRECTION_DEGREES[generatedDirection];

        const isCorrect: boolean = expectedRotation == currentRotation;

        if (isCorrect) {
            setIsVerified(true);
        }

        return isCorrect;
    };

    return {
        generatedDirection,
        currentRotation,
        isVerified,
        initializeCaptcha,
        handleRotateLeft,
        handleRotateRight,
        checkIsRightDirection,
    };
};
