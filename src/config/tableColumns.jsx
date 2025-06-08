import React from 'react';

// Configuração das colunas da tabela de produtos
export const createColumns = (handleMaskedChange) => [
  {
    accessorKey: 'image',
    header: 'Imagem',
    cell: (info) => (
      <img
        src={info.getValue()}
        alt=""
        className="w-16 h-16 rounded-lg object-cover mx-auto block border-2 border-gray-700"
        style={{ minWidth: 48, minHeight: 48 }}
      />
    ),
    enableSorting: false,
    size: 80, // aumente se precisar de mais espaço para a miniatura
  },
  {
    accessorKey: 'sku',
    header: 'SKU',
    cell: (info) => (
      <div className="w-full border-b-2 border-white px-1 py-1 text-center text-xs truncate">
        {info.getValue()}
      </div>
    ),
    enableSorting: false,
    size: 80,
  },
  {
    accessorKey: 'estoque',
    header: () => <div className="text-center w-full">Estoque</div>,
    cell: (info) => (
      <div className="w-full border-b-2 border-indigo-400 px-1 py-1 text-center text-xs">
        {info.getValue()}
      </div>
    ),
    enableSorting: true,
    size: 60,
  },
  {
    accessorKey: 'title',
    header: 'Título',
    cell: (info) => (
      <div className="w-full break-words leading-tight text-xs" style={{
        display: '-webkit-box',
        WebkitLineClamp: 2,
        WebkitBoxOrient: 'vertical',
        overflow: 'hidden',
        lineHeight: '1.2'
      }} title={info.getValue()}>
        {info.getValue()}
      </div>
    ),
    enableSorting: false,
    size: 200,
  },
  {
    accessorKey: 'precoVendaMasked',
    header: 'Preço',
    cell: (info) => (
      <input
        type="text"
        value={info.getValue()}
        onChange={(e) => handleMaskedChange(info.row.original.id, 'precoVenda', e.target.value)}
        className="w-full text-center bg-transparent border-b-2 border-cyan-500 focus:outline-none py-1 text-xs"
        inputMode="numeric"
      />
    ),
    enableSorting: true,
    size: 80,
  },
  {
    accessorKey: 'precoCustoMasked',
    header: 'Custo',
    cell: (info) => (
      <input
        type="text"
        value={info.getValue()}
        onChange={(e) => handleMaskedChange(info.row.original.id, 'precoCusto', e.target.value)}
        className="w-full text-center bg-transparent border-b-2 border-yellow-400 focus:outline-none py-1 text-xs"
        inputMode="numeric"
      />
    ),
    enableSorting: false,
    size: 80,
  },
  {
    accessorKey: 'lucroPercentual',
    header: 'Lucro%',
    cell: (info) => (
      <div className="w-full border-b-2 border-green-500 px-1 py-1 text-center text-xs">
        {info.getValue()}
      </div>
    ),
    enableSorting: true,
    size: 60,
  },
  {
    accessorKey: 'lucroReais',
    header: 'Lucro',
    cell: (info) => (
      <div className="w-full border-b-2 border-blue-500 px-1 py-1 text-center text-xs truncate">
        {info.getValue()}
      </div>
    ),
    enableSorting: false,
    size: 80,
  },
  {
    accessorKey: 'lucroTotal',
    header: 'Total',
    cell: (info) => (
      <div className="w-full border-b-2 border-purple-500 px-1 py-1 text-center text-xs truncate">
        {info.getValue()}
      </div>
    ),
    enableSorting: false,
    size: 90,
  },
  {
    accessorKey: 'visitas',
    header: () => <div className="text-center w-full">Visitas</div>,
    cell: (info) => (
      <div className="w-full border-b-2 border-pink-500 px-1 py-1 text-center text-xs font-medium">
        {info.getValue() || 0}
      </div>
    ),
    enableSorting: true,
    size: 70,
  },
  {
    accessorKey: 'vendas',
    header: () => <div className="text-center w-full">Vendas</div>,
    cell: (info) => (
      <div className="w-full border-b-2 border-orange-500 px-1 py-1 text-center text-xs font-medium">
        {info.getValue() || 0}
      </div>
    ),
    enableSorting: true,
    size: 70,
  },
];
