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
import ImportModule from '../components/ImportModule';
import useMLStatus from './Integracoes/useMLStatus';

export default function Anuncios() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const { integracao } = useParams();
  const [sorting, setSorting] = useState([]);
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

  const handleImportSuccess = (updates, type) => {
    // Atualizar os produtos na tabela com os dados importados
    setProducts(prevProducts => 
      prevProducts.map(product => {
        const update = updates.find(u => u.sku === product.sku);
        if (update) {
          const updatedProduct = { ...product };
          if (type === 'cost') {
            updatedProduct.precoCusto = update.precoCusto;
            updatedProduct.precoCustoMasked = formatCurrency(update.precoCusto);
          } else if (type === 'sale') {
            updatedProduct.precoVenda = update.precoVenda;
            updatedProduct.precoVendaMasked = formatCurrency(update.precoVenda);
          }
          
          // Recalcular lucro
          const lucroData = calculateLucro(updatedProduct.precoVenda, updatedProduct.precoCusto || 0, updatedProduct.totalCostML || 0, mlConfig);
          updatedProduct.lucroReais = lucroData.lucroReais;
          updatedProduct.lucroPercentual = lucroData.lucroPercentual;
          
          return updatedProduct;
        }
        return product;
      })
    );
  };

  return (
    <div className="p-4">
      {error && <div className="text-red-500 mb-4">{error}</div>}

      {/* Módulo de Importação */}
      <ImportModule onImportSuccess={handleImportSuccess} />

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
