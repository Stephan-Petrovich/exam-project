import Dialog from "../../components/Dialog";
import Layout from "../../layout/DefaultLayout";
import SuccessAlert from "../../components/SuccessAlert";
import CaptchaModal from "../../components/CaptchaModal";
import { useImageData } from "../../contexts/ImageDataContext";
import { useSuccessAlert } from "../../hooks/useSuccessAlert";
import { useProgress } from "../../contexts/ProgressContext";
import { useUserData } from "../../contexts/UserDataContext";
import { useCaptcha } from "../../hooks/useCaptcha";
import { useConfirm } from "../../hooks/useConfirm";
import { useNavigate } from "react-router-dom";
import { type ReactElement } from "react";

const SenderDataPage = (): ReactElement => {
    const navigate = useNavigate();

    const { handleResetData } = useUserData();
    const { handleResetImage } = useImageData();

    const { checkIsCanAccessStep, resetProgress, markStepCompleted } =
        useProgress();

    const {
        generatedDirection,
        currentRotation,
        isVerified,
        initializeCaptcha,
        handleRotateLeft,
        handleRotateRight,
        checkIsRightDirection,
    } = useCaptcha();

    const resetDialog = useConfirm();
    const submitDialog = useConfirm();

    const resetSuccess = useSuccessAlert();
    const submitSuccess = useSuccessAlert();
    const captchaSuccess = useSuccessAlert();

    const isCanSubmit = checkIsCanAccessStep("/sender") && isVerified;

    const handleResetAllData = () => {
        handleResetData();
        handleResetImage();
        resetProgress();
        initializeCaptcha();
    };

    const handleSubmit = () => {
        submitDialog.confirm(() => {
            submitSuccess.showAlert(() => {
                handleResetAllData();

                navigate("/");
            });
        });
    };

    const handleReset = () => {
        resetDialog.confirm(() => {
            resetSuccess.showAlert(() => {
                handleResetAllData();

                navigate("/");
            });
        });
    };

    const handleVerifyCaptcha = () => {
        const isCorrect = checkIsRightDirection();

        if (isCorrect) {
            markStepCompleted("isCaptchaCompleted");

            captchaSuccess.showAlert(() => {});
        } else {
            alert(
                "Incorrect direction. Please try again with a new challenge."
            );

            initializeCaptcha();
        }
    };

    return (
        <>
            <Layout
                currentPageTitle="Submit your details"
                footerActions={{
                    showReset: true,
                    onReset: handleReset,
                    showSubmit: true,
                    onSubmit: handleSubmit,
                    isSubmitDisabled: !isCanSubmit,
                }}
            >
                <div className="sender-page-container">
                    <CaptchaModal
                        generatedDirection={generatedDirection}
                        currentRotation={currentRotation}
                        isVerified={isVerified}
                        onRotateLeft={handleRotateLeft}
                        onRotateRight={handleRotateRight}
                        onVerify={handleVerifyCaptcha}
                        onReset={initializeCaptcha}
                    />
                </div>
            </Layout>

            <Dialog
                isOpen={resetDialog.isOpen}
                title="Reset All Data"
                message="Are you sure you want to reset all data? This action cannot be undone."
                onConfirm={resetDialog.executeAction}
                onCancel={resetDialog.closeDialog}
            />

            <Dialog
                isOpen={submitDialog.isOpen}
                title="Submit Your Data"
                message="Are you ready to submit your data? Please make sure all information is correct."
                onConfirm={submitDialog.executeAction}
                onCancel={submitDialog.closeDialog}
            />

            <SuccessAlert
                isOpen={resetSuccess.isOpen}
                title="All data has been reset successfully."
                message="Reset Complete"
                onClose={resetSuccess.hideAlert}
            />

            <SuccessAlert
                isOpen={submitSuccess.isOpen}
                title="Your data has been submitted successfully!"
                message="Thank you!"
                onClose={submitSuccess.hideAlert}
            />

            <SuccessAlert
                isOpen={captchaSuccess.isOpen}
                title="Human verification successful!"
                message="Verification Completed"
                onClose={captchaSuccess.hideAlert}
            />
        </>
    );
};

export default SenderDataPage;
