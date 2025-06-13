// Funções de formatação para a tabela de produtos
export const formatCurrency = (value) => {
  const numeric = value.toString().replace(/\D/g, '');
  const number = parseFloat(numeric) / 100;
  return number.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
};

export const parseCurrency = (masked) => {
  const onlyNumbers = masked.replace(/\D/g, '');
  return parseFloat(onlyNumbers) / 100;
};

export const calculateLucro = (precoVenda, precoCusto, vendas = 0) => {
  const lucroReais = precoVenda - precoCusto;
  const lucroPercentual = precoVenda > 0 ? ((lucroReais / precoVenda) * 100) : 0;
  const lucroTotal = lucroReais * vendas;

  return {
    lucroReais: formatCurrency(lucroReais.toFixed(2)),
    lucroPercentual: lucroPercentual.toFixed(2) + '%',
    lucroTotal: formatCurrency(lucroTotal.toFixed(2)),
  };
};

