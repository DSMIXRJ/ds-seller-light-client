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

export default function Anuncios() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const { integracao } = useParams();
  const [sorting, setSorting] = useState([]);

  const backendUrl = 'http://localhost:3001';

  // Configuração padrão do ML
  const mlConfig = {
    margemMinima: 10,
    margemMaxima: 50,
    imposto: 5,
    extras: 2,
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Usar dados simulados para demonstração
        const simulatedData = [
          {
            id: "MLB123456789",
            title: "Produto de Exemplo 1",
            image: "https://via.placeholder.com/150",
            sku: "EXEMPLO001",
            estoque: 10,
            visitas: 150,
            vendas: 5,
            price: 99.90,
            precoVenda: 99.90,
            precoCusto: 0,
            totalCostML: 0
          },
          {
            id: "MLB987654321",
            title: "Produto de Exemplo 2",
            image: "https://via.placeholder.com/150",
            sku: "EXEMPLO002",
            estoque: 25,
            visitas: 89,
            vendas: 2,
            price: 149.90,
            precoVenda: 149.90,
            precoCusto: 0,
            totalCostML: 0
          }
        ];
        
        // Processar dados para incluir campos mascarados
        const processedData = simulatedData.map((p) => {
          const lucroData = calculateLucro(p.precoVenda || p.price, p.precoCusto || 0, p.totalCostML || 0, mlConfig);
          return {
            ...p,
            precoCusto: p.precoCusto || 0,
            precoVenda: p.precoVenda || p.price,
            precoVendaMasked: formatCurrency(p.precoVenda || p.price),
            precoCustoMasked: p.precoCusto ? formatCurrency(p.precoCusto) : '',
            lucroPercentual: lucroData.lucroPercentual,
            lucroReais: lucroData.lucroReais,
            totalCostML: p.totalCostML || 0,
          };
        });
        
        setProducts(processedData);
        setError('Usando dados simulados - Integração com Mercado Livre não configurada');
      } catch (err) {
        console.error(err);
        setError('Erro ao carregar anúncios.');
      }
    };
    
    if (integracao === 'ml') fetchProducts();
  }, [integracao]);

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

  const columns = useMemo(() => createColumns(handleMaskedChange, handleSavePrecoCusto), []);

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
      {error && <div className="text-yellow-500 mb-4 text-sm">{error}</div>}

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

