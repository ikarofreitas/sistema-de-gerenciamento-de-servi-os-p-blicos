import AddServiceButton from "./AddServiceButton"
import { useState } from "react";

export default function CardOrganization(){
    // Lista inicial mockada de organizações
    const [organizacoes, setOrganizacoes] = useState([
        { nome: "Hospital Municipal", tipo: "Hospital" },
        { nome: "Escola Estadual", tipo: "Escola" },
        { nome: "CRÁS Central", tipo: "Cras" },
        { nome: "Hospital Regional", tipo: "Hospital" },
        { nome: "Escola Municipal", tipo: "Escola" },
        { nome: "CRÁS Sul", tipo: "Cras" },
    ]);
    const tipos = ["Todos", "Hospital", "Escola", "Cras", "Posto de saúde"];
    const [filtro, setFiltro] = useState("Todos");
    const [modalOpen, setModalOpen] = useState(false);
    const [novaOrg, setNovaOrg] = useState({ nome: "", tipo: "Hospital" });

    // Filtra as organizações conforme o filtro selecionado
    const orgsFiltradas = filtro === "Todos"
        ? organizacoes
        : organizacoes.filter(org => org.tipo === filtro);

    // Adiciona nova organização
    const handleAddOrg = (e) => {
        e.preventDefault();
        if (novaOrg.nome.trim() === "") return;
        setOrganizacoes([...organizacoes, novaOrg]);
        setNovaOrg({ nome: "", tipo: "Hospital" });
        setModalOpen(false);
    };

    return(
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-2">
            <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg w-full max-w-md flex flex-col items-center">
                <h2 className="text-2xl font-semibold cursor-default mb-4">Organizações</h2>
                {/* Botões de filtro */}
                <div className="flex flex-wrap gap-2 mb-4 justify-center w-full">
                    {tipos.map(tipo => (
                        <button
                            key={tipo}
                            className={`px-3 py-1 rounded ${filtro === tipo ? 'bg-emerald-500 text-white' : 'bg-gray-200 text-gray-700'} font-semibold transition`}
                            onClick={() => setFiltro(tipo)}
                        >
                            {tipo}
                        </button>
                    ))}
                </div>
                {/* Lista de organizações filtradas */}
                <ul className="w-full mb-4">
                    {orgsFiltradas.length === 0 && (
                        <li className="text-center text-gray-400">Nenhuma organização encontrada.</li>
                    )}
                    {orgsFiltradas.map((org, idx) => {
                        // Encontrar o índice real na lista original para remover corretamente
                        const realIdx = organizacoes.findIndex(
                            o => o.nome === org.nome && o.tipo === org.tipo
                        );
                        return (
                            <li key={idx} className="border-b last:border-b-0 py-2 flex justify-between items-center gap-2">
                                <span className="font-medium break-words max-w-[60%]">{org.nome}</span>
                                <span className="text-xs bg-gray-100 px-2 py-0.5 rounded text-gray-600">{org.tipo}</span>
                                <button
                                    className="ml-2 text-red-500 hover:text-red-700 font-bold text-lg px-2"
                                    title="Remover"
                                    onClick={() => {
                                        setOrganizacoes(organizacoes.filter((_, i) => i !== realIdx));
                                    }}
                                >
                                    ×
                                </button>
                            </li>
                        );
                    })}
                </ul>
                {/* Botão para abrir modal de adicionar organização */}
                <button
                    className="bg-green-500 text-white rounded px-4 py-2 mb-2 hover:bg-green-600 transition w-full sm:w-auto"
                    onClick={() => setModalOpen(true)}
                >
                    + Adicionar Organização
                </button>
                {/* Modal de adicionar organização */}
                {modalOpen && (
                    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
                        <div className="bg-white p-6 rounded shadow-lg w-80 relative">
                            <button
                                className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                                onClick={() => setModalOpen(false)}
                            >
                                ×
                            </button>
                            <h2 className="text-lg font-bold mb-4">Adicionar Organização</h2>
                            <form onSubmit={handleAddOrg} className="flex flex-col gap-2">
                                <input
                                    type="text"
                                    placeholder="Nome da organização"
                                    className="rounded px-2 py-1 outline-emerald-500"
                                    value={novaOrg.nome}
                                    onChange={e => setNovaOrg({ ...novaOrg, nome: e.target.value })}
                                    required
                                />
                                <select
                                    className="rounded px-2 py-1 outline-emerald-500"
                                    value={novaOrg.tipo}
                                    onChange={e => setNovaOrg({ ...novaOrg, tipo: e.target.value })}
                                >
                                    <option value="Hospital">Hospital</option>
                                    <option value="Escola">Escola</option>
                                    <option value="Posto de saúde">Posto de Saúde</option>
                                    <option value="Cras">Cras</option>
                                </select>
                                <button
                                    type="submit"
                                    className="bg-green-500 text-white rounded px-3 py-1 mt-2 hover:bg-green-600 cursor-pointer"
                                >
                                    Adicionar
                                </button>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}