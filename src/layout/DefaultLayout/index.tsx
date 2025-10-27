import Button from "../../components/Button";
import GuideHeader from "../../components/GuideHeader";
import { ReactElement, ReactNode } from "react";

interface ILayoutProps {
    children: ReactNode;
    footerActions?: {
        onNext?: () => void; // Callback для кнопки "Далее"
        onSubmit?: () => void; // Callback для кнопки "Отправки данных формы"
        onReset?: () => void; // Callback для кнопки "Сброса данных формы"
        showNext?: boolean; // Будет ли отображаться кнопка "Далее"
        showSubmit?: boolean; // Будет ли отображаться кнопка "Отправки данных формы"
        showReset?: boolean; // Будет ли отображаться кнопка "Сброса данных формы"
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
                        />
                    )}
                    {footerActions?.showSubmit && (
                        <Button
                            type="submit"
                            label="Submit data"
                            onClick={footerActions.onSubmit}
                        />
                    )}
                </div>
            </footer>
        </div>
    );
};

export default Layout;
