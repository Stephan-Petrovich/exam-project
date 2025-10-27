import GuideHeader from "../../components/ConductorHeader";
import type { ReactElement } from "react";
import "./style.css";

const InfoPage = (): ReactElement => {
    return (
        <div className="info-page-block">
            <GuideHeader />
        </div>
    );
};

export default InfoPage;
