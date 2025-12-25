import apiClient from "./axios";

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

export interface AuthResponse {
  success: boolean;
  data: User;
  message: string;
}

// Регистрация пользователя
export const register = async (data: RegisterData): Promise<AuthResponse> => {
  const response = await apiClient.post<AuthResponse>("/auth/register", data);
  return response.data;
};

// Авторизация пользователя
export const login = async (data: LoginData): Promise<AuthResponse> => {
  const response = await apiClient.post<AuthResponse>("/auth/login", data);
  return response.data;
};

// Выход из системы
export const logout = async (): Promise<{ success: boolean; message: string }> => {
  const response = await apiClient.post<{ success: boolean; message: string }>("/auth/logout");
  return response.data;
};

// Получить текущего пользователя
export const getMe = async (): Promise<{ success: boolean; data: User }> => {
  const response = await apiClient.get<{ success: boolean; data: User }>("/auth/me");
  return response.data;
};

