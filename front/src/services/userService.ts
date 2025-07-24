import api from './api'; // seu axios configurado com baseURL

export async function listarUsuarios(nomeFiltro = '') {
  const response = await api.get('/usuarios/', {
    params: { nome: nomeFiltro } // assume que API aceita filtro via query param "nome"
  });
  return response.data;
}

export async function criarUsuario(data) {
  const response = await api.post('/usuarios/', data);
  return response.data;
}

export async function deletarUsuario(id_usuario) {
  const response = await api.delete(`/usuarios/${id_usuario}`);
  return response.data;
}

export async function atualizarUsuario(id_usuario, data) {
  const response = await api.put(`/usuarios/${id_usuario}`, data);
  return response.data;
}
