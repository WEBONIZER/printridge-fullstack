import { Request, Response } from "express";
import mongoose from "mongoose";
import { ExampleModel } from "../models/example-model";
import { CompatibilityModel } from "../models/compatibility-model";
import { CartridgeModel } from "../models/cartridge-model";
import { PrinterModel } from "../models/printer-model";
import { LaptopModel } from "../models/laptop-model";
import { sanitizeHtml, escapeHtmlText } from "../utils/html-sanitizer";
import { generateRouteFromTitle } from "../utils/transliterate";

interface ExampleData {
  title: string;
  text: string;
  cartridgeId?: string;
  printerId?: string;
  laptopId?: string;
  cartridgeIds?: string[];
  printerIds?: string[];
  laptopIds?: string[];
  public?: boolean;
  // SEO метатеги
  metaTitle?: string;
  metaDescription?: string;
  metaKeywords?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  route?: string;
}

export const createExample = async (req: Request, res: Response) => {
  try {
    let data: ExampleData;
    if (typeof req.body.data === 'string') {
      data = JSON.parse(req.body.data);
    } else if (typeof req.body.data === 'object') {
      data = req.body.data;
    } else {
      data = req.body;
    }

    if (!data.title?.trim()) {
      return res.status(400).json({ error: 'Поле title обязательно' });
    }

    if (!data.text?.trim()) {
      return res.status(400).json({ error: 'Поле text обязательно' });
    }

    // Санитизируем HTML перед сохранением
    const sanitizedText = sanitizeHtml(data.text.trim());
    // Экранируем title (не должен содержать HTML)
    const escapedTitle = escapeHtmlText(data.title.trim());
    
    // Генерируем route из title, если не передан явно
    let route = data.route?.trim() || generateRouteFromTitle(escapedTitle);
    
    // Проверяем уникальность route и добавляем суффикс если нужно
    if (route) {
      let uniqueRoute = route;
      let counter = 1;
      while (await ExampleModel.findOne({ route: uniqueRoute })) {
        uniqueRoute = `${route}-${counter}`;
        counter++;
      }
      route = uniqueRoute;
    }

    const example = new ExampleModel({
      title: escapedTitle,
      text: sanitizedText,
      cartridgeId: data.cartridgeId || undefined,
      printerId: data.printerId || undefined,
      laptopId: data.laptopId || undefined,
      public: data.public !== undefined ? (data.public === true || String(data.public).toLowerCase() === 'true') : true,
      // SEO метатеги
      metaTitle: data.metaTitle ? escapeHtmlText(data.metaTitle.trim().substring(0, 60)) : undefined,
      metaDescription: data.metaDescription ? escapeHtmlText(data.metaDescription.trim().substring(0, 160)) : undefined,
      metaKeywords: data.metaKeywords ? escapeHtmlText(data.metaKeywords.trim()) : undefined,
      ogTitle: data.ogTitle ? escapeHtmlText(data.ogTitle.trim().substring(0, 60)) : undefined,
      ogDescription: data.ogDescription ? escapeHtmlText(data.ogDescription.trim().substring(0, 200)) : undefined,
      ogImage: data.ogImage ? data.ogImage.trim() : undefined,
      route: route || undefined,
    });

    const savedExample = await example.save();
    const exampleId = savedExample._id.toString();
    const exampleObj = savedExample.toObject() as any;

    // Сохраняем связи через CompatibilityModel
    // Используем create вместо replaceOne, чтобы избежать конфликтов со старыми индексами
    const compatibilityPromises: Promise<any>[] = [];

    // Обрабатываем массивы ID устройств
    if (Array.isArray(data.cartridgeIds) && data.cartridgeIds.length > 0) {
      data.cartridgeIds.forEach((cartridgeId: string) => {
        if (cartridgeId && cartridgeId.trim()) {
          compatibilityPromises.push(
            CompatibilityModel.create({
              exampleId, 
              cartridgeId: cartridgeId.trim()
            })
          );
        }
      });
    }

    if (Array.isArray(data.printerIds) && data.printerIds.length > 0) {
      data.printerIds.forEach((printerId: string) => {
        if (printerId && printerId.trim()) {
          compatibilityPromises.push(
            CompatibilityModel.create({
              exampleId, 
              printerId: printerId.trim()
            })
          );
        }
      });
    }

    if (Array.isArray(data.laptopIds) && data.laptopIds.length > 0) {
      data.laptopIds.forEach((laptopId: string) => {
        if (laptopId && laptopId.trim()) {
          compatibilityPromises.push(
            CompatibilityModel.create({
              exampleId, 
              laptopId: laptopId.trim()
            })
          );
        }
      });
    }

    // Обрабатываем одиночные ID для обратной совместимости
    if (data.cartridgeId && !Array.isArray(data.cartridgeIds)) {
      compatibilityPromises.push(
        CompatibilityModel.create({
          exampleId, 
          cartridgeId: data.cartridgeId.trim()
        })
      );
    }

    if (data.printerId && !Array.isArray(data.printerIds)) {
      compatibilityPromises.push(
        CompatibilityModel.create({
          exampleId, 
          printerId: data.printerId.trim()
        })
      );
    }

    if (data.laptopId && !Array.isArray(data.laptopIds)) {
      compatibilityPromises.push(
        CompatibilityModel.create({
          exampleId, 
          laptopId: data.laptopId.trim()
        })
      );
    }

    if (compatibilityPromises.length > 0) {
      try {
        await Promise.all(compatibilityPromises);
      } catch (error: any) {
        // Игнорируем ошибки дубликатов (E11000) от старого индекса exampleId_1_deviceType_1_deviceId_1
        // После запуска скрипта drop-old-indexes.ts эти ошибки исчезнут
        if (error.code !== 11000 || !error.message?.includes('exampleId_1_deviceType_1_deviceId_1')) {
          throw error;
        }
      }
    }

    res.status(201).json({
      success: true,
      data: {
        id: exampleObj._id,
        title: exampleObj.title,
        text: exampleObj.text,
        cartridgeId: exampleObj.cartridgeId,
        printerId: exampleObj.printerId,
        laptopId: exampleObj.laptopId,
        public: exampleObj.public,
        metaTitle: exampleObj.metaTitle,
        metaDescription: exampleObj.metaDescription,
        metaKeywords: exampleObj.metaKeywords,
        ogTitle: exampleObj.ogTitle,
        ogDescription: exampleObj.ogDescription,
        ogImage: exampleObj.ogImage,
        route: exampleObj.route,
        createdAt: exampleObj.createdAt,
        updatedAt: exampleObj.updatedAt
      },
      message: 'Пример успешно создан'
    });

  } catch (error: any) {
    console.error('Create example error:', error);

    if (error instanceof SyntaxError) {
      return res.status(400).json({ error: 'Невалидный JSON' });
    }

    if (error instanceof mongoose.Error.ValidationError) {
      return res.status(400).json({
        error: 'Ошибка валидации данных',
        details: Object.values(error.errors).map(err => err.message)
      });
    }

    res.status(500).json({
      error: 'Внутренняя ошибка сервера',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

export const getExampleByID = async (req: Request, res: Response) => {
  try {
    const { exampleId } = req.params;

    let example;
    if (mongoose.Types.ObjectId.isValid(exampleId)) {
      example = await ExampleModel.findById(exampleId);
    } else {
      example = await ExampleModel.findOne({ route: exampleId });
    }

    if (!example) {
      return res.status(404).json({ error: 'Пример не найден' });
    }

    const exampleObj = example.toObject() as any;
    const exampleIdStr = exampleObj._id.toString();

    // Получаем связанные устройства через CompatibilityModel
    const compatibilities = await CompatibilityModel.find({ exampleId: exampleIdStr }).lean();
    const cartridgeIds: string[] = [];
    const printerIds: string[] = [];
    const laptopIds: string[] = [];

    compatibilities.forEach((comp: any) => {
      if (comp.cartridgeId) {
        cartridgeIds.push(comp.cartridgeId);
      }
      if (comp.printerId) {
        printerIds.push(comp.printerId);
      }
      if (comp.laptopId) {
        laptopIds.push(comp.laptopId);
      }
    });

    exampleObj.cartridgeIds = [...new Set(cartridgeIds)];
    exampleObj.printerIds = [...new Set(printerIds)];
    exampleObj.laptopIds = [...new Set(laptopIds)];

    res.status(200).json({
      success: true,
      data: exampleObj
    });

  } catch (error: any) {
    console.error('Get example error:', error);
    res.status(500).json({
      error: 'Внутренняя ошибка сервера',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// Публичный endpoint для получения примера по route (для блога)
export const getExampleByRoute = async (req: Request, res: Response) => {
  try {
    const { route } = req.params;

    if (!route) {
      return res.status(400).json({ error: 'Route обязателен' });
    }

    const example = await ExampleModel.findOne({ route, public: { $ne: false } }).lean();

    if (!example) {
      return res.status(404).json({ error: 'Статья не найдена' });
    }

    res.status(200).json({
      success: true,
      data: example
    });

  } catch (error: any) {
    console.error('Get example by route error:', error);
    res.status(500).json({
      error: 'Внутренняя ошибка сервера',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

export const updateExample = async (req: Request, res: Response) => {
  try {
    const { exampleId } = req.params;

    if (!exampleId) {
      return res.status(400).json({ error: 'ID примера обязателен' });
    }

    const existingExample = await ExampleModel.findById(exampleId);

    if (!existingExample) {
      return res.status(404).json({ error: 'Пример не найден' });
    }

    let data: Partial<ExampleData>;
    if (typeof req.body.data === 'string') {
      data = JSON.parse(req.body.data);
    } else if (typeof req.body.data === 'object') {
      data = req.body.data;
    } else {
      data = req.body;
    }

    if (data.title !== undefined) {
      // Экранируем title (не должен содержать HTML)
      const newTitle = escapeHtmlText(data.title.trim());
      existingExample.title = newTitle;
      
      // Если title изменился и route не передан явно, перегенерируем route
      if (!data.route) {
        const newRoute = generateRouteFromTitle(newTitle);
        if (newRoute) {
          let uniqueRoute = newRoute;
          let counter = 1;
          // Проверяем уникальность, исключая текущий пример
          while (await ExampleModel.findOne({ route: uniqueRoute, _id: { $ne: existingExample._id } })) {
            uniqueRoute = `${newRoute}-${counter}`;
            counter++;
          }
          existingExample.route = uniqueRoute;
        }
      }
    }

    if (data.route !== undefined && data.route !== null) {
      // Если route передан явно, используем его (с проверкой уникальности)
      const newRoute = data.route.trim();
      if (newRoute) {
        let uniqueRoute = newRoute;
        let counter = 1;
        while (await ExampleModel.findOne({ route: uniqueRoute, _id: { $ne: existingExample._id } })) {
          uniqueRoute = `${newRoute}-${counter}`;
          counter++;
        }
        existingExample.route = uniqueRoute;
      } else {
        existingExample.route = undefined;
      }
    }

    if (data.text !== undefined) {
      // Санитизируем HTML перед сохранением
      existingExample.text = sanitizeHtml(data.text.trim());
    }

    if (data.cartridgeId !== undefined) {
      existingExample.cartridgeId = data.cartridgeId || undefined;
    }

    if (data.printerId !== undefined) {
      existingExample.printerId = data.printerId || undefined;
    }

    if (data.laptopId !== undefined) {
      existingExample.laptopId = data.laptopId || undefined;
    }

    if (data.public !== undefined) {
      existingExample.public = data.public === true || String(data.public).toLowerCase() === 'true';
    }

    // SEO метатеги
    if (data.metaTitle !== undefined) {
      existingExample.metaTitle = data.metaTitle ? escapeHtmlText(data.metaTitle.trim().substring(0, 60)) : undefined;
    }
    if (data.metaDescription !== undefined) {
      existingExample.metaDescription = data.metaDescription ? escapeHtmlText(data.metaDescription.trim().substring(0, 160)) : undefined;
    }
    if (data.metaKeywords !== undefined) {
      existingExample.metaKeywords = data.metaKeywords ? escapeHtmlText(data.metaKeywords.trim()) : undefined;
    }
    if (data.ogTitle !== undefined) {
      existingExample.ogTitle = data.ogTitle ? escapeHtmlText(data.ogTitle.trim().substring(0, 60)) : undefined;
    }
    if (data.ogDescription !== undefined) {
      existingExample.ogDescription = data.ogDescription ? escapeHtmlText(data.ogDescription.trim().substring(0, 200)) : undefined;
    }
    if (data.ogImage !== undefined) {
      existingExample.ogImage = data.ogImage ? data.ogImage.trim() : undefined;
    }

    const savedExample = await existingExample.save();
    const exampleIdStr = savedExample._id.toString();
    const exampleObj = savedExample.toObject() as any;

    // Обновляем связи через CompatibilityModel
    // Сначала удаляем ВСЕ старые связи для этого примера (любые документы с таким exampleId)
    await CompatibilityModel.deleteMany({ exampleId: exampleIdStr });

    // Создаем новые связи используя create (не replaceOne, чтобы избежать конфликтов со старыми индексами)
    const compatibilityPromises: Promise<any>[] = [];

    if (Array.isArray(data.cartridgeIds) && data.cartridgeIds.length > 0) {
      data.cartridgeIds.forEach((cartridgeId: string) => {
        if (cartridgeId && cartridgeId.trim()) {
          compatibilityPromises.push(
            CompatibilityModel.create({
              exampleId: exampleIdStr, 
              cartridgeId: cartridgeId.trim()
            })
          );
        }
      });
    } else if (data.cartridgeId && !Array.isArray(data.cartridgeIds)) {
      compatibilityPromises.push(
        CompatibilityModel.create({
          exampleId: exampleIdStr, 
          cartridgeId: data.cartridgeId.trim()
        })
      );
    }

    if (Array.isArray(data.printerIds) && data.printerIds.length > 0) {
      data.printerIds.forEach((printerId: string) => {
        if (printerId && printerId.trim()) {
          compatibilityPromises.push(
            CompatibilityModel.create({
              exampleId: exampleIdStr, 
              printerId: printerId.trim()
            })
          );
        }
      });
    } else if (data.printerId && !Array.isArray(data.printerIds)) {
      compatibilityPromises.push(
        CompatibilityModel.create({
          exampleId: exampleIdStr, 
          printerId: data.printerId.trim()
        })
      );
    }

    if (Array.isArray(data.laptopIds) && data.laptopIds.length > 0) {
      data.laptopIds.forEach((laptopId: string) => {
        if (laptopId && laptopId.trim()) {
          compatibilityPromises.push(
            CompatibilityModel.create({
              exampleId: exampleIdStr, 
              laptopId: laptopId.trim()
            })
          );
        }
      });
    } else if (data.laptopId && !Array.isArray(data.laptopIds)) {
      compatibilityPromises.push(
        CompatibilityModel.create({
          exampleId: exampleIdStr, 
          laptopId: data.laptopId.trim()
        })
      );
    }

    if (compatibilityPromises.length > 0) {
      try {
        await Promise.all(compatibilityPromises);
      } catch (error: any) {
        // Игнорируем ошибки дубликатов (E11000) от старого индекса exampleId_1_deviceType_1_deviceId_1
        // После запуска скрипта drop-old-indexes.ts эти ошибки исчезнут
        if (error.code !== 11000 || !error.message?.includes('exampleId_1_deviceType_1_deviceId_1')) {
          throw error;
        }
      }
    }

    res.status(200).json({
      success: true,
      data: {
        id: exampleObj._id,
        title: exampleObj.title,
        text: exampleObj.text,
        cartridgeId: exampleObj.cartridgeId,
        printerId: exampleObj.printerId,
        laptopId: exampleObj.laptopId,
        public: exampleObj.public,
        metaTitle: exampleObj.metaTitle,
        metaDescription: exampleObj.metaDescription,
        metaKeywords: exampleObj.metaKeywords,
        ogTitle: exampleObj.ogTitle,
        ogDescription: exampleObj.ogDescription,
        ogImage: exampleObj.ogImage,
        route: exampleObj.route,
        createdAt: exampleObj.createdAt,
        updatedAt: exampleObj.updatedAt
      },
      message: 'Пример успешно обновлен'
    });

  } catch (error: any) {
    console.error('Update example error:', error);

    if (error instanceof SyntaxError) {
      return res.status(400).json({ error: 'Невалидный JSON' });
    }

    if (error instanceof mongoose.Error.ValidationError) {
      return res.status(400).json({
        error: 'Ошибка валидации данных',
        details: Object.values(error.errors).map(err => err.message)
      });
    }

    res.status(500).json({
      error: 'Внутренняя ошибка сервера',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

export const deleteExample = async (req: Request, res: Response) => {
  try {
    const { exampleId } = req.params;

    if (!exampleId) {
      return res.status(400).json({ error: 'ID примера обязателен' });
    }

    const example = await ExampleModel.findById(exampleId);

    if (!example) {
      return res.status(404).json({ error: 'Пример не найден' });
    }

    // Удаляем все связи примера с устройствами
    await CompatibilityModel.deleteMany({ exampleId });
    
    await ExampleModel.findByIdAndDelete(exampleId);

    res.status(200).json({
      success: true,
      message: 'Пример успешно удален'
    });

  } catch (error: any) {
    console.error('Delete example error:', error);
    res.status(500).json({
      error: 'Внутренняя ошибка сервера',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

export const getPaginatedExamples = async (req: Request, res: Response) => {
  try {
    const page = Math.max(1, parseInt(req.query.page as string) || 1);
    const limit = Math.min(100, Math.max(1, parseInt(req.query.limit as string) || 10));
    const title = req.query.title as string || '';
    const text = req.query.text as string || '';
    const cartridgeId = req.query.cartridgeId as string || '';
    const printerId = req.query.printerId as string || '';
    const laptopId = req.query.laptopId as string || '';
    const publicFilter = req.query.public as string || '';

    const skip = (page - 1) * limit;

    const baseQuery: any = {};

    const escapeRegex = (text: string) => text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

    if (title) {
      baseQuery.$or = [
        { title: { $regex: escapeRegex(title), $options: 'i' } },
        { text: { $regex: escapeRegex(title), $options: 'i' } }
      ];
    }

    if (text) {
      if (baseQuery.$or) {
        baseQuery.$or.push({ text: { $regex: escapeRegex(text), $options: 'i' } });
      } else {
        baseQuery.text = { $regex: escapeRegex(text), $options: 'i' };
      }
    }

    if (publicFilter === 'true') {
      baseQuery.public = { $ne: false };
    } else if (publicFilter === 'false') {
      baseQuery.public = false;
    }

    // Ищем примеры через CompatibilityModel, если передан deviceId
    let exampleIds: string[] = [];
    if (cartridgeId || printerId || laptopId) {
      const compatibilityQuery: any = {};
      
      if (cartridgeId) {
        compatibilityQuery.cartridgeId = cartridgeId;
        compatibilityQuery.exampleId = { $exists: true, $ne: null };
      } else if (printerId) {
        compatibilityQuery.printerId = printerId;
        compatibilityQuery.exampleId = { $exists: true, $ne: null };
      } else if (laptopId) {
        compatibilityQuery.laptopId = laptopId;
        compatibilityQuery.exampleId = { $exists: true, $ne: null };
      }

      const compatibilities = await CompatibilityModel.find(compatibilityQuery).select('exampleId').lean();
      exampleIds = compatibilities.map((c: any) => c.exampleId).filter(Boolean);
      
      if (exampleIds.length > 0) {
        baseQuery._id = { $in: exampleIds.map((id: string) => new mongoose.Types.ObjectId(id)) };
      } else {
        // Если ничего не найдено, возвращаем пустой результат
        baseQuery._id = { $in: [] };
      }
    }

    const [total, examples] = await Promise.all([
      ExampleModel.countDocuments(baseQuery),
      ExampleModel.find(baseQuery)
        .skip(skip)
        .limit(limit)
        .sort({ createdAt: -1 })
        .lean(),
    ]);

    // Загружаем связанные устройства через CompatibilityModel для каждого примера
    const loadedExampleIds = examples.map((e: any) => e._id.toString());
    const compatibilities = await CompatibilityModel.find({ 
      exampleId: { $in: loadedExampleIds, $exists: true, $ne: null } 
    }).lean();
    
    // Группируем связи по exampleId
    const compatibilitiesByExample = new Map<string, { cartridgeIds: string[], printerIds: string[], laptopIds: string[] }>();
    compatibilities.forEach((comp: any) => {
      if (comp.exampleId) {
        if (!compatibilitiesByExample.has(comp.exampleId)) {
          compatibilitiesByExample.set(comp.exampleId, { cartridgeIds: [], printerIds: [], laptopIds: [] });
        }
        const devices = compatibilitiesByExample.get(comp.exampleId)!;
        if (comp.cartridgeId) devices.cartridgeIds.push(comp.cartridgeId);
        if (comp.printerId) devices.printerIds.push(comp.printerId);
        if (comp.laptopId) devices.laptopIds.push(comp.laptopId);
      }
    });

    // Собираем все ID устройств
    const allCartridgeIds = new Set<string>();
    const allPrinterIds = new Set<string>();
    const allLaptopIds = new Set<string>();
    
    compatibilitiesByExample.forEach((devices) => {
      devices.cartridgeIds.forEach(id => allCartridgeIds.add(id));
      devices.printerIds.forEach(id => allPrinterIds.add(id));
      devices.laptopIds.forEach(id => allLaptopIds.add(id));
    });

    // Загружаем данные устройств
    const [cartridges, printers, laptops] = await Promise.all([
      allCartridgeIds.size > 0 
        ? CartridgeModel.find({ _id: { $in: Array.from(allCartridgeIds) } }).select('_id vendor modelCart').lean()
        : Promise.resolve([]),
      allPrinterIds.size > 0
        ? PrinterModel.find({ _id: { $in: Array.from(allPrinterIds) } }).select('_id vendor model').lean()
        : Promise.resolve([]),
      allLaptopIds.size > 0
        ? LaptopModel.find({ _id: { $in: Array.from(allLaptopIds) } }).select('_id vendor model series').lean()
        : Promise.resolve([]),
    ]);

    // Создаем карты устройств
    const cartridgesMap = new Map(cartridges.map((c: any) => [c._id.toString(), c]));
    const printersMap = new Map(printers.map((p: any) => [p._id.toString(), p]));
    const laptopsMap = new Map(laptops.map((l: any) => [l._id.toString(), l]));

    // Добавляем связанные устройства к каждому примеру
    const examplesWithDevices = examples.map((example: any) => {
      const exampleIdStr = example._id.toString();
      const devices = compatibilitiesByExample.get(exampleIdStr) || { cartridgeIds: [], printerIds: [], laptopIds: [] };
      
      const cartridgeNames: string[] = [];
      const printerNames: string[] = [];
      const laptopNames: string[] = [];
      
      devices.cartridgeIds.forEach(cartridgeId => {
        const cartridge = cartridgesMap.get(cartridgeId);
        if (cartridge) {
          const name = `${cartridge.vendor?.toUpperCase() || ''} ${cartridge.modelCart || ''}`.trim();
          if (name) cartridgeNames.push(name);
        }
      });
      
      devices.printerIds.forEach(printerId => {
        const printer = printersMap.get(printerId);
        if (printer) {
          const name = `${printer.vendor?.toUpperCase() || ''} ${printer.model || ''}`.trim();
          if (name) printerNames.push(name);
        }
      });
      
      devices.laptopIds.forEach(laptopId => {
        const laptop = laptopsMap.get(laptopId);
        if (laptop) {
          const series = laptop.series ? `${laptop.series} ` : '';
          const name = `${laptop.vendor?.toUpperCase() || ''} ${series}${laptop.model || ''}`.trim();
          if (name) laptopNames.push(name);
        }
      });

      return {
        ...example,
        cartridgeIds: [...new Set(devices.cartridgeIds)],
        printerIds: [...new Set(devices.printerIds)],
        laptopIds: [...new Set(devices.laptopIds)],
        cartridgeNames: [...new Set(cartridgeNames)],
        printerNames: [...new Set(printerNames)],
        laptopNames: [...new Set(laptopNames)],
      };
    });

    res.status(200).json({
      success: true,
      data: examplesWithDevices,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        totalItems: total
      }
    });

  } catch (error: any) {
    console.error('Get paginated examples error:', error);
    res.status(500).json({
      error: 'Внутренняя ошибка сервера',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

export const toggleExamplePublicStatus = async (req: Request, res: Response) => {
  try {
    const { exampleId } = req.params;
    const { public: publicStatus } = req.body;

    if (!exampleId) {
      return res.status(400).json({ error: 'ID примера обязателен' });
    }

    if (typeof publicStatus !== 'boolean') {
      return res.status(400).json({ error: 'Поле public должно быть boolean' });
    }

    const example = await ExampleModel.findById(exampleId);

    if (!example) {
      return res.status(404).json({ error: 'Пример не найден' });
    }

    example.public = publicStatus;
    await example.save();

    res.status(200).json({
      success: true,
      data: example,
      message: `Статус public успешно изменен на ${publicStatus}`,
    });

  } catch (error: any) {
    console.error('Toggle example public status error:', error);
    res.status(500).json({
      error: 'Внутренняя ошибка сервера',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

