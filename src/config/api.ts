// Configuração da API
export const API_CONFIG = {
  DEFAULT_PORT: 5162,
  BASE_PATH: '/api',
};

export const getApiUrl = (): string => {
  // Se tiver uma variável de ambiente, use ela
  if (process.env.REACT_APP_API_URL) {
    return process.env.REACT_APP_API_URL;
  }
  // Senão, use a porta fixa
  return `http://localhost:${API_CONFIG.DEFAULT_PORT}${API_CONFIG.BASE_PATH}`;
}; 