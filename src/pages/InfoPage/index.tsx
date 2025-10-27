import Layout from "../../layout/DefaultLayout";
import ModalInfo from "../../components/ModalInfo";
import { useState, type ReactElement } from "react";
import { useNavigate } from "react-router-dom";

const InfoPage = (): ReactElement => {
    const navigate = useNavigate();

    const [isEnteredDataValid, setIsEnteredDataValid] =
        useState<boolean>(false);

    const handleCheckIsValid = (isValid: boolean) => {
        setIsEnteredDataValid(isValid);
    };

    //TODO Вынести все навигации в отдельный кастомный хук useNavigation

    const handleNext = () => {
        navigate("/loader");
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
