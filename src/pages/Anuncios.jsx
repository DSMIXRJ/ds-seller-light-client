import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import ImportModule from '../components/ImportModule';

export default function Anuncios() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const { integracao } = useParams();

  useEffect(() => {
    if (integracao === 'ml') {
      setProducts([
        { 
          id: "MLB123456789", 
          title: "Produto de Exemplo 1", 
          sku: "EXEMPLO001",
          price: 99.90,
          precoCusto: 0,
          precoVenda: 99.90
        },
        { 
          id: "MLB987654321", 
          title: "Produto de Exemplo 2", 
          sku: "EXEMPLO002",
          price: 149.90,
          precoCusto: 0,
          precoVenda: 149.90
        }
      ]);
      setError('Usando dados simulados - Integração com Mercado Livre não configurada');
    }
  }, [integracao]);

  const handleImportSuccess = (updates, type) => {
    // Atualizar os produtos na tabela com os dados importados
    setProducts(prevProducts => 
      prevProducts.map(product => {
        const update = updates.find(u => u.sku === product.sku);
        if (update) {
          const updatedProduct = { ...product };
          if (type === 'cost') {
            updatedProduct.precoCusto = update.precoCusto;
          } else if (type === 'sale') {
            updatedProduct.precoVenda = update.precoVenda;
          }
          return updatedProduct;
        }
        return product;
      })
    );
  };

  return (
    <MainLayout activePage="anuncios">
      <div className="p-4">
        <h1 className="text-2xl font-bold text-cyan-400 mb-4">Anúncios do Mercado Livre</h1>
        
        {error && <div className="text-yellow-500 mb-4 text-sm">{error}</div>}

        {/* Módulo de Importação */}
        <ImportModule onImportSuccess={handleImportSuccess} />

        {/* Tabela simples */}
        <div className="overflow-x-auto bg-zinc-900 rounded-xl p-4 shadow mt-6">
          <table className="min-w-full divide-y divide-zinc-700">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-zinc-300 uppercase tracking-wider">
                  ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-zinc-300 uppercase tracking-wider">
                  Título
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-zinc-300 uppercase tracking-wider">
                  SKU
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-zinc-300 uppercase tracking-wider">
                  Preço Venda
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-zinc-300 uppercase tracking-wider">
                  Preço Custo
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-700">
              {products.map((product) => (
                <tr key={product.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-zinc-300">
                    {product.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-zinc-300">
                    {product.title}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-zinc-300">
                    {product.sku}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-zinc-300">
                    R$ {product.precoVenda.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-zinc-300">
                    R$ {product.precoCusto.toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </MainLayout>
  );
}

