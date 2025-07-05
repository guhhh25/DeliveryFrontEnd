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
}

export interface RegisterResponse {
  message: string;
  userId: string;
}

export interface ApiError {
  errors?: string[];
  message?: string;
} 