import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "./components/context/Theme";
import { ProtectedRouteProvider } from "./components/context/ProtectedRouteContext";
import { AuthProvider } from "./components/context/AuthContext";

const el = document.getElementById("root");
const root = ReactDOM.createRoot(el);

root.render(
  <>
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
        <ProtectedRouteProvider>
            <App />
        </ProtectedRouteProvider>
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  </>
);
