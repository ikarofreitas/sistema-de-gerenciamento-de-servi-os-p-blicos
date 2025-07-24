import { useEffect, useState } from "react";
import { listarServicos, deletarServico, atualizarServico } from "../services/servicoService"; // ajuste o import conforme seus serviços
import AddOrganizationButton from "../components/AddOrganizationButton";

export default function Organizations() {
  const [servicos, setServicos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalServico, setModalServico] = useState(null); // serviço selecionado para modal (editar)
  const [filtroNome, setFiltroNome] = useState("");

  // Buscar serviços
  async function buscarServicos(nome = "") {
    setLoading(true);
    try {
      const lista = await listarServicos();
      if (nome) {
        const filtrados = lista.filter(s =>
          s.nome.toLowerCase().includes(nome.toLowerCase())
        );
        setServicos(filtrados);
      } else {
        setServicos(lista);
      }
    } catch {
      alert("Erro ao buscar serviços");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    buscarServicos();
  }, []);

  // Deletar serviço
  async function handleDeletar(id_servico) {
  if (!window.confirm("Confirmar exclusão do serviço?")) return;
  try {
    await deletarServico(id_servico);
    // Atualiza a lista local removendo o serviço deletado
    setServicos(servicos.filter(s => s.id_servico !== id_servico));
    // Se tiver modal aberto com esse serviço, fecha
    if (modalServico?.id_servico === id_servico) {
      setModalServico(null);
    }
  // eslint-disable-next-line no-unused-vars
  } catch (error) {
    alert("Erro ao deletar serviço");
  }
}

  // Abrir modal para editar
  function abrirModal(servico) {
    setModalServico(servico);
  }

  // Fechar modal
  function fecharModal() {
    setModalServico(null);
  }

  // Atualizar serviço no backend
  async function handleSalvarEdicao(e) {
    e.preventDefault();
    try {
      await atualizarServico(modalServico.id, modalServico);
      alert("Serviço atualizado com sucesso!");
      fecharModal();
      buscarServicos(filtroNome);
    } catch {
      alert("Erro ao atualizar serviço");
    }
  }

  // Atualizar estado do modal para os inputs editáveis
  function handleChange(e) {
    const { name, value } = e.target;
    setModalServico({ ...modalServico, [name]: value });
  }

  // Busca dinâmica por nome
  function handleFiltroNomeChange(e) {
    const valor = e.target.value;
    setFiltroNome(valor);
    buscarServicos(valor);
  }

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Serviços Públicos</h1>

      <input
        type="text"
        placeholder="Buscar por nome..."
        className="border rounded px-3 py-2 mb-4 w-full"
        value={filtroNome}
        onChange={handleFiltroNomeChange}
      />

      <AddOrganizationButton onAdd={() => buscarServicos(filtroNome)} />

      {loading ? (
        <p>Carregando...</p>
      ) : servicos.length === 0 ? (
        <p>Nenhum serviço encontrado.</p>
      ) : (
        <ul className="mt-4 border rounded divide-y">
          {servicos.map((servico) => (
            <li
              key={servico.id}
              className="p-4 flex justify-between items-center hover:bg-gray-100"
            >
              <span>{servico.nome}</span>
              <div className="flex gap-2">
                <button
                  onClick={() => abrirModal(servico)}
                  className="text-blue-600 hover:text-blue-800 font-bold px-2"
                  title="Editar"
                >
                  ✎
                </button>
                <button
                  onClick={() => handleDeletar(servico.id_servico)}
                  className="text-red-600 hover:text-red-800 font-bold px-2"
                  title="Excluir"
                >
                  ×
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      {/* Modal de edição */}
      {modalServico && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded p-6 max-w-md w-full relative overflow-auto max-h-[90vh]">
            <button
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
              onClick={fecharModal}
            >
              ×
            </button>
            <h2 className="text-xl font-bold mb-4">Editar Serviço: {modalServico.nome}</h2>
            <form onSubmit={handleSalvarEdicao} className="flex flex-col gap-3">
              <input
                type="text"
                name="nome"
                placeholder="Nome"
                value={modalServico.nome || ""}
                onChange={handleChange}
                required
                className="border rounded px-3 py-2"
              />
              <input
                type="text"
                name="horario_funcionamento"
                placeholder="Horário de Funcionamento"
                value={modalServico.horario_funcionamento || ""}
                onChange={handleChange}
                className="border rounded px-3 py-2"
              />
              <input
                type="text"
                name="telefone"
                placeholder="Telefone"
                value={modalServico.telefone || ""}
                onChange={handleChange}
                className="border rounded px-3 py-2"
              />
              <input
                type="text"
                name="rua"
                placeholder="Rua"
                value={modalServico.rua || ""}
                onChange={handleChange}
                className="border rounded px-3 py-2"
              />
              <input
                type="text"
                name="bairro"
                placeholder="Bairro"
                value={modalServico.bairro || ""}
                onChange={handleChange}
                className="border rounded px-3 py-2"
              />
              <input
                type="text"
                name="cidade"
                placeholder="Cidade"
                value={modalServico.cidade || ""}
                onChange={handleChange}
                className="border rounded px-3 py-2"
              />
              <input
                type="text"
                name="estado"
                placeholder="Estado"
                value={modalServico.estado || ""}
                onChange={handleChange}
                className="border rounded px-3 py-2"
              />
              <input
                type="text"
                name="cep"
                placeholder="CEP"
                value={modalServico.cep || ""}
                onChange={handleChange}
                className="border rounded px-3 py-2"
              />
              <input
                type="number"
                step="any"
                name="latitude"
                placeholder="Latitude"
                value={modalServico.latitude || ""}
                onChange={handleChange}
                className="border rounded px-3 py-2"
              />
              <input
                type="number"
                step="any"
                name="longitude"
                placeholder="Longitude"
                value={modalServico.longitude || ""}
                onChange={handleChange}
                className="border rounded px-3 py-2"
              />
              <input
                type="number"
                name="id_orgao"
                placeholder="ID do órgão responsável"
                value={modalServico.id_orgao || ""}
                onChange={handleChange}
                className="border rounded px-3 py-2"
              />

              <button
                type="submit"
                className="bg-blue-600 text-white rounded px-4 py-2 mt-3 hover:bg-blue-700"
              >
                Salvar alterações
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
