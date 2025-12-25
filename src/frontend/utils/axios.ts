import axios from "axios";

// Определяем базовый URL для API
// В режиме разработки используем прямой URL к бэкенду
const BACKEND_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

// В режиме разработки всегда используем прямой URL
const API_BASE_URL = import.meta.env.DEV ? BACKEND_URL : BACKEND_URL;

// Создаем экземпляр axios с настройками
export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, // Важно! Позволяет отправлять cookies (httpOnly cookies)
});

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

