import axios from "axios";

// Определяем базовый URL для API
// В режиме разработки используем прямой URL к бэкенду
// В продакшене используем относительные пути (пустая строка), так как фронтенд и бэкенд на одном домене
const getApiBaseUrl = (): string => {
  if (import.meta.env.DEV) {
    // В режиме разработки используем явный URL или значение из переменной окружения
    return import.meta.env.VITE_API_URL || "http://localhost:3000";
  }
  // В продакшене используем относительные пути (запросы идут на тот же домен)
  return "";
};

// Создаем экземпляр axios с настройками
export const apiClient = axios.create({
  baseURL: getApiBaseUrl(),
  withCredentials: true, // Важно! Позволяет отправлять cookies (httpOnly cookies)
});

// Request interceptor
apiClient.interceptors.request.use(
  (config) => {
    if (config.data instanceof FormData) {
      // Убеждаемся, что Content-Type не установлен для FormData
      delete config.headers['Content-Type'];
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor для обработки ошибок
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Токен истек или невалиден
      // Можно перенаправить на страницу логина или обновить токен
      console.error("Unauthorized - токен истек или невалиден");
    }
    return Promise.reject(error);
  }
);

export default apiClient;

