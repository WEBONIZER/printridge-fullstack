import ffmpeg from 'fluent-ffmpeg';
import { writeFileSync, unlinkSync, readFileSync, existsSync } from 'fs';
import { tmpdir } from 'os';
import { join } from 'path';
import { promisify } from 'util';
import { exec } from 'child_process';

const execAsync = promisify(exec);

interface VideoProcessOptions {
  maxWidth?: number;
  maxHeight?: number;
  bitrate?: string;
  quality?: number; // 0-51 для libx264, где меньше = лучше качество
  format?: 'mp4' | 'webm';
}

/**
 * Проверяет наличие ffmpeg в системе
 */
export const checkFFmpegAvailable = async (): Promise<boolean> => {
  try {
    await execAsync('ffmpeg -version');
    return true;
  } catch {
    return false;
  }
};

/**
 * Обрабатывает видео с помощью fluent-ffmpeg с оптимизированными настройками
 */
const processVideoWithFFmpeg = async (
  inputPath: string,
  outputPath: string,
  options: VideoProcessOptions
): Promise<void> => {
  return new Promise((resolve, reject) => {
    const {
      maxWidth = 1920,
      maxHeight = 1080,
      bitrate = '2M',
      quality = 23,
      format = 'mp4'
    } = options;

    // Определяем, использовать ли H.265 (более эффективное сжатие, но медленнее)
    // Для больших файлов используем H.265, для маленьких - H.264
    const useH265 = maxWidth <= 1280; // Используем H.265 для меньших разрешений (более эффективно)
    const videoCodec = useH265 ? 'libx265' : 'libx264';
    const preset = useH265 ? 'medium' : 'slow'; // Медленный пресет = лучшее сжатие

    const command = ffmpeg(inputPath)
      .videoCodec(videoCodec)
      .audioCodec('aac')
      .outputOptions([
        // Масштабирование с сохранением пропорций
        `-vf scale='min(${maxWidth},iw)':'min(${maxHeight},ih)':force_original_aspect_ratio=decrease`,
        // Пресет кодирования (медленнее = лучшее сжатие)
        `-preset ${preset}`,
        // CRF (Constant Rate Factor) - качество (меньше = лучше качество, больше файл)
        `-crf ${quality}`,
        // Ограничение битрейта
        `-maxrate ${bitrate}`,
        `-bufsize ${parseInt(bitrate) * 2}M`, // Буфер в 2 раза больше битрейта
        // Аудио битрейт
        `-b:a 128k`,
        // Оптимизация для веб-воспроизведения
        `-movflags +faststart`,
        // Дополнительные оптимизации для H.265
        ...(useH265 ? [
          `-x265-params log-level=error:keyint=60:min-keyint=60:scenecut=0`,
          `-pix_fmt yuv420p` // Совместимость с браузерами
        ] : [
          // Оптимизации для H.264
          `-profile:v high`,
          `-level 4.0`,
          `-pix_fmt yuv420p`
        ]),
        // Отключение метаданных для уменьшения размера
        `-map_metadata -1`,
        // Оптимизация потоков
        `-threads 0` // Использовать все доступные ядра
      ])
      .format(format)
      .on('start', () => {
      })
      .on('progress', (progress) => {
        if (progress.percent) {
          console.log(`Обработка: ${Math.round(progress.percent)}%`);
        }
      })
      .on('end', () => {
        resolve();
      })
      .on('error', (err) => {
        reject(err);
      })
      .save(outputPath);
  });
};

/**
 * Обрабатывает видео: сжимает и конвертирует в веб-формат
 * Автоматически выбирает оптимальные параметры в зависимости от размера файла
 */
export const processVideo = async (
  inputBuffer: Buffer,
  options: VideoProcessOptions = {}
): Promise<Buffer> => {
  const fileSizeMB = inputBuffer.length / 1024 / 1024;
  
  // Автоматически определяем оптимальные параметры в зависимости от размера
  let optimizedOptions: VideoProcessOptions;
  
  if (fileSizeMB > 1000) {
    // Очень большие файлы (>1GB) - максимальное сжатие
    optimizedOptions = {
      maxWidth: 1280,
      maxHeight: 720,
      bitrate: '1M',
      quality: 28, // Более агрессивное сжатие
      format: 'mp4',
      ...options
    };
  } else if (fileSizeMB > 500) {
    // Большие файлы (500MB-1GB) - сильное сжатие
    optimizedOptions = {
      maxWidth: 1280,
      maxHeight: 720,
      bitrate: '1.5M',
      quality: 26,
      format: 'mp4',
      ...options
    };
  } else if (fileSizeMB > 100) {
    // Средние файлы (100-500MB) - умеренное сжатие
    optimizedOptions = {
      maxWidth: 1920,
      maxHeight: 1080,
      bitrate: '2M',
      quality: 24,
      format: 'mp4',
      ...options
    };
  } else {
    // Маленькие файлы (<100MB) - минимальное сжатие, сохраняем качество
    optimizedOptions = {
      maxWidth: 1920,
      maxHeight: 1080,
      bitrate: '3M',
      quality: 23,
      format: 'mp4',
      ...options
    };
  }

  const {
    maxWidth = 1920,
    maxHeight = 1080,
    bitrate = '2M',
    quality = 23,
    format = 'mp4'
  } = optimizedOptions;

  const ffmpegAvailable = await checkFFmpegAvailable();
  
  if (!ffmpegAvailable) {
    console.warn('FFmpeg не найден. Видео будет загружено без обработки.');
    return inputBuffer;
  }

  const tempInput = join(tmpdir(), `input-${Date.now()}-${Math.random().toString(36)}.tmp`);
  const tempOutput = join(tmpdir(), `output-${Date.now()}-${Math.random().toString(36)}.${format}`);

  try {
    // Записываем входной файл во временный файл
    writeFileSync(tempInput, inputBuffer);

    // Обрабатываем видео с помощью fluent-ffmpeg
    await processVideoWithFFmpeg(tempInput, tempOutput, optimizedOptions);

    // Читаем обработанный файл
    const processedBuffer = readFileSync(tempOutput);

    // Удаляем временные файлы
    try {
      unlinkSync(tempInput);
      unlinkSync(tempOutput);
    } catch (cleanupError) {
      console.warn('Ошибка при удалении временных файлов:', cleanupError);
    }

    return processedBuffer;
  } catch (error: any) {
    // В случае ошибки удаляем временные файлы и возвращаем оригинал
    try {
      unlinkSync(tempInput);
      if (existsSync(tempOutput)) {
        unlinkSync(tempOutput);
      }
    } catch (cleanupError) {
      console.warn('Ошибка при удалении временных файлов:', cleanupError);
    }

    console.error('Ошибка обработки видео:', error.message);
    console.warn('Возвращаем оригинальный файл без обработки');
    return inputBuffer;
  }
};

/**
 * Получает информацию о видео (размер, длительность, битрейт)
 */
export const getVideoInfo = async (buffer: Buffer): Promise<{
  duration?: number;
  width?: number;
  height?: number;
  size: number;
  format?: string;
}> => {
  const ffmpegAvailable = await checkFFmpegAvailable();
  
  if (!ffmpegAvailable) {
    return { size: buffer.length };
  }

  const tempInput = join(tmpdir(), `info-${Date.now()}-${Math.random().toString(36)}.tmp`);

  try {
    writeFileSync(tempInput, buffer);

    const { stdout } = await execAsync(
      `ffprobe -v quiet -print_format json -show_format -show_streams "${tempInput}"`
    );

    const info = JSON.parse(stdout);
    const videoStream = info.streams?.find((s: any) => s.codec_type === 'video');
    const format = info.format;

    const result = {
      size: buffer.length,
      duration: format?.duration ? parseFloat(format.duration) : undefined,
      width: videoStream?.width,
      height: videoStream?.height,
      format: format?.format_name,
    };

    unlinkSync(tempInput);
    return result;
  } catch (error) {
    try {
      unlinkSync(tempInput);
    } catch {}
    return { size: buffer.length };
  }
};

