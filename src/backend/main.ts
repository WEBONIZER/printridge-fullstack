import { resolve } from "path";
import { NextFunction, Request, Response } from "express";
import { readFileSync } from "fs";
import { Helmet } from "react-helmet";
import { laptopRepairPrice } from "../frontend/utils/laptops-price";
import { refillData } from "../frontend/utils/refill";
import { repairPrintersPrice } from "../frontend/utils/repair-price";
import { pathsToRender } from "../frontend/utils/routes";
import { render } from "../../dist/server/entry-server";
import { config } from "dotenv";
import { networkInterfaces } from "os";

(async function (): Promise<void> {
  try {
    const parsed = config({ path: ".env" }).parsed;
    if (!parsed || !parsed.HTTP) {
      throw new Error("HTTP port not found in .env file");
    }
    const HTTP = parseInt(parsed.HTTP, 10);

    const app = (await import("express")).default();

    app.use((await import("compression")).default());

    app.use(
      (await import("serve-static")).default(resolve("dist/client"), {
        index: false,
      })
    );

    const renderPage = async (
      req: Request,
      res: Response,
      next: NextFunction
    ) => {
      try {
        const { title, meta, link } = Helmet.renderStatic();

        res
          .status(200)
          .set({ "Content-Type": "text/html" })
          .end(
            readFileSync(resolve("dist/client/index.html"), "utf-8")
              .replace(
                "<!--head-template-->",
                title.toString() + meta.toString() + link.toString()
              )
              .replace("<!--layout-template-->", render(req.originalUrl))
          );
      } catch (error) {
        next(error);
      }
    };

    const render404Page = (_: Request, res: Response) => {
      res
        .status(404)
        .set({ "Content-Type": "text/html" })
        .end(readFileSync(resolve("dist/client/404.html"), "utf8"));
    };

    app.use((req: Request, res: Response, next: () => void) => {
      if (req.originalUrl.includes("?")) {
        return render404Page(req, res);
      }

      next();
    });

    pathsToRender.forEach((path) => app.get(path, renderPage));

    refillData.forEach((cart) => {
      const path = `/refill/${cart.vendor}/${cart.modelCart}`;
      app.get(path, (req: Request, res: Response, next: NextFunction) => {
        if (cart.vendor && cart.modelCart) {
          renderPage(req, res, next);
        } else {
          render404Page(req, res);
        }
      });
    });

    repairPrintersPrice.forEach((printer) => {
      const path = `/repair/${printer.vendor}/${printer.model}`;
      app.get(path, (req: Request, res: Response, next: NextFunction) => {
        if (printer.vendor && printer.model) {
          renderPage(req, res, next);
        } else {
          render404Page(req, res);
        }
      });
    });

    laptopRepairPrice.forEach((laptop) => {
      const path = `/remont-noutbukov/${laptop.vendor}/${laptop.model}`;
      app.get(path, (req: Request, res: Response, next: NextFunction) => {
        if (laptop.vendor && laptop.model) {
          renderPage(req, res, next);
        } else {
          render404Page(req, res);
        }
      });
    });

    app.get("*", render404Page);

    app.listen(HTTP, () => {
      const address = Object.values(networkInterfaces())
        .flat()
        .find((e) => e?.family === "IPv4" && !e?.internal)?.address;

      if (address) {
        console.log([`http://${address}:${HTTP}`]);
      }
    });
  } catch (error) {
    throw new Error(String(error));
  }
})();
