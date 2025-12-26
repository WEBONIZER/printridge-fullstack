import { Request, Response } from "express";
import { CartridgeModel } from "../models/cartridge-model";
import { PrinterModel } from "../models/printer-model";
import { LaptopModel } from "../models/laptop-model";

export const generateSitemap = async (req: Request, res: Response): Promise<void> => {
  try {
    // Получаем все публичные картриджи, принтеры и ноутбуки, а также уникальные вендоры
    const [cartridges, printers, laptops, cartridgeVendors, printerVendors, laptopVendors] = await Promise.all([
      CartridgeModel.find({ public: true }).select('vendor modelCart updatedAt').lean(),
      PrinterModel.find({ public: true }).select('vendor model updatedAt').lean(),
      LaptopModel.find({ public: true }).select('vendor model updatedAt').lean(),
      CartridgeModel.distinct('vendor', { public: true }),
      PrinterModel.distinct('vendor', { public: true }),
      LaptopModel.distinct('vendor', { public: true }),
    ]);

    const today = new Date().toISOString().split('T')[0];

    // Формируем XML
    let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset
  xmlns="https://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:xsi="https://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="https://www.sitemaps.org/schemas/sitemap/0.9
            https://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd"
>
  <url>
    <loc>https://printridge.ru/</loc>
    <lastmod>${today}</lastmod>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://printridge.ru/contacts</loc>
    <lastmod>${today}</lastmod>
    <priority>0.7</priority>
  </url>
`;

    // Добавляем страницы вендоров для картриджей
    cartridgeVendors.filter(Boolean).forEach((vendor) => {
      xml += `  <url>
    <loc>https://printridge.ru/refill/${vendor}</loc>
    <lastmod>${today}</lastmod>
    <priority>0.8</priority>
  </url>
`;
    });

    // Добавляем страницы вендоров для принтеров
    printerVendors.filter(Boolean).forEach((vendor) => {
      xml += `  <url>
    <loc>https://printridge.ru/repair/${vendor}</loc>
    <lastmod>${today}</lastmod>
    <priority>0.8</priority>
  </url>
`;
    });

    // Добавляем страницы вендоров для ноутбуков
    laptopVendors.filter(Boolean).forEach((vendor) => {
      xml += `  <url>
    <loc>https://printridge.ru/remont-noutbukov/${vendor}</loc>
    <lastmod>${today}</lastmod>
    <priority>0.8</priority>
  </url>
`;
    });

    // Добавляем картриджи
    cartridges.forEach((cartridge) => {
      const modelCart = (cartridge.modelCart || '').replace(/\s/g, '');
      const lastmod = cartridge.updatedAt 
        ? new Date(cartridge.updatedAt).toISOString().split('T')[0]
        : new Date().toISOString().split('T')[0];
      xml += `  <url>
    <loc>https://printridge.ru/refill/${cartridge.vendor}/${modelCart}</loc>
    <lastmod>${lastmod}</lastmod>
    <priority>1.0</priority>
  </url>
`;
    });

    // Добавляем принтеры
    printers.forEach((printer) => {
      const model = (printer.model || '').replace(/\s/g, '');
      const lastmod = printer.updatedAt 
        ? new Date(printer.updatedAt).toISOString().split('T')[0]
        : new Date().toISOString().split('T')[0];
      xml += `  <url>
    <loc>https://printridge.ru/repair/${printer.vendor}/${model}</loc>
    <lastmod>${lastmod}</lastmod>
    <priority>1.0</priority>
  </url>
`;
    });

    // Добавляем ноутбуки
    laptops.forEach((laptop) => {
      const model = (laptop.model || '').replace(/\s/g, '');
      const lastmod = laptop.updatedAt 
        ? new Date(laptop.updatedAt).toISOString().split('T')[0]
        : new Date().toISOString().split('T')[0];
      xml += `  <url>
    <loc>https://printridge.ru/remont-noutbukov/${laptop.vendor}/${model}</loc>
    <lastmod>${lastmod}</lastmod>
    <priority>1.0</priority>
  </url>
`;
    });

    xml += `</urlset>`;

    res.set('Content-Type', 'application/xml');
    res.send(xml);
  } catch (error: any) {
    console.error('Sitemap generation error:', error);
    res.status(500).json({
      error: 'Ошибка генерации sitemap',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

