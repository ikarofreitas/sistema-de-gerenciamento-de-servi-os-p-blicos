import { useState } from "react";

export default function AddServiceButton() {
    const [modalOpen, setModalOpen] = useState(false);
    const [services, setServices] = useState([]);
    const [newService, setNewService] = useState({ nome: "", email: "", cpf: "", password: "", data_nascimento:"", cidade: "", estado: "" });
    const [expanded, setExpanded] = useState(null);

    const handleAddService = (e) => {
        e.preventDefault();
        if (newService.nome.trim() === "") return;
        setServices([...services, newService]);
        setNewService({ nome: "", email: "", cpf: "" });
        setModalOpen(false);
    };

    return (
        <div className="flex flex-col items-center w-full">
            <button
                className="bg-green-400 gap-4 rounded-sm cursor-pointer px-5 py-1 text-white font-bold mb-4"
                onClick={() => setModalOpen(true)}
            >
                + 
            </button>

            {/* Modal */}
            {modalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded shadow-lg w-80 relative">
                        <button
                            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                            onClick={() => setModalOpen(false)}
                        >
                            ×
                        </button>
                        <h2 className="text-lg font-bold mb-4">Adicionar item</h2>
                        <form onSubmit={handleAddService} className="flex flex-col gap-2">
                            <input
                                type="text"
                                placeholder="Nome"
                                className="rounded px-2 py-1 outline-emerald-500"
                                value={newService.nome}
                                onChange={e => setNewService({ ...newService, nome: e.target.value })}
                                required
                            />
                            <textarea
                                placeholder="Email"
                                className="rounded px-2 py-1 outline-emerald-500"
                                value={newService.email}
                                onChange={e => setNewService({ ...newService, email: e.target.value })}
                                required
                            />
                            <input
                                type="text"
                                placeholder="Senha"
                                className="rounded px-2 py-1 outline-emerald-500"
                                value={newService.password}
                                onChange={e => setNewService({ ...newService, password: e.target.value })}
                                required
                            />
                            <input
                                type="Number"
                                placeholder="CPF"
                                className="rounded px-2 py-1 outline-emerald-500"
                                value={newService.cpf}
                                onChange={e => setNewService({ ...newService, cpf: e.target.value })}
                                required
                            />
                            <input
                                type="date"
                                placeholder="Data de Nascimento"
                                className="rounded px-2 py-1 outline-emerald-500"
                                value={newService.data_nascimento}
                                onChange={e => setNewService({ ...newService, data_nascimento: e.target.value })}
                                required
                            />
                            <input
                                type="text"
                                placeholder="Cidade"
                                className="rounded px-2 py-1 outline-emerald-500"
                                value={newService.cidade}
                                onChange={e => setNewService({ ...newService, cidade: e.target.value })}
                            />
                            <input
                                type="text"
                                placeholder="Estado"
                                className="rounded px-2 py-1 outline-emerald-500"
                                value={newService.estado}
                                onChange={e => setNewService({ ...newService, estado: e.target.value })}     
                            />

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

            {/* Cards dos Serviços */}
            <div className="max-w-md mr-40 mt-4 left-0">
                {services.map((service, idx) => (
                    <div
                        key={idx}
                        className="bg-white w-3xs rounded shadow p-4 cursor-pointer transition-all border border-gray-200"
                        onClick={() => setExpanded(expanded === idx ? null : idx)}
                    >
                        <div className="flex justify-between items-center">
                            <span className="font-semibold text-lg">{service.nome}</span>
                            <div className="flex items-center gap-2">
                                <span className="text-gray-400 text-xl">{expanded === idx ? "▲" : "▼"}</span>
                                <button
                                    className="ml-2 text-red-500 hover:text-red-700 font-bold text-lg"
                                    onClick={e => {
                                        e.stopPropagation();
                                        setServices(services.filter((_, i) => i !== idx));
                                        if (expanded === idx) setExpanded(null);
                                    }}
                                    title="Excluir"
                                >
                                    ×
                                </button>
                            </div>
                        </div>
                        {expanded === idx && (
                            <div className="mt-2 text-gray-700">
                                <p><strong>Email:</strong> {service.email}</p>
                                <p><strong>CPF:</strong> {service.cpf}</p>
                                <p><strong>Senha:</strong> {service.password}</p>
                                <p><strong>Data:</strong> {service.data_nascimento}</p>
                                <p><strong>Cidade:</strong> {service.cidade || "Sem cidade"}</p>
                                <p><strong>Estado:</strong> {service.estado || "Sem estado"}</p>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
} 