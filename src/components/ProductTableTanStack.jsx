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
        const response = await axios.get(`${backendUrl}/api/mercadolivre/items`);

        const data = response.data.map((p) => {
          // Assumindo que o backend agora retorna sale_fee_amount
          const lucroData = calculateLucro(p.precoVenda, p.precoCusto || 0, p.sale_fee_amount || 0, mlConfig);
          return {
            ...p,
            precoCusto: p.precoCusto || 0, // Garante que precoCusto seja um número
            precoVendaMasked: formatCurrency(p.precoVenda),
            precoCustoMasked: formatCurrency(p.precoCusto || 0),
            lucroPercentual: lucroData.lucroPercentual,
            lucroReais: lucroData.lucroReais,
          };
        });
        setProducts(data);
      } catch (err) {
        setError('Erro ao carregar anúncios.');
      }
    };

    // Remover a verificação de mlConfig.premium e mlConfig.classico
    if (!mlStatusLoading) {
      fetchProducts();
    }
  }, [integracao, mlConfig, mlStatusLoading]);

  const handleMaskedChange = async (id, field, rawValue) => {
    const numericValue = parseCurrency(rawValue);
    const masked = formatCurrency(rawValue);

    let updatedProduct = null; 

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

          // Usar p.sale_fee_amount para o cálculo de lucro
          const lucroData = calculateLucro(updated.precoVenda, updated.precoCusto, updated.sale_fee_amount || 0, mlConfig);
          updated.lucroReais = lucroData.lucroReais;
          updated.lucroPercentual = lucroData.lucroPercentual;
          
          updatedProduct = updated; 
          return updated;
        }
        return p;
      })
    );

    if (field === 'precoCusto' && updatedProduct) {
      try {
        await axios.post(`${backendUrl}/api/mercadolivre/items/update-cost`, {
          id: updatedProduct.id,
          precoCusto: updatedProduct.precoCusto,
        });
        console.log(`Preço de custo para ${updatedProduct.id} salvo com sucesso.`);
      } catch (saveError) {
        console.error(`Erro ao salvar preço de custo para ${updatedProduct.id}:`, saveError);
      }
    }
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


