import { useState, useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
} from '@tanstack/react-table';
import { formatCurrency, parseCurrency, calculateLucro } from '../utils/formatters';
import { createColumns } from '../config/tableColumns.jsx';
import TableHeader from '../components/TableHeader';
import TableBody from '../components/TableBody';
import useMLStatus from './Integracoes/useMLStatus';
import BulkActionsMenu from '../components/BulkActionsMenu';
import BulkActionModal from '../components/BulkActionModal';

export default function Anuncios() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const { integracao } = useParams();
  const [sorting, setSorting] = useState([]);
  const [modalTipo, setModalTipo] = useState(null);
  const { mlConfig, loading: mlStatusLoading } = useMLStatus();

  const backendUrl = 'https://dsseller-backend-final.onrender.com';

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${backendUrl}/api/anuncios/${integracao}`);
        setProducts(response.data);
      } catch (err) {
        console.error(err);
        setError('Erro ao carregar anúncios.');
      }
    };
    if (integracao) fetchProducts();
  }, [integracao]);

  const columns = useMemo(() => createColumns(products, setProducts), [products]);

  const table = products.length
    ? useReactTable({
        data: products,
        columns,
        state: { sorting },
        onSortingChange: setSorting,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
      })
    : null;

  const handleExecutarConfirmado = (dados) => {
    console.log('Executar ação:', dados);
    // Aqui entra o backend real depois
  };

  return (
    <div className="p-4 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold text-white">📦 Anúncios</h1>
        <BulkActionsMenu onAction={(tipo) => setModalTipo(tipo)} />
      </div>

      <BulkActionModal
        isOpen={!!modalTipo}
        onClose={() => setModalTipo(null)}
        tipoAcao={modalTipo}
        onSubmit={handleExecutarConfirmado}
      />

      {error && <div className="text-red-500">{error}</div>}

      {table && (
        <div className="overflow-x-auto bg-zinc-900 rounded-xl p-4 shadow">
          <table className="min-w-full divide-y divide-zinc-700">
            <TableHeader headerGroups={table.getHeaderGroups()} />
            <TableBody rows={table.getRowModel().rows} />
          </table>
        </div>
      )}
    </div>
  );
}
