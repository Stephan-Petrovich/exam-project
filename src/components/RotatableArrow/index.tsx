import { ReactElement } from "react";
import "./style.css";

interface ICaptchaArrowProps {
    rotation: number;
}

const RotatableArrow = ({ rotation }: ICaptchaArrowProps): ReactElement => {
    return (
        <div className="rotatable-arrow-block">
            <div
                className="arrow"
                style={{ transform: `rotate(${rotation}deg)` }}
            >
                <div className="arrow-head"></div>
                <div className="arrow-body"></div>
            </div>
        </div>
    );
};

export default RotatableArrow;
