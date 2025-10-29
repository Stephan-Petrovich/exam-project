import { ReactElement } from "react";
import "./style.css";

interface IDialogProps {
    isOpen: boolean;
    title: string;
    message: string;
    onConfirm: () => void;
    onCancel: () => void;
}

const Dialog = ({
    isOpen,
    title,
    message,
    onConfirm,
    onCancel,
}: IDialogProps): ReactElement | null => {
    if (!isOpen) {
        return null;
    }

    return (
        <div className="dialog-block">
            <div className="dialog-content">
                <h3>{title}</h3>
                <p>{message}</p>

                <div className="dialog-buttons">
                    <button className="cancel-button" onClick={onCancel}>
                        No
                    </button>

                    <button className="confirm-button" onClick={onConfirm}>
                        Yes
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Dialog;
