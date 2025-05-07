import { useEffect, useState } from "react";
import { ThemeContext } from "../context";

const ThemeProvider = ({ children }) => {
  const [themeSettings, setThemeSettings] = useState({
    theme: "light",
    dir: "ltr",
  });

  useEffect(() => {
    const savedSettings = localStorage.getItem("themeSettings");

    let initialSettings = {
      theme: "light",
      dir: "ltr",
    };

    if (savedSettings) {
      initialSettings = JSON.parse(savedSettings);
    } else {
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light";
      initialSettings.theme = prefersDark;
    }

    setThemeSettings(initialSettings);
    document.documentElement.setAttribute(
      "data-bs-theme",
      initialSettings.theme
    );
    document.documentElement.setAttribute("dir", initialSettings.dir);

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const systemThemeChangeHandler = (e) => {
      const newTheme = e.matches ? "dark" : "light";
      setThemeSettings((prevSettings) => {
        const updatedSettings = { ...prevSettings, theme: newTheme };
        localStorage.setItem("themeSettings", JSON.stringify(updatedSettings));
        document.documentElement.setAttribute("data-bs-theme", newTheme);
        return updatedSettings;
      });
    };

    mediaQuery.addEventListener("change", systemThemeChangeHandler);
    return () =>
      mediaQuery.removeEventListener("change", systemThemeChangeHandler);
  }, []);

  useEffect(() => {
    const updateDirection = () => {
      const existingLink = document.getElementById("bootstrap-css");
      if (existingLink) {
        existingLink.remove();
      }

      // Create a new link element for the Bootstrap stylesheet
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.id = "bootstrap-css";

      if (themeSettings.dir === "rtl") {
        link.href =
          "../../node_modules/bootstrap/dist/css/bootstrap.rtl.min.css";
      } else {
        link.href = "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
      }

      const head = document.head;
      head.insertBefore(link, head.firstChild);
    };

    updateDirection();
  }, [themeSettings.dir]);

  // Toggle theme between light and dark
  const toggleTheme = () => {
    setThemeSettings((prevSettings) => {
      const newTheme = prevSettings.theme === "light" ? "dark" : "light";
      const updatedSettings = { ...prevSettings, theme: newTheme };
      localStorage.setItem("themeSettings", JSON.stringify(updatedSettings));
      document.documentElement.setAttribute("data-bs-theme", newTheme);
      return updatedSettings;
    });
  };

  // Toggle direction between LTR and RTL
  const toggleDirection = () => {
    setThemeSettings((prevSettings) => {
      const newDirection = prevSettings.dir === "ltr" ? "rtl" : "ltr";
      const updatedSettings = { ...prevSettings, dir: newDirection };
      localStorage.setItem("themeSettings", JSON.stringify(updatedSettings));
      document.documentElement.setAttribute("dir", newDirection);
      return updatedSettings;
    });
  };

  return (
    <ThemeContext.Provider
      value={{ themeSettings, toggleTheme, toggleDirection }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
