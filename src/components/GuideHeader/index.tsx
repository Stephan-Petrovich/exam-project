import { Link, useLocation, useNavigate } from "react-router-dom";
import { useProgress } from "../../contexts/ProgressContext";
import { Fragment, ReactElement } from "react";
import "./style.css";

const GuideHeader = (): ReactElement => {
    const location = useLocation();
    const navigate = useNavigate();

    const { checkIsCanAccessStep, progress } = useProgress();

    const getIsActive = (path: string) => {
        const isActive: boolean = location.pathname === path;

        return isActive ? "active" : "";
    };

    const getIsCompleted = (path: string) => {
        const progressStates: Record<string, boolean> = {
            "/": progress.isInfoCompleted,
            "/loader": progress.isLoaderCompleted,
            "/sender": progress.isCaptchaCompleted,
        };

        return progressStates[path];
    };

    const handleNavigation = (path: string) => (event: React.MouseEvent) => {
        if (!checkIsCanAccessStep(path)) {
            event.preventDefault();

            alert("Please complete the steps before proceeding to this page.");
            return;
        }

        navigate(path);
    };

    const navigationItems = [
        { path: "/", label: "Info page" },
        { path: "/loader", label: "Loader image page" },
        { path: "/sender", label: "Sender data page" },
    ];

    return (
        <div className="guide-header-block">
            <div className="guide-header-body">
                {navigationItems.map((item, index) => (
                    <Fragment key={item.path}>
                        {index > 0 && <div className="gap-block" />}

                        <div
                            className={`link-block ${getIsActive(item.path)} ${
                                !checkIsCanAccessStep(item.path)
                                    ? "disabled"
                                    : ""
                            } ${!getIsCompleted(item.path) ? "" : "completed"}`}
                        >
                            <Link
                                to={item.path}
                                onClick={handleNavigation(item.path)}
                                className="guide-link"
                            >
                                {item.label}
                            </Link>
                        </div>
                    </Fragment>
                ))}
            </div>
        </div>
    );
};

export default GuideHeader;
