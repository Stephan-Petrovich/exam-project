import Router from "../../router";
import { AppDataProvider } from "../../contexts/AppDataContext";
import { ProgressProvider } from "../../contexts/ProgressContext";
import type { ReactElement } from "react";

const App = (): ReactElement => {
    return (
        <ProgressProvider>
            <AppDataProvider>
                <Router />
            </AppDataProvider>
        </ProgressProvider>
    );
};

export default App;
