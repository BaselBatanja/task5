import React from "react";
import { createRoot } from "react-dom/client";

import App from "./App";

import { BrowserRouter } from "react-router-dom";
import { AuthContextProvider } from "./store/authentication-context";

import "./index.styl";
import { UiContextProvider } from "./store/ui-context";
const container = document.getElementById("app");
const root = createRoot(container);
root.render(
  <BrowserRouter>
    <UiContextProvider>
      <AuthContextProvider>
        <App />
      </AuthContextProvider>
    </UiContextProvider>
  </BrowserRouter>
);
