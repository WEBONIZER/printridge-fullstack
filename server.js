import compression from "compression";
import express from "express";
import { readFileSync } from "fs";
import { resolve } from "path";
import serveStatic from "serve-static";
import { render } from "./dist/server/entry-server.js";
import { Helmet } from "react-helmet";

const app = express();
app.use(compression());
app.use(serveStatic(resolve("dist/client"), { index: false }));

app.get('*', async (req, res, next) => {
    try {
        const html = render(req.originalUrl);
        const helmet = Helmet.renderStatic();

        const indexFile = readFileSync(resolve("dist/client/index.html"), "utf-8")
            .replace("<!--app-head-->", helmet.title.toString() + helmet.meta.toString() + helmet.link.toString())
            .replace("<!--app-layout-->", html);

        res.status(200).set({ "Content-Type": "text/html" }).end(indexFile);
    } catch (error) {
        next(error);
    }
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});