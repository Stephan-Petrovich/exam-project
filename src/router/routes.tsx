import InfoPage from "../pages/InfoPage";
import SenderDataPage from "../pages/SenderDataPage";
import ImageLoaderPage from "../pages/ImageLoaderPage";
import ProtectedRoute from "../components/ProtectedRoute";
import { UserDataProvider } from "../contexts/UserDataContext";
import { ProgressProvider } from "../contexts/ProgressContext";
import { ImageDataProvider } from "../contexts/ImageDataContext";
import { RouteObject } from "react-router-dom";

export const paths = {
    INFOPAGE: { id: "info", path: "/" },
    IMAGELOADERPAGE: { id: "loader", path: "/loader" },
    SENDERDATAPAGE: { id: "sender", path: "/sender" },
};

const routes: RouteObject[] = [
    {
        ...paths.INFOPAGE,
        element: (
            <ProgressProvider>
                <UserDataProvider>
                    <InfoPage />
                </UserDataProvider>
            </ProgressProvider>
        ),
    },
    {
        ...paths.IMAGELOADERPAGE,
        element: (
            <ProgressProvider>
                <ProtectedRoute path={paths.IMAGELOADERPAGE.path}>
                    <ImageDataProvider>
                        <ImageLoaderPage />
                    </ImageDataProvider>
                </ProtectedRoute>
            </ProgressProvider>
        ),
    },
    {
        ...paths.SENDERDATAPAGE,
        element: (
            <ProgressProvider>
                <ProtectedRoute path={paths.SENDERDATAPAGE.path}>
                    <UserDataProvider>
                        <ImageDataProvider>
                            <SenderDataPage />
                        </ImageDataProvider>
                    </UserDataProvider>
                </ProtectedRoute>
            </ProgressProvider>
        ),
    },
];

export default routes;
