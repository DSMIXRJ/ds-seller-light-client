import React from 'react';

// Configuração das colunas da tabela de produtos
export const createColumns = (handleMaskedChange) => [
  {
    accessorKey: 'image',
    header: 'Imagem',
    cell: (info) => (
      <img src={info.getValue()} alt="" className="w-8 h-8 rounded object-cover" />
    ),
    enableSorting: false,
    size: 60,
  },
  {
    accessorKey: 'sku',
    header: 'SKU',
    cell: (info) => (
      <div className="inline-block border-b-2 border-white px-1 py-1 text-center text-xs truncate w-full">
        {info.getValue()}
      </div>
    ),
    enableSorting: false,
    size: 80,
  },
  {
    accessorKey: 'estoque',
    header: 'Estoque',
    cell: (info) => (
      <div className="inline-block border-b-2 border-indigo-400 px-1 py-1 text-center text-xs">
        {info.getValue()}
      </div>
    ),
    enableSorting: true,
    size: 50,
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
      <div className="inline-block border-b-2 border-green-500 px-1 py-1 text-center text-xs">
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
      <div className="inline-block border-b-2 border-blue-500 px-1 py-1 text-center text-xs truncate w-full">
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
      <div className="inline-block border-b-2 border-purple-500 px-1 py-1 text-center text-xs truncate w-full">
        {info.getValue()}
      </div>
    ),
    enableSorting: false,
    size: 90,
  },
  {
    accessorKey: 'visitas',
    header: 'Visitas',
    cell: (info) => (
      <div className="inline-block border-b-2 border-pink-500 px-1 py-1 text-center text-xs font-medium">
        {info.getValue() || 0}
      </div>
    ),
    enableSorting: true,
    size: 70,
  },
  {
    accessorKey: 'vendas',
    header: 'Vendas',
    cell: (info) => (
      <div className="inline-block border-b-2 border-orange-500 px-1 py-1 text-center text-xs font-medium">
        {info.getValue() || 0}
      </div>
    ),
    enableSorting: true,
    size: 70,
  },
];

