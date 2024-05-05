import compression from "compression";
import express from "express";
import { readFileSync } from "fs";
import { resolve } from "path";
import serveStatic from "serve-static";
import { render } from "./dist/server/entry-server.js";

((http) => {
  http.listen(3000, () => {
    http
      .use(compression(), serveStatic(resolve("dist/client"), { index: false }))
      .use("*", async (req, res, next) => {
        const head = "";
        const layout = render(req.originalUrl);

        try {
          res
            .status(200)
            .set({ "Content-Type": "text/html" })
            .end(
              readFileSync(resolve("dist/client/index.html"), "utf-8")
                .replace("<!--app-head-->", head)
                .replace("<!--app-layout-->", layout)
            );
        } catch (error) {
          next(error);
        }
      });
  });
})(express());
