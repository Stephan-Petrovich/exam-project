import { useState } from "react";

interface IUseConfirmReturn {
    isOpen: boolean;
    closeDialog: () => void;
    confirm: (action: () => void) => void;
    executeAction: () => void;
}

export const useConfirm = (): IUseConfirmReturn => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const [pendingAction, setPendingAction] = useState<(() => void) | null>(
        null
    );

    const openDialog = (): void => {
        setIsOpen(true);
    };

    const closeDialog = (): void => {
        setIsOpen(false);
    };

    const confirm = (action: () => void): void => {
        setPendingAction(() => action);

        openDialog();
    };

    const executeAction = () => {
        if (pendingAction) {
            pendingAction();
        }

        closeDialog();
    };

    return {
        isOpen,
        closeDialog,
        confirm,
        executeAction,
    };
};
