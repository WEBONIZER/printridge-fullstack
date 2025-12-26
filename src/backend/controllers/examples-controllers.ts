import { Request, Response } from "express";
import mongoose from "mongoose";
import { ExampleModel } from "../models/example-model";
import { sanitizeHtml, escapeHtmlText } from "../utils/html-sanitizer";
import { generateRouteFromTitle } from "../utils/transliterate";

interface ExampleData {
  title: string;
  text: string;
  cartridgeId?: string;
  printerId?: string;
  laptopId?: string;
  cartridgeNames?: string[];
  printerNames?: string[];
  laptopNames?: string[];
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
      cartridgeNames: Array.isArray(data.cartridgeNames) ? data.cartridgeNames.filter((n: string) => n && n.trim()).map((n: string) => n.trim()) : [],
      printerNames: Array.isArray(data.printerNames) ? data.printerNames.filter((n: string) => n && n.trim()).map((n: string) => n.trim()) : [],
      laptopNames: Array.isArray(data.laptopNames) ? data.laptopNames.filter((n: string) => n && n.trim()).map((n: string) => n.trim()) : [],
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
    const exampleObj = savedExample.toObject() as any;

    res.status(201).json({
      success: true,
      data: {
        id: exampleObj._id,
        title: exampleObj.title,
        text: exampleObj.text,
        cartridgeId: exampleObj.cartridgeId,
        printerId: exampleObj.printerId,
        laptopId: exampleObj.laptopId,
        cartridgeNames: exampleObj.cartridgeNames || [],
        printerNames: exampleObj.printerNames || [],
        laptopNames: exampleObj.laptopNames || [],
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

    const example = await ExampleModel.findById(exampleId);

    if (!example) {
      return res.status(404).json({ error: 'Пример не найден' });
    }

    const exampleObj = example.toObject() as any;

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

    if (data.cartridgeNames !== undefined) {
      existingExample.cartridgeNames = Array.isArray(data.cartridgeNames) ? data.cartridgeNames.filter((n: string) => n && n.trim()).map((n: string) => n.trim()) : [];
    }

    if (data.printerNames !== undefined) {
      existingExample.printerNames = Array.isArray(data.printerNames) ? data.printerNames.filter((n: string) => n && n.trim()).map((n: string) => n.trim()) : [];
    }

    if (data.laptopNames !== undefined) {
      existingExample.laptopNames = Array.isArray(data.laptopNames) ? data.laptopNames.filter((n: string) => n && n.trim()).map((n: string) => n.trim()) : [];
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
    const exampleObj = savedExample.toObject() as any;

    res.status(200).json({
      success: true,
      data: {
        id: exampleObj._id,
        title: exampleObj.title,
        text: exampleObj.text,
        cartridgeId: exampleObj.cartridgeId,
        printerId: exampleObj.printerId,
        laptopId: exampleObj.laptopId,
        cartridgeNames: exampleObj.cartridgeNames || [],
        printerNames: exampleObj.printerNames || [],
        laptopNames: exampleObj.laptopNames || [],
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
    const cartridgeId = req.query.cartridgeId as string || '';
    const printerId = req.query.printerId as string || '';
    const laptopId = req.query.laptopId as string || '';

    const skip = (page - 1) * limit;

    const baseQuery: any = {};

    const escapeRegex = (text: string) => text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

    if (title) {
      baseQuery.title = { $regex: escapeRegex(title), $options: 'i' };
    }

    if (cartridgeId) {
      baseQuery.cartridgeId = cartridgeId;
    }

    if (printerId) {
      baseQuery.printerId = printerId;
    }

    if (laptopId) {
      baseQuery.laptopId = laptopId;
    }

    const [total, examples] = await Promise.all([
      ExampleModel.countDocuments(baseQuery),
      ExampleModel.find(baseQuery)
        .skip(skip)
        .limit(limit)
        .sort({ createdAt: -1 })
        .lean(),
    ]);

    res.status(200).json({
      success: true,
      data: examples,
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

