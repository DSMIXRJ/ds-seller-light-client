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
  const [error, setError] = useState(null);
  const { integracao } = useParams();
  const [sorting, setSorting] = useState([]);
  const { mlConfig, loading: mlStatusLoading } = useMLStatus(); // Obter mlConfig e o estado de loading do useMLStatus

  const backendUrl = 'https://dsseller-backend-final.onrender.com'; // Definir backendUrl aqui

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${backendUrl}/api/anuncios/ml`);
        console.log('Frontend: Dados brutos recebidos do backend:', response.data);

        const data = response.data.map((p) => {
          console.log(`Frontend: Processando item ${p.id} - precoCusto: ${p.precoCusto}, totalCostML: ${p.totalCostML}`);
          // Usar p.totalCostML que vem do backend
          const lucroData = calculateLucro(p.precoVenda, p.precoCusto || 0, p.totalCostML || 0, mlConfig);
          return {
            ...p,
            precoCusto: p.precoCusto || 0, // Garante que precoCusto seja um número
            precoVendaMasked: formatCurrency(p.precoVenda),
            precoCustoMasked: p.precoCusto ? formatCurrency(p.precoCusto) : '', // Inicializa como vazio se 0 ou null
            lucroPercentual: lucroData.lucroPercentual,
            lucroReais: lucroData.lucroReais,
            totalCostML: p.totalCostML || 0, // Garantir que totalCostML esteja presente
          };
        });
        setProducts(data);
        console.log('Frontend: Produtos processados para exibição:', data);
      } catch (err) {
        setError('Erro ao carregar anúncios.');
        console.error('Frontend: Erro ao carregar anúncios:', err);
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
            console.log(`Frontend: precoCusto alterado para ${id}: ${numericValue}`);
          }

          // Usar updated.totalCostML para o cálculo de lucro
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
    console.log(`Frontend: Tentando salvar precoCusto para ${id}: ${precoCusto}`);
    try {
      await axios.post(`${backendUrl}/api/anuncios/ml/update-cost`, {
        id: id,
        precoCusto: precoCusto,
      });
      console.log(`Frontend: Preço de custo para ${id} salvo com sucesso.`);
    } catch (saveError) {
      console.error(`Frontend: Erro ao salvar preço de custo para ${id}:`, saveError);
    }
  };

  const columns = useMemo(() => createColumns(handleMaskedChange, handleSavePrecoCusto, parseCurrency), []);

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

  if (mlStatusLoading) return (
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


