import { ReactElement } from "react";
import "./style.css";

interface IAlertErrorProps {
    label?: string;
}

const DEFAULT_LABEL_ERROR: string =
    "Oops, something went wrong. Try again later!";

const AlertError = ({
    label = DEFAULT_LABEL_ERROR,
}: IAlertErrorProps): ReactElement => {
    return <div className="alert-error">{label}</div>;
};

export default AlertError;
