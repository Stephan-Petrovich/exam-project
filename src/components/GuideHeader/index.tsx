import { Link, useLocation, useNavigate } from "react-router-dom";
import { useProgress } from "../../contexts/ProgressContext";
import { Fragment, ReactElement } from "react";
import "./style.css";

const GuideHeader = (): ReactElement => {
    const location = useLocation();
    const navigate = useNavigate();

    const { checkIsCanAccessStep } = useProgress();

    const getIsActive = (path: string) => {
        const isActive: boolean = location.pathname === path;

        return isActive ? "active" : "";
    };

    const handleNavigation = (path: string) => (event: React.MouseEvent) => {
        if (!checkIsCanAccessStep(path)) {
            event.preventDefault();

            //TODO Можно добавить уведомление для пользователя
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

    //TODO Добавить стили для disabled links
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
                            }`}
                        >
                            <Link
                                to={item.path}
                                onClick={handleNavigation(item.path)}
                                style={{
                                    opacity: checkIsCanAccessStep(item.path)
                                        ? 1
                                        : 0.5,
                                }}
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
