import Layout from "../../layout/DefaultLayout";
import ModalImageUpload from "../../components/ModalImageUpload";
import { useProgress } from "../../contexts/ProgressContext";
import { useImageForm } from "../../hooks/useImageForm";
import { useNavigate } from "react-router-dom";
import type { ReactElement } from "react";
import { useRef, useEffect } from "react";

const ImageLoaderPage = (): ReactElement => {
    const navigate = useNavigate();

    const { markStepCompleted, markStepIncompleted, progress } = useProgress();

    const {
        selectedFile,
        previewUrl,
        fileName,
        isValid,
        error,
        handleImageChange,
        handleResetImage,
    } = useImageForm();

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
                <ModalImageUpload
                    selectedFile={selectedFile}
                    previewUrl={previewUrl}
                    fileName={fileName}
                    error={error}
                    isValid={isValid}
                    handleImageChange={handleImageChange}
                />
            </div>
        </Layout>
    );
};

export default ImageLoaderPage;
