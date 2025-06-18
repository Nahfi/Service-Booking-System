const acornTypescript = require("acorn-typescript");

export default {
    input: [
        "resources/js/**/*.{js,jsx,ts,tsx}",
        "!resources/js/**/*.spec.{js,jsx,ts,tsx}",
        "!resources/js/**/*.test.{js,jsx,ts,tsx}",
        "!**/node_modules/**",
    ],
    output: "./resources/js/locales",
    options: {
        debug: true,
        func: {
            list: ["t", "i18next.t", "i18n.t"],
            extensions: [".js", ".jsx", ".ts", ".tsx"],
        },
        trans: {
            component: "Trans",
            i18nKey: "i18nKey",
            defaultsKey: "defaults",
            extensions: [".js", ".jsx", ".ts", ".tsx"],
            fallbackKey: function (ns, value) {
                return value;
            },
            acorn: {
                ecmaVersion: "latest",
                sourceType: "module",
                plugins: [acornTypescript],
            },
        },
        lngs: ["en", "bn"],
        ns: ["translation"],
        defaultLng: "en",
        defaultNs: "translation",
        defaultValue: function (lng, ns, key) {
            if (lng === "en") {
                return key;
            }
            return "";
        },
        resource: {
            loadPath: "locales/{{lng}}/{{ns}}.json",
            savePath: "locales/{{lng}}/{{ns}}.json",
            jsonIndent: 2,
            lineEnding: "\n",
        },
        nsSeparator: ":",
        keySeparator: ".",
    },
};
