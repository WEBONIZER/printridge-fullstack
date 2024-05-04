import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import { content } from "./entry-client"; 

export const render = (url) => {
  return renderToString(<StaticRouter location={url}>{content}</StaticRouter>);
};
