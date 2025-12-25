import { Request, Response } from "express";
import * as uuid from "uuid";
import { s3Operation, uploadVideoSingle } from "../../utils/functions";
import { VideoModel } from "../models/video-model";

export const uploadVideo = async (req: Request & { file?: Express.Multer.File }, res: Response) => {
  try {
    const file = req.file;

    if (!file) {
      return res.status(400).json({ error: 'Файл обязателен' });
    }

    // Определяем расширение файла
    const extension = file.originalname.split('.').pop() || 'mp4';
    const fileKey = `videos/${uuid.v4()}.${extension}`;

    // Загружаем в S3
    const uploadResult = await s3Operation({
      operation: 'upload',
      folder: 'videos',
      fileKey,
      fileBuffer: file.buffer,
      contentType: file.mimetype
    });

    if (!uploadResult.success) {
      return res.status(500).json({ error: uploadResult.error || 'Ошибка загрузки файла' });
    }

    // Получаем данные из запроса для создания записи в VideoModel
    const { cartridgeId, printerId, laptopId, exampleId } = req.body;

    const videoData: any = {
      src: uploadResult.url!
    };

    if (cartridgeId) videoData.cartridgeId = String(cartridgeId);
    if (printerId) videoData.printerId = String(printerId);
    if (laptopId) videoData.laptopId = String(laptopId);
    if (exampleId) videoData.exampleId = String(exampleId);

    if (cartridgeId || printerId || laptopId || exampleId) {
      const video = new VideoModel(videoData);
      await video.save();

      return res.status(201).json({
        success: true,
        data: {
          id: video._id,
          url: video.src,
          cartridgeId: video.cartridgeId,
          printerId: video.printerId,
          laptopId: video.laptopId,
          exampleId: video.exampleId
        },
        message: 'Видео успешно загружено'
      });
    }

    res.status(201).json({
      success: true,
      data: {
        url: uploadResult.url
      },
      message: 'Видео успешно загружено'
    });

  } catch (error: any) {
    console.error('Upload video error:', error);
    res.status(500).json({
      error: 'Внутренняя ошибка сервера',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

export const updateVideo = async (req: Request & { file?: Express.Multer.File }, res: Response) => {
  try {
    const { videoId } = req.params;
    const file = req.file;

    if (!file) {
      return res.status(400).json({ error: 'Файл обязателен' });
    }

    if (!videoId) {
      return res.status(400).json({ error: 'ID видео обязателен' });
    }

    const video = await VideoModel.findById(videoId);

    if (!video) {
      return res.status(404).json({ error: 'Видео не найдено' });
    }

    // Извлекаем старый fileKey из URL
    const prefixToRemove = "https://s3.ru1.storage.beget.cloud/3aaacc647142-printridge/";
    let oldFileKey: string | undefined;
    
    if (video.src.includes(prefixToRemove)) {
      oldFileKey = video.src.replace(prefixToRemove, "");
    }

    // Загружаем новое видео в S3
    const extension = file.originalname.split('.').pop() || 'mp4';
    const fileKey = `videos/${uuid.v4()}.${extension}`;

    const updateResult = await s3Operation({
      operation: 'update',
      folder: 'videos',
      fileKey,
      fileBuffer: file.buffer,
      contentType: file.mimetype,
      oldFileKey,
      oldFolder: 'videos'
    });

    if (!updateResult.success) {
      return res.status(500).json({ error: updateResult.error || 'Ошибка обновления файла' });
    }

    // Обновляем запись в базе
    video.src = updateResult.url!;
    if (req.body.cartridgeId !== undefined) video.cartridgeId = req.body.cartridgeId;
    if (req.body.printerId !== undefined) video.printerId = req.body.printerId;
    if (req.body.laptopId !== undefined) video.laptopId = req.body.laptopId;
    if (req.body.exampleId !== undefined) video.exampleId = req.body.exampleId;
    
    await video.save();

    res.status(200).json({
      success: true,
      data: {
        id: video._id,
        url: video.src,
        cartridgeId: video.cartridgeId,
        printerId: video.printerId,
        laptopId: video.laptopId,
        exampleId: video.exampleId
      },
      message: 'Видео успешно обновлено'
    });

  } catch (error: any) {
    console.error('Update video error:', error);
    res.status(500).json({
      error: 'Внутренняя ошибка сервера',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

export const deleteVideo = async (req: Request, res: Response) => {
  try {
    const { videoId } = req.params;

    if (!videoId) {
      return res.status(400).json({ error: 'ID видео обязателен' });
    }

    const video = await VideoModel.findById(videoId);

    if (!video) {
      return res.status(404).json({ error: 'Видео не найдено' });
    }

    // Удаляем файл из S3
    const prefixToRemove = "https://s3.ru1.storage.beget.cloud/3aaacc647142-printridge/";
    
    if (video.src.includes(prefixToRemove)) {
      const fileKey = video.src.replace(prefixToRemove, "");
      
      const deleteResult = await s3Operation({
        operation: 'delete',
        folder: 'videos',
        fileKey
      });

      if (!deleteResult.success) {
        console.warn('Failed to delete file from S3:', deleteResult.error);
      }
    }

    // Удаляем запись из базы
    await VideoModel.findByIdAndDelete(videoId);

    res.status(200).json({
      success: true,
      message: 'Видео успешно удалено'
    });

  } catch (error: any) {
    console.error('Delete video error:', error);
    res.status(500).json({
      error: 'Внутренняя ошибка сервера',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

export const getVideoByID = async (req: Request, res: Response) => {
  try {
    const { videoId } = req.params;

    const video = await VideoModel.findById(videoId);

    if (!video) {
      return res.status(404).json({ error: 'Видео не найдено' });
    }

    const videoObj = video.toObject() as any;

    res.status(200).json({
      success: true,
      data: videoObj
    });

  } catch (error: any) {
    console.error('Get video error:', error);
    res.status(500).json({
      error: 'Внутренняя ошибка сервера',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

export const getPaginatedVideos = async (req: Request, res: Response) => {
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

    const [total, videos] = await Promise.all([
      VideoModel.countDocuments(baseQuery),
      VideoModel.find(baseQuery)
        .skip(skip)
        .limit(limit)
        .sort({ createdAt: -1 })
        .lean(),
    ]);

    res.status(200).json({
      success: true,
      data: videos,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        totalItems: total
      }
    });

  } catch (error: any) {
    console.error('Get paginated videos error:', error);
    res.status(500).json({
      error: 'Внутренняя ошибка сервера',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

