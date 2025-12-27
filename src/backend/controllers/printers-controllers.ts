import { Request, Response } from "express";
import mongoose from "mongoose";
import { PrinterModel } from "../models/printer-model";
import { PhotoModel } from "../models/printridge-photo-model";
import { PrinterPriceTemplateModel } from "../models/printer-price-template-model";
import { IPrinterSchema } from "../../utils/types";
import { determinePrinterPriceType, getPrinterPriceId } from "../utils/device-price-helpers";

interface PrinterData {
  vendor: string;
  model: string;
  device?: string;
  type?: string;
  format?: string;
  capacity?: number;
  speed?: number;
  public?: boolean;
  price?: string;
}

// Создать принтер
export const createPrinter = async (req: Request, res: Response) => {
  try {
    let data: PrinterData;
    if (typeof req.body.data === 'string') {
      data = JSON.parse(req.body.data);
    } else if (typeof req.body.data === 'object') {
      data = req.body.data;
    } else {
      data = req.body;
    }

    if (!data.vendor?.trim() || !data.model?.trim()) {
      return res.status(400).json({ error: 'Поля vendor и model обязательны' });
    }

    // Проверяем, не существует ли уже принтер с такой комбинацией vendor + model
    const existing = await PrinterModel.findOne({
      vendor: data.vendor.trim(),
      model: data.model.trim()
    });

    if (existing) {
      return res.status(409).json({ error: 'Принтер с такой комбинацией vendor и model уже существует' });
    }

    // Определяем тип прайса и получаем его ID
    let priceId: string | null = null;
    try {
      const priceType = determinePrinterPriceType(
        data.device?.trim(),
        data.type?.trim(),
        data.format?.trim(),
        data.capacity
      );
      
      if (priceType) {
        priceId = await getPrinterPriceId(priceType);
        if (priceId) {
          console.log(`✓ Найден прайс для принтера ${data.vendor} ${data.model}: ${priceType}`);
        }
      }
    } catch (priceError: any) {
      console.error('Ошибка при определении прайса для принтера:', priceError.message);
    }

    const printer = new PrinterModel({
      vendor: data.vendor.trim(),
      model: data.model.trim(),
      device: data.device?.trim() || undefined,
      type: data.type?.trim() || undefined,
      format: data.format?.trim() || undefined,
      capacity: data.capacity || undefined,
      speed: data.speed || undefined,
      public: data.public !== undefined ? (data.public === true || String(data.public).toLowerCase() === 'true') : true,
      price: priceId || undefined,
    });

    const savedPrinter = await printer.save();
    const printerObj = savedPrinter.toObject() as any;

    res.status(201).json({
      success: true,
      data: {
        id: printerObj._id,
        vendor: printerObj.vendor,
        model: printerObj.model,
        device: printerObj.device,
        type: printerObj.type,
        format: printerObj.format,
        capacity: printerObj.capacity,
        speed: printerObj.speed,
        createdAt: printerObj.createdAt,
        updatedAt: printerObj.updatedAt
      },
      message: 'Принтер успешно создан'
    });

  } catch (error: any) {
    console.error('Create printer error:', error);

    if (error instanceof SyntaxError) {
      return res.status(400).json({ error: 'Невалидный JSON' });
    }

    if (error instanceof mongoose.Error.ValidationError) {
      return res.status(400).json({
        error: 'Ошибка валидации данных',
        details: Object.values(error.errors).map(err => err.message)
      });
    }

    if (error.code === 11000) {
      return res.status(409).json({ error: 'Принтер с такой комбинацией vendor и model уже существует' });
    }

    res.status(500).json({
      error: 'Внутренняя ошибка сервера',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// Получить принтер по ID
export const getPrinterByID = async (req: Request, res: Response) => {
  try {
    const { printerId } = req.params;

    if (!printerId) {
      return res.status(400).json({ error: 'ID принтера обязателен' });
    }

    const printer = await PrinterModel.findById(printerId);

    if (!printer) {
      return res.status(404).json({ error: 'Принтер не найден' });
    }

    // Получаем фото для принтера
    // Ищем фото по printerId, конвертируя в строку для совместимости
    const photo = await PhotoModel.findOne({ printerId: String(printerId) }).lean();
    
    // Получаем прайс, если он указан
    let priceTemplate = null;
    if (printer.price) {
      try {
        priceTemplate = await PrinterPriceTemplateModel.findById(printer.price).lean();
      } catch (error) {
        console.error('Error fetching price template:', error);
      }
    }
    
    const printerObj = printer.toObject() as any;
    printerObj.photo = photo || null;
    printerObj.priceTemplate = priceTemplate;

    res.status(200).json({
      success: true,
      data: printerObj
    });

  } catch (error: any) {
    console.error('Get printer error:', error);
    res.status(500).json({
      error: 'Внутренняя ошибка сервера',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// Обновить принтер
export const updatePrinter = async (req: Request, res: Response) => {
  try {
    const { printerId } = req.params;

    if (!printerId) {
      return res.status(400).json({ error: 'ID принтера обязателен' });
    }

    const existingPrinter = await PrinterModel.findById(printerId);

    if (!existingPrinter) {
      return res.status(404).json({ error: 'Принтер не найден' });
    }

    let data: Partial<PrinterData>;
    if (typeof req.body.data === 'string') {
      data = JSON.parse(req.body.data);
    } else if (typeof req.body.data === 'object') {
      data = req.body.data;
    } else {
      data = req.body;
    }

    if (data.vendor !== undefined) {
      existingPrinter.vendor = data.vendor.trim();
    }

    if (data.model !== undefined) {
      existingPrinter.set('model', data.model.trim());
    }

    if (data.device !== undefined) {
      existingPrinter.device = data.device?.trim() || undefined;
    }

    if (data.type !== undefined) {
      existingPrinter.type = data.type?.trim() || undefined;
    }

    if (data.format !== undefined) {
      existingPrinter.format = data.format?.trim() || undefined;
    }

    if (data.capacity !== undefined) {
      existingPrinter.capacity = data.capacity || undefined;
    }

    if (data.speed !== undefined) {
      existingPrinter.speed = data.speed || undefined;
    }

    if (data.public !== undefined) {
      existingPrinter.public = data.public === true || String(data.public).toLowerCase() === 'true';
    }

    // Если price передан явно, используем его
    if (data.price !== undefined) {
      if (data.price === null || data.price === '') {
        existingPrinter.price = undefined;
      } else {
        existingPrinter.price = data.price;
      }
    } else if (data.device !== undefined || data.type !== undefined || data.format !== undefined || data.capacity !== undefined) {
      // Обновляем прайс автоматически, если изменились параметры, влияющие на него
      try {
        const priceType = determinePrinterPriceType(
          existingPrinter.device,
          existingPrinter.type,
          existingPrinter.format,
          existingPrinter.capacity
        );
        
        if (priceType) {
          const priceId = await getPrinterPriceId(priceType);
          if (priceId) {
            existingPrinter.price = priceId;
          }
        } else {
          existingPrinter.price = undefined;
        }
      } catch (priceError: any) {
        console.error('Ошибка при обновлении прайса для принтера:', priceError.message);
      }
    }

    const savedPrinter = await existingPrinter.save();
    const printerObj = savedPrinter.toObject() as any;
    
    // Получаем фото для принтера
    // Ищем фото по printerId, конвертируя в строку для совместимости
    const photo = await PhotoModel.findOne({ printerId: String(printerId) }).lean();
    printerObj.photo = photo || null;
    
    // Получаем прайс, если он указан
    let priceTemplate = null;
    if (printerObj.price) {
      try {
        priceTemplate = await PrinterPriceTemplateModel.findById(printerObj.price).lean();
      } catch (error) {
        console.error('Error fetching price template:', error);
      }
    }
    printerObj.priceTemplate = priceTemplate;

    res.status(200).json({
      success: true,
      data: printerObj,
      message: 'Принтер успешно обновлен'
    });

  } catch (error: any) {
    console.error('Update printer error:', error);

    if (error instanceof SyntaxError) {
      return res.status(400).json({ error: 'Невалидный JSON' });
    }

    if (error instanceof mongoose.Error.ValidationError) {
      return res.status(400).json({
        error: 'Ошибка валидации данных',
        details: Object.values(error.errors).map(err => err.message)
      });
    }

    if (error.code === 11000) {
      return res.status(409).json({ error: 'Принтер с такой комбинацией vendor и model уже существует' });
    }

    res.status(500).json({
      error: 'Внутренняя ошибка сервера',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// Удалить принтер
export const deletePrinter = async (req: Request, res: Response) => {
  try {
    const { printerId } = req.params;

    if (!printerId) {
      return res.status(400).json({ error: 'ID принтера обязателен' });
    }

    const printer = await PrinterModel.findById(printerId);

    if (!printer) {
      return res.status(404).json({ error: 'Принтер не найден' });
    }

    await PrinterModel.findByIdAndDelete(printerId);

    res.status(200).json({
      success: true,
      message: 'Принтер успешно удален'
    });

  } catch (error: any) {
    console.error('Delete printer error:', error);
    res.status(500).json({
      error: 'Внутренняя ошибка сервера',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// Получить принтеры с пагинацией
export const getPaginatedPrinters = async (req: Request, res: Response) => {
  try {
    const page = Math.max(1, parseInt(req.query.page as string) || 1);
    const limit = Math.min(10000, Math.max(1, parseInt(req.query.limit as string) || 10));
    const vendor = req.query.vendor as string || '';
    const model = req.query.model as string || '';
    const hasImage = req.query.hasImage as string || '';
    const hasLinkedCartridges = req.query.hasLinkedCartridges as string || '';
    const publicFilter = req.query.public as string || '';

    const skip = (page - 1) * limit;

    const baseQuery: any = {};

    const escapeRegex = (text: string) => text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

    if (vendor) {
      baseQuery.vendor = { $regex: escapeRegex(vendor), $options: 'i' };
    }

    if (model) {
      baseQuery.model = { $regex: escapeRegex(model), $options: 'i' };
    }

    if (publicFilter === 'true') {
      baseQuery.public = { $ne: false };
    } else if (publicFilter === 'false') {
      baseQuery.public = false;
    }

    // Получаем ID принтеров с/без связей для фильтрации
    let filteredPrinterIds: string[] | null = null;
    if (hasLinkedCartridges === 'yes' || hasLinkedCartridges === 'no') {
      const { CompatibilityModel: CompatModel } = require("../models/compatibility-model");
      const compatibilities = await CompatModel.find({}).lean();
      const printerIdsWithLinks = new Set(compatibilities.map((c: any) => c.printerId.toString()));
      
      if (hasLinkedCartridges === 'yes') {
        filteredPrinterIds = Array.from(printerIdsWithLinks) as string[];
      } else {
        const allPrinters = await PrinterModel.find({}, { _id: 1 }).lean();
        filteredPrinterIds = allPrinters
          .map((p: any) => p._id.toString())
          .filter((id: string) => !printerIdsWithLinks.has(id));
      }
    }

    if (filteredPrinterIds !== null) {
      baseQuery._id = { $in: filteredPrinterIds.map(id => new mongoose.Types.ObjectId(id)) };
    }

    const [total, printersData] = await Promise.all([
      PrinterModel.countDocuments(baseQuery),
      PrinterModel.find(baseQuery)
        .skip(skip)
        .limit(limit)
        .sort({ createdAt: -1 })
        .lean(),
    ]);

    // Получаем фото для всех принтеров
    const printerIds = printersData.map(p => p._id.toString());
    const photos = await PhotoModel.find({ printerId: { $in: printerIds } }).lean();
    console.log(`📸 Found ${photos.length} photos for ${printerIds.length} printers`);
    console.log('📸 Printer IDs:', printerIds.slice(0, 5), '...');
    console.log('📸 Photo printerIds:', photos.map(p => p.printerId).slice(0, 5), '...');
    
    // Создаем карту, где ключ - это строковое представление printerId
    const photoMap = new Map(photos.map(p => [String(p.printerId || ''), p]));

    // Получаем прайсы для всех принтеров
    const priceIds = printersData
      .map(p => p.price)
      .filter(priceId => priceId) as string[];
    const priceTemplates = await PrinterPriceTemplateModel.find({ _id: { $in: priceIds } }).lean();
    const priceMap = new Map(priceTemplates.map(p => [p._id.toString(), p]));

    // Добавляем фото и прайсы к каждому принтеру
    let printers = printersData.map(printer => {
      const printerIdStr = printer._id.toString();
      const photo = photoMap.get(printerIdStr) || null;
      if (photo) {
        console.log(`✅ Found photo for printer ${printerIdStr}`);
      }
      return {
        ...printer,
        photo: photo,
        priceTemplate: printer.price ? priceMap.get(printer.price) || null : null
      };
    });

    // Фильтрация по наличию картинки
    if (hasImage === 'yes') {
      printers = printers.filter(printer => {
        if (typeof printer.photo === 'object' && printer.photo !== null) {
          return !!(printer.photo.src || printer.photo._id);
        }
        return !!printer.photo;
      });
    } else if (hasImage === 'no') {
      printers = printers.filter(printer => {
        if (typeof printer.photo === 'object' && printer.photo !== null) {
          return !(printer.photo.src || printer.photo._id);
        }
        return !printer.photo;
      });
    }

    res.status(200).json({
      success: true,
      data: printers,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil((hasImage ? printers.length : total) / limit),
        totalItems: hasImage ? printers.length : total
      }
    });

  } catch (error: any) {
    console.error('Get paginated printers error:', error);
    res.status(500).json({
      error: 'Внутренняя ошибка сервера',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// Получить все уникальные производители принтеров
export const getPrinterVendors = async (req: Request, res: Response) => {
  try {
    const vendors = await PrinterModel.distinct('vendor');
    const sortedVendors = vendors.filter(Boolean).sort();

    res.status(200).json({
      success: true,
      data: sortedVendors,
    });
  } catch (error: any) {
    console.error('Get printer vendors error:', error);
    res.status(500).json({
      error: 'Внутренняя ошибка сервера',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// Поиск моделей принтеров по частичному совпадению
export const searchPrinterModels = async (req: Request, res: Response) => {
  try {
    const query = (req.query.q as string || '').trim();
    const limit = Math.min(20, Math.max(1, parseInt(req.query.limit as string) || 10));

    if (!query) {
      res.status(200).json({
        success: true,
        data: [],
      });
      return;
    }

    const escapeRegex = (text: string) => text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const escapedQuery = escapeRegex(query);

    const allModels = await PrinterModel.distinct('model', {
      model: { $regex: escapedQuery, $options: 'i' }
    });

    const sortedModels = allModels.filter(Boolean).sort().slice(0, limit);

    res.status(200).json({
      success: true,
      data: sortedModels,
    });
  } catch (error: any) {
    console.error('Search printer models error:', error);
    res.status(500).json({
      error: 'Внутренняя ошибка сервера',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

export const togglePrinterPublicStatus = async (req: Request, res: Response) => {
  try {
    const { printerId } = req.params;
    const { public: publicStatus } = req.body;

    if (!printerId) {
      return res.status(400).json({ error: 'ID принтера обязателен' });
    }

    if (typeof publicStatus !== 'boolean') {
      return res.status(400).json({ error: 'Поле public должно быть boolean' });
    }

    const printer = await PrinterModel.findById(printerId);

    if (!printer) {
      return res.status(404).json({ error: 'Принтер не найден' });
    }

    printer.public = publicStatus;
    await printer.save();

    res.status(200).json({
      success: true,
      data: printer,
      message: `Статус public успешно изменен на ${publicStatus}`,
    });

  } catch (error: any) {
    console.error('Toggle printer public status error:', error);
    res.status(500).json({
      error: 'Внутренняя ошибка сервера',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

