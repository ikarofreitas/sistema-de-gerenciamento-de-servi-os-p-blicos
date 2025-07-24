import api from './api';

export async function listarServicos() {
  const response = await api.get('/servicos/');
  return response.data;
}
