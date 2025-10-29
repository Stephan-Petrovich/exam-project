import Router from "../../router";
import { ImageDataProvider } from "../../contexts/ImageDataContext";
import { UserDataProvider } from "../../contexts/UserDataContext";
import { ProgressProvider } from "../../contexts/ProgressContext";
import type { ReactElement } from "react";

const App = (): ReactElement => {
    return (
        <ProgressProvider>
            <UserDataProvider>
                <ImageDataProvider>
                    <Router />
                </ImageDataProvider>
            </UserDataProvider>
        </ProgressProvider>
    );
};

export default App;
