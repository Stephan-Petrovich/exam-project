import { useState } from "react";

interface IUseSuccessAlertReturn {
    isOpen: boolean;
    showAlert: (title: string, message: string, onConfirm: () => void) => void;
    hideAlert: () => void;
    title: string;
    message: string;
}

export const useSuccessAlert = (): IUseSuccessAlertReturn => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [alertConfig, setAlertConfig] = useState({
        title: "",
        message: "",
    });
    const [confirmAction, setConfirmAction] = useState<(() => void) | null>(
        null
    );

    const showAlert = (
        title: string,
        message: string,
        onConfirm: () => void
    ) => {
        setAlertConfig({ title, message });
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

    return { isOpen, showAlert, hideAlert, ...alertConfig };
};
