// ✅ ARQUIVO: src/pages/Integracoes/styles.js

export const gerarEstiloBox = (integrado, cor, isDisabled = false) => {
  if (isDisabled) {
    return {
      borderColor: "#666",
      boxShadow: `0 0 15px 2px #66666633`,
    };
  }
  return {
    borderColor: integrado ? cor : "#ff0000",
    boxShadow: integrado
      ? `0 0 30px 6px ${cor}cc, 0 0 15px 2px ${cor}99`
      : `0 0 25px 4px #ff0000cc, 0 0 12px 2px #ff000099`,
    transition: "0.3s",
  };
};

export const botaoEstilo = (integrado, isLoading = false) => {
  const cor = integrado ? "#00ff55" : "#ff3333";
  return {
    marginTop: "0.5rem",
    backgroundColor: "rgba(17, 17, 17, 0.8)",
    color: isLoading ? "#999" : cor,
    fontWeight: "bold",
    padding: "8px 18px",
    borderRadius: "1.25rem",
    boxShadow: isLoading ? "none" : `0 0 15px ${cor}66`,
    textShadow: isLoading ? "none" : `0 0 6px ${cor}`,
    fontSize: "0.875rem",
    transition: "0.3s all ease-in-out",
    backdropFilter: "blur(10px)",
    border: `1px solid ${isLoading ? "#666" : cor}44`,
    cursor: isLoading ? "not-allowed" : "pointer",
  };
};
