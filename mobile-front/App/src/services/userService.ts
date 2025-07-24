import api from "./api";

export async function cadastrarUsuario(data: any) {
    const response = await api.post('/usuarios/', data);
    return response.data;
}

export async function listarUsuarios() {
    const response = await api.get('/usuarios/');
    return response.data;
}

export async function loginUsuario(email: string, senha: string) {
    const response = await api.get('/usuarios/');
    const usuarios = response.data;

    const usuarioEncontrado = usuarios.find(
        (u: any) => u.email === email && u.senha === senha
    );

    if (!usuarioEncontrado) {
        throw new Error("Usuário ou senha incorretos");
    }

    return usuarioEncontrado;
}