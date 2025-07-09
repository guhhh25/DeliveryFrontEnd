import { CreateEmpresaRequest, Empresa, EmpresaResponse } from '../types/empresa';
import api from './api';

export const empresaService = {
  // Buscar todas as empresas do usuário logado
  async getMyEmpresas(): Promise<Empresa[]> {
    try {
      const response = await api.get('/Empresa/my-empresa');
      // Se o backend retornar um array, retorna direto; se retornar um objeto único, retorna array com um elemento
      if (Array.isArray(response.data)) {
        return response.data;
      } else if (response.data) {
        return [response.data];
      } else {
        return [];
      }
    } catch (error: any) {
      if (error.response?.status === 404) {
        return [];
      }
      throw error;
    }
  },

  // Criar nova empresa (padrão REST: POST /Empresa)
  async createEmpresa(data: CreateEmpresaRequest): Promise<Empresa> {
    const empresaData = {
      Nome: data.nome,
      NumeroRegistro: data.numeroRegistro,
      Email: data.email,
      Telefone: data.telefone,
      Cep: data.cep,
      Endereco: data.endereco,
      Logo: data.logo,
    };
    const response = await api.post('/Empresa', empresaData);
    return response.data;
  },

  // Converter imagem para base64
  async convertImageToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result as string;
        const base64 = result.split(',')[1];
        resolve(base64);
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }
}; 