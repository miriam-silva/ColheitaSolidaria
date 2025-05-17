import React, { createContext, useState, useContext, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { buscarDoacoesPorColaborador } from '../hooks/useDoacoes';

const DoacoesContext = createContext();

export function DoacoesProvider({ children }) {
  const [doacoes, setDoacoes] = useState([]);
  const [carregando, setCarregando] = useState(true);

  const adicionarDoacao = (novaDoacao) => {
    setDoacoes((prev) => [...prev, novaDoacao]);
  };

  useEffect(() => {
    const auth = getAuth();

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const doacoesDoUsuario = await buscarDoacoesPorColaborador(user.uid);
        setDoacoes(doacoesDoUsuario);
      } else {
        setDoacoes([]);
      }
      setCarregando(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <DoacoesContext.Provider value={{ doacoes, adicionarDoacao, carregando }}>
      {children}
    </DoacoesContext.Provider>
  );
}

export function useDoacoes() {
  return useContext(DoacoesContext);
}
