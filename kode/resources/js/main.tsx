import "bootstrap/dist/css/bootstrap.min.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./App";
import "./styles/sass/main.scss";

createRoot(document.getElementById("app")!).render(
  <StrictMode>
      <App/>
  </StrictMode>
);
