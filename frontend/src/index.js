import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "./components/context/Theme";
import { AuthProvider } from "./components/context/AuthContext";
import { InputErrorProvider } from "./components/context/InputError";

const el = document.getElementById("root");
const root = ReactDOM.createRoot(el);

root.render(
  <>
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          {/* <InputErrorProvider> */}
            <App />
          {/* </InputErrorProvider> */}
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  </>
);
