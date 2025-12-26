import apiClient from "./axios";
import { CartridgeData, IPrinterSchema, IExampleSchema, ICompatibilitySchema, ILaptopSchema, IPrinterPriceTemplateSchema, ILaptopPriceTemplateSchema } from "../../utils/types";

// ==================== TYPES ====================

export interface PaginationParams {
  page?: number;
  limit?: number;
}

export interface PaginatedResponse<T> {
  success: boolean;
  data: T[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
  };
}

export interface BaseResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

// ==================== AUTH API ====================
// (Импортируем из auth-api.ts)

export interface RegisterData {
  email: string;
  password: string;
  name?: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface User {
  id: string;
  email: string;
  name?: string;
  role?: string;
  createdAt: string;
}

// Регистрация пользователя
export const register = async (data: RegisterData) => {
  const response = await apiClient.post<BaseResponse<User>>("/auth/register", data);
  return response.data;
};

// Авторизация пользователя
export const login = async (data: LoginData) => {
  const response = await apiClient.post<BaseResponse<User>>("/auth/login", data);
  return response.data;
};

// Выход из системы
export const logout = async () => {
  const response = await apiClient.post<{ success: boolean; message: string }>("/auth/logout");
  return response.data;
};

// Получить текущего пользователя
export const getMe = async () => {
  const response = await apiClient.get<BaseResponse<User>>("/auth/me");
  return response.data;
};

// ==================== CARTRIDGES API ====================

export interface Cartridge extends CartridgeData {
  _id: string;
  photo?: any;
  createdAt?: string;
  updatedAt?: string;
}

// Получить картриджи с пагинацией
export const getPaginatedCartridges = async (params?: PaginationParams & {
  modelCart?: string;
  vendor?: string;
  hasImage?: string;
  hasLinkedDevices?: string;
  public?: string;
}) => {
  const response = await apiClient.get<PaginatedResponse<Cartridge>>("/cartridges/paginated", {
    params,
  });
  return response.data;
};

// Получить все уникальные производители картриджей
export const getCartridgeVendors = async () => {
  const response = await apiClient.get<{ success: boolean; data: string[] }>("/cartridges/vendors");
  return response.data;
};

// Поиск моделей картриджей
export const searchCartridgeModels = async (query: string, limit: number = 10): Promise<string[]> => {
  const response = await apiClient.get<{ success: boolean; data: string[] }>("/cartridges/search-models", {
    params: { q: query, limit },
  });
  return response.data.data || [];
};

// Создать картридж
export const createCartridge = async (data: CartridgeData) => {
  const response = await apiClient.post<BaseResponse<Cartridge>>("/cartridges/all-items", data);
  return response.data;
};

// Получить картридж по ID
export const getCartridgeById = async (cartridgeId: string) => {
  const response = await apiClient.get<BaseResponse<Cartridge>>(`/cartridges/all-items/${cartridgeId}`);
  return response.data;
};

// Обновить картридж
export const updateCartridge = async (cartridgeId: string, data: Partial<CartridgeData>, file?: File) => {
  const formData = new FormData();
  if (data) {
    formData.append("data", JSON.stringify(data));
  }
  if (file) {
    formData.append("file", file);
  }
  
  const response = await apiClient.put<BaseResponse<Cartridge>>(`/cartridges/all-items/${cartridgeId}`, formData);
  return response.data;
};

// Удалить картридж
export const deleteCartridge = async (cartridgeId: string) => {
  const response = await apiClient.delete<{ success: boolean; message: string }>(`/cartridges/all-items/${cartridgeId}`);
  return response.data;
};

// Изменить статус public для картриджа
export const toggleCartridgePublicStatus = async (cartridgeId: string, publicStatus: boolean) => {
  const response = await apiClient.patch<BaseResponse<Cartridge>>(`/cartridges/all-items/${cartridgeId}/public`, { public: publicStatus });
  return response.data;
};

// ==================== IMAGES API ====================

export interface Image {
  _id: string;
  src: string;
  alt: string;
  cartridgeId?: string;
  printerId?: string;
  laptopId?: string;
  exampleId?: string;
  createdAt?: string;
  updatedAt?: string;
}

// Загрузить изображение
export const uploadImage = async (file: File, data?: {
  cartridgeId?: string;
  printerId?: string;
  laptopId?: string;
  exampleId?: string;
}) => {
  const formData = new FormData();
  formData.append("file", file);
  if (data) {
    Object.entries(data).forEach(([key, value]) => {
      if (value) {
        formData.append(key, value);
      }
    });
  }

  const response = await apiClient.post<BaseResponse<Image>>("/images/upload", formData);
  return response.data;
};

// Обновить изображение
export const updateImage = async (imageId: string, file: File, data?: {
  cartridgeId?: string;
  printerId?: string;
  laptopId?: string;
  exampleId?: string;
}) => {
  const formData = new FormData();
  formData.append("file", file);
  if (data) {
    Object.entries(data).forEach(([key, value]) => {
      if (value) {
        formData.append(key, value);
      }
    });
  }

  const response = await apiClient.put<BaseResponse<Image>>(`/images/${imageId}`, formData);
  return response.data;
};

// Удалить изображение
export const deleteImage = async (imageId: string) => {
  const response = await apiClient.delete<{ success: boolean; message: string }>(`/images/${imageId}`);
  return response.data;
};

// ==================== EXAMPLES API ====================

export interface Example extends IExampleSchema {
  _id: string;
  cartridgeNames?: string[];
  printerNames?: string[];
  laptopNames?: string[];
  createdAt?: string;
  updatedAt?: string;
}

// Получить примеры с пагинацией
export const getPaginatedExamples = async (params?: PaginationParams & {
  title?: string;
  cartridgeId?: string;
  printerId?: string;
  laptopId?: string;
  public?: string;
}) => {
  const response = await apiClient.get<PaginatedResponse<Example>>("/examples/paginated", {
    params,
  });
  return response.data;
};

// Создать пример
export const createExample = async (data: IExampleSchema) => {
  const response = await apiClient.post<BaseResponse<Example>>("/examples/", data);
  return response.data;
};

// Получить пример по ID
export const getExampleById = async (exampleId: string) => {
  const response = await apiClient.get<BaseResponse<Example>>(`/examples/${exampleId}`);
  return response.data;
};

// Обновить пример
export const updateExample = async (exampleId: string, data: Partial<IExampleSchema>) => {
  const response = await apiClient.put<BaseResponse<Example>>(`/examples/${exampleId}`, data);
  return response.data;
};

// Удалить пример
export const deleteExample = async (exampleId: string) => {
  const response = await apiClient.delete<{ success: boolean; message: string }>(`/examples/${exampleId}`);
  return response.data;
};

// Изменить статус public для примера
export const toggleExamplePublicStatus = async (exampleId: string, publicStatus: boolean) => {
  const response = await apiClient.patch<BaseResponse<Example>>(`/examples/${exampleId}/public`, { public: publicStatus });
  return response.data;
};

// Получить фотографии примера
export const getExamplePhotos = async (exampleId: string) => {
  const response = await apiClient.get<PaginatedResponse<Image>>("/images/paginated", {
    params: { exampleId, limit: 1000 }
  });
  return response.data;
};

// Получить видео примера
export const getExampleVideos = async (exampleId: string) => {
  const response = await apiClient.get<PaginatedResponse<Video>>("/videos/paginated", {
    params: { exampleId, limit: 1000 }
  });
  return response.data;
};

// ==================== VIDEOS API ====================

export interface Video {
  _id: string;
  src: string;
  cartridgeId?: string;
  printerId?: string;
  laptopId?: string;
  exampleId?: string;
  createdAt?: string;
  updatedAt?: string;
}

// Получить видео с пагинацией
export const getPaginatedVideos = async (params?: PaginationParams & {
  cartridgeId?: string;
  printerId?: string;
  laptopId?: string;
  exampleId?: string;
}) => {
  const response = await apiClient.get<PaginatedResponse<Video>>("/videos/paginated", {
    params,
  });
  return response.data;
};

// Загрузить видео
export const uploadVideo = async (file: File, data?: {
  cartridgeId?: string;
  printerId?: string;
  laptopId?: string;
  exampleId?: string;
}) => {
  if (!file || !(file instanceof File)) {
    throw new Error('Неверный файл для загрузки');
  }

  const formData = new FormData();
  formData.append("file", file);

  if (data) {
    Object.entries(data).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        formData.append(key, String(value));
      }
    });
  }

  try {
    const response = await apiClient.post<BaseResponse<Video>>("/videos/upload", formData, {
      timeout: 600000,
    });
    return response.data;
  } catch (error: any) {
    throw error;
  }
};

// Получить видео по ID
export const getVideoById = async (videoId: string) => {
  const response = await apiClient.get<BaseResponse<Video>>(`/videos/${videoId}`);
  return response.data;
};

// Обновить видео
export const updateVideo = async (videoId: string, file: File, data?: {
  cartridgeId?: string;
  printerId?: string;
  laptopId?: string;
  exampleId?: string;
}) => {
  const formData = new FormData();
  formData.append("file", file);
  if (data) {
    Object.entries(data).forEach(([key, value]) => {
      if (value) {
        formData.append(key, value);
      }
    });
  }

  const response = await apiClient.put<BaseResponse<Video>>(`/videos/${videoId}`, formData, {
    timeout: 600000, // 10 минут для загрузки больших видеофайлов
  });
  return response.data;
};

// Удалить видео
export const deleteVideo = async (videoId: string) => {
  const response = await apiClient.delete<{ success: boolean; message: string }>(`/videos/${videoId}`);
  return response.data;
};

// ==================== PRINTERS API ====================

export interface Printer extends IPrinterSchema {
  _id: string;
  photo?: any;
  createdAt?: string;
  updatedAt?: string;
}

// Получить принтеры с пагинацией
export const getPaginatedPrinters = async (params?: PaginationParams & {
  vendor?: string;
  model?: string;
  hasImage?: string;
  hasLinkedCartridges?: string;
  public?: string;
}) => {
  const response = await apiClient.get<PaginatedResponse<Printer>>("/printers/paginated", {
    params,
  });
  return response.data;
};

// Получить все уникальные производители принтеров
export const getPrinterVendors = async () => {
  const response = await apiClient.get<{ success: boolean; data: string[] }>("/printers/vendors");
  return response.data;
};

// Поиск моделей принтеров
export const searchPrinterModels = async (query: string, limit: number = 10): Promise<string[]> => {
  const response = await apiClient.get<{ success: boolean; data: string[] }>("/printers/search-models", {
    params: { q: query, limit },
  });
  return response.data.data || [];
};

// Создать принтер
export const createPrinter = async (data: IPrinterSchema) => {
  const response = await apiClient.post<BaseResponse<Printer>>("/printers/", data);
  return response.data;
};

// Получить принтер по ID
export const getPrinterById = async (printerId: string) => {
  const response = await apiClient.get<BaseResponse<Printer>>(`/printers/${printerId}`);
  return response.data;
};

// Обновить принтер
export const updatePrinter = async (printerId: string, data: Partial<IPrinterSchema>) => {
  const response = await apiClient.put<BaseResponse<Printer>>(`/printers/${printerId}`, data);
  return response.data;
};

// Удалить принтер
export const deletePrinter = async (printerId: string) => {
  const response = await apiClient.delete<{ success: boolean; message: string }>(`/printers/${printerId}`);
  return response.data;
};

// Изменить статус public для принтера
export const togglePrinterPublicStatus = async (printerId: string, publicStatus: boolean) => {
  const response = await apiClient.patch<BaseResponse<Printer>>(`/printers/${printerId}/public`, { public: publicStatus });
  return response.data;
};

// ==================== COMPATIBILITIES API ====================

export interface Compatibility extends ICompatibilitySchema {
  _id: string;
  createdAt?: string;
  updatedAt?: string;
}

// Получить связи с пагинацией
export const getPaginatedCompatibilities = async (params?: PaginationParams & {
  cartridgeId?: string;
  printerId?: string;
}) => {
  const response = await apiClient.get<PaginatedResponse<Compatibility>>("/compatibilities/paginated", {
    params,
  });
  return response.data;
};

// Получить все принтеры для картриджа
export const getPrintersByCartridgeId = async (cartridgeId: string) => {
  const response = await apiClient.get<{ success: boolean; data: Printer[]; count: number }>(
    `/compatibilities/cartridge/${cartridgeId}/printers`
  );
  return response.data;
};

// Получить все картриджи для принтера
export const getCartridgesByPrinterId = async (printerId: string) => {
  const response = await apiClient.get<{ success: boolean; data: Cartridge[]; count: number }>(
    `/compatibilities/printer/${printerId}/cartridges`
  );
  return response.data;
};

// Создать связь
export const createCompatibility = async (data: ICompatibilitySchema) => {
  const response = await apiClient.post<BaseResponse<Compatibility>>("/compatibilities/", data);
  return response.data;
};

// Удалить связь
export const deleteCompatibility = async (compatibilityId: string) => {
  const response = await apiClient.delete<{ success: boolean; message: string }>(`/compatibilities/${compatibilityId}`);
  return response.data;
};

// ==================== LAPTOPS API ====================

export interface Laptop extends ILaptopSchema {
  _id: string;
  photo?: any;
  createdAt?: string;
  updatedAt?: string;
}

// Получить ноутбуки с пагинацией
export const getPaginatedLaptops = async (params?: PaginationParams & {
  vendor?: string;
  model?: string;
  hasImage?: string;
  public?: string;
}) => {
  const response = await apiClient.get<PaginatedResponse<Laptop>>("/laptops/paginated", {
    params,
  });
  return response.data;
};

// Создать ноутбук
export const createLaptop = async (data: ILaptopSchema) => {
  const response = await apiClient.post<BaseResponse<Laptop>>("/laptops/", data);
  return response.data;
};

// Получить ноутбук по ID
export const getLaptopById = async (laptopId: string) => {
  const response = await apiClient.get<BaseResponse<Laptop>>(`/laptops/${laptopId}`);
  return response.data;
};

// Обновить ноутбук
export const updateLaptop = async (laptopId: string, data: Partial<ILaptopSchema>) => {
  const response = await apiClient.put<BaseResponse<Laptop>>(`/laptops/${laptopId}`, data);
  return response.data;
};

// Удалить ноутбук
export const deleteLaptop = async (laptopId: string) => {
  const response = await apiClient.delete<{ success: boolean; message: string }>(`/laptops/${laptopId}`);
  return response.data;
};

// Изменить статус public для ноутбука
export const toggleLaptopPublicStatus = async (laptopId: string, publicStatus: boolean) => {
  const response = await apiClient.patch<BaseResponse<Laptop>>(`/laptops/${laptopId}/public`, { public: publicStatus });
  return response.data;
};

// Поиск моделей ноутбуков
export const searchLaptopModels = async (query: string, limit: number = 10): Promise<string[]> => {
  const response = await apiClient.get<{ success: boolean; data: string[] }>("/laptops/search-models", {
    params: { q: query, limit },
  });
  return response.data.data || [];
};

// ==================== PRINTER PRICE TEMPLATES API ====================

// Получить все прайс-шаблоны принтеров
export const getAllPrinterPriceTemplates = async () => {
  const response = await apiClient.get<{ success: boolean; data: IPrinterPriceTemplateSchema[] }>("/printer-price-templates/");
  return response.data;
};

// Получить прайс-шаблон принтера по ID
export const getPrinterPriceTemplateById = async (templateId: string) => {
  const response = await apiClient.get<BaseResponse<IPrinterPriceTemplateSchema>>(`/printer-price-templates/${templateId}`);
  return response.data;
};

// Обновить прайс-шаблон принтера
export const updatePrinterPriceTemplate = async (templateId: string, data: Partial<IPrinterPriceTemplateSchema>) => {
  const response = await apiClient.put<BaseResponse<IPrinterPriceTemplateSchema>>(`/printer-price-templates/${templateId}`, data);
  return response.data;
};

// ==================== LAPTOP PRICE TEMPLATES API ====================

// Получить все прайс-шаблоны ноутбуков
export const getAllLaptopPriceTemplates = async () => {
  const response = await apiClient.get<{ success: boolean; data: ILaptopPriceTemplateSchema[] }>("/laptop-price-templates/");
  return response.data;
};

// Получить прайс-шаблон ноутбука по ID
export const getLaptopPriceTemplateById = async (templateId: string) => {
  const response = await apiClient.get<BaseResponse<ILaptopPriceTemplateSchema>>(`/laptop-price-templates/${templateId}`);
  return response.data;
};

// Обновить прайс-шаблон ноутбука
export const updateLaptopPriceTemplate = async (templateId: string, data: Partial<ILaptopPriceTemplateSchema>) => {
  const response = await apiClient.put<BaseResponse<ILaptopPriceTemplateSchema>>(`/laptop-price-templates/${templateId}`, data);
  return response.data;
};
