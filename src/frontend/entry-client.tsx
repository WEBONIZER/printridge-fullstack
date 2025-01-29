import "./index.css";
import "./metrika";

import { StrictMode } from "react";
import { hydrateRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { App } from "./components/app/app";
import { rootStore } from "./services/reducers";

if (typeof window !== "undefined") {
  hydrateRoot(
    document.getElementById("root")!,
    <StrictMode>
      <Provider store={rootStore}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    </StrictMode>
  );
}
