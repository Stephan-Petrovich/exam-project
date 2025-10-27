import { Link, useLocation } from "react-router-dom";
import { ReactElement } from "react";
import "./style.css";

const GuideHeader = (): ReactElement => {
    const location = useLocation();

    const getIsActive = (path: string) => {
        const isActive: boolean = location.pathname === path;

        return isActive ? "active" : "";
    };

    return (
        <div className="guide-header-block">
            <div className="guide-header-body">
                <div className={`link-block ${getIsActive("/")}`}>
                    <Link to="/">Info page</Link>
                </div>

                <div className="gap-block" />

                <div className={`link-block ${getIsActive("/loader")}`}>
                    <Link to="/loader">Loader image page</Link>
                </div>

                <div className="gap-block" />

                <div className={`link-block ${getIsActive("/sender")}`}>
                    <Link to="/sender">Sender data page</Link>
                </div>
            </div>
        </div>
    );
};

export default GuideHeader;
