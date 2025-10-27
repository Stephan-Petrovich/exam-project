import InfoPage from "../pages/InfoPage";
import SenderDataPage from "../pages/SenderDataPage";
import ImageLoaderPage from "../pages/ImageLoaderPage";
import { RouteObject } from "react-router-dom";

export const paths = {
    INFOPAGE: { id: "info", path: "/" },
    IMAGELOADERPAGE: { id: "loader", path: "/loader" },
    SENDERDATAPAGE: { id: "sender", path: "/sender" },
};

const routes: RouteObject[] = [
    {
        ...paths.INFOPAGE,
        element: <InfoPage />,
    },
    {
        ...paths.IMAGELOADERPAGE,
        element: <ImageLoaderPage />,
    },
    {
        ...paths.SENDERDATAPAGE,
        element: <SenderDataPage />,
    },
];

export default routes;
