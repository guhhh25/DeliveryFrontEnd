import axios from 'axios';
import { LoginRequest, RegisterRequest, LoginResponse, RegisterResponse } from '../types/auth';
import { isTokenExpired } from '../utils/jwt';
import { getApiUrl } from '../config/api';

// URL da API fixa
const API_BASE_URL = getApiUrl();

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para adicionar o token automaticamente
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      // Verificar se o token não expirou
      if (isTokenExpired(token)) {
        // Token expirado, limpar localStorage e redirecionar
        localStorage.removeItem('authToken');
        localStorage.removeItem('user');
        window.location.href = '/';
        return Promise.reject(new Error('Token expirado'));
      }
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para tratar erros de autenticação
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expirado ou inválido
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
      window.location.href = '/';
    }
    return Promise.reject(error);
  }
);

export const authService = {
  login: async (credentials: LoginRequest): Promise<LoginResponse> => {
    const response = await api.post<LoginResponse>('/auth/login', credentials);
    return response.data;
  },

  register: async (userData: RegisterRequest): Promise<RegisterResponse> => {
    const response = await api.post<RegisterResponse>('/auth/register', {
      email: userData.email,
      password: userData.password,
      confirmPassword: userData.confirmPassword,
    });
    return response.data;
  },

  // Função para verificar se o token ainda é válido
  validateToken: async (): Promise<boolean> => {
    try {
      const token = localStorage.getItem('authToken');
      if (!token) return false;
      if (isTokenExpired(token)) {
        localStorage.removeItem('authToken');
        localStorage.removeItem('user');
        return false;
      }
      return true;
    } catch (error) {
      return false;
    }
  },
};

export default api; 