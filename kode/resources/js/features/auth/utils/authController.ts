export const resetUserStorage = (persistKey, persistedState) => {
    delete persistedState.user;
    localStorage.setItem(persistKey, JSON.stringify(persistedState));
};
