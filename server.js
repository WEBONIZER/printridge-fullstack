import compression from "compression";
import express from "express";
import { readFileSync } from "fs";
import { resolve } from "path";
import serveStatic from "serve-static";
import { render } from "./dist/server/entry-server.js";
import { Helmet } from "react-helmet";
import { refillData, repairPrintersPrice, laptopRepairPrice, pathsToRender } from './src/utils/routes.js';

const app = express();
app.use(compression());
app.use(serveStatic(resolve("dist/client"), { index: false }));

const renderPage = async (req, res, next) => {
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
}

const render404Page = (req, res) => {
    const errorPageHTML = `
        <!DOCTYPE html>
        <html lang="ru">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Страница не найдена</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    height: 100vh;
                    margin: 0;
                    background-color: #f8f9fa;
                }
                .container {
                    text-align: center;
                }
                h1 {
                    font-size: 48px;
                    color: #343a40;
                }
                p {
                    font-size: 18px;
                    color: #6c757d;
                }
                a {
                    font-size: 18px;
                    color: #007bff;
                    text-decoration: none;
                }
                a:hover {
                    text-decoration: underline;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <h1>404 - Страница не найдена</h1>
                <p>Запрашиваемая страница не найдена. Возможно, она была перемещена или удалена.</p>
                <p><a href="/">Перейти на главную страницу</a></p>
            </div>
        </body>
        </html>`;
    res.status(404).set({ "Content-Type": "text/html" }).end(errorPageHTML);
};


pathsToRender.forEach(path => app.get(path, renderPage));

// Создаем маршруты для каждого картриджа
refillData.forEach(cart => {
    const path = `/refill/${cart.vendor}/${cart.modelCart}`;
    app.get(path, (req, res, next) => {
        if (cart.vendor && cart.modelCart) {
            renderPage(req, res, next);
        } else {
            render404Page(req, res);
        }
    });
});

repairPrintersPrice.forEach(printer => {
    const path = `/repair/${printer.vendor}/${printer.model}`;
    app.get(path, (req, res, next) => {
        if (printer.vendor && printer.model) {
            renderPage(req, res, next);
        } else {
            render404Page(req, res);
        }
    });
});

laptopRepairPrice.forEach(laptop => {
    const path = `/remont-noutbukov/${laptop.vendor}/${laptop.model}`;
    app.get(path, (req, res, next) => {
        if (laptop.vendor && laptop.model) {
            renderPage(req, res, next);
        } else {
            render404Page(req, res);
        }
    });
});

// Обработчик для всех остальных маршрутов (если ни один из маршрутов не совпадет)
app.use((req, res) => {
    render404Page(req, res);
});

app.listen(3000, () => {
    console.log("Сервер слушает порт 3000");
});