import React, { createContext, useState, useContext, useEffect } from "react";
import { buscarDoacoesPorColaborador } from "../hooks/useDoacoes";

const DoacoesContext = createContext();

export function DoacoesProvider({ children }) {
  const [doacoes, setDoacoes] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [userId, setUserId] = useState(null);
  const [token, setToken] = useState(null);

  const adicionarDoacao = (novaDoacao) => {
    setDoacoes((prev) => [novaDoacao, ...prev]);
  };

  const carregarDoacoes = async (id = userId) => {
    setCarregando(true);
    try {
      const userIdFinal = id || localStorage.getItem("userId");
      const tokenAtual = localStorage.getItem("token");

      if (!userIdFinal || !tokenAtual) {
        console.warn("Usuário não autenticado. Não foi possível carregar doações.");
        setDoacoes([]);
        return;
      }

      console.log("Carregando doações para o usuário:", userIdFinal);
      const doacoesDoUsuario = await buscarDoacoesPorColaborador(userIdFinal);
      console.log("Doações recebidas:", doacoesDoUsuario);

      setDoacoes(doacoesDoUsuario || []);
    } catch (err) {
      console.error("Erro ao carregar doações:", err);
      setDoacoes([]);
    } finally {
      setCarregando(false);
    }
  };

  useEffect(() => {
    const atualizarCredenciais = () => {
      const novoUserId = localStorage.getItem("userId");
      const novoToken = localStorage.getItem("token");

      setUserId(novoUserId);
      setToken(novoToken);
    };

    atualizarCredenciais();

    window.addEventListener("storage", atualizarCredenciais);
    window.addEventListener("usuarioLogado", atualizarCredenciais);


    return () => {
      window.removeEventListener("storage", atualizarCredenciais);
      window.removeEventListener("usuarioLogado", atualizarCredenciais);
    };

  }, []);

  useEffect(() => {
    if (userId && token) {
      carregarDoacoes(userId);
    } else {
      setCarregando(false);
    }
  }, [userId, token]); 

  return (
    <DoacoesContext.Provider
      value={{
        doacoes,
        adicionarDoacao,
        carregando,
        setDoacoes,
        carregarDoacoes,
      }}
    >
      {children}
    </DoacoesContext.Provider>
  );
}

export function useDoacoes() {
  return useContext(DoacoesContext);
}
