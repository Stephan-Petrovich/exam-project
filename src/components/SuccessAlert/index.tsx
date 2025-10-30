import { ReactElement } from "react";
import "./style.css";

interface ISuccessAlertProps {
    isOpen: boolean;
    message: string;
    title: string;
    onClose: () => void;
    showButton?: boolean;
}

const SuccessAlert = ({
    isOpen,
    message,
    title,
    onClose,
    showButton = true,
}: ISuccessAlertProps): ReactElement | null => {
    if (!isOpen) {
        return null;
    }

    return (
        <div className="success-alert-block">
            <div className="success-alert-body">
                <h3>{title}</h3>
                <p>{message}</p>

                {showButton && (
                    <button className="success-alert-button" onClick={onClose}>
                        Ok
                    </button>
                )}
            </div>
        </div>
    );
};

export default SuccessAlert;
