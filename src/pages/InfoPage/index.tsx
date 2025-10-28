import Layout from "../../layout/DefaultLayout";
import ModalInfo from "../../components/ModalInfo";
import { useProgress } from "../../contexts/ProgressContext";
import { useEffect, useState, type ReactElement } from "react";
import { useNavigate } from "react-router-dom";

const InfoPage = (): ReactElement => {
    const navigate = useNavigate();
    const { markStepCompleted, markStepIncompleted } = useProgress();

    const [isEnteredDataValid, setIsEnteredDataValid] =
        useState<boolean>(false);

    const handleCheckIsValid = (isValid: boolean) => {
        setIsEnteredDataValid(isValid);
    };

    useEffect(() => {
        if (!isEnteredDataValid == false) {
            markStepIncompleted("isInfoCompleted");
        }
    }, [isEnteredDataValid]);

    const handleNext = () => {
        if (isEnteredDataValid) {
            markStepCompleted("isInfoCompleted");
            navigate("/loader");
        }
    };

    return (
        <Layout
            currentPageTitle="Input your data"
            footerActions={{
                showNext: true,
                onNext: handleNext,
                isNextDisabled: !isEnteredDataValid,
            }}
        >
            <div className="info-page-body">
                <ModalInfo handleCheckIsValid={handleCheckIsValid} />
            </div>
        </Layout>
    );
};

export default InfoPage;
