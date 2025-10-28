import Layout from "../../layout/DefaultLayout";
import { useNavigate } from "react-router-dom";
import type { ReactElement } from "react";
import ModalImageUpload from "../../components/ModalImageUpload";

const ImageLoaderPage = (): ReactElement => {
    const navigate = useNavigate();

    const handleNext = () => {
        navigate("/sender");
    };

    return (
        <Layout
            currentPageTitle="Upload your image"
            footerActions={{ showNext: true, onNext: handleNext }}
        >
            <div className="image-loader-block">
                <ModalImageUpload />
            </div>
        </Layout>
    );
};

export default ImageLoaderPage;
