import { Request, Response } from "express";
import { PrinterPriceTemplateModel } from "../models/printer-price-template-model";

// Получить все прайс-шаблоны принтеров
export const getAllPrinterPriceTemplates = async (req: Request, res: Response) => {
  try {
    const templates = await PrinterPriceTemplateModel.find().sort({ priceType: 1 }).lean();
    
    res.status(200).json({
      success: true,
      data: templates,
    });
  } catch (error: any) {
    console.error('Get all printer price templates error:', error);
    res.status(500).json({
      error: 'Внутренняя ошибка сервера',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// Получить прайс-шаблон по ID
export const getPrinterPriceTemplateById = async (req: Request, res: Response) => {
  try {
    const { templateId } = req.params;
    
    const template = await PrinterPriceTemplateModel.findById(templateId).lean();
    
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
    console.error('Get printer price template by ID error:', error);
    res.status(500).json({
      error: 'Внутренняя ошибка сервера',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// Обновить прайс-шаблон
export const updatePrinterPriceTemplate = async (req: Request, res: Response) => {
  try {
    const { templateId } = req.params;
    const data = req.body;
    
    const template = await PrinterPriceTemplateModel.findById(templateId);
    
    if (!template) {
      return res.status(404).json({
        error: 'Прайс-шаблон не найден',
      });
    }
    
    // Обновляем поля (priceType не изменяем)
    if (data.diagnostics !== undefined) template.diagnostics = data.diagnostics;
    if (data.TO !== undefined) template.TO = data.TO;
    if (data.rollers !== undefined) template.rollers = data.rollers;
    if (data.drum !== undefined) template.drum = data.drum;
    if (data.laser !== undefined) template.laser = data.laser;
    if (data.therm !== undefined) template.therm = data.therm;
    if (data.reducer !== undefined) template.reducer = data.reducer;
    if (data.scaner !== undefined) template.scaner = data.scaner;
    if (data.adf !== undefined) template.adf = data.adf;
    if (data.duplex !== undefined) template.duplex = data.duplex;
    if (data.electronics !== undefined) template.electronics = data.electronics;
    
    await template.save();
    
    res.status(200).json({
      success: true,
      data: template,
      message: 'Прайс-шаблон успешно обновлен',
    });
  } catch (error: any) {
    console.error('Update printer price template error:', error);
    res.status(500).json({
      error: 'Внутренняя ошибка сервера',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

