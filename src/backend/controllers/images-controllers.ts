import { Request, Response } from "express";
import * as uuid from "uuid";
import { s3Operation, convertImageToWebp, uploadSingle } from "../../utils/functions";
import { PhotoModel } from "../models/printridge-photo-model";

export const uploadImage = async (req: Request & { file?: Express.Multer.File }, res: Response) => {
  try {
    const file = req.file;

    if (!file) {
      return res.status(400).json({ error: 'Файл обязателен' });
    }

    let imageBuffer = file.buffer;

    // Конвертируем HEIC в JPEG если нужно
    const isHEIC = file.mimetype === 'image/heic' || 
                   file.mimetype === 'image/heif' ||
                   file.originalname.toLowerCase().endsWith('.heic') ||
                   file.originalname.toLowerCase().endsWith('.heif');

    if (isHEIC) {
      try {
        const heicConvert = await import('heic-convert');
        const conversionResult = await heicConvert.default({
          buffer: file.buffer,
          format: 'JPEG',
          quality: 0.8
        });
        imageBuffer = conversionResult;
      } catch (conversionError) {
        console.error('HEIC conversion failed:', conversionError);
        return res.status(400).json({ error: 'Ошибка конвертации HEIC файла' });
      }
    }

    // Конвертируем в webp
    const webpBuffer = await convertImageToWebp(imageBuffer);

    // Загружаем в S3
    const fileKey = `images/${uuid.v4()}.webp`;

    const uploadResult = await s3Operation({
      operation: 'upload',
      folder: 'images',
      fileKey,
      fileBuffer: webpBuffer,
      contentType: 'image/webp'
    });

    if (!uploadResult.success) {
      return res.status(500).json({ error: uploadResult.error || 'Ошибка загрузки файла' });
    }

    // Получаем данные из запроса для создания записи в PhotoModel
    const { cartridgeId, printerId, laptopId, exampleId, alt } = req.body;

    const photoData: any = {
      src: uploadResult.url!,
      alt: alt || 'Изображение'
    };

    if (cartridgeId) photoData.cartridgeId = String(cartridgeId);
    if (printerId) photoData.printerId = String(printerId);
    if (laptopId) photoData.laptopId = String(laptopId);
    if (exampleId) photoData.exampleId = String(exampleId);

    if (cartridgeId || printerId || laptopId || exampleId) {
      const photo = new PhotoModel(photoData);
      await photo.save();

      return res.status(201).json({
        success: true,
        data: {
          id: photo._id,
          url: photo.src,
          alt: photo.alt,
          cartridgeId: photo.cartridgeId,
          printerId: photo.printerId,
          laptopId: photo.laptopId,
          exampleId: photo.exampleId
        },
        message: 'Изображение успешно загружено'
      });
    }

    res.status(201).json({
      success: true,
      data: {
        url: uploadResult.url
      },
      message: 'Изображение успешно загружено'
    });

  } catch (error: any) {
    console.error('Upload image error:', error);
    res.status(500).json({
      error: 'Внутренняя ошибка сервера',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

export const updateImage = async (req: Request & { file?: Express.Multer.File }, res: Response) => {
  try {
    const { imageId } = req.params;
    const file = req.file;

    if (!file) {
      return res.status(400).json({ error: 'Файл обязателен' });
    }

    if (!imageId) {
      return res.status(400).json({ error: 'ID изображения обязателен' });
    }

    const photo = await PhotoModel.findById(imageId);

    if (!photo) {
      return res.status(404).json({ error: 'Изображение не найдено' });
    }

    let imageBuffer = file.buffer;

    // Конвертируем HEIC в JPEG если нужно
    const isHEIC = file.mimetype === 'image/heic' || 
                   file.mimetype === 'image/heif' ||
                   file.originalname.toLowerCase().endsWith('.heic') ||
                   file.originalname.toLowerCase().endsWith('.heif');

    if (isHEIC) {
      try {
        const heicConvert = await import('heic-convert');
        const conversionResult = await heicConvert.default({
          buffer: file.buffer,
          format: 'JPEG',
          quality: 0.8
        });
        imageBuffer = conversionResult;
      } catch (conversionError) {
        console.error('HEIC conversion failed:', conversionError);
        return res.status(400).json({ error: 'Ошибка конвертации HEIC файла' });
      }
    }

    // Конвертируем в webp
    const webpBuffer = await convertImageToWebp(imageBuffer);

    // Извлекаем старый fileKey из URL
    const prefixToRemove = "https://s3.ru1.storage.beget.cloud/3aaacc647142-printridge/";
    let oldFileKey: string | undefined;
    
    if (photo.src.includes(prefixToRemove)) {
      oldFileKey = photo.src.replace(prefixToRemove, "");
    }

    // Загружаем новое изображение в S3
    const fileKey = `images/${uuid.v4()}.webp`;

    const updateResult = await s3Operation({
      operation: 'update',
      folder: 'images',
      fileKey,
      fileBuffer: webpBuffer,
      contentType: 'image/webp',
      oldFileKey,
      oldFolder: 'images'
    });

    if (!updateResult.success) {
      return res.status(500).json({ error: updateResult.error || 'Ошибка обновления файла' });
    }

    // Обновляем запись в базе
    photo.src = updateResult.url!;
    if (req.body.alt) {
      photo.alt = req.body.alt;
    }
    if (req.body.cartridgeId !== undefined) photo.cartridgeId = req.body.cartridgeId;
    if (req.body.printerId !== undefined) photo.printerId = req.body.printerId;
    if (req.body.laptopId !== undefined) photo.laptopId = req.body.laptopId;
    if (req.body.exampleId !== undefined) photo.exampleId = req.body.exampleId;
    
    await photo.save();

    res.status(200).json({
      success: true,
      data: {
        id: photo._id,
        url: photo.src,
        alt: photo.alt,
        cartridgeId: photo.cartridgeId,
        printerId: photo.printerId,
        laptopId: photo.laptopId,
        exampleId: photo.exampleId
      },
      message: 'Изображение успешно обновлено'
    });

  } catch (error: any) {
    console.error('Update image error:', error);
    res.status(500).json({
      error: 'Внутренняя ошибка сервера',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

export const deleteImage = async (req: Request, res: Response) => {
  try {
    const { imageId } = req.params;

    if (!imageId) {
      return res.status(400).json({ error: 'ID изображения обязателен' });
    }

    const photo = await PhotoModel.findById(imageId);

    if (!photo) {
      return res.status(404).json({ error: 'Изображение не найдено' });
    }

    // Удаляем файл из S3
    const prefixToRemove = "https://s3.ru1.storage.beget.cloud/3aaacc647142-printridge/";
    
    if (photo.src.includes(prefixToRemove)) {
      const fileKey = photo.src.replace(prefixToRemove, "");
      
      const deleteResult = await s3Operation({
        operation: 'delete',
        folder: 'images',
        fileKey
      });

      if (!deleteResult.success) {
        console.warn('Failed to delete file from S3:', deleteResult.error);
      }
    }

    // Удаляем запись из базы
    await PhotoModel.findByIdAndDelete(imageId);

    res.status(200).json({
      success: true,
      message: 'Изображение успешно удалено'
    });

  } catch (error: any) {
    console.error('Delete image error:', error);
    res.status(500).json({
      error: 'Внутренняя ошибка сервера',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

export const getPaginatedImages = async (req: Request, res: Response) => {
  try {
    const page = Math.max(1, parseInt(req.query.page as string) || 1);
    const limit = Math.min(100, Math.max(1, parseInt(req.query.limit as string) || 10));
    const cartridgeId = req.query.cartridgeId as string || '';
    const printerId = req.query.printerId as string || '';
    const laptopId = req.query.laptopId as string || '';
    const exampleId = req.query.exampleId as string || '';

    const skip = (page - 1) * limit;

    const baseQuery: any = {};

    if (cartridgeId) {
      baseQuery.cartridgeId = cartridgeId;
    }

    if (printerId) {
      baseQuery.printerId = printerId;
    }

    if (laptopId) {
      baseQuery.laptopId = laptopId;
    }

    if (exampleId) {
      baseQuery.exampleId = exampleId;
    }

    const [total, images] = await Promise.all([
      PhotoModel.countDocuments(baseQuery),
      PhotoModel.find(baseQuery)
        .skip(skip)
        .limit(limit)
        .sort({ createdAt: -1 })
        .lean(),
    ]);

    res.status(200).json({
      success: true,
      data: images,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        totalItems: total
      }
    });

  } catch (error: any) {
    console.error('Get paginated images error:', error);
    res.status(500).json({
      error: 'Внутренняя ошибка сервера',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

