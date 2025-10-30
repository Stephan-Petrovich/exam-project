import Button from "../../components/Button";
import GuideHeader from "../../components/GuideHeader";
import { ReactElement, ReactNode } from "react";
import "./style.css";

interface ILayoutProps {
    children: ReactNode;
    footerActions?: {
        onNext?: () => void;
        onSubmit?: () => void;
        onReset?: () => void;
        showNext?: boolean;
        showSubmit?: boolean;
        showReset?: boolean;
        isNextDisabled?: boolean;
        isSubmitDisabled?: boolean;
    };
    currentPageTitle?: string;
}

const Layout = ({
    children,
    footerActions,
    currentPageTitle,
}: ILayoutProps): ReactElement => {
    return (
        <div className="layout-block">
            <header className="layout-header">
                <GuideHeader />
                {currentPageTitle && (
                    <div className="page-title">
                        <h2>{currentPageTitle}</h2>
                    </div>
                )}
            </header>

            <main className="layout-content">{children}</main>

            <footer className="layout-footer">
                <div className="footer-actions">
                    {footerActions?.showReset && (
                        <Button
                            type="button"
                            label="Reset form data"
                            onClick={footerActions.onReset}
                        />
                    )}
                    {footerActions?.showNext && (
                        <Button
                            type="button"
                            label="Next"
                            onClick={footerActions.onNext}
                            disabled={footerActions.isNextDisabled}
                        />
                    )}
                    {footerActions?.showSubmit && (
                        <Button
                            type="submit"
                            label="Submit data"
                            onClick={footerActions.onSubmit}
                            disabled={footerActions.isSubmitDisabled}
                        />
                    )}
                </div>
            </footer>
        </div>
    );
};

export default Layout;
