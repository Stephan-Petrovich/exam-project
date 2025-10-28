import { useProgress } from "../../contexts/ProgressContext";
import { Navigate } from "react-router-dom";
import { ReactNode } from "react";

interface IProtectedRouteProps {
    children: ReactNode;
    path: string;
}

const ProtectedRoute = ({
    children,
    path,
}: IProtectedRouteProps): ReactNode => {
    const { checkIsCanAccessStep } = useProgress();

    if (!checkIsCanAccessStep(path)) {
        return <Navigate to="/" replace />;
    }

    return children;
};

export default ProtectedRoute;
