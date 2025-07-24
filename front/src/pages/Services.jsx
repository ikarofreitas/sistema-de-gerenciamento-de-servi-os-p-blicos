import { useEffect, useState } from 'react';
import { listarUsuarios, deletarUsuario, atualizarUsuario } from '../services/userService';
import AddServiceButton from '../components/AddServiceButton';

export default function Services() {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalUsuario, setModalUsuario] = useState(null); // usuário selecionado para modal
  const [modoEdicao, setModoEdicao] = useState(false); // se modal está editando
  const [usuarioEditando, setUsuarioEditando] = useState(null); // dados para edição
  const [filtroNome, setFiltroNome] = useState('');

  async function buscarUsuarios(nome = '') {
    setLoading(true);
    try {
      const lista = await listarUsuarios(nome);
      setUsuarios(lista);
    // eslint-disable-next-line no-unused-vars
    } catch (error) {
      alert('Erro ao buscar usuários');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    buscarUsuarios();
  }, []);

  async function handleDeletar(id_usuario) {
    if (!window.confirm('Confirmar exclusão do usuário?')) return;
    try {
      await deletarUsuario(id_usuario);
      setUsuarios(usuarios.filter(u => u.id_usuario !== id_usuario));
      if (modalUsuario?.id_usuario === id_usuario) fecharModal();
    } catch {
      alert('Erro ao deletar usuário');
    }
  }

  function abrirModal(usuario, editar = false) {
    setModalUsuario(usuario);
    if (editar) {
      setModoEdicao(true);
      setUsuarioEditando({ ...usuario }); // copia para edição
    } else {
      setModoEdicao(false);
      setUsuarioEditando(null);
    }
  }

  function fecharModal() {
    setModalUsuario(null);
    setModoEdicao(false);
    setUsuarioEditando(null);
  }

  function handleFiltroNomeChange(e) {
    setFiltroNome(e.target.value);
    buscarUsuarios(e.target.value);
  }

  // Atualiza campo do usuário que está editando
  function handleChangeCampo(e) {
    const { name, value } = e.target;
    setUsuarioEditando(prev => ({ ...prev, [name]: value }));
  }

  // Salva alterações
  async function handleSalvar() {
    try {
      await atualizarUsuario(usuarioEditando.id_usuario, usuarioEditando);
      await buscarUsuarios(filtroNome);
      fecharModal();
    // eslint-disable-next-line no-unused-vars
    } catch (error) {
      alert('Erro ao salvar usuário');
    }
  }

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Usuários</h1>

      <input
        type="text"
        placeholder="Buscar por nome..."
        className="border rounded px-3 py-2 mb-4 w-full"
        value={filtroNome}
        onChange={handleFiltroNomeChange}
      />

      <AddServiceButton onAdd={buscarUsuarios} />

      {loading ? (
        <p>Carregando...</p>
      ) : usuarios.length === 0 ? (
        <p>Nenhum usuário encontrado.</p>
      ) : (
        <ul className="mt-4 border rounded divide-y">
          {usuarios.map(usuario => (
            <li
              key={usuario.id_usuario}
              className="p-4 flex justify-between items-center cursor-pointer hover:bg-gray-100"
              onClick={() => abrirModal(usuario)}
            >
              <span>{usuario.nome}</span>
              <div className="flex gap-2">
                <button
                  onClick={e => {
                    e.stopPropagation();
                    abrirModal(usuario, true); // abrir em modo edição
                  }}
                  className="text-blue-600 hover:text-blue-800 font-bold"
                  title="Editar"
                >
                  ✎
                </button>
                <button
                  onClick={e => {
                    e.stopPropagation();
                    handleDeletar(usuario.id_usuario);
                  }}
                  className="text-red-600 hover:text-red-800 font-bold"
                  title="Excluir"
                >
                  ×
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      {/* Modal de detalhes ou edição */}
      {modalUsuario && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded p-6 max-w-md w-full relative">
            <button
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
              onClick={fecharModal}
            >
              ×
            </button>
            <h2 className="text-xl font-bold mb-4">
              {modoEdicao ? `Editar ${modalUsuario.nome}` : modalUsuario.nome}
            </h2>

            {modoEdicao ? (
              <div className="flex flex-col gap-3">
                <input
                  type="text"
                  name="nome"
                  value={usuarioEditando.nome}
                  onChange={handleChangeCampo}
                  className="border rounded px-2 py-1"
                  placeholder="Nome"
                />
                <input
                  type="email"
                  name="email"
                  value={usuarioEditando.email}
                  onChange={handleChangeCampo}
                  className="border rounded px-2 py-1"
                  placeholder="Email"
                />
                <input
                  type="text"
                  name="cpf"
                  value={usuarioEditando.cpf}
                  onChange={handleChangeCampo}
                  className="border rounded px-2 py-1"
                  placeholder="CPF"
                />
                <input
                  type="password"
                  name="senha"
                  value={usuarioEditando.senha}
                  onChange={handleChangeCampo}
                  className="border rounded px-2 py-1"
                  placeholder="Senha"
                />
                <input
                  type="date"
                  name="data_nascimento"
                  value={usuarioEditando.data_nascimento}
                  onChange={handleChangeCampo}
                  className="border rounded px-2 py-1"
                />
                <input
                  type="text"
                  name="cidade"
                  value={usuarioEditando.cidade || ''}
                  onChange={handleChangeCampo}
                  className="border rounded px-2 py-1"
                  placeholder="Cidade"
                />
                <input
                  type="text"
                  name="estado"
                  value={usuarioEditando.estado || ''}
                  onChange={handleChangeCampo}
                  className="border rounded px-2 py-1"
                  placeholder="Estado"
                />
                <button
                  onClick={handleSalvar}
                  className="bg-blue-600 text-white rounded px-4 py-2 mt-2 hover:bg-blue-700"
                >
                  Salvar
                </button>
              </div>
            ) : (
              <div>
                <p><strong>Email:</strong> {modalUsuario.email}</p>
                <p><strong>CPF:</strong> {modalUsuario.cpf}</p>
                <p><strong>Senha:</strong> {modalUsuario.senha}</p>
                <p><strong>Data de Nascimento:</strong> {modalUsuario.data_nascimento}</p>
                <p><strong>Cidade:</strong> {modalUsuario.cidade || 'Sem cidade'}</p>
                <p><strong>Estado:</strong> {modalUsuario.estado || 'Sem estado'}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
