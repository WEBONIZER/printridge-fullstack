import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import { content } from "./index";

export const render = (url) => {
  return renderToString(<StaticRouter location={url}>{content}</StaticRouter>);
};
