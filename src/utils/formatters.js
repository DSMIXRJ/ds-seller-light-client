// Funções de formatação para a tabela de produtos
export const formatCurrency = (value) => {
  const numeric = String(value).replace(/\D/g, ""); // Garante que value seja string
  const number = parseFloat(numeric) / 100;
  return number.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
};

export const parseCurrency = (masked) => {
  const onlyNumbers = String(masked).replace(/\D/g, ""); // Garante que masked seja string
  return parseFloat(onlyNumbers) / 100;
};

export const calculateLucro = (precoVenda, precoCusto, saleFeeAmount, mlConfig) => {
  if (!mlConfig || precoVenda === undefined || precoCusto === undefined || saleFeeAmount === undefined) {
    return {
      lucroReais: formatCurrency(0),
      lucroPercentual: "0.00%",
    };
  }

  const pv = parseFloat(precoVenda) || 0;
  const pc = parseFloat(precoCusto) || 0;
  const sfa = parseFloat(saleFeeAmount) || 0; // saleFeeAmount é o custo total do ML (comissão + frete)

  const impostoPercentual = parseFloat(mlConfig.imposto) / 100 || 0;
  const impostoValor = pv * impostoPercentual;
  const extrasValor = parseFloat(mlConfig.extras) || 0;

  // Lucro = Preço de Venda - Imposto CNPJ - Custos do ML (saleFeeAmount) - Preço de Custo - Extras
  const lucroReaisCalculado = pv - impostoValor - sfa - pc - extrasValor;
  
  // A porcentagem de lucro é sobre o preço de venda
  const lucroPercentualCalculado = pv > 0 ? (lucroReaisCalculado / pv) * 100 : 0;

  return {
    lucroReais: formatCurrency(lucroReaisCalculado.toFixed(2)),
    lucroPercentual: lucroPercentualCalculado.toFixed(2) + "%",
  };
};


