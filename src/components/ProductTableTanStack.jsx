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
import useMLStatus from '../pages/Integracoes/useMLStatus';

export default function ProductTableTanStack() {
  const [products, setProducts] = useState([]);
  const [pageIndex, setPageIndex] = useState(0);
  const [error, setError] = useState(null);
  const { integracao } = useParams();
  const [sorting, setSorting] = useState([]);
  const { mlConfig, loading: mlStatusLoading } = useMLStatus();
  const backendUrl = 'https://dsseller-backend-final.onrender.com';
  const PAGE_SIZE = 50;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${backendUrl}/api/anuncios/ml`);
        const data = response.data.anuncios.map((p) => {
          const lucroData = calculateLucro(p.precoVenda, p.precoCusto || 0, p.totalCostML || 0, mlConfig);
          return {
            ...p,
            precoCusto: p.precoCusto || 0,
            precoVendaMasked: formatCurrency(p.precoVenda),
            precoCustoMasked: p.precoCusto ? formatCurrency(p.precoCusto) : '',
            lucroPercentual: lucroData.lucroPercentual,
            lucroReais: lucroData.lucroReais,
            totalCostML: p.totalCostML || 0,
          };
        });
        setProducts(data);
      } catch (err) {
        setError('Erro ao carregar anúncios.');
        console.error('Erro ao carregar anúncios:', err);
      }
    };

    if (!mlStatusLoading) {
      fetchProducts();
    }
  }, [integracao, mlConfig, mlStatusLoading]);

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
          } else if (field === 'precoCusto') {
            updated.precoCusto = numericValue;
            updated.precoCustoMasked = masked;
          }

          const lucroData = calculateLucro(updated.precoVenda, updated.precoCusto, updated.totalCostML || 0, mlConfig);
          updated.lucroReais = lucroData.lucroReais;
          updated.lucroPercentual = lucroData.lucroPercentual;

          return updated;
        }
        return p;
      })
    );
  };

  const handleSavePrecoCusto = async (id, precoCusto) => {
    try {
      await axios.post(`${backendUrl}/api/mercadolivre/items/update-cost`, {
        id,
        precoCusto,
      });
    } catch (saveError) {
      console.error(`Erro ao salvar preço de custo para ${id}:`, saveError);
    }
  };

  const columns = useMemo(() => createColumns(handleMaskedChange, handleSavePrecoCusto, parseCurrency), []);
  const totalPages = Math.ceil(products.length / PAGE_SIZE);
  const paginatedData = useMemo(() => {
    const start = pageIndex * PAGE_SIZE;
    return products.slice(start, start + PAGE_SIZE);
  }, [products, pageIndex]);

  const table = useReactTable({
    data: paginatedData,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  const renderPagination = () => {
    const pages = Array.from({ length: totalPages }, (_, i) => i);
    return (
      <div className="flex justify-center gap-2 mt-4 text-sm text-gray-300">
        {pages.map((page) => (
          <button
            key={page}
            className={`px-3 py-1 rounded ${
              pageIndex === page ? 'bg-blue-600 text-white' : 'bg-gray-800 hover:bg-gray-700'
            }`}
            onClick={() => setPageIndex(page)}
          >
            {page + 1}
          </button>
        ))}
        {pageIndex < totalPages - 1 && (
          <button
            className="px-3 py-1 rounded bg-gray-800 hover:bg-gray-700"
            onClick={() => setPageIndex((prev) => prev + 1)}
          >
            Seguinte &gt;
          </button>
        )}
      </div>
    );
  };

  if (mlStatusLoading)
    return (
      <div className="bg-[#101420] text-white rounded-2xl shadow-xl p-8 text-center">
        <div className="animate-pulse">Carregando anúncios...</div>
      </div>
    );

  if (error)
    return (
      <div className="bg-[#101420] text-red-500 rounded-2xl shadow-xl p-8 text-center">
        {error}
      </div>
    );

  return (
    <div className="bg-[#101420] text-white rounded-2xl shadow-xl p-4 w-full">
      <div className="w-full overflow-auto max-h-[calc(100vh-200px)]">
        <table className="w-full table-fixed border-collapse">
          <thead className="bg-[#101420] text-gray-400 text-sm border-b border-gray-700">
            <tr className="[&>th]:py-2 [&>th]:px-4 [&>th]:border-r [&>th]:border-gray-700 [&>th:last-child]:border-r-0 [&>th]:underline">
              {table.getHeaderGroups().map((headerGroup) =>
                headerGroup.headers.map((header) => (
                  <th key={header.id}>
                    {header.isPlaceholder ? null : header.renderHeader?.()}
                  </th>
                ))
              )}
            </tr>
          </thead>
          <TableBody table={table} />
        </table>
      </div>

      {products.length > 0 && (
        <>
          {renderPagination()}
          <div className="mt-3 text-xs text-gray-400 text-center">
            Exibindo {paginatedData.length} de {products.length} anúncios • Página {pageIndex + 1} de {totalPages}
          </div>
        </>
      )}
    </div>
  );
}
