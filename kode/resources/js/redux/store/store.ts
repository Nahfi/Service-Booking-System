import {
    combineReducers,
    configureStore
} from "@reduxjs/toolkit";
import type { PersistConfig } from "redux-persist";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import userReducer from "../slices/userSlice";


export type RootState = ReturnType<typeof rootReducer>;

const appReducer = combineReducers({
    user: userReducer,
});

const rootReducer = (state, action) => {
    if (action.type === "RESET_STORE") {
        state = undefined;
    }
    return appReducer(state, action);
};

const persistConfig: PersistConfig<RootState> = {
    key: "quk-msg",
    storage,
    whitelist: ["user"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [
                    "persist/PURGE",
                    "persist/PERSIST",
                    "persist/REHYDRATE",
                ],
            },
        }),
});

export const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;