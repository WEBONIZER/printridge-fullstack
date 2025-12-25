import { Request, Response } from "express";
import mongoose from "mongoose";
import { ExampleModel } from "../models/example-model";
import { IExampleSchema } from "../../utils/types";

interface ExampleData {
  title: string;
  text: string;
  cartridgeId?: string;
  printerId?: string;
  laptopId?: string;
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

    const example = new ExampleModel({
      title: data.title.trim(),
      text: data.text.trim(),
      cartridgeId: data.cartridgeId || undefined,
      printerId: data.printerId || undefined,
      laptopId: data.laptopId || undefined,
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
      existingExample.title = data.title.trim();
    }

    if (data.text !== undefined) {
      existingExample.text = data.text.trim();
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

