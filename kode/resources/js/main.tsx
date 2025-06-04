import { persistor, store } from "@/redux/store";
import "bootstrap/dist/css/bootstrap.min.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import {
    QueryClient,
    QueryClientProvider
} from "@tanstack/react-query";

// Create a client
const queryClient = new QueryClient()

import App from "./App";
import "./styles/sass/main.scss";

createRoot(document.getElementById("app")!).render(
    <StrictMode>
        <Provider store={store}>
            <PersistGate persistor={persistor}>
                <QueryClientProvider client={queryClient}>
                    <Toaster position="top-center" />
                    <App />
                </QueryClientProvider>
        </PersistGate>
        </Provider>
    </StrictMode>
);
