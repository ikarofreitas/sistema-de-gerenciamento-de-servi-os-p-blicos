import { useState } from "react";
import { criarServico } from "../services/servicoService";

export default function AddOrganization({ onAdd }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [novoServico, setNovoServico] = useState({
    nome: "",
    horario_funcionamento: "",
    telefone: "",
    rua: "",
    bairro: "",
    cidade: "",
    estado: "",
    cep: "",
    id_orgao: "",
    latitude: "",
    longitude: "",
  });
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    if (!novoServico.nome.trim()) {
      alert("O campo nome é obrigatório");
      return;
    }

    setLoading(true);
    try {
      // Ajusta tipos numéricos que possam ser vazios para null
      const dadosParaEnviar = {
        ...novoServico,
        id_orgao: novoServico.id_orgao ? Number(novoServico.id_orgao) : null,
        latitude: novoServico.latitude ? Number(novoServico.latitude) : null,
        longitude: novoServico.longitude ? Number(novoServico.longitude) : null,
      };

      await criarServico(dadosParaEnviar);

      alert("Serviço criado com sucesso!");
      setModalOpen(false);
      setNovoServico({
        nome: "",
        horario_funcionamento: "",
        telefone: "",
        rua: "",
        bairro: "",
        cidade: "",
        estado: "",
        cep: "",
        id_orgao: "",
        latitude: "",
        longitude: "",
      });

      if (onAdd) onAdd();
    } catch (error) {
      console.error(error);
      alert("Erro ao criar serviço");
    } finally {
      setLoading(false);
    }
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setNovoServico({ ...novoServico, [name]: value });
  }

  return (
    <>
      <button
        onClick={() => setModalOpen(true)}
        className="bg-green-500 text-white rounded px-4 py-2 mb-4 hover:bg-green-600"
      >
        + Adicionar Serviço
      </button>

      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg w-96 relative max-h-[90vh] overflow-auto">
            <button
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
              onClick={() => setModalOpen(false)}
            >
              ×
            </button>
            <h2 className="text-xl font-bold mb-4">Novo Serviço Público</h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <input
                type="text"
                name="nome"
                placeholder="Nome *"
                value={novoServico.nome}
                onChange={handleChange}
                required
                className="border rounded px-3 py-2"
              />
              <input
                type="text"
                name="horario_funcionamento"
                placeholder="Horário de Funcionamento"
                value={novoServico.horario_funcionamento}
                onChange={handleChange}
                className="border rounded px-3 py-2"
              />
              <input
                type="text"
                name="telefone"
                placeholder="Telefone"
                value={novoServico.telefone}
                onChange={handleChange}
                className="border rounded px-3 py-2"
              />
              <input
                type="text"
                name="rua"
                placeholder="Rua"
                value={novoServico.rua}
                onChange={handleChange}
                className="border rounded px-3 py-2"
              />
              <input
                type="text"
                name="bairro"
                placeholder="Bairro"
                value={novoServico.bairro}
                onChange={handleChange}
                className="border rounded px-3 py-2"
              />
              <input
                type="text"
                name="cidade"
                placeholder="Cidade"
                value={novoServico.cidade}
                onChange={handleChange}
                className="border rounded px-3 py-2"
              />
              <input
                type="text"
                name="estado"
                placeholder="Estado"
                value={novoServico.estado}
                onChange={handleChange}
                className="border rounded px-3 py-2"
              />
              <input
                type="text"
                name="cep"
                placeholder="CEP"
                value={novoServico.cep}
                onChange={handleChange}
                className="border rounded px-3 py-2"
              />
              <input
                type="number"
                name="id_orgao"
                placeholder="ID do órgão responsável"
                value={novoServico.id_orgao}
                onChange={handleChange}
                className="border rounded px-3 py-2"
              />
              <input
                type="number"
                step="any"
                name="latitude"
                placeholder="Latitude"
                value={novoServico.latitude}
                onChange={handleChange}
                className="border rounded px-3 py-2"
              />
              <input
                type="number"
                step="any"
                name="longitude"
                placeholder="Longitude"
                value={novoServico.longitude}
                onChange={handleChange}
                className="border rounded px-3 py-2"
              />

              <button
                type="submit"
                disabled={loading}
                className={`bg-green-600 text-white rounded px-4 py-2 hover:bg-green-700 ${
                  loading ? "opacity-60 cursor-not-allowed" : ""
                }`}
              >
                {loading ? "Salvando..." : "Salvar"}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
