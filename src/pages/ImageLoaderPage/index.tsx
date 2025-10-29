import Layout from "../../layout/DefaultLayout";
import ModalImageUpload from "../../components/ModalImageUpload";
import { useImageData } from "../../contexts/ImageDataContext";
import { useProgress } from "../../contexts/ProgressContext";
import { useNavigate } from "react-router-dom";
import type { ReactElement } from "react";
import { useRef, useEffect } from "react";

const ImageLoaderPage = (): ReactElement => {
    const navigate = useNavigate();

    const { markStepCompleted, markStepIncompleted, progress } = useProgress();

    const { isValid, handleResetImage } = useImageData();

    const initialLoadRef = useRef(true);

    useEffect(() => {
        if (initialLoadRef.current) {
            initialLoadRef.current = false;
            return;
        }

        if (progress.isLoaderCompleted && !isValid) {
            markStepIncompleted("isLoaderCompleted");
        }
    }, [isValid]);

    const handleNext = () => {
        markStepCompleted("isLoaderCompleted");

        navigate("/sender");
    };

    return (
        <Layout
            currentPageTitle="Upload your image"
            footerActions={{
                showNext: true,
                onNext: handleNext,
                isNextDisabled: !isValid,
                showReset: true,
                onReset: handleResetImage,
            }}
        >
            <div className="image-loader-block">
                <ModalImageUpload />
            </div>
        </Layout>
    );
};

export default ImageLoaderPage;
