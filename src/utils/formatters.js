// Funções de formatação para a tabela de produtos
export const formatCurrency = (value) => {
  const numeric = value.toString().replace(/\D/g, "");
  const number = parseFloat(numeric) / 100;
  return number.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
};

export const parseCurrency = (masked) => {
  const onlyNumbers = masked.replace(/\D/g, "");
  return parseFloat(onlyNumbers) / 100;
};

export const calculateLucro = (precoVenda, precoCusto, tipoAnuncio, mlConfig) => {
  if (!mlConfig) {
    return {
      lucroReais: formatCurrency(0),
      lucroPercentual: "0.00%",
      lucroTotal: formatCurrency(0),
    };
  }

  const comissao = precoVenda * (mlConfig[tipoAnuncio] / 100 || 0);
  const imposto = precoVenda * (mlConfig.imposto / 100 || 0);
  const extras = mlConfig.extras || 0;

  const lucroReais = precoVenda - precoCusto - comissao - imposto - extras;
  const lucroPercentual = precoVenda > 0 ? ((lucroReais / precoVenda) * 100) : 0;

  return {
    lucroReais: formatCurrency(lucroReais.toFixed(2)),
    lucroPercentual: lucroPercentual.toFixed(2) + "%",
  };
};


