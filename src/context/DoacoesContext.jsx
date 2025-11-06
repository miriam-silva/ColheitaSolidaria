import React, { createContext, useState, useContext, useEffect } from 'react';
import { buscarDoacoesPorColaborador } from '../hooks/useDoacoes';

const DoacoesContext = createContext();

export function DoacoesProvider({ children }) {
  const [doacoes, setDoacoes] = useState([]);
  const [carregando, setCarregando] = useState(true);

  const adicionarDoacao = (novaDoacao) => {
    setDoacoes((prev) => [novaDoacao, ...prev]); // adiciona no topo
  };

  const carregarDoacoes = async () => {
    setCarregando(true);
    try {
      const userId = localStorage.getItem('userId');
      if (!userId) {
        setDoacoes([]);
        return;
      }

      const doacoesDoUsuario = await buscarDoacoesPorColaborador(userId);
      setDoacoes(doacoesDoUsuario);
    } catch (err) {
      console.error('Erro ao carregar doações:', err);
      setDoacoes([]);
    } finally {
      setCarregando(false);
    }
  };

  useEffect(() => {
    carregarDoacoes();
  }, []);

  return (
    <DoacoesContext.Provider value={{ doacoes, adicionarDoacao, carregando, setDoacoes, carregarDoacoes }}>
      {children}
    </DoacoesContext.Provider>
  );
}

export function useDoacoes() {
  return useContext(DoacoesContext);
}
