import Dialog from "../../components/Dialog";
import Layout from "../../layout/DefaultLayout";
import SuccessAlert from "../../components/SuccessAlert";
import { useImageData } from "../../contexts/ImageDataContext";
import { useSuccessAlert } from "../../hooks/useSuccessAlert";
import { useProgress } from "../../contexts/ProgressContext";
import { useUserData } from "../../contexts/UserDataContext";
import { useConfirm } from "../../hooks/useConfirm";
import { useNavigate } from "react-router-dom";
import { type ReactElement } from "react";
import "./style.css";

const SenderDataPage = (): ReactElement => {
    const navigate = useNavigate();

    const { handleResetData } = useUserData();
    const { handleResetImage } = useImageData();

    const { checkIsCanAccessStep, resetProgress } = useProgress();

    const resetDialog = useConfirm();
    const submitDialog = useConfirm();

    const resetSuccess = useSuccessAlert();
    const submitSuccess = useSuccessAlert();

    const isCanSubmit = checkIsCanAccessStep("/sender");

    const handleResetAllData = () => {
        handleResetData();
        handleResetImage();
        resetProgress();
    };

    const handleSubmit = () => {
        if (!isCanSubmit) {
            alert("Please complete all steps before submitting.'");
            return;
        }

        submitDialog.confirm(() => {
            submitSuccess.showAlert(
                "Your data has been submitted successfully!",
                "Thank you!",
                () => {
                    handleResetAllData();

                    navigate("/");
                }
            );
        });
    };

    const handleReset = () => {
        resetDialog.confirm(() => {
            resetSuccess.showAlert(
                "All data has been reset successfully.",
                "Reset Complete",
                () => {
                    handleResetAllData();

                    navigate("/");
                }
            );
        });
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
                <div className="sender-data-block">
                    There was supposed to be some creative content here.
                </div>
            </Layout>

            <Dialog
                isOpen={resetDialog.isOpen}
                title="Reset All Data"
                message="Are you sure you want to reset all data? This action cannot be undone."
                onConfirm={resetDialog.executeAction}
                onCancel={resetDialog.close}
            />

            <Dialog
                isOpen={submitDialog.isOpen}
                title="Submit Your Data"
                message="Are you ready to submit your data? Please make sure all information is correct."
                onConfirm={submitDialog.executeAction}
                onCancel={submitDialog.close}
            />

            <SuccessAlert
                isOpen={resetSuccess.isOpen}
                title={resetSuccess.title}
                message={resetSuccess.message}
                onClose={resetSuccess.hideAlert}
            />

            <SuccessAlert
                isOpen={submitSuccess.isOpen}
                title={submitSuccess.title}
                message={submitSuccess.message}
                onClose={submitSuccess.hideAlert}
            />
        </>
    );
};

export default SenderDataPage;
