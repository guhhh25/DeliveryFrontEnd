import axios from 'axios';
import { LoginRequest, RegisterRequest, LoginResponse, RegisterResponse } from '../types/auth';
import { isTokenExpired } from '../utils/jwt';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5162/api';

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
    });
    return response.data;
  },

  // Função para verificar se o token ainda é válido
  validateToken: async (): Promise<boolean> => {
    try {
      const token = localStorage.getItem('authToken');
      if (!token) return false;
      
      // Verificar se o token não expirou
      if (isTokenExpired(token)) {
        localStorage.removeItem('authToken');
        localStorage.removeItem('user');
        return false;
      }
      
      // Você pode criar um endpoint /auth/validate no backend
      // Por enquanto, vamos apenas verificar se o token existe e não expirou
      return true;
    } catch (error) {
      return false;
    }
  },
};

export default api; 