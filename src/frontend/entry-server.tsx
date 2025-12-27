import { StrictMode } from "react";
import { renderToString } from "react-dom/server";
import { Provider } from "react-redux";
import { StaticRouter } from "react-router-dom/server";
import { App } from "./components/app/app";
import { rootStore } from "./services/reducers/root-reducer";

export const render = (url: string) => {
  return renderToString(
    <StrictMode>
      <Provider store={rootStore}>
        <StaticRouter location={url}>
          <App />
        </StaticRouter>
      </Provider>
    </StrictMode>
  );
};
