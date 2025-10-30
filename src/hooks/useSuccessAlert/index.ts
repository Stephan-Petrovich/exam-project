import { useState } from "react";

interface IUseSuccessAlertReturn {
    isOpen: boolean;
    showAlert: (onConfirm: () => void) => void;
    hideAlert: () => void;
}

export const useSuccessAlert = (): IUseSuccessAlertReturn => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const [confirmAction, setConfirmAction] = useState<(() => void) | null>(
        null
    );

    const showAlert = (onConfirm: () => void) => {
        setConfirmAction(() => onConfirm);

        setIsOpen(true);
    };

    const hideAlert = () => {
        setIsOpen(false);

        if (confirmAction) {
            confirmAction();
        }

        setConfirmAction(null);
    };

    return { isOpen, showAlert, hideAlert };
};
