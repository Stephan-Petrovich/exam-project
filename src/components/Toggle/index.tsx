import { ReactElement } from "react";
import "./style.css";

interface ToggleProps {
    value: boolean;
    onChange: (value: boolean) => void;
}

const Toggle = ({ value, onChange }: ToggleProps): ReactElement => {
    return (
        <div className="toggle-pill">
            <button
                type="button"
                className={`pill-option ${value ? "active" : ""}`}
                onClick={() => onChange(true)}
            >
                Man
            </button>
            <div className="pill-divider"></div>
            <button
                type="button"
                className={`pill-option ${!value ? "active" : ""}`}
                onClick={() => onChange(false)}
            >
                Women
            </button>
        </div>
    );
};

export default Toggle;
