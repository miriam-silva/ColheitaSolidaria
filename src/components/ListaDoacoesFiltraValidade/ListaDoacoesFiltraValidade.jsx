import React, { useEffect, useState } from "react";
import CardDoacao from "../CardDoacao/CardDoacao";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import { buscarTodasDoacoes } from "../../hooks/useDoacoes";
import styles from "./ListaDoacoesFiltraValidade.module.css";

const ListaDoacoesFiltraValidade = ({ onSelecionar, selecionados = [] }) => {
  const [doacoes, setDoacoes] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const carregarDoacoes = async () => {
      setLoading(true);
      try {
        const todasDoacoes = await buscarTodasDoacoes();

        const hoje = new Date();
        const listaFiltrada = todasDoacoes.filter((doacao) => {
          if (!doacao.validade) return true;
          const validade = new Date(doacao.validade);
          return validade >= hoje;
        });

        setDoacoes(listaFiltrada);
      } catch (error) {
        console.error("Erro ao buscar doações:", error);
      } finally {
        setLoading(false);
      }
    };

    carregarDoacoes();
  }, []);

  if (loading) {
    return (
      <div className="d-flex justify-content-center my-4">
        <LoadingSpinner size={60} color="#a50000" />
      </div>
    );
  }

  if (doacoes.length === 0) {
    return (
      <p className="text-center mt-4">
        Nenhuma doação disponível no momento.
      </p>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.grid}>
        {doacoes.map((doacao) => (
          <CardDoacao
            key={doacao.id}
            imagemUrl={doacao.imagemUrl}
            nome={doacao.nome}
            validade={doacao.validade}
            descricao={doacao.descricao}
            selecionado={selecionados.includes(doacao.id)}
            onToggle={() => onSelecionar && onSelecionar(doacao.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default ListaDoacoesFiltraValidade;
