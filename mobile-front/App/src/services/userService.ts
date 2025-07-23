import api from "./api";

export async function cadastrarUsuario(data: any) {
    const response = await api.post('/usuarios/', data);
    return response.data;
}

export async function listarUsuarios() {
    const response = await api.get('/usuarios/');
    return response.data;
}
