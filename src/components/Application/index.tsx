import { ProgressProvider } from "../../contexts/ProgressContext";
import Router from "../../router";
import type { ReactElement } from "react";

const App = (): ReactElement => {
    return (
        <ProgressProvider>
            <Router />
        </ProgressProvider>
    );
};

export default App;
