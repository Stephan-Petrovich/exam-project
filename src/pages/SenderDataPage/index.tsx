import Layout from "../../layout/DefaultLayout";
import { useProgress } from "../../contexts/ProgressContext";
import { useAppData } from "../../contexts/AppDataContext";
import { useNavigate } from "react-router-dom";
import { type ReactElement } from "react";
import "./style.css";

const SenderDataPage = (): ReactElement => {
    const navigate = useNavigate();

    const { appData, resetAppData } = useAppData();
    const { checkIsCanAccessStep } = useProgress();

    const isCanSubmit = checkIsCanAccessStep("/sender");

    const handleSubmit = () => {
        if (!isCanSubmit) {
            alert("Please complete all steps before submitting.'");
            return;
        }

        console.log("Submitting data:", {
            userData: appData.userData,
            imageData: appData.imageData,
        });

        alert("Thank you! Your data has been submitted successfully.");

        resetAppData();

        navigate("/");
    };

    const handleReset = () => {
        if (
            window.confirm(
                "Are you sure you want to reset all data? This action cannot be undone."
            )
        ) {
            resetAppData();
            alert("All data has been reset successfully.");
        }
    };

    return (
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
    );
};

export default SenderDataPage;
