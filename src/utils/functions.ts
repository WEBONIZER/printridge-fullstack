import multer from "multer";
import sharp from 'sharp';
import { Response, NextFunction } from "express";
import { config } from "dotenv";
import { DeleteObjectCommand, PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import * as lib_storage from "@aws-sdk/lib-storage";

const {
    S3_ENDPOINT,
    S3_ACCESS_KEY_ID,
    S3_SECRET_ACCESS_KEY,
} = config({
    path: ".env",
}).parsed!;

if (!S3_ACCESS_KEY_ID || !S3_SECRET_ACCESS_KEY || !S3_ENDPOINT) {
    throw new Error(
        "Отсутствует значение одной или нескольких необходимых переменных окружения для конфигурации S3Client",
    );
}

const multerConfig = {
    storage: multer.memoryStorage(),
    fileFilter: (req: any, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
        // Разрешаем HEIC файлы
        const allowedMimes = [
            'image/jpeg',
            'image/png',
            'image/gif',
            'image/webp',
            'image/heic',
            'image/heif',
            'image/jpg'
        ];

        if (allowedMimes.includes(file.mimetype.toLowerCase())) {
            cb(null, true);
        } else {
            cb(new Error('Invalid file type. Only images are allowed.'));
        }
    },
    limits: {
        fileSize: 30 * 1024 * 1024, // 30MB limit
    },
};

const multerVideoConfig = {
    storage: multer.memoryStorage(),
    fileFilter: (req: any, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
        const allowedMimes = [
            'video/mp4',
            'video/mpeg',
            'video/quicktime',
            'video/x-msvideo',
            'video/webm',
            'video/x-ms-wmv'
        ];

        if (allowedMimes.includes(file.mimetype.toLowerCase())) {
            cb(null, true);
        } else {
            cb(new Error('Invalid file type. Only video files are allowed.'));
        }
    },
    limits: {
        fileSize: 500 * 1024 * 1024, // 500MB limit
    },
};

export const upload = multer({
    ...multerConfig,
    // Отключаем строгую проверку полей - принимаем любые поля
    preservePath: false,
});

export const uploadVideo = multer({
    ...multerVideoConfig,
    preservePath: false,
});

// Wrapper для обработки ошибок multer (видео)
export const uploadVideoSingle = (fieldName: string = 'file') => {
    return (req: any, res: Response, next: NextFunction) => {
        const contentType = req.headers['content-type'] || '';
        if (!contentType.includes('multipart/form-data')) {
            req.file = undefined;
            return next();
        }
        
        const anyUpload = uploadVideo.any();
        
        anyUpload(req, res, (err: any) => {
            if (err) {
                if (err instanceof multer.MulterError) {
                    if (err.code === 'LIMIT_FILE_SIZE') {
                        return res.status(400).json({
                            status: 'fail',
                            message: 'Файл слишком большой. Максимальный размер: 500MB'
                        });
                    }
                }
                
                const errorMessage = (err.message || String(err) || '').toLowerCase();
                if (errorMessage.includes('invalid file type')) {
                    return res.status(400).json({
                        status: 'fail',
                        message: err.message
                    });
                }
                
                return res.status(400).json({
                    status: 'fail',
                    message: err.message || 'Ошибка загрузки файла'
                });
            }
            
            if (req.files && Array.isArray(req.files)) {
                req.file = req.files.find((f: any) => f.fieldname === fieldName);
            } else {
                req.file = undefined;
            }
            
            next();
        });
    };
};

// Wrapper для обработки ошибок multer (изображения)
export const uploadSingle = (fieldName: string = 'file') => {
    return (req: any, res: Response, next: NextFunction) => {
        const contentType = req.headers['content-type'] || '';
        if (!contentType.includes('multipart/form-data')) {
            req.file = undefined;
            return next();
        }
        
        // Используем any() чтобы принять все поля и файлы
        const anyUpload = upload.any();
        
        anyUpload(req, res, (err: any) => {
            if (err) {
                if (err instanceof multer.MulterError) {
                    if (err.code === 'LIMIT_FILE_SIZE') {
                        return res.status(400).json({
                            status: 'fail',
                            message: 'Файл слишком большой. Максимальный размер: 30MB'
                        });
                    }
                }
                
                const errorMessage = (err.message || String(err) || '').toLowerCase();
                if (errorMessage.includes('invalid file type')) {
                    return res.status(400).json({
                        status: 'fail',
                        message: err.message
                    });
                }
                
                return res.status(400).json({
                    status: 'fail',
                    message: err.message || 'Ошибка загрузки файла'
                });
            }
            
            // Извлекаем файл из req.files по имени поля
            if (req.files && Array.isArray(req.files)) {
                req.file = req.files.find((f: any) => f.fieldname === fieldName);
            } else {
                req.file = undefined;
            }
            
            next();
        });
    };
};

// Функция для конвертации изображения в webp
export const convertImageToWebp = async (imageBuffer: Buffer): Promise<Buffer> => {
    try {
        const metadata = await sharp(imageBuffer).metadata();
        const MAX_WIDTH = 1920;
        const MAX_HEIGHT = 1080;

        if (metadata.width && metadata.height && (metadata.width > MAX_WIDTH || metadata.height > MAX_HEIGHT)) {
            return await sharp(imageBuffer)
                .resize(MAX_WIDTH, MAX_HEIGHT, {
                    withoutEnlargement: true,
                    fit: 'inside',
                    kernel: sharp.kernel.lanczos3
                })
                .webp({
                    quality: 80,
                    lossless: false,
                    effort: 6
                })
                .toBuffer();
        } else {
            return await sharp(imageBuffer)
                .webp({
                    quality: 85,
                    lossless: false,
                    effort: 6
                })
                .toBuffer();
        }
    } catch (error) {
        console.error('Error converting image to webp:', error);
        throw error;
    }
};

// Middleware для обработки изображений
export const processImageMiddleware = async (req: any, res: Response, next: NextFunction) => {
    if (!req.file) {
        return next();
    }

    try {
        // Проверяем, что это изображение (включая HEIC)
        const isHEIC = req.file.mimetype === 'image/heic' ||
            req.file.mimetype === 'image/heif' ||
            req.file.originalname.toLowerCase().endsWith('.heic') ||
            req.file.originalname.toLowerCase().endsWith('.heif');

        const isImage = req.file.mimetype.startsWith('image/') || isHEIC;

        if (!isImage) {
            return next();
        }

        let imageBuffer = req.file.buffer;

        // Конвертируем HEIC в JPEG для дальнейшей обработки
        if (isHEIC) {
            try {
                // Динамический импорт для ES Modules
                const heicConvert = await import('heic-convert');

                const conversionResult = await heicConvert.default({
                    buffer: req.file.buffer,
                    format: 'JPEG',
                    quality: 0.8
                });

                imageBuffer = conversionResult;

                // Обновляем информацию о файле
                req.file.mimetype = 'image/jpeg';
                req.file.originalname = req.file.originalname.replace(/\.(heic|heif)$/i, '.jpg');

            } catch (conversionError) {
                console.error('HEIC conversion failed:', conversionError);
                return next();
            }
        }

        const compressedBuffer = await convertImageToWebp(imageBuffer);

        req.file.buffer = compressedBuffer;
        req.file.size = compressedBuffer.length;
        req.file.mimetype = 'image/webp';
        req.file.originalname = req.file.originalname.replace(/\.[^/.]+$/, ".webp");

        next();
    } catch (error) {
        console.error('Error processing image:', error);
        next();
    }
};

export const s3 = new S3Client({
    region: "ru-1",
    endpoint: S3_ENDPOINT,
    credentials: {
        accessKeyId: S3_ACCESS_KEY_ID,
        secretAccessKey: S3_SECRET_ACCESS_KEY,
    },
    forcePathStyle: true,
});

type S3Operation = 'delete' | 'upload' | 'update';

interface S3OperationParams {
    operation: S3Operation;
    fileKey: string;
    folder?: string; // Папка для сохранения файла (например: "photos/menu/items")
    fileBuffer?: Buffer;
    contentType?: string;
    oldFileKey?: string; // Для операции update
    oldFolder?: string; // Папка для старого файла при update
}

interface S3OperationResult {
    success: boolean;
    url?: string;
    message?: string;
    error?: string;
}

const BUCKET_NAME = "3aaacc647142-printridge";

// Вспомогательная функция для формирования полного пути к файлу
const buildFilePath = (folder: string | undefined, fileKey: string): string => {
    if (!folder) {
        return fileKey;
    }
    
    // Убираем начальный и конечный слеши из folder и fileKey
    const cleanFolder = folder.replace(/^\/+|\/+$/g, '');
    const cleanFileKey = fileKey.replace(/^\/+|\/+$/g, '');
    
    // Объединяем folder и fileKey
    return `${cleanFolder}/${cleanFileKey}`;
};

export const s3Operation = async (params: S3OperationParams): Promise<S3OperationResult> => {
    const { operation, fileKey, folder, fileBuffer, contentType, oldFileKey, oldFolder } = params;

    try {
        switch (operation) {
            case 'delete': {
                const fullPath = buildFilePath(folder, fileKey);
                const deleteParams = {
                    Bucket: BUCKET_NAME,
                    Key: fullPath,
                };
                await s3.send(new DeleteObjectCommand(deleteParams));
                return {
                    success: true,
                    message: `Файл ${fullPath} успешно удален`,
                };
            }

            case 'upload': {
                if (!fileBuffer) {
                    return {
                        success: false,
                        error: 'Не указан буфер файла для загрузки',
                    };
                }

                const fullPath = buildFilePath(folder, fileKey);
                const uploadParams = {
                    Bucket: BUCKET_NAME,
                    Key: fullPath,
                    Body: fileBuffer,
                    ACL: "public-read" as const,
                    ContentType: contentType || 'application/octet-stream',
                    ContentDisposition: "inline",
                };

                const upload = new lib_storage.Upload({
                    client: s3,
                    params: uploadParams,
                });

                const result = await upload.done();
                return {
                    success: true,
                    url: result.Location,
                    message: `Файл ${fullPath} успешно загружен`,
                };
            }

            case 'update': {
                if (!fileBuffer) {
                    return {
                        success: false,
                        error: 'Не указан буфер файла для обновления',
                    };
                }

                // Обязательно удаляем старый файл перед загрузкой нового
                if (oldFileKey) {
                    const oldFilePath = buildFilePath(oldFolder || folder, oldFileKey);
                    const deleteParams = {
                        Bucket: BUCKET_NAME,
                        Key: oldFilePath,
                    };
                    
                    try {
                        await s3.send(new DeleteObjectCommand(deleteParams));
                        console.log(`Старый файл ${oldFilePath} успешно удален`);
                    } catch (deleteError) {
                        // Логируем предупреждение, но продолжаем выполнение
                        console.warn(`Не удалось удалить старый файл ${oldFilePath}:`, deleteError);
                    }
                }

                // Загружаем новый файл
                const fullPath = buildFilePath(folder, fileKey);
                const uploadParams = {
                    Bucket: BUCKET_NAME,
                    Key: fullPath,
                    Body: fileBuffer,
                    ACL: "public-read" as const,
                    ContentType: contentType || 'application/octet-stream',
                    ContentDisposition: "inline",
                };

                const upload = new lib_storage.Upload({
                    client: s3,
                    params: uploadParams,
                });

                const result = await upload.done();
                return {
                    success: true,
                    url: result.Location,
                    message: `Файл ${fullPath} успешно обновлен`,
                };
            }

            default:
                return {
                    success: false,
                    error: `Неизвестная операция: ${operation}`,
                };
        }
    } catch (error) {
        console.error(`Ошибка при выполнении операции ${operation} в S3:`, error);
        return {
            success: false,
            error: error instanceof Error ? error.message : 'Неизвестная ошибка',
        };
    }
};

// Обратная совместимость: оставляем старую функцию для удаления
export const deleteFileFromS3 = async (fileKey: string) => {
    const result = await s3Operation({
        operation: 'delete',
        fileKey,
    });
    
    if (!result.success) {
        throw new Error(result.error || 'Ошибка при удалении файла');
    }
};