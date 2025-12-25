import { Request, Response } from "express";
import { PriceModel } from "../models/price-model";
import { IPriceSchema } from "../../utils/types";

interface PriceData {
  diagnostics: number;
  TO: number;
  rollers: number;
  drum: number;
  laser: number;
  therm: number;
  reducer: number;
  scaner?: number | null;
  adf?: number | null;
  duplex: number;
  electronics: number;
  printerId: string;
}

// Создать прайс
export const createPrice = async (req: Request, res: Response) => {
  try {
    let data: PriceData;
    if (typeof req.body.data === 'string') {
      data = JSON.parse(req.body.data);
    } else if (typeof req.body.data === 'object') {
      data = req.body.data;
    } else {
      data = req.body;
    }

    if (!data.printerId?.trim()) {
      return res.status(400).json({ error: 'Поле printerId обязательно' });
    }

    if (
      data.diagnostics === undefined ||
      data.TO === undefined ||
      data.rollers === undefined ||
      data.drum === undefined ||
      data.laser === undefined ||
      data.therm === undefined ||
      data.reducer === undefined ||
      data.duplex === undefined ||
      data.electronics === undefined
    ) {
      return res.status(400).json({ error: 'Все обязательные поля прайса должны быть заполнены' });
    }

    // Проверяем, не существует ли уже прайс для этого принтера
    const existing = await PriceModel.findOne({
      printerId: data.printerId.trim()
    });

    if (existing) {
      return res.status(409).json({ error: 'Прайс для этого принтера уже существует' });
    }

    const price = new PriceModel({
      diagnostics: data.diagnostics,
      TO: data.TO,
      rollers: data.rollers,
      drum: data.drum,
      laser: data.laser,
      therm: data.therm,
      reducer: data.reducer,
      scaner: data.scaner || undefined,
      adf: data.adf || undefined,
      duplex: data.duplex,
      electronics: data.electronics,
      printerId: data.printerId.trim(),
    });

    const savedPrice = await price.save();
    const priceObj = savedPrice.toObject() as any;

    res.status(201).json({
      success: true,
      data: {
        id: priceObj._id,
        diagnostics: priceObj.diagnostics,
        TO: priceObj.TO,
        rollers: priceObj.rollers,
        drum: priceObj.drum,
        laser: priceObj.laser,
        therm: priceObj.therm,
        reducer: priceObj.reducer,
        scaner: priceObj.scaner,
        adf: priceObj.adf,
        duplex: priceObj.duplex,
        electronics: priceObj.electronics,
        printerId: priceObj.printerId,
        createdAt: priceObj.createdAt,
        updatedAt: priceObj.updatedAt
      },
      message: 'Прайс успешно создан'
    });

  } catch (error: any) {
    console.error('Create price error:', error);

    if (error instanceof SyntaxError) {
      return res.status(400).json({ error: 'Невалидный JSON' });
    }

    if (error.code === 11000) {
      return res.status(409).json({ error: 'Прайс для этого принтера уже существует' });
    }

    res.status(500).json({
      error: 'Внутренняя ошибка сервера',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// Получить прайс по ID
export const getPriceByID = async (req: Request, res: Response) => {
  try {
    const { priceId } = req.params;

    const price = await PriceModel.findById(priceId);

    if (!price) {
      return res.status(404).json({ error: 'Прайс не найден' });
    }

    const priceObj = price.toObject() as any;

    res.status(200).json({
      success: true,
      data: priceObj
    });

  } catch (error: any) {
    console.error('Get price error:', error);
    res.status(500).json({
      error: 'Внутренняя ошибка сервера',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// Получить прайс по printerId
export const getPriceByPrinterId = async (req: Request, res: Response) => {
  try {
    const { printerId } = req.params;

    const price = await PriceModel.findOne({ printerId });

    if (!price) {
      return res.status(404).json({ error: 'Прайс для этого принтера не найден' });
    }

    const priceObj = price.toObject() as any;

    res.status(200).json({
      success: true,
      data: priceObj
    });

  } catch (error: any) {
    console.error('Get price by printerId error:', error);
    res.status(500).json({
      error: 'Внутренняя ошибка сервера',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// Обновить прайс
export const updatePrice = async (req: Request, res: Response) => {
  try {
    const { priceId } = req.params;

    if (!priceId) {
      return res.status(400).json({ error: 'ID прайса обязателен' });
    }

    const existingPrice = await PriceModel.findById(priceId);

    if (!existingPrice) {
      return res.status(404).json({ error: 'Прайс не найден' });
    }

    let data: Partial<PriceData>;
    if (typeof req.body.data === 'string') {
      data = JSON.parse(req.body.data);
    } else if (typeof req.body.data === 'object') {
      data = req.body.data;
    } else {
      data = req.body;
    }

    if (data.diagnostics !== undefined) {
      existingPrice.diagnostics = data.diagnostics;
    }
    if (data.TO !== undefined) {
      existingPrice.TO = data.TO;
    }
    if (data.rollers !== undefined) {
      existingPrice.rollers = data.rollers;
    }
    if (data.drum !== undefined) {
      existingPrice.drum = data.drum;
    }
    if (data.laser !== undefined) {
      existingPrice.laser = data.laser;
    }
    if (data.therm !== undefined) {
      existingPrice.therm = data.therm;
    }
    if (data.reducer !== undefined) {
      existingPrice.reducer = data.reducer;
    }
    if (data.scaner !== undefined) {
      existingPrice.scaner = data.scaner || undefined;
    }
    if (data.adf !== undefined) {
      existingPrice.adf = data.adf || undefined;
    }
    if (data.duplex !== undefined) {
      existingPrice.duplex = data.duplex;
    }
    if (data.electronics !== undefined) {
      existingPrice.electronics = data.electronics;
    }
    if (data.printerId !== undefined) {
      existingPrice.printerId = data.printerId.trim();
    }

    const savedPrice = await existingPrice.save();
    const priceObj = savedPrice.toObject() as any;

    res.status(200).json({
      success: true,
      data: {
        id: priceObj._id,
        diagnostics: priceObj.diagnostics,
        TO: priceObj.TO,
        rollers: priceObj.rollers,
        drum: priceObj.drum,
        laser: priceObj.laser,
        therm: priceObj.therm,
        reducer: priceObj.reducer,
        scaner: priceObj.scaner,
        adf: priceObj.adf,
        duplex: priceObj.duplex,
        electronics: priceObj.electronics,
        printerId: priceObj.printerId,
        createdAt: priceObj.createdAt,
        updatedAt: priceObj.updatedAt
      },
      message: 'Прайс успешно обновлен'
    });

  } catch (error: any) {
    console.error('Update price error:', error);

    if (error instanceof SyntaxError) {
      return res.status(400).json({ error: 'Невалидный JSON' });
    }

    if (error.code === 11000) {
      return res.status(409).json({ error: 'Прайс для этого принтера уже существует' });
    }

    res.status(500).json({
      error: 'Внутренняя ошибка сервера',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// Удалить прайс
export const deletePrice = async (req: Request, res: Response) => {
  try {
    const { priceId } = req.params;

    if (!priceId) {
      return res.status(400).json({ error: 'ID прайса обязателен' });
    }

    const price = await PriceModel.findById(priceId);

    if (!price) {
      return res.status(404).json({ error: 'Прайс не найден' });
    }

    await PriceModel.findByIdAndDelete(priceId);

    res.status(200).json({
      success: true,
      message: 'Прайс успешно удален'
    });

  } catch (error: any) {
    console.error('Delete price error:', error);
    res.status(500).json({
      error: 'Внутренняя ошибка сервера',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// Получить список прайсов (с пагинацией)
export const getPaginatedPrices = async (req: Request, res: Response) => {
  try {
    const page = Math.max(1, parseInt(req.query.page as string) || 1);
    const limit = Math.min(100, Math.max(1, parseInt(req.query.limit as string) || 10));
    const printerId = req.query.printerId as string || '';

    const skip = (page - 1) * limit;

    const baseQuery: any = {};

    if (printerId) {
      baseQuery.printerId = printerId;
    }

    const [total, prices] = await Promise.all([
      PriceModel.countDocuments(baseQuery),
      PriceModel.find(baseQuery)
        .skip(skip)
        .limit(limit)
        .sort({ createdAt: -1 })
        .lean(),
    ]);

    res.status(200).json({
      success: true,
      data: prices,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        totalItems: total
      }
    });

  } catch (error: any) {
    console.error('Get paginated prices error:', error);
    res.status(500).json({
      error: 'Внутренняя ошибка сервера',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

