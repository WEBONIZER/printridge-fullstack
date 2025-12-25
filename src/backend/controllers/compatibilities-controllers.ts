import { Request, Response } from "express";
import mongoose from "mongoose";
import { CompatibilityModel } from "../models/compatibility-model";
import { CartridgeModel } from "../models/cartridge-model";
import { PrinterModel } from "../models/printer-model";

interface CompatibilityData {
  cartridgeId: string;
  printerId: string;
}

// Создать связь между картриджем и принтером
export const createCompatibility = async (req: Request, res: Response) => {
  try {
    let data: CompatibilityData;
    if (typeof req.body.data === 'string') {
      data = JSON.parse(req.body.data);
    } else if (typeof req.body.data === 'object') {
      data = req.body.data;
    } else {
      data = req.body;
    }

    if (!data.cartridgeId?.trim()) {
      return res.status(400).json({ error: 'Поле cartridgeId обязательно' });
    }

    if (!data.printerId?.trim()) {
      return res.status(400).json({ error: 'Поле printerId обязательно' });
    }

    // Проверяем существование картриджа
    const cartridge = await CartridgeModel.findById(data.cartridgeId);
    if (!cartridge) {
      return res.status(404).json({ error: 'Картридж не найден' });
    }

    // Проверяем существование принтера
    const printer = await PrinterModel.findById(data.printerId);
    if (!printer) {
      return res.status(404).json({ error: 'Принтер не найден' });
    }

    // Проверяем, не существует ли уже такая связь
    const existing = await CompatibilityModel.findOne({
      cartridgeId: data.cartridgeId.trim(),
      printerId: data.printerId.trim()
    });

    if (existing) {
      return res.status(409).json({ error: 'Связь между этим картриджем и принтером уже существует' });
    }

    const compatibility = new CompatibilityModel({
      cartridgeId: data.cartridgeId.trim(),
      printerId: data.printerId.trim(),
    });

    const savedCompatibility = await compatibility.save();
    const compatibilityObj = savedCompatibility.toObject() as any;

    res.status(201).json({
      success: true,
      data: {
        id: compatibilityObj._id,
        cartridgeId: compatibilityObj.cartridgeId,
        printerId: compatibilityObj.printerId,
        createdAt: compatibilityObj.createdAt,
        updatedAt: compatibilityObj.updatedAt
      },
      message: 'Связь успешно создана'
    });

  } catch (error: any) {
    console.error('Create compatibility error:', error);

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
      return res.status(409).json({ error: 'Связь между этим картриджем и принтером уже существует' });
    }

    res.status(500).json({
      error: 'Внутренняя ошибка сервера',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// Удалить связь
export const deleteCompatibility = async (req: Request, res: Response) => {
  try {
    const { compatibilityId } = req.params;

    if (!compatibilityId) {
      return res.status(400).json({ error: 'ID связи обязателен' });
    }

    const compatibility = await CompatibilityModel.findById(compatibilityId);

    if (!compatibility) {
      return res.status(404).json({ error: 'Связь не найдена' });
    }

    await CompatibilityModel.findByIdAndDelete(compatibilityId);

    res.status(200).json({
      success: true,
      message: 'Связь успешно удалена'
    });

  } catch (error: any) {
    console.error('Delete compatibility error:', error);
    res.status(500).json({
      error: 'Внутренняя ошибка сервера',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// Получить все принтеры для конкретного картриджа
export const getPrintersByCartridgeId = async (req: Request, res: Response) => {
  try {
    const { cartridgeId } = req.params;

    if (!cartridgeId) {
      return res.status(400).json({ error: 'ID картриджа обязателен' });
    }

    // Проверяем существование картриджа
    const cartridge = await CartridgeModel.findById(cartridgeId);
    if (!cartridge) {
      return res.status(404).json({ error: 'Картридж не найден' });
    }

    // Находим все связи с этим картриджем
    const compatibilities = await CompatibilityModel.find({ cartridgeId }).lean();
    
    // Получаем ID всех принтеров
    const printerIds = compatibilities.map(c => c.printerId);

    // Получаем данные принтеров
    const printers = await PrinterModel.find({ _id: { $in: printerIds } }).lean();

    res.status(200).json({
      success: true,
      data: printers,
      count: printers.length
    });

  } catch (error: any) {
    console.error('Get printers by cartridge ID error:', error);
    res.status(500).json({
      error: 'Внутренняя ошибка сервера',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// Получить все картриджи для конкретного принтера
export const getCartridgesByPrinterId = async (req: Request, res: Response) => {
  try {
    const { printerId } = req.params;

    if (!printerId) {
      return res.status(400).json({ error: 'ID принтера обязателен' });
    }

    // Проверяем существование принтера
    const printer = await PrinterModel.findById(printerId);
    if (!printer) {
      return res.status(404).json({ error: 'Принтер не найден' });
    }

    // Находим все связи с этим принтером
    const compatibilities = await CompatibilityModel.find({ printerId }).lean();
    
    // Получаем ID всех картриджей
    const cartridgeIds = compatibilities.map(c => c.cartridgeId);

    // Получаем данные картриджей
    const cartridges = await CartridgeModel.find({ _id: { $in: cartridgeIds } })
      .populate('photo')
      .lean();

    res.status(200).json({
      success: true,
      data: cartridges,
      count: cartridges.length
    });

  } catch (error: any) {
    console.error('Get cartridges by printer ID error:', error);
    res.status(500).json({
      error: 'Внутренняя ошибка сервера',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// Получить все связи с пагинацией
export const getPaginatedCompatibilities = async (req: Request, res: Response) => {
  try {
    const page = Math.max(1, parseInt(req.query.page as string) || 1);
    const limit = Math.min(100, Math.max(1, parseInt(req.query.limit as string) || 10));
    const cartridgeId = req.query.cartridgeId as string || '';
    const printerId = req.query.printerId as string || '';

    const skip = (page - 1) * limit;

    const baseQuery: any = {};

    if (cartridgeId) {
      baseQuery.cartridgeId = cartridgeId;
    }

    if (printerId) {
      baseQuery.printerId = printerId;
    }

    const [total, compatibilities] = await Promise.all([
      CompatibilityModel.countDocuments(baseQuery),
      CompatibilityModel.find(baseQuery)
        .skip(skip)
        .limit(limit)
        .sort({ createdAt: -1 })
        .lean(),
    ]);

    res.status(200).json({
      success: true,
      data: compatibilities,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        totalItems: total
      }
    });

  } catch (error: any) {
    console.error('Get paginated compatibilities error:', error);
    res.status(500).json({
      error: 'Внутренняя ошибка сервера',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

