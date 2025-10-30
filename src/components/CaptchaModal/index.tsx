import Button from "../Button";
import RotatableArrow from "../RotatableArrow";
import { DIRECTION_LABELS } from "../../utils/consts";
import { Direction } from "../../domains/types";
import { ReactElement } from "react";
import "./style.css";

interface ICaptchaChallengeProps {
    generatedDirection: Direction;
    currentRotation: number;
    isVerified: boolean;

    onRotateLeft: () => void;
    onRotateRight: () => void;
    onVerify: () => void;
    onReset: () => void;
}

const CaptchaModal = ({
    generatedDirection,
    currentRotation,
    isVerified,
    onRotateLeft,
    onRotateRight,
    onVerify,
    onReset,
}: ICaptchaChallengeProps): ReactElement => {
    const verifyButtonText: string = isVerified
        ? "✓ Verified"
        : "Verify Direction";

    return (
        <div className="captcha-modal-container">
            <div className="captcha-modal-content">
                <h3 className="captcha-header">Human Verification</h3>
                <div className="captcha-instruction">
                    <p>
                        Please rotate the arrow according to the generated
                        direction:{" "}
                        <strong>{DIRECTION_LABELS[generatedDirection]} </strong>
                    </p>
                </div>

                <RotatableArrow rotation={currentRotation} />

                <div className="captcha-controls">
                    <Button
                        onClick={onRotateLeft}
                        label="↶ Rotate Left"
                        disabled={isVerified}
                    />

                    <Button
                        onClick={onRotateRight}
                        label="Rotate Right ↷"
                        disabled={isVerified}
                    />
                </div>

                <div className="captcha-actions">
                    <Button onClick={onVerify} label={verifyButtonText} />

                    <Button onClick={onReset} label="New Challenge" />
                </div>
            </div>
        </div>
    );
};

export default CaptchaModal;
