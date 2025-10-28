import Layout from "../../layout/DefaultLayout";
import ModalInfo from "../../components/ModalInfo";
import { useProgress } from "../../contexts/ProgressContext";
import { useUserForm } from "../../hooks/useUserForm";
import { useEffect, useRef, type ReactElement } from "react";
import { useNavigate } from "react-router-dom";

const InfoPage = (): ReactElement => {
    const navigate = useNavigate();

    const { markStepCompleted, markStepIncompleted, progress } = useProgress();

    const { userData, errors, isValid, updateField, resetAllFields } =
        useUserForm();

    const initialLoadRef = useRef(true);

    useEffect(() => {
        if (initialLoadRef.current) {
            initialLoadRef.current = false;
            return;
        }

        if (progress.isInfoCompleted && !isValid) {
            markStepIncompleted("isInfoCompleted");
        }
    }, [isValid]);

    const handleNext = () => {
        markStepCompleted("isInfoCompleted");

        navigate("/loader");
    };

    return (
        <Layout
            currentPageTitle="Input your data"
            footerActions={{
                showNext: true,
                onNext: handleNext,
                isNextDisabled: !isValid,
                showReset: true,
                onReset: resetAllFields,
            }}
        >
            <div className="info-page-body">
                <ModalInfo
                    userData={userData}
                    errors={errors}
                    updateField={updateField}
                />
            </div>
        </Layout>
    );
};

export default InfoPage;
