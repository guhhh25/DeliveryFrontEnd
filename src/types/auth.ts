export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  confirmPassword: string;
}

export interface LoginResponse {
  id: string;
  message: string;
  token: string;
  userName: string;
  role?: UserRole; // Tornar opcional para compatibilidade com backend
}

export interface RegisterResponse {
  message: string;
  userId: string;
}

export interface ApiError {
  errors?: string[];
  message?: string;
}

export enum UserRole {
  CUSTOMER = 'customer',
  ADMIN = 'admin',
  RESTAURANT_OWNER = 'restaurant_owner'
}

export interface User {
  id: string;
  email: string;
  role: UserRole;
  name?: string;
} 