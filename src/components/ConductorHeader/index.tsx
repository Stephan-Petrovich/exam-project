import { Link, useLocation } from "react-router-dom";
import { ReactElement } from "react";
import "./style.css";

const GuideHeader = (): ReactElement => {
    const location = useLocation();

    const isActive = (path: string) => {
        return location.pathname === path;
    };

    return (
        <div className="guide-header-block">
            <div className="guide-header-body">
                <div className={`link-block ${isActive("/") ? "active" : ""}`}>
                    <Link to="/">Info page</Link>
                </div>

                <div className="gap-block" />

                <div
                    className={`link-block ${
                        isActive("/loader") ? "active" : ""
                    }`}
                >
                    <Link to="/loader">Loader image page</Link>
                </div>

                <div className="gap-block" />

                <div
                    className={`link-block ${
                        isActive("/sender") ? "active" : ""
                    }`}
                >
                    <Link to="/sender">Sender data page</Link>
                </div>
            </div>
        </div>
    );
};

export default GuideHeader;
