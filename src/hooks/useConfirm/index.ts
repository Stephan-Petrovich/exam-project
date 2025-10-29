import { useState } from "react";

interface IUseConfirmReturn {
    isOpen: boolean;
    open: () => void;
    close: () => void;
    confirm: (action: () => void) => void;
    executeAction: () => void;
}

export const useConfirm = (): IUseConfirmReturn => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [pendingAction, setPendingAction] = useState<(() => void) | null>(
        null
    );

    const open = (): void => {
        setIsOpen(true);
    };

    const close = (): void => {
        setIsOpen(false);
    };

    const confirm = (action: () => void): void => {
        setPendingAction(() => action);

        open();
    };

    const executeAction = () => {
        if (pendingAction) {
            pendingAction();
        }

        close();
    };

    return { isOpen, open, close, confirm, executeAction };
};
