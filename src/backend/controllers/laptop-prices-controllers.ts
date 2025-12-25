import { Request, Response } from "express";
import { LaptopPriceModel } from "../models/laptop-price-model";
import { ILaptopPriceSchema } from "../../utils/types";

interface LaptopPriceData {
  diagnostics: number;
  TO: number;
  thermalPaste: number;
  installOS: number;
  installPO: number;
  antivirus: number;
  matrixReplacement: number;
  batteryReplacement: number;
  ramReplacement: number;
  electronics: number;
  laptopId: string;
}

// Создать прайс для ноутбука
export const createLaptopPrice = async (req: Request, res: Response) => {
  try {
    let data: LaptopPriceData;
    if (typeof req.body.data === 'string') {
      data = JSON.parse(req.body.data);
    } else if (typeof req.body.data === 'object') {
      data = req.body.data;
    } else {
      data = req.body;
    }

    if (!data.laptopId?.trim()) {
      return res.status(400).json({ error: 'Поле laptopId обязательно' });
    }

    if (
      data.diagnostics === undefined ||
      data.TO === undefined ||
      data.thermalPaste === undefined ||
      data.installOS === undefined ||
      data.installPO === undefined ||
      data.antivirus === undefined ||
      data.matrixReplacement === undefined ||
      data.batteryReplacement === undefined ||
      data.ramReplacement === undefined ||
      data.electronics === undefined
    ) {
      return res.status(400).json({ error: 'Все обязательные поля прайса должны быть заполнены' });
    }

    // Проверяем, не существует ли уже прайс для этого ноутбука
    const existing = await LaptopPriceModel.findOne({
      laptopId: data.laptopId.trim()
    });

    if (existing) {
      return res.status(409).json({ error: 'Прайс для этого ноутбука уже существует' });
    }

    const price = new LaptopPriceModel({
      diagnostics: data.diagnostics,
      TO: data.TO,
      thermalPaste: data.thermalPaste,
      installOS: data.installOS,
      installPO: data.installPO,
      antivirus: data.antivirus,
      matrixReplacement: data.matrixReplacement,
      batteryReplacement: data.batteryReplacement,
      ramReplacement: data.ramReplacement,
      electronics: data.electronics,
      laptopId: data.laptopId.trim(),
    });

    const savedPrice = await price.save();
    const priceObj = savedPrice.toObject() as any;

    res.status(201).json({
      success: true,
      data: {
        id: priceObj._id,
        diagnostics: priceObj.diagnostics,
        TO: priceObj.TO,
        thermalPaste: priceObj.thermalPaste,
        installOS: priceObj.installOS,
        installPO: priceObj.installPO,
        antivirus: priceObj.antivirus,
        matrixReplacement: priceObj.matrixReplacement,
        batteryReplacement: priceObj.batteryReplacement,
        ramReplacement: priceObj.ramReplacement,
        electronics: priceObj.electronics,
        laptopId: priceObj.laptopId,
        createdAt: priceObj.createdAt,
        updatedAt: priceObj.updatedAt
      },
      message: 'Прайс для ноутбука успешно создан'
    });

  } catch (error: any) {
    console.error('Create laptop price error:', error);

    if (error instanceof SyntaxError) {
      return res.status(400).json({ error: 'Невалидный JSON' });
    }

    if (error.code === 11000) {
      return res.status(409).json({ error: 'Прайс для этого ноутбука уже существует' });
    }

    res.status(500).json({
      error: 'Внутренняя ошибка сервера',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// Получить прайс по ID
export const getLaptopPriceByID = async (req: Request, res: Response) => {
  try {
    const { priceId } = req.params;

    const price = await LaptopPriceModel.findById(priceId);

    if (!price) {
      return res.status(404).json({ error: 'Прайс не найден' });
    }

    const priceObj = price.toObject() as any;

    res.status(200).json({
      success: true,
      data: priceObj
    });

  } catch (error: any) {
    console.error('Get laptop price error:', error);
    res.status(500).json({
      error: 'Внутренняя ошибка сервера',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// Получить прайс по laptopId
export const getLaptopPriceByLaptopId = async (req: Request, res: Response) => {
  try {
    const { laptopId } = req.params;

    const price = await LaptopPriceModel.findOne({ laptopId });

    if (!price) {
      return res.status(404).json({ error: 'Прайс для этого ноутбука не найден' });
    }

    const priceObj = price.toObject() as any;

    res.status(200).json({
      success: true,
      data: priceObj
    });

  } catch (error: any) {
    console.error('Get laptop price by laptopId error:', error);
    res.status(500).json({
      error: 'Внутренняя ошибка сервера',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// Обновить прайс
export const updateLaptopPrice = async (req: Request, res: Response) => {
  try {
    const { priceId } = req.params;

    if (!priceId) {
      return res.status(400).json({ error: 'ID прайса обязателен' });
    }

    const existingPrice = await LaptopPriceModel.findById(priceId);

    if (!existingPrice) {
      return res.status(404).json({ error: 'Прайс не найден' });
    }

    let data: Partial<LaptopPriceData>;
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
    if (data.thermalPaste !== undefined) {
      existingPrice.thermalPaste = data.thermalPaste;
    }
    if (data.installOS !== undefined) {
      existingPrice.installOS = data.installOS;
    }
    if (data.installPO !== undefined) {
      existingPrice.installPO = data.installPO;
    }
    if (data.antivirus !== undefined) {
      existingPrice.antivirus = data.antivirus;
    }
    if (data.matrixReplacement !== undefined) {
      existingPrice.matrixReplacement = data.matrixReplacement;
    }
    if (data.batteryReplacement !== undefined) {
      existingPrice.batteryReplacement = data.batteryReplacement;
    }
    if (data.ramReplacement !== undefined) {
      existingPrice.ramReplacement = data.ramReplacement;
    }
    if (data.electronics !== undefined) {
      existingPrice.electronics = data.electronics;
    }
    if (data.laptopId !== undefined) {
      existingPrice.laptopId = data.laptopId.trim();
    }

    const savedPrice = await existingPrice.save();
    const priceObj = savedPrice.toObject() as any;

    res.status(200).json({
      success: true,
      data: {
        id: priceObj._id,
        diagnostics: priceObj.diagnostics,
        TO: priceObj.TO,
        thermalPaste: priceObj.thermalPaste,
        installOS: priceObj.installOS,
        installPO: priceObj.installPO,
        antivirus: priceObj.antivirus,
        matrixReplacement: priceObj.matrixReplacement,
        batteryReplacement: priceObj.batteryReplacement,
        ramReplacement: priceObj.ramReplacement,
        electronics: priceObj.electronics,
        laptopId: priceObj.laptopId,
        createdAt: priceObj.createdAt,
        updatedAt: priceObj.updatedAt
      },
      message: 'Прайс успешно обновлен'
    });

  } catch (error: any) {
    console.error('Update laptop price error:', error);

    if (error instanceof SyntaxError) {
      return res.status(400).json({ error: 'Невалидный JSON' });
    }

    if (error.code === 11000) {
      return res.status(409).json({ error: 'Прайс для этого ноутбука уже существует' });
    }

    res.status(500).json({
      error: 'Внутренняя ошибка сервера',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// Удалить прайс
export const deleteLaptopPrice = async (req: Request, res: Response) => {
  try {
    const { priceId } = req.params;

    if (!priceId) {
      return res.status(400).json({ error: 'ID прайса обязателен' });
    }

    const price = await LaptopPriceModel.findById(priceId);

    if (!price) {
      return res.status(404).json({ error: 'Прайс не найден' });
    }

    await LaptopPriceModel.findByIdAndDelete(priceId);

    res.status(200).json({
      success: true,
      message: 'Прайс успешно удален'
    });

  } catch (error: any) {
    console.error('Delete laptop price error:', error);
    res.status(500).json({
      error: 'Внутренняя ошибка сервера',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// Получить список прайсов (с пагинацией)
export const getPaginatedLaptopPrices = async (req: Request, res: Response) => {
  try {
    const page = Math.max(1, parseInt(req.query.page as string) || 1);
    const limit = Math.min(100, Math.max(1, parseInt(req.query.limit as string) || 10));
    const laptopId = req.query.laptopId as string || '';

    const skip = (page - 1) * limit;

    const baseQuery: any = {};

    if (laptopId) {
      baseQuery.laptopId = laptopId;
    }

    const [total, prices] = await Promise.all([
      LaptopPriceModel.countDocuments(baseQuery),
      LaptopPriceModel.find(baseQuery)
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
    console.error('Get paginated laptop prices error:', error);
    res.status(500).json({
      error: 'Внутренняя ошибка сервера',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

