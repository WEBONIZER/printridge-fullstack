import { Request, Response } from "express";
import { LaptopPriceTemplateModel } from "../models/laptop-price-template-model";

// Получить все прайс-шаблоны ноутбуков
export const getAllLaptopPriceTemplates = async (req: Request, res: Response) => {
  try {
    const templates = await LaptopPriceTemplateModel.find().sort({ priceType: 1 }).lean();
    
    res.status(200).json({
      success: true,
      data: templates,
    });
  } catch (error: any) {
    console.error('Get all laptop price templates error:', error);
    res.status(500).json({
      error: 'Внутренняя ошибка сервера',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// Получить прайс-шаблон по ID
export const getLaptopPriceTemplateById = async (req: Request, res: Response) => {
  try {
    const { templateId } = req.params;
    
    const template = await LaptopPriceTemplateModel.findById(templateId).lean();
    
    if (!template) {
      return res.status(404).json({
        error: 'Прайс-шаблон не найден',
      });
    }
    
    res.status(200).json({
      success: true,
      data: template,
    });
  } catch (error: any) {
    console.error('Get laptop price template by ID error:', error);
    res.status(500).json({
      error: 'Внутренняя ошибка сервера',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// Обновить прайс-шаблон
export const updateLaptopPriceTemplate = async (req: Request, res: Response) => {
  try {
    const { templateId } = req.params;
    const data = req.body;
    
    const template = await LaptopPriceTemplateModel.findById(templateId);
    
    if (!template) {
      return res.status(404).json({
        error: 'Прайс-шаблон не найден',
      });
    }
    
    // Обновляем поля (priceType не изменяем)
    if (data.diagnostics !== undefined) template.diagnostics = data.diagnostics;
    if (data.TO !== undefined) template.TO = data.TO;
    if (data.thermalPaste !== undefined) template.thermalPaste = data.thermalPaste;
    if (data.installOS !== undefined) template.installOS = data.installOS;
    if (data.installPO !== undefined) template.installPO = data.installPO;
    if (data.antivirus !== undefined) template.antivirus = data.antivirus;
    if (data.matrixReplacement !== undefined) template.matrixReplacement = data.matrixReplacement;
    if (data.batteryReplacement !== undefined) template.batteryReplacement = data.batteryReplacement;
    if (data.ramReplacement !== undefined) template.ramReplacement = data.ramReplacement;
    if (data.electronics !== undefined) template.electronics = data.electronics;
    
    await template.save();
    
    res.status(200).json({
      success: true,
      data: template,
      message: 'Прайс-шаблон успешно обновлен',
    });
  } catch (error: any) {
    console.error('Update laptop price template error:', error);
    res.status(500).json({
      error: 'Внутренняя ошибка сервера',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

