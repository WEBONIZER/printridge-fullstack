import { Request, NextFunction, Response } from "express";
import mongoose, { Schema } from "mongoose";
import { CartridgeModel } from "../models/cartridge-model";
import { CompatibilityModel } from "../models/compatibility-model";
import { CartridgeData } from "../../utils/types";

export const createCartridge = async (req: Request, res: Response) => {
  try {
    let data: CartridgeData;
    if (typeof req.body.data === 'string') {
      data = JSON.parse(req.body.data);
    } else if (typeof req.body.data === 'object') {
      data = req.body.data;
    } else {
      data = req.body;
    }

    if (!data.modelCart?.trim() || !data.vendor?.trim() || !data.devices?.trim()) {
      return res.status(400).json({ error: 'Поля modelCart, vendor, devices обязательны' });
    }

    if (!data.refill_price || !data.recovery_price || data.chip === undefined) {
      return res.status(400).json({ error: 'Поля refill_price, recovery_price, chip обязательны' });
    }

    const existing = await CartridgeModel.findOne({
      modelCart: data.modelCart.trim(),
      vendor: data.vendor.trim()
    });

    if (existing) {
      return res.status(409).json({ error: 'Картридж с такой моделью и производителем уже существует' });
    }

    const cartridge = new CartridgeModel({
      modelCart: data.modelCart.trim(),
      vendor: data.vendor.trim(),
      devices: data.devices.trim(),
      refill_price: String(data.refill_price),
      recovery_price: String(data.recovery_price),
      chip: data.chip === true || data.chip === 'true',
      resource: data.resource || undefined,
      photo: new mongoose.Types.ObjectId(),
      public: data.public !== undefined ? (data.public === true || String(data.public).toLowerCase() === 'true') : true
    });

    const savedCartridge = await cartridge.save();
    const cartridgeObj = savedCartridge.toObject() as any;

    res.status(201).json({
      success: true,
      data: {
        id: cartridgeObj._id,
        modelCart: cartridgeObj.modelCart,
        vendor: cartridgeObj.vendor,
        devices: cartridgeObj.devices,
        refill_price: cartridgeObj.refill_price,
        recovery_price: cartridgeObj.recovery_price,
        chip: cartridgeObj.chip,
        resource: cartridgeObj.resource,
        photo: cartridgeObj.photo,
        createdAt: cartridgeObj.createdAt,
        updatedAt: cartridgeObj.updatedAt
      }
    });

  } catch (error: any) {
    console.error('Create cartridge error:', error);

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
      return res.status(409).json({ error: 'Картридж с такой моделью и производителем уже существует' });
    }

    res.status(500).json({
      error: 'Внутренняя ошибка сервера',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

export const getCartridgeByID = async (req: any, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { cartridgeId } = req.params;

    if (!cartridgeId) {
      if (!res.headersSent) {
        res.status(400).send({ status: "error", message: "ID картриджа обязателен" });
      }
      return;
    }

    const cartridge = await CartridgeModel.findById(cartridgeId).populate("photo").lean();

    if (!cartridge) {
      if (!res.headersSent) {
        res.status(404).send({ status: "error", message: "Картридж не найден" });
      }
      return;
    }

    if (res.headersSent) return;

    res.status(200).send({
      status: "success",
      data: cartridge,
    });

  } catch (error: any) {
    console.error("❌ Error fetching cartridge by ID:", error);
    if (!res.headersSent) {
      res.status(500).send({
        status: "error",
        message: "Ошибка на сервере при получении картриджа"
      });
    }
  }
};

export const updateCartridge = async (req: any, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { cartridgeId } = req.params;

    if (!cartridgeId) {
      if (!res.headersSent) {
        res.status(400).send({ status: "error", message: "ID картриджа обязателен" });
      }
      return;
    }

    let data: Partial<CartridgeData>;
    if (typeof req.body.data === 'string') {
      data = JSON.parse(req.body.data);
    } else if (typeof req.body.data === 'object') {
      data = req.body.data;
    } else {
      data = req.body;
    }

    const cartridge = await CartridgeModel.findById(cartridgeId);

    if (!cartridge) {
      if (!res.headersSent) {
        res.status(404).send({ status: "error", message: "Картридж не найден" });
      }
      return;
    }

    if (data.modelCart !== undefined) cartridge.modelCart = data.modelCart.trim();
    if (data.vendor !== undefined) cartridge.vendor = data.vendor.trim();
    if (data.devices !== undefined) cartridge.devices = data.devices.trim();
    if (data.refill_price !== undefined) cartridge.refill_price = String(data.refill_price);
    if (data.recovery_price !== undefined) cartridge.recovery_price = String(data.recovery_price);
    if (data.chip !== undefined) cartridge.chip = data.chip === true || data.chip === 'true';
    if (data.resource !== undefined) cartridge.resource = data.resource;
    if (data.public !== undefined) {
      cartridge.public = data.public === true || String(data.public).toLowerCase() === 'true';
    }

    await cartridge.save();

    const updatedCartridge = await CartridgeModel.findById(cartridgeId).populate("photo").lean();

    if (res.headersSent) return;

    res.status(200).send({
      status: "success",
      data: updatedCartridge,
    });

  } catch (error: any) {
    console.error("❌ Error updating cartridge:", error);
    if (!res.headersSent) {
      res.status(500).send({
        status: "error",
        message: "Ошибка на сервере при обновлении картриджа"
      });
    }
  }
};

export const deleteCartridgeByID = async (req: any, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { cartridgeId } = req.params;

    if (!cartridgeId) {
      if (!res.headersSent) {
        res.status(400).send({ status: "error", message: "ID картриджа обязателен" });
      }
      return;
    }

    const cartridge = await CartridgeModel.findById(cartridgeId);

    if (!cartridge) {
      if (!res.headersSent) {
        res.status(404).send({ status: "error", message: "Картридж не найден" });
      }
      return;
    }

    await CartridgeModel.findByIdAndDelete(cartridgeId);

    if (res.headersSent) return;

    res.status(200).send({
      status: "success",
      message: "Картридж успешно удален",
    });

  } catch (error: any) {
    console.error("❌ Error deleting cartridge:", error);
    if (!res.headersSent) {
      res.status(500).send({
        status: "error",
        message: "Ошибка на сервере при удалении картриджа"
      });
    }
  }
};

export const getPaginatedCartridges = async (
  req: any,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const page = Math.max(1, parseInt(req.query.page as string) || 1);
    const limit = Math.min(10000, Math.max(1, parseInt(req.query.limit as string) || 10));
    const modelCart = req.query.modelCart as string || '';
    const vendor = req.query.vendor as string || '';
    const hasImage = req.query.hasImage as string || '';
    const hasLinkedDevices = req.query.hasLinkedDevices as string || '';
    const publicFilter = req.query.public as string || '';

    const skip = (page - 1) * limit;

    // Базовый запрос
    const baseQuery: any = {};

    // Экранирование regex для поиска
    const escapeRegex = (text: string) => text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

    if (modelCart) {
      baseQuery.modelCart = { $regex: escapeRegex(modelCart), $options: 'i' };
    }

    if (vendor) {
      baseQuery.vendor = { $regex: escapeRegex(vendor), $options: 'i' };
    }

    if (publicFilter === 'true') {
      baseQuery.public = { $ne: false };
    } else if (publicFilter === 'false') {
      baseQuery.public = false;
    }

    // Получаем ID картриджей с/без связей для фильтрации
    let filteredCartridgeIds: string[] | null = null;
    if (hasLinkedDevices === 'yes' || hasLinkedDevices === 'no') {
      const compatibilities = await CompatibilityModel.find({}).lean();
      const cartridgeIdsWithLinks = new Set(compatibilities.map(c => c.cartridgeId.toString()));
      
      if (hasLinkedDevices === 'yes') {
        filteredCartridgeIds = Array.from(cartridgeIdsWithLinks);
      } else {
        // Для 'no' нужно получить все ID картриджей и исключить те, что есть в связях
        const allCartridges = await CartridgeModel.find({}, { _id: 1 }).lean();
        filteredCartridgeIds = allCartridges
          .map(c => c._id.toString())
          .filter(id => !cartridgeIdsWithLinks.has(id));
      }
    }

    if (filteredCartridgeIds !== null) {
      baseQuery._id = { $in: filteredCartridgeIds.map(id => new mongoose.Types.ObjectId(id)) };
    }

    // Параллельные запросы для производительности
    const [total, cartridges] = await Promise.all([
      CartridgeModel.countDocuments(baseQuery),
      CartridgeModel.find(baseQuery)
        .populate("photo")
        .skip(skip)
        .limit(limit)
        .sort({ createdAt: -1 })
        .lean(),
    ]);

    // Фильтрация по наличию картинки на клиенте после populate
    let filteredCartridges = cartridges;
    if (hasImage === 'yes') {
      filteredCartridges = cartridges.filter(cart => {
        if (typeof cart.photo === 'object' && cart.photo !== null) {
          return !!(cart.photo.src || cart.photo._id);
        }
        return !!cart.photo;
      });
    } else if (hasImage === 'no') {
      filteredCartridges = cartridges.filter(cart => {
        if (typeof cart.photo === 'object' && cart.photo !== null) {
          return !(cart.photo.src || cart.photo._id);
        }
        return !cart.photo;
      });
    }

    if (res.headersSent) return;

    res.status(200).send({
      status: "success",
      data: filteredCartridges,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil((hasImage ? filteredCartridges.length : total) / limit),
        totalItems: hasImage ? filteredCartridges.length : total
      }
    });

  } catch (error: any) {
    console.error("❌ Error fetching paginated menu items:", error);
    if (!res.headersSent) {
      res.status(500).send({
        status: "error",
        message: "Ошибка на сервере при получении меню"
      });
    }
  }
};

// Получить все уникальные производители картриджей
export const getCartridgeVendors = async (
  req: any,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const vendors = await CartridgeModel.distinct('vendor');
    const sortedVendors = vendors.filter(Boolean).sort();

    if (res.headersSent) return;

    res.status(200).json({
      success: true,
      data: sortedVendors,
    });
  } catch (error: any) {
    console.error("❌ Error fetching cartridge vendors:", error);
    if (!res.headersSent) {
      res.status(500).json({
        error: 'Внутренняя ошибка сервера',
        details: process.env.NODE_ENV === 'development' ? error.message : undefined
      });
    }
  }
};

export const toggleCartridgePublicStatus = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { cartridgeId } = req.params;
    const { public: publicStatus } = req.body;

    if (!cartridgeId) {
      if (!res.headersSent) {
        res.status(400).send({ status: "error", message: "ID картриджа обязателен" });
      }
      return;
    }

    if (typeof publicStatus !== 'boolean') {
      if (!res.headersSent) {
        res.status(400).send({ status: "error", message: "Поле public должно быть boolean" });
      }
      return;
    }

    const cartridge = await CartridgeModel.findById(cartridgeId);

    if (!cartridge) {
      if (!res.headersSent) {
        res.status(404).send({ status: "error", message: "Картридж не найден" });
      }
      return;
    }

    cartridge.public = publicStatus;
    await cartridge.save();

    if (res.headersSent) return;

    res.status(200).send({
      status: "success",
      data: cartridge,
      message: `Статус public успешно изменен на ${publicStatus}`,
    });

  } catch (error: any) {
    console.error("❌ Error toggling cartridge public status:", error);
    if (!res.headersSent) {
      res.status(500).send({
        status: "error",
        message: "Ошибка на сервере при изменении статуса public"
      });
    }
  }
};
