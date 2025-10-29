import Dialog from "../../components/Dialog";
import Layout from "../../layout/DefaultLayout";
import { useImageData } from "../../contexts/ImageDataContext";
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

    const { isOpen, close, confirm, executeAction } = useConfirm();

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

        confirm(() => {
            alert("Thank you! Your data has been submitted successfully.");

            handleResetAllData();

            navigate("/");
        });
    };

    const handleReset = () => {
        confirm(() => {
            handleResetAllData();
            alert("All data has been reset successfully.");
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
                isOpen={isOpen}
                title="Reset All Data"
                message="Are you sure you want to reset all data? This action cannot be undone."
                onConfirm={executeAction}
                onCancel={close}
            />

            <Dialog
                isOpen={isOpen}
                title="Submit Your Data"
                message="Are you ready to submit your data? Please make sure all information is correct."
                onConfirm={executeAction}
                onCancel={close}
            />
        </>
    );
};

export default SenderDataPage;
