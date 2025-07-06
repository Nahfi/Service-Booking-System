import type React from "react";
import { RouterProvider } from "react-router-dom";
import ModalProvider from "./context-providers/ModalProvider";
import ThemeProvider from "./context-providers/ThemeProvider";
import router from "./routes/Router";

const App: React.FC = () =>{
  return (
      <ThemeProvider>
          <ModalProvider>
              <RouterProvider router={router} />
          </ModalProvider>
      </ThemeProvider>
  );      
}

export default App;
