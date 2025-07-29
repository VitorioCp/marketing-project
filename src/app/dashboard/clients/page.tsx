'use client';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from '@/components/ui/table';
import { useEffect, useState } from 'react';
import { ModalEditClient } from '@/components/clients/ModalEditClient';

export default function Clients() {
  const [clientes, setClientes] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [formData, setFormData] = useState({
    id: '',
    nome: '',
    telefone: '',
    email: '',
    etapa: '',
  });

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedClients, setSelectedClients] = useState<string[]>([]);
  const [selectionMode, setSelectionMode] = useState(false);

  const fetchClientes = async () => {
    const res = await fetch('/api/clients');
    const data = await res.json();
    setClientes(data);
  };

  useEffect(() => {
    fetchClientes();
  }, []);

  const filteredClients = clientes.filter((cliente: any) => {
    const termo = searchTerm.toLowerCase();
    return (
      cliente.nome.toLowerCase().includes(termo) ||
      cliente.telefone.toLowerCase().includes(termo) ||
      cliente.email.toLowerCase().includes(termo) ||
      cliente.etapa.toLowerCase().includes(termo)
    );
  });

  const toggleSelectClient = (id: string) => {
    setSelectedClients((prev) =>
      prev.includes(id) ? prev.filter((cid) => cid !== id) : [...prev, id]
    );
  };

  const handleDeleteSelected = async () => {
    try {
      await Promise.all(
        selectedClients.map((id) =>
          fetch(`/api/clients`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id }),
          })
        )
      );
      setSelectedClients([]);
      setSelectionMode(false);
      fetchClientes();
    } catch (error) {
      console.error('Erro ao deletar clientes:', error);
    }
  };

  const modalClient = () => {
    setShowModal(!showModal);
  };

  const openEditModal = (cliente: any) => {
    setFormData({
      id: cliente.id,
      nome: cliente.nome,
      telefone: cliente.telefone,
      email: cliente.email,
      etapa: cliente.etapa,
    });
    setShowEditModal(true);
  };

  const clientRegister = async (e: any) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/clients', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      console.log('Cliente cadastrado:', data);
      await fetchClientes();
      setShowModal(false);
    } catch (error) {
      console.error('Error registering client:', error);
    }
  };

  const clientUpdate = async (e: any) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/clients', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      console.log('Cliente atualizado:', data);
      closeEditModal()
      await fetchClientes();
      setShowEditModal(false);
    } catch (error) {
      console.error('Error updating client:', error);
    }
  };

  const closeEditModal = () => {
  setShowEditModal(false);
  setFormData({
    id: '',
    nome: '',
    telefone: '',
    email: '',
    etapa: '',
  });
};

  
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-6">Clientes</h1>

      <div className="flex flex-wrap gap-2 w-full mb-6 items-center">
        <Input
          placeholder="🔍 Buscar..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="bg-white rounded-full px-4 py-2 flex-grow shadow-sm"
        />

        <div className="flex gap-2 justify-end w-full">
          {!selectionMode ? (
            <Button
              onClick={() => setSelectionMode(true)}
              className="bg-gray-100 text-black rounded-full px-4 py-2 hover:shadow transition"
            >
              🖉
            </Button>
          ) : (
            <>
              <Button
                onClick={handleDeleteSelected}
                disabled={selectedClients.length === 0}
                className="bg-red-500 text-white rounded-full px-4 py-2 hover:shadow transition"
              >
                🗑️
              </Button>
              <Button
                onClick={() => {
                  setSelectionMode(false);
                  setSelectedClients([]);
                }}
                className="bg-gray-200 text-black rounded-full px-4 py-2 hover:shadow transition"
              >
                ✕
              </Button>
            </>
          )}

          <Button
            onClick={modalClient}
            className="bg-blue-600 text-white rounded-full px-4 py-2 hover:shadow transition"
          >
            ➕
          </Button>
        </div>
      </div>

      <div className="overflow-x-auto rounded-lg border shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              {selectionMode && <TableHead className="w-10">✔️</TableHead>}
              <TableHead>Nome</TableHead>
              <TableHead>Telefone</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Etapa</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredClients.map((cliente: any) => (
              <TableRow
                key={cliente.id}
                className={`transition hover:bg-gray-50 cursor-pointer ${
                  selectedClients.includes(cliente.id) ? 'bg-gray-100' : ''
                }`}
                onClick={() => {
                  if (!selectionMode) {
                    openEditModal(cliente);
                  }
                }}
              >
                {selectionMode && (
                  <TableCell onClick={(e) => e.stopPropagation()}>
                    <input
                      type="checkbox"
                      checked={selectedClients.includes(cliente.id)}
                      onChange={() => toggleSelectClient(cliente.id)}
                      className="accent-blue-600 scale-110"
                    />
                  </TableCell>
                )}
                <TableCell>{cliente.nome}</TableCell>
                <TableCell>{cliente.telefone}</TableCell>
                <TableCell>{cliente.email}</TableCell>
                <TableCell>{cliente.etapa}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Adicionar Cliente</h2>
            <form className="space-y-4" onSubmit={clientRegister}>
              <Input
                placeholder="Nome"
                value={formData.nome}
                onChange={(e) =>
                  setFormData({ ...formData, nome: e.target.value })
                }
                className="rounded-full px-4 py-2 shadow"
              />
              <Input
                placeholder="Telefone"
                value={formData.telefone}
                onChange={(e) =>
                  setFormData({ ...formData, telefone: e.target.value })
                }
                className="rounded-full px-4 py-2 shadow"
              />
              <Input
                placeholder="Email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="rounded-full px-4 py-2 shadow"
              />
              <Input
                placeholder="Etapa"
                value={formData.etapa}
                onChange={(e) =>
                  setFormData({ ...formData, etapa: e.target.value })
                }
                className="rounded-full px-4 py-2 shadow"
              />
              <div className="flex justify-end gap-2">
                <Button
                  variant="outline"
                  onClick={() => setShowModal(false)}
                  className="rounded-full px-4 py-2"
                >
                  Cancelar
                </Button>
                <Button
                  type="submit"
                  className="bg-blue-600 text-white rounded-full px-4 py-2"
                >
                  Salvar
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      <ModalEditClient showEditModal={showEditModal} clientUpdate={clientUpdate} setShowEditModal={closeEditModal} formData={formData} setFormData={setFormData}/>
    </div>
  );
}