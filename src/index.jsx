import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { App } from "./components/app/app";
import { rootStore } from "./services/reducers";

import "./index.css";

let root;

export const content = (
  <StrictMode>
    <Provider store={rootStore}>
      <App />
    </Provider>
  </StrictMode>
);

if (typeof window !== "undefined") {
  root = document.getElementById("root");
  createRoot(root).render(<BrowserRouter>{content}</BrowserRouter>);
}

export { root };

