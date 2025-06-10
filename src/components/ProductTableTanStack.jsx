import React, { useState, useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
} from '@tanstack/react-table';
import { formatCurrency, parseCurrency, calculateLucro } from '../utils/formatters';
import { createColumns } from '../config/tableColumns.jsx';
import TableHeader from './TableHeader';
import TableBody from './TableBody';
import useMLStatus from '../pages/Integracoes/useMLStatus'; // Importar useMLStatus

export default function ProductTableTanStack() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { integracao } = useParams();
  const [sorting, setSorting] = useState([]);
  const { mlConfig } = useMLStatus(); // Obter mlConfig

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const backendUrl = 'https://dsseller-backend-final.onrender.com';
        const response = await axios.get(`${backendUrl}/api/mercadolivre/items`);

        const data = response.data.map((p) => {
          const tipoAnuncio = p.listing_type_id === 'gold_premium' ? 'premium' : 'classico'; // Assumindo listing_type_id
          const lucroData = calculateLucro(p.precoVenda, 0, tipoAnuncio, mlConfig);
          return {
            ...p,
            precoCusto: 0,
            precoVendaMasked: formatCurrency(p.precoVenda),
            precoCustoMasked: '',
            lucroPercentual: lucroData.lucroPercentual,
            lucroReais: lucroData.lucroReais,
            tipoAnuncio: tipoAnuncio, // Adicionar tipoAnuncio ao estado do produto
          };
        });
        setProducts(data);
        setLoading(false);
      } catch (err) {
        setError('Erro ao carregar anúncios.');
        setLoading(false);
      }
    };

    if (mlConfig.premium !== "" && mlConfig.classico !== "") { // Só buscar produtos se a config estiver carregada
      fetchProducts();
    }
  }, [integracao, mlConfig]); // Adicionar mlConfig como dependência

  const handleMaskedChange = (id, field, rawValue) => {
    const numericValue = parseCurrency(rawValue);
    const masked = formatCurrency(rawValue);

    setProducts((prev) =>
      prev.map((p) => {
        if (p.id === id) {
          const updated = { ...p };

          if (field === 'precoVenda') {
            updated.precoVenda = numericValue;
            updated.precoVendaMasked = masked;
          }

          if (field === 'precoCusto') {
            updated.precoCusto = numericValue;
            updated.precoCustoMasked = masked;
          }

          const lucroData = calculateLucro(updated.precoVenda, updated.precoCusto, updated.tipoAnuncio, mlConfig);
          updated.lucroReais = lucroData.lucroReais;
          updated.lucroPercentual = lucroData.lucroPercentual;

          return updated;
        }
        return p;
      })
    );
  };

  const columns = useMemo(() => createColumns(handleMaskedChange), []);

  const table = useReactTable({
    data: products,
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  if (loading) return (
    <div className="bg-[#101420] text-white rounded-2xl shadow-xl p-8 text-center">
      <div className="animate-pulse">Carregando anúncios...</div>
    </div>
  );
  
  if (error) return (
    <div className="bg-[#101420] text-red-500 rounded-2xl shadow-xl p-8 text-center">
      {error}
    </div>
  );

  return (
    <div className="bg-[#101420] text-white rounded-2xl shadow-xl p-4 w-full">
      <div className="w-full overflow-auto max-h-[calc(100vh-200px)]">
        <table className="w-full table-fixed border-collapse">
          <TableHeader table={table} />
          <TableBody table={table} />
        </table>
      </div>
      
      {products.length > 0 && (
        <div className="mt-3 text-xs text-gray-400 text-center">
          Exibindo {products.length} anúncios • Tabela com TanStack React Table • Cabeçalho fixo e ordenação ativa
        </div>
      )}
    </div>
  );
}


