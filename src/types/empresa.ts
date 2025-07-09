export interface CreateEmpresaRequest {
  nome: string;
  numeroRegistro: number;
  email: string;
  telefone: number;
  cep: string;
  endereco: string;
  logo?: string;
}

export interface Empresa {
  id: string;
  nome: string;
  numeroRegistro: number;
  email: string;
  telefone: number;
  cep: string;
  endereco: string;
  logo?: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export interface EmpresaResponse {
  message?: string;
  empresa?: Empresa;
  error?: string;
} 