import { Request, Response } from "express";
import { LaptopModel } from "../models/laptop-model";
import { LaptopPriceModel } from "../models/laptop-price-model";
import { ILaptopSchema } from "../../utils/types";
import { getLaptopPrice } from "../utils/price-helpers";

interface LaptopData {
  model: string;
  series?: string;
  vendor: string;
  display?: number;
  processor?: number;
  processorVendor?: string;
  processorName?: string;
  video?: string;
  ram?: number;
  ramType?: string;
}

// Создать ноутбук
export const createLaptop = async (req: Request, res: Response) => {
  try {
    let data: LaptopData;
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

    // Проверяем, не существует ли уже ноутбук с такой комбинацией vendor + model
    const existing = await LaptopModel.findOne({
      vendor: data.vendor.trim(),
      model: data.model.trim()
    });

    if (existing) {
      return res.status(409).json({ error: 'Ноутбук с такой комбинацией vendor и model уже существует' });
    }

    const laptop = new LaptopModel({
      model: data.model.trim(),
      series: data.series?.trim() || undefined,
      vendor: data.vendor.trim(),
      display: data.display || undefined,
      processor: data.processor || undefined,
      processorVendor: data.processorVendor?.trim() || undefined,
      processorName: data.processorName?.trim() || undefined,
      video: data.video?.trim() || undefined,
      ram: data.ram || undefined,
      ramType: data.ramType?.trim() || undefined,
    });

    const savedLaptop = await laptop.save();
    const laptopObj = savedLaptop.toObject() as any;
    const laptopId = savedLaptop._id.toString();

    // Создаем прайс для ноутбука, если указана диагональ
    try {
      const priceData = await getLaptopPrice(data.display);

      if (priceData) {
        // Проверяем, не существует ли уже прайс для этого ноутбука
        const existingPrice = await LaptopPriceModel.findOne({ laptopId });

        if (!existingPrice) {
          const price = new LaptopPriceModel({
            diagnostics: priceData.diagnostics,
            TO: priceData.TO,
            thermalPaste: priceData.thermalPaste,
            installOS: priceData.installOS,
            installPO: priceData.installPO,
            antivirus: priceData.antivirus,
            matrixReplacement: priceData.matrixReplacement,
            batteryReplacement: priceData.batteryReplacement,
            ramReplacement: priceData.ramReplacement,
            electronics: priceData.electronics,
            laptopId: laptopId,
          });

          await price.save();
          console.log(`✅ Создан прайс для ноутбука ${data.vendor} ${data.model}`);
        }
      }
    } catch (priceError: any) {
      console.error('Ошибка при создании прайса для ноутбука:', priceError.message);
    }

    res.status(201).json({
      success: true,
      data: {
        id: laptopObj._id,
        model: laptopObj.model,
        series: laptopObj.series,
        vendor: laptopObj.vendor,
        display: laptopObj.display,
        processor: laptopObj.processor,
        processorVendor: laptopObj.processorVendor,
        processorName: laptopObj.processorName,
        video: laptopObj.video,
        ram: laptopObj.ram,
        ramType: laptopObj.ramType,
        createdAt: laptopObj.createdAt,
        updatedAt: laptopObj.updatedAt
      },
      message: 'Ноутбук успешно создан'
    });

  } catch (error: any) {
    console.error('Create laptop error:', error);

    if (error instanceof SyntaxError) {
      return res.status(400).json({ error: 'Невалидный JSON' });
    }

    if (error.code === 11000) {
      return res.status(409).json({ error: 'Ноутбук с такой комбинацией vendor и model уже существует' });
    }

    res.status(500).json({
      error: 'Внутренняя ошибка сервера',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// Получить ноутбук по ID
export const getLaptopByID = async (req: Request, res: Response) => {
  try {
    const { laptopId } = req.params;

    const laptop = await LaptopModel.findById(laptopId);

    if (!laptop) {
      return res.status(404).json({ error: 'Ноутбук не найден' });
    }

    const laptopObj = laptop.toObject() as any;

    res.status(200).json({
      success: true,
      data: laptopObj
    });

  } catch (error: any) {
    console.error('Get laptop error:', error);
    res.status(500).json({
      error: 'Внутренняя ошибка сервера',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// Обновить ноутбук
export const updateLaptop = async (req: Request, res: Response) => {
  try {
    const { laptopId } = req.params;

    if (!laptopId) {
      return res.status(400).json({ error: 'ID ноутбука обязателен' });
    }

    const existingLaptop = await LaptopModel.findById(laptopId);

    if (!existingLaptop) {
      return res.status(404).json({ error: 'Ноутбук не найден' });
    }

    let data: Partial<LaptopData>;
    if (typeof req.body.data === 'string') {
      data = JSON.parse(req.body.data);
    } else if (typeof req.body.data === 'object') {
      data = req.body.data;
    } else {
      data = req.body;
    }

    if (data.model !== undefined) {
      existingLaptop.model = data.model.trim();
    }
    if (data.series !== undefined) {
      existingLaptop.series = data.series?.trim() || undefined;
    }
    if (data.vendor !== undefined) {
      existingLaptop.vendor = data.vendor.trim();
    }
    if (data.display !== undefined) {
      existingLaptop.display = data.display || undefined;
    }
    if (data.processor !== undefined) {
      existingLaptop.processor = data.processor || undefined;
    }
    if (data.processorVendor !== undefined) {
      existingLaptop.processorVendor = data.processorVendor?.trim() || undefined;
    }
    if (data.processorName !== undefined) {
      existingLaptop.processorName = data.processorName?.trim() || undefined;
    }
    if (data.video !== undefined) {
      existingLaptop.video = data.video?.trim() || undefined;
    }
    if (data.ram !== undefined) {
      existingLaptop.ram = data.ram || undefined;
    }
    if (data.ramType !== undefined) {
      existingLaptop.ramType = data.ramType?.trim() || undefined;
    }

    const savedLaptop = await existingLaptop.save();
    const laptopObj = savedLaptop.toObject() as any;

    res.status(200).json({
      success: true,
      data: {
        id: laptopObj._id,
        model: laptopObj.model,
        series: laptopObj.series,
        vendor: laptopObj.vendor,
        display: laptopObj.display,
        processor: laptopObj.processor,
        processorVendor: laptopObj.processorVendor,
        processorName: laptopObj.processorName,
        video: laptopObj.video,
        ram: laptopObj.ram,
        ramType: laptopObj.ramType,
        createdAt: laptopObj.createdAt,
        updatedAt: laptopObj.updatedAt
      },
      message: 'Ноутбук успешно обновлен'
    });

  } catch (error: any) {
    console.error('Update laptop error:', error);

    if (error instanceof SyntaxError) {
      return res.status(400).json({ error: 'Невалидный JSON' });
    }

    if (error.code === 11000) {
      return res.status(409).json({ error: 'Ноутбук с такой комбинацией vendor и model уже существует' });
    }

    res.status(500).json({
      error: 'Внутренняя ошибка сервера',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// Удалить ноутбук
export const deleteLaptop = async (req: Request, res: Response) => {
  try {
    const { laptopId } = req.params;

    if (!laptopId) {
      return res.status(400).json({ error: 'ID ноутбука обязателен' });
    }

    const laptop = await LaptopModel.findById(laptopId);

    if (!laptop) {
      return res.status(404).json({ error: 'Ноутбук не найден' });
    }

    await LaptopModel.findByIdAndDelete(laptopId);

    res.status(200).json({
      success: true,
      message: 'Ноутбук успешно удален'
    });

  } catch (error: any) {
    console.error('Delete laptop error:', error);
    res.status(500).json({
      error: 'Внутренняя ошибка сервера',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// Получить список ноутбуков (с пагинацией)
export const getPaginatedLaptops = async (req: Request, res: Response) => {
  try {
    const page = Math.max(1, parseInt(req.query.page as string) || 1);
    const limit = Math.min(100, Math.max(1, parseInt(req.query.limit as string) || 10));
    const search = (req.query.search as string) || '';
    const vendor = (req.query.vendor as string) || '';

    const skip = (page - 1) * limit;

    const baseQuery: any = {};

    if (vendor) {
      baseQuery.vendor = { $regex: vendor, $options: 'i' };
    }

    if (search) {
      baseQuery.$or = [
        { model: { $regex: search, $options: 'i' } },
        { series: { $regex: search, $options: 'i' } },
        { vendor: { $regex: search, $options: 'i' } },
        { processorName: { $regex: search, $options: 'i' } },
      ];
    }

    const [total, laptops] = await Promise.all([
      LaptopModel.countDocuments(baseQuery),
      LaptopModel.find(baseQuery)
        .skip(skip)
        .limit(limit)
        .sort({ createdAt: -1 })
        .lean(),
    ]);

    res.status(200).json({
      success: true,
      data: laptops,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        totalItems: total
      }
    });

  } catch (error: any) {
    console.error('Get paginated laptops error:', error);
    res.status(500).json({
      error: 'Внутренняя ошибка сервера',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

