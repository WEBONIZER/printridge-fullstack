import { StrictMode } from "react";
import { hydrateRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { App } from "./components/app/app";
import { rootStore } from "./services/reducers";

import "./index.css";

export const content = (
  <StrictMode>
    <Provider store={rootStore}>
      <App />
    </Provider>
  </StrictMode>
);

if (typeof window !== "undefined") {
  hydrateRoot(
    document.getElementById("root"),
    <BrowserRouter>{content}</BrowserRouter>
  );
}
