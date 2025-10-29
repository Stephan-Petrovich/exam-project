import Layout from "../../layout/DefaultLayout";
import ModalInfo from "../../components/ModalInfo";
import { useEffect, useRef, type ReactElement } from "react";
import { useProgress } from "../../contexts/ProgressContext";
import { useUserData } from "../../contexts/UserDataContext";
import { useNavigate } from "react-router-dom";

const InfoPage = (): ReactElement => {
    const navigate = useNavigate();

    const { markStepCompleted, markStepIncompleted, progress } = useProgress();

    const { isValid, handleResetData } = useUserData();

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
                onReset: handleResetData,
            }}
        >
            <div className="info-page-body">
                <ModalInfo />
            </div>
        </Layout>
    );
};

export default InfoPage;
