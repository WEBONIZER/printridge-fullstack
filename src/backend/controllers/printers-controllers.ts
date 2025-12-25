import { Request, Response } from "express";
import mongoose from "mongoose";
import { PrinterModel } from "../models/printer-model";
import { PriceModel } from "../models/price-model";
import { IPrinterSchema } from "../../utils/types";
import { getPrinterPrice } from "../utils/price-helpers";

interface PrinterData {
  vendor: string;
  model: string;
  device?: string;
  type?: string;
  format?: string;
  capacity?: number;
  speed?: number;
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

    const printer = new PrinterModel({
      vendor: data.vendor.trim(),
      model: data.model.trim(),
      device: data.device?.trim() || undefined,
      type: data.type?.trim() || undefined,
      format: data.format?.trim() || undefined,
      capacity: data.capacity || undefined,
      speed: data.speed || undefined,
    });

    const savedPrinter = await printer.save();
    const printerObj = savedPrinter.toObject() as any;
    const printerId = savedPrinter._id.toString();

    // Создаем прайс для принтера, если указаны необходимые параметры
    try {
      const priceData = await getPrinterPrice(
        data.device?.trim(),
        data.type?.trim(),
        data.format?.trim(),
        data.capacity
      );

      if (priceData) {
        // Проверяем, не существует ли уже прайс для этого принтера
        const existingPrice = await PriceModel.findOne({ printerId });

        if (!existingPrice) {
          const price = new PriceModel({
            diagnostics: priceData.diagnostics,
            TO: priceData.TO,
            rollers: priceData.rollers,
            drum: priceData.drum,
            laser: priceData.laser,
            therm: priceData.therm,
            reducer: priceData.reducer,
            scaner: priceData.scaner || undefined,
            adf: priceData.adf || undefined,
            duplex: priceData.duplex,
            electronics: priceData.electronics,
            printerId: printerId,
          });

          await price.save();
          console.log(`✅ Создан прайс для принтера ${data.vendor} ${data.model}`);
        }
      }
    } catch (priceError: any) {
      console.error('Ошибка при создании прайса для принтера:', priceError.message);
    }

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

    const printerObj = printer.toObject() as any;

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
      existingPrinter.model = data.model.trim();
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

    const savedPrinter = await existingPrinter.save();
    const printerObj = savedPrinter.toObject() as any;

    res.status(200).json({
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

    const skip = (page - 1) * limit;

    const baseQuery: any = {};

    const escapeRegex = (text: string) => text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

    if (vendor) {
      baseQuery.vendor = { $regex: escapeRegex(vendor), $options: 'i' };
    }

    if (model) {
      baseQuery.model = { $regex: escapeRegex(model), $options: 'i' };
    }

    const [total, printers] = await Promise.all([
      PrinterModel.countDocuments(baseQuery),
      PrinterModel.find(baseQuery)
        .skip(skip)
        .limit(limit)
        .sort({ createdAt: -1 })
        .lean(),
    ]);

    res.status(200).json({
      success: true,
      data: printers,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        totalItems: total
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

