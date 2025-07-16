import Cookies from "js-cookie";
import toast from "react-hot-toast";
import type { NavigateFunction } from "react-router";
import { persistor, store } from "../../../redux/store/store";

export const resetUserStorage = (persistKey: string, persistedState: any) => {
    delete persistedState.user;
    localStorage.setItem(persistKey, JSON.stringify(persistedState));
};

export const clearStore = async () => {
    if (typeof window !== "undefined") {
        localStorage.removeItem("token");

        const persistKey = "persist:quk-msg"; 
        const persistedState = JSON.parse(
            localStorage.getItem(persistKey) || "{}"
        );
        resetUserStorage(persistKey, persistedState);
    }
    Cookies.remove("authToken");
    await persistor.purge();
    store.dispatch({ type: "RESET_STORE" });
};

export const handleLogout = async (
    logoutFn,
    navigateFn: NavigateFunction,
    queryClient
) => {
    logoutFn(
        {},
        {
            onSuccess: async (response) => {
                if (response && response?.code ===200) {
                    toast.success("Logout successfully");
                    // Clear store and query cache
                    await clearStore();
                    queryClient.clear();

                    navigateFn("/login", replace, state={ from: window.location.pathname });
                }
            },
        }
    );
};