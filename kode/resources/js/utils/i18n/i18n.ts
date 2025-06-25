import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import bn from "../../locales/bn/translation.json";
import en from "../../locales/en/translation.json";

const resources = {
    en: {
        translation: en,
    },
    bn: {
        translation: bn,
    },
};

i18n.use(initReactI18next).init({
    resources,
    fallbackLng: "en",
    lng: "en",
    // debug: true,
    interpolation: {
        escapeValue: false,
    },
    ns: ["translation"],
    defaultNS: "translation",

    // React options
    react: {
        bindI18n: "languageChanged",
        bindI18nStore: "",
        transEmptyNodeValue: "",
        transSupportBasicHtmlNodes: true,
        transKeepBasicHtmlNodesFor: ["br", "strong", "i"],
        useSuspense: false,
    },
});

export default i18n;
