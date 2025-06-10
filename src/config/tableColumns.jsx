import React, { useState } from 'react';

// Ícone simples de copiar (SVG)
const CopyIcon = ({ copied }) => (
  copied ? (
    <span title="Copiado!" className="ml-2 text-green-400">✔️</span>
  ) : (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="ml-2 inline w-4 h-4 text-gray-400 cursor-pointer hover:text-cyan-400 transition"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <rect x="9" y="9" width="13" height="13" rx="2" stroke="currentColor" strokeWidth="2" fill="none"/>
      <rect x="3" y="3" width="13" height="13" rx="2" stroke="currentColor" strokeWidth="2" fill="none"/>
    </svg>
  )
);

// Wrapper para célula do SKU com copiar
function SkuCell({ value }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="w-full border-b-2 border-white px-1 py-1 text-center text-xs flex items-center justify-center gap-1 break-all">
      <span>{value}</span>
      <span onClick={handleCopy} className="select-none">{<CopyIcon copied={copied} />}</span>
    </div>
  );
}

// Configuração das colunas da tabela de produtos
export const createColumns = (handleMaskedChange, handleSavePrecoCusto) => [
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
    size: 80,
  },
  {
    accessorKey: 'sku',
    header: 'SKU',
    cell: (info) => (
      <SkuCell value={info.getValue()} />
    ),
    enableSorting: false,
    size: 100,
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
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            handleSavePrecoCusto(info.row.original.id, parseCurrency(e.target.value));
          }
        }}
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
      <div className="w-full border-b-2 border-blue-500 px-1 py-1 text-center text-xs">
        {info.getValue()}
      </div>
    ),
    enableSorting: false,
    size: 80,
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


