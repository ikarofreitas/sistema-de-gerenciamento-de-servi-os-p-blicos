import { useState } from 'react';
import { criarUsuario } from '../services/userService';

export default function AddServiceButton({ onAdd }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [newUser, setNewUser] = useState({
    nome: '',
    email: '',
    cpf: '',
    senha: '',
    data_nascimento: '',
    cidade: '',
    estado: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await criarUsuario(newUser);
      setModalOpen(false);
      setNewUser({ nome: '', email: '', cpf: '', senha: '', data_nascimento: '', cidade: '', estado: '' });
      if (onAdd) onAdd(); // chama atualização na listagem
    // eslint-disable-next-line no-unused-vars
    } catch (error) {
      alert('Erro ao adicionar usuário');
    }
  };

  return (
    <>
      <button
        className="bg-green-500 text-white px-4 py-2 rounded mb-4 hover:bg-green-600"
        onClick={() => setModalOpen(true)}
      >
        + Adicionar Usuário
      </button>

      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded p-6 w-80 relative">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              onClick={() => setModalOpen(false)}
            >
              ×
            </button>
            <h2 className="text-lg font-bold mb-4">Adicionar Usuário</h2>
            <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Nome"
                value={newUser.nome}
                onChange={e => setNewUser({ ...newUser, nome: e.target.value })}
                required
                className="rounded border px-2 py-1"
              />
              <input
                type="email"
                placeholder="Email"
                value={newUser.email}
                onChange={e => setNewUser({ ...newUser, email: e.target.value })}
                required
                className="rounded border px-2 py-1"
              />
              <input
                type="text"
                placeholder="CPF"
                value={newUser.cpf}
                onChange={e => setNewUser({ ...newUser, cpf: e.target.value })}
                required
                className="rounded border px-2 py-1"
              />
              <input
                type="password"
                placeholder="Senha"
                value={newUser.senha}
                onChange={e => setNewUser({ ...newUser, senha: e.target.value })}
                required
                className="rounded border px-2 py-1"
              />
              <input
                type="date"
                placeholder="Data de Nascimento"
                value={newUser.data_nascimento}
                onChange={e => setNewUser({ ...newUser, data_nascimento: e.target.value })}
                required
                className="rounded border px-2 py-1"
              />
              <input
                type="text"
                placeholder="Cidade"
                value={newUser.cidade}
                onChange={e => setNewUser({ ...newUser, cidade: e.target.value })}
                className="rounded border px-2 py-1"
              />
              <input
                type="text"
                placeholder="Estado"
                value={newUser.estado}
                onChange={e => setNewUser({ ...newUser, estado: e.target.value })}
                className="rounded border px-2 py-1"
              />
              <button
                type="submit"
                className="bg-green-600 text-white rounded px-3 py-1 mt-2 hover:bg-green-700"
              >
                Adicionar
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
