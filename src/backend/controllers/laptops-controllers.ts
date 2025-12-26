import { Request, Response } from "express";
import { LaptopModel } from "../models/laptop-model";
import { PhotoModel } from "../models/printridge-photo-model";
import { LaptopPriceTemplateModel } from "../models/laptop-price-template-model";
import { ILaptopSchema } from "../../utils/types";
import { determineLaptopPriceType, getLaptopPriceId } from "../utils/device-price-helpers";

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
  public?: boolean;
  price?: string;
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

    // Определяем тип прайса и получаем его ID
    let priceId: string | null = null;
    try {
      const priceType = determineLaptopPriceType(data.display);
      
      if (priceType) {
        priceId = await getLaptopPriceId(priceType);
        if (priceId) {
          console.log(`✓ Найден прайс для ноутбука ${data.vendor} ${data.model}: ${priceType}`);
        }
      }
    } catch (priceError: any) {
      console.error('Ошибка при определении прайса для ноутбука:', priceError.message);
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
      public: data.public !== undefined ? (data.public === true || String(data.public).toLowerCase() === 'true') : true,
      price: priceId || undefined,
    });

    const savedLaptop = await laptop.save();
    const laptopObj = savedLaptop.toObject() as any;

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

    // Получаем фото для ноутбука
    const photo = await PhotoModel.findOne({ laptopId: laptopId }).lean();
    
    // Получаем прайс, если он указан
    let priceTemplate = null;
    if (laptop.price) {
      try {
        priceTemplate = await LaptopPriceTemplateModel.findById(laptop.price).lean();
      } catch (error) {
        console.error('Error fetching price template:', error);
      }
    }
    
    const laptopObj = laptop.toObject() as any;
    laptopObj.photo = photo || null;
    laptopObj.priceTemplate = priceTemplate;

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

    if (data.public !== undefined) {
      existingLaptop.public = data.public === true || String(data.public).toLowerCase() === 'true';
    }

    // Если price передан явно, используем его
    if (data.price !== undefined) {
      if (data.price === null || data.price === '') {
        existingLaptop.price = undefined;
      } else {
        existingLaptop.price = data.price;
      }
    } else if (data.display !== undefined) {
      // Обновляем прайс автоматически, если изменилась диагональ
      try {
        const priceType = determineLaptopPriceType(existingLaptop.display);
        
        if (priceType) {
          const priceId = await getLaptopPriceId(priceType);
          if (priceId) {
            existingLaptop.price = priceId;
          }
        } else {
          existingLaptop.price = undefined;
        }
      } catch (priceError: any) {
        console.error('Ошибка при обновлении прайса для ноутбука:', priceError.message);
      }
    }

    const savedLaptop = await existingLaptop.save();
    const laptopObj = savedLaptop.toObject() as any;
    
    // Получаем фото для ноутбука
    const photo = await PhotoModel.findOne({ laptopId: laptopId }).lean();
    laptopObj.photo = photo || null;
    
    // Получаем прайс, если он указан
    let priceTemplate = null;
    if (laptopObj.price) {
      try {
        priceTemplate = await LaptopPriceTemplateModel.findById(laptopObj.price).lean();
      } catch (error) {
        console.error('Error fetching price template:', error);
      }
    }
    laptopObj.priceTemplate = priceTemplate;

    res.status(200).json({
      success: true,
      data: laptopObj,
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
    const model = (req.query.model as string) || '';
    const hasImage = req.query.hasImage as string || '';
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

    if (search && !model) {
      const escapedSearch = escapeRegex(search);
      baseQuery.$or = [
        { model: { $regex: escapedSearch, $options: 'i' } },
        { series: { $regex: escapedSearch, $options: 'i' } },
        { vendor: { $regex: escapedSearch, $options: 'i' } },
        { processorName: { $regex: escapedSearch, $options: 'i' } },
      ];
    }

    if (publicFilter === 'true') {
      baseQuery.public = { $ne: false };
    } else if (publicFilter === 'false') {
      baseQuery.public = false;
    }

    const [total, laptopsData] = await Promise.all([
      LaptopModel.countDocuments(baseQuery),
      LaptopModel.find(baseQuery)
        .skip(skip)
        .limit(limit)
        .sort({ createdAt: -1 })
        .lean(),
    ]);

    // Получаем фото для всех ноутбуков
    const laptopIds = laptopsData.map(l => l._id.toString());
    const photos = await PhotoModel.find({ laptopId: { $in: laptopIds } }).lean();
    const photoMap = new Map(photos.map(p => [p.laptopId, p]));

    // Получаем прайсы для всех ноутбуков
    const priceIds = laptopsData
      .map(l => l.price)
      .filter(priceId => priceId) as string[];
    const priceTemplates = await LaptopPriceTemplateModel.find({ _id: { $in: priceIds } }).lean();
    const priceMap = new Map(priceTemplates.map(p => [p._id.toString(), p]));

    // Добавляем фото и прайсы к каждому ноутбуку
    let laptops = laptopsData.map(laptop => ({
      ...laptop,
      photo: photoMap.get(laptop._id.toString()) || null,
      priceTemplate: laptop.price ? priceMap.get(laptop.price) || null : null
    }));

    // Фильтрация по наличию картинки
    if (hasImage === 'yes') {
      laptops = laptops.filter(laptop => {
        if (typeof laptop.photo === 'object' && laptop.photo !== null) {
          return !!(laptop.photo.src || laptop.photo._id);
        }
        return !!laptop.photo;
      });
    } else if (hasImage === 'no') {
      laptops = laptops.filter(laptop => {
        if (typeof laptop.photo === 'object' && laptop.photo !== null) {
          return !(laptop.photo.src || laptop.photo._id);
        }
        return !laptop.photo;
      });
    }

    res.status(200).json({
      success: true,
      data: laptops,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil((hasImage ? laptops.length : total) / limit),
        totalItems: hasImage ? laptops.length : total
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

// Поиск моделей ноутбуков по частичному совпадению
export const searchLaptopModels = async (req: Request, res: Response) => {
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

    const allModels = await LaptopModel.distinct('model', {
      model: { $regex: escapedQuery, $options: 'i' }
    });

    const sortedModels = allModels.filter(Boolean).sort().slice(0, limit);

    res.status(200).json({
      success: true,
      data: sortedModels,
    });
  } catch (error: any) {
    console.error('Search laptop models error:', error);
    res.status(500).json({
      error: 'Внутренняя ошибка сервера',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

export const toggleLaptopPublicStatus = async (req: Request, res: Response) => {
  try {
    const { laptopId } = req.params;
    const { public: publicStatus } = req.body;

    if (!laptopId) {
      return res.status(400).json({ error: 'ID ноутбука обязателен' });
    }

    if (typeof publicStatus !== 'boolean') {
      return res.status(400).json({ error: 'Поле public должно быть boolean' });
    }

    const laptop = await LaptopModel.findById(laptopId);

    if (!laptop) {
      return res.status(404).json({ error: 'Ноутбук не найден' });
    }

    laptop.public = publicStatus;
    await laptop.save();

    res.status(200).json({
      success: true,
      data: laptop,
      message: `Статус public успешно изменен на ${publicStatus}`,
    });

  } catch (error: any) {
    console.error('Toggle laptop public status error:', error);
    res.status(500).json({
      error: 'Внутренняя ошибка сервера',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

