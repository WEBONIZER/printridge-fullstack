import { resolve } from "path";
import { NextFunction, Request, Response } from "express";
import { readFileSync } from "fs";
import { Helmet } from "react-helmet";
import { render } from "../../dist/server/entry-server";
import { config } from "dotenv";
import { networkInterfaces } from "os";
import { connect, set } from "mongoose";

(async function (): Promise<void> {
  try {
    // Читаем переменные из .env файла (путь относительно корня проекта)
    const envPath = resolve(process.cwd(), ".env");
    const parsed = config({ path: envPath }).parsed;
    if (!parsed) {
      throw new Error(".env file not found or is empty");
    }
    
    if (!parsed.HTTP) {
      throw new Error("HTTP port not found in .env file");
    }
    
    if (!parsed.MONGO_URL) {
      console.error("❌ MONGO_URL not found in .env file");
      console.error("Available env variables:", Object.keys(parsed).join(", "));
      console.error("Please add MONGO_URL to your .env file. Example: MONGO_URL=mongodb://localhost:27017/printridge");
      throw new Error("MONGO_URL not found in .env file");
    }
    
    const HTTP = parseInt(parsed.HTTP, 10);
    const MONGO_URL = parsed.MONGO_URL;

    set("strictQuery", false);
    
    // Импортируем модели перед подключением, чтобы они были зарегистрированы
    await import("./models/printridge-photo-model");
    await import("./models/example-model");
    await import("./models/cartridge-model");
    await import("./models/video-model");
    await import("./models/printer-model");
    await import("./models/compatibility-model");
    await import("./models/user-model");
    await import("./models/price-model");
    await import("./models/laptop-model");
    await import("./models/laptop-price-model");
    
    await connect(MONGO_URL);
    console.log("✅ Подключение к MongoDB установлено");

    // Создаем Express приложение
    const express = (await import("express")).default;
    const app = express();

    // Настройка CORS (должно быть ПЕРВЫМ middleware)
    app.use((req, res, next) => {
      const origin = req.headers.origin;
      const allowedOrigins = [
        'http://localhost',
        'http://127.0.0.1',
        'https://printridge.ru',
      ];
      
      // Разрешаем запросы с разрешенных доменов
      if (origin && allowedOrigins.some(allowed => origin.includes(allowed))) {
        res.setHeader('Access-Control-Allow-Origin', origin);
        res.setHeader('Access-Control-Allow-Credentials', 'true');
      }
      
      res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS, PATCH');
      res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With, Accept');
      res.setHeader('Access-Control-Max-Age', '86400'); // 24 часа
      
      // Обработка preflight запросов (OPTIONS)
      if (req.method === 'OPTIONS') {
        return res.status(200).end();
      }
      
      next();
    });

    // Включаем сжатие ответов (gzip)
    app.use((await import("compression")).default());

    // Подключаем cookie-parser для работы с cookies
    const cookieParser = (await import("cookie-parser")).default;
    app.use(cookieParser());

    // Парсинг JSON тела запросов для API (исключаем multipart/form-data для multer)
    app.use((req, res, next) => {
      const contentType = (req.headers['content-type'] || '').toLowerCase();
      
      if (contentType.includes('multipart/form-data')) {
        return next();
      }
      
      if (req.method === 'GET' || req.method === 'HEAD' || req.method === 'DELETE') {
        return next();
      }
      
      if (contentType.includes('application/json')) {
        express.json()(req, res, (err) => {
          if (err) {
            return res.status(400).json({ error: 'Невалидный JSON' });
          }
          next();
        });
        return;
      }
      
      next();
    });
    
    app.use((req, res, next) => {
      const contentType = (req.headers['content-type'] || '').toLowerCase();
      
      if (contentType.includes('multipart/form-data')) {
        return next();
      }
      
      if (contentType.includes('application/x-www-form-urlencoded')) {
        express.urlencoded({ extended: true })(req, res, next);
        return;
      }
      
      next();
    });

    // Подключаем API роуты
    const { auth } = await import("./routes/auth-route");
    app.use("/auth", auth);
    
    const { cartridges } = await import("./routes/cartridges-route");
    app.use("/cartridges", cartridges);
    
    const { images } = await import("./routes/images-route");
    app.use("/images", images);
    
    const { examples } = await import("./routes/examples-route");
    app.use("/examples", examples);
    
    const { videos } = await import("./routes/videos-route");
    app.use("/videos", videos);
    
    const { printers } = await import("./routes/printers-route");
    app.use("/printers", printers);
    
    const { compatibilities } = await import("./routes/compatibilities-route");
    app.use("/compatibilities", compatibilities);
    
    const { prices } = await import("./routes/prices-route");
    app.use("/prices", prices);
    
    const { laptops } = await import("./routes/laptops-route");
    app.use("/laptops", laptops);
    
    const { laptopPrices } = await import("./routes/laptop-prices-route");
    app.use("/laptop-prices", laptopPrices);
    
    const { printerPriceTemplates } = await import("./routes/printer-price-templates-route");
    app.use("/printer-price-templates", printerPriceTemplates);
    
    const { laptopPriceTemplates } = await import("./routes/laptop-price-templates-route");
    app.use("/laptop-price-templates", laptopPriceTemplates);

    // Роут для sitemap.xml (ДО статических файлов, чтобы не перехватывался)
    const { generateSitemap } = await import("./controllers/sitemap-controller");
    app.get("/sitemap.xml", generateSitemap);

    // Раздаем статические файлы из dist/client (CSS, JS, изображения)
    app.use(
      (await import("serve-static")).default(resolve("dist/client"), {
        index: false, // не показывать index.html автоматически
      })
    );

    // Функция для рендеринга страницы с SSR
    const renderPage = async (
      req: Request,
      res: Response,
      next: NextFunction
    ) => {
      try {
        // Получаем мета-теги из react-helmet (title, meta, link)
        const { title, meta, link } = Helmet.renderStatic();

        // Читаем HTML шаблон и заменяем плейсхолдеры на реальный контент
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

    // Функция для отдачи 404 страницы
    const render404Page = (_: Request, res: Response) => {
      res
        .status(404)
        .set({ "Content-Type": "text/html" })
        .end(readFileSync(resolve("dist/client/404.html"), "utf8"));
    };

    // Middleware: блокируем запросы с query параметрами (например: /page?id=123)
    // Исключаем API роуты и sitemap из этой проверки
    app.use((req: Request, res: Response, next: () => void) => {
      if (req.originalUrl.includes("?") && !req.originalUrl.startsWith("/cartridges") && !req.originalUrl.startsWith("/sitemap.xml")) {
        return render404Page(req, res);
      }
      next();
    });

    // Регистрируем основные маршруты из routes.js
    const { pathsToRender } = await import("../frontend/utils/routes");
    pathsToRender.forEach((path) => app.get(path, renderPage));

    // SSR роуты для динамических страниц (для прямого доступа и обновления страницы)
    app.get("/refill/:vendor", renderPage);
    app.get("/refill/:vendor/:model", renderPage);
    app.get("/repair/:vendor", renderPage);
    app.get("/repair/:vendor/:model", renderPage);
    app.get("/remont-noutbukov/:vendor", renderPage);
    app.get("/remont-noutbukov/:vendor/:model", renderPage);

    // Роуты для авторизации и профиля
    app.get("/login", renderPage);
    app.get("/profile", renderPage);
    app.get("/profile/*", renderPage);

    // Все остальные маршруты → 404
    app.get("*", render404Page);

    // Запускаем сервер на порту из .env файла
    // Сервер слушает на всех интерфейсах (0.0.0.0)
    // Увеличиваем timeout для загрузки больших файлов (видео)
    const server = app.listen(HTTP, "0.0.0.0", () => {
      // Устанавливаем timeout в 10 минут для загрузки больших файлов
      server.timeout = 600000;
      // Находим внешний IPv4 адрес и выводим в консоль
      const address = Object.values(networkInterfaces())
        .flat()
        .find((e) => e?.family === "IPv4" && !e?.internal)?.address;

      if (address) {
        console.log(`🚀 Server running at http://${address}:${HTTP}`);
        console.log(`🚀 Server running at http://localhost:${HTTP}`);
      } else {
        console.log(`🚀 Server running on port ${HTTP}`);
      }
    }).on('error', (error: any) => {
      if (error.code === 'EADDRINUSE') {
        console.error(`❌ Port ${HTTP} is already in use. Please:`);
        console.error(`   1. Stop the application using port ${HTTP}`);
        console.error(`   2. Or change the HTTP port in .env file`);
        process.exit(1);
      } else {
        console.error('❌ Failed to start server:', error.message);
        process.exit(1);
      }
    });
  } catch (error) {
    throw new Error(String(error));
  }
})();
