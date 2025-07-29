'use client'
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { useState } from 'react';

interface ClientData {
  id: string;
  nome: string;
  telefone: string;
  email: string;
  etapa: string;
}

interface ModalEditClientProps {
  showEditModal: boolean;
  clientUpdate: (e: React.FormEvent) => void;
  setShowEditModal: (show: boolean) => void;
  formData: ClientData;
  setFormData: (data: ClientData) => void;
}

export const ModalEditClient = ({
  showEditModal,
  clientUpdate,
  setShowEditModal,
  formData,
  setFormData,
}: ModalEditClientProps) => {
  if (!showEditModal) return null;

  const [activeTab, setActiveTab] = useState<'dados' | 'interacoes'>('dados');

  const [interacoes, setInteracoes] = useState([
    {
      tipo: 'Ligação',
      descricao:
        'Cliente interessado no produto premium. Solicitou orçamento detalhado.',
      data: '14/01/2024',
      hora: '14:30',
    },
    {
      tipo: 'E-Mail',
      descricao:
        'Enviado proposta comercial com desconto de 10% para fechamento até o final do mês.',
      data: '11/01/2024',
      hora: '09:15',
    },
    {
      tipo: 'Reunião',
      descricao:
        'Reunião de apresentação do produto. Cliente demonstrou interesse, mas precisa de aprovação interna.',
      data: '09/01/2024',
      hora: '16:00',
    },
  ]);

  const [novaInteracao, setNovaInteracao] = useState({
    tipo: 'Anotação',
    descricao: '',
  });

  const adicionarInteracao = () => {
    if (!novaInteracao.descricao.trim()) return;

    const agora = new Date();
    const data = agora.toLocaleDateString('pt-BR');
    const hora = agora.toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit',
    });

    const nova = {
      tipo: novaInteracao.tipo,
      descricao: novaInteracao.descricao,
      data,
      hora,
    };

    setInteracoes([nova, ...interacoes]);
    setNovaInteracao({ tipo: 'Anotação', descricao: '' });
  };

  const tipoBadgeStyle = (tipo: string) => {
    switch (tipo) {
      case 'Ligação':
        return 'bg-blue-100 text-blue-700';
      case 'E-Mail':
        return 'bg-green-100 text-green-700';
      case 'Reunião':
        return 'bg-purple-100 text-purple-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-4xl">
        <h2 className="text-xl font-bold mb-1">Detalhes do Cliente</h2>
        <p className="text-sm text-gray-500 mb-4">
          Gerencie as informações e interações do cliente
        </p>

        <div className="bg-gray-200 h-12 justify-center items-center flex p-1 rounded-sm">
          <button
            type="button"
            onClick={() => setActiveTab('dados')}
            className={`w-1/2 px-4 py-2 border rounded-xs ${
              activeTab === 'dados' ? 'bg-gray-200 font-semibold' : 'bg-white'
            }`}
          >
            Dados Básicos
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('interacoes')}
            className={`w-1/2 px-4 py-2 border rounded-xs ${
              activeTab === 'interacoes'
                ? 'bg-gray-200 font-semibold'
                : 'bg-white'
            }`}
          >
            Interações
          </button>
        </div>

        <form className="space-y-4 mt-4" onSubmit={clientUpdate}>
          {activeTab === 'dados' ? (
            <>
              <div className="flex gap-2">
                <div className="flex flex-col gap-2 w-1/2">
                  <label>Nome</label>
                  <Input
                    name="nome"
                    placeholder="Nome"
                    value={formData.nome}
                    onChange={handleChange}
                    className="rounded-full px-4 py-2 shadow"
                  />
                  <label>Telefone</label>
                  <Input
                    name="telefone"
                    placeholder="Telefone"
                    value={formData.telefone}
                    onChange={handleChange}
                    className="rounded-full px-4 py-2 shadow"
                  />
                </div>

                <div className="flex flex-col gap-2 w-1/2">
                  <label>Email</label>
                  <Input
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    className="rounded-full px-4 py-2 shadow"
                  />
                  <label>Etapa</label>
                  <Input
                    name="etapa"
                    placeholder="Etapa"
                    value={formData.etapa}
                    onChange={handleChange}
                    className="rounded-full px-4 py-2 shadow"
                  />
                </div>
              </div>

              <label>Observações</label>
              <textarea className="border w-full p-2" />
            </>
          ) : (
            <div className="p-4 border rounded">
              <h3 className="text-lg font-semibold mb-2">
                Histórico de Interações
              </h3>

              <div className="border p-4 rounded mb-4">
                <p className="font-semibold mb-2 flex items-center gap-2">
                  <span className="text-xl">➕</span> Nova Interação
                </p>
                <div className="flex gap-2 mb-2">
                  <select
                    value={novaInteracao.tipo}
                    onChange={(e) =>
                      setNovaInteracao({
                        ...novaInteracao,
                        tipo: e.target.value,
                      })
                    }
                    className="border rounded p-2 w-1/3"
                  >
                    <option>Anotação</option>
                    <option>Ligação</option>
                    <option>E-Mail</option>
                    <option>Reunião</option>
                  </select>

                  <textarea
                    value={novaInteracao.descricao}
                    onChange={(e) =>
                      setNovaInteracao({
                        ...novaInteracao,
                        descricao: e.target.value,
                      })
                    }
                    placeholder="Descreva a interação..."
                    className="border rounded p-2 w-full"
                  />
                </div>
                <Button
                  type="button"
                  onClick={adicionarInteracao}
                  className="bg-black text-white rounded-full px-4 py-2"
                >
                  Adicionar Interação
                </Button>
              </div>
              <div className="max-h-72 overflow-y-auto pr-2 space-y-3">
                {interacoes.map((item, index) => (
                  <div
                    key={index}
                    className="border rounded p-4 flex justify-between items-start"
                  >
                    <div>
                      <span
                        className={`text-sm font-semibold px-3 py-1 rounded-full inline-block mb-1 ${tipoBadgeStyle(
                          item.tipo
                        )}`}
                      >
                        {item.tipo}
                      </span>
                      <p className="text-sm">{item.descricao}</p>
                    </div>
                    <div className="text-sm text-gray-400 whitespace-nowrap">
                      {item.data} às {item.hora}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="flex justify-end gap-2">
            <Button
              variant="outline"
              type="button"
              onClick={() => setShowEditModal(false)}
              className="rounded-full px-4 py-2"
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              className="bg-blue-600 text-white rounded-full px-4 py-2"
            >
              Atualizar
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
