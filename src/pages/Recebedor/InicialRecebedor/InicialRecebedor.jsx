import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styles from "./InicialRecebedor.module.css";
import CardDoacao from "../../../components/CardDoacao/CardDoacao";
import LoadingSpinner from "../../../components/LoadingSpinner/LoadingSpinner";
import ListaDoacoesFiltraValidade from "../../../components/ListaDoacoesFiltraValidade/ListaDoacoesFiltraValidade";
import api from "../../../services/Api";
import { useSolicitacoes } from "../../../hooks/useSolicitacoes";

const InicialRecebedor = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [doacoes, setDoacoes] = useState([]);
  const [selecionados, setSelecionados] = useState([]);
  const [loadingDoacoes, setLoadingDoacoes] = useState(false);

  const { registrarSolicitacao } = useSolicitacoes();

  useEffect(() => {
    const carregarDoacoes = async () => {
      try {
        setLoadingDoacoes(true);
        const response = await api.get("/Doacao");
        setDoacoes(response.data);
      } catch (error) {
        console.error("Erro ao carregar doações:", error);
      } finally {
        setLoadingDoacoes(false);
      }
    };

    carregarDoacoes();
  }, [location.key]);

  const handleCancel = () => {
    setSelecionados([]);
  };

  const handleSubmit = async () => {
  if (selecionados.length === 0) {
    alert("Selecione pelo menos uma doação.");
    return;
  }

  try {
    for (let doacaoId of selecionados) {
      const resultado = await registrarSolicitacao(doacaoId, 1); // quantidade fixa 1
      if (!resultado) {
        alert("Erro ao registrar alguma solicitação.");
        return;
      }
    }
    alert("Solicitação realizada com sucesso!");
    setSelecionados([]);
    navigate("/recebedor/Pedidoenviado");
  } catch (error) {
    console.error("Erro ao enviar solicitação:", error);
    alert("Erro ao enviar solicitação.");
  }
};


  return (
    <div>
      <nav
        className={`navbar navbar-expand-sm navbar-light box-shadow mb-1 ${styles.navbarra}`}
      >
        <div className="container-fluid">
          <h3 className={styles.arrumar}>
            Selecione uma doação que você gostaria de receber:
          </h3>
        </div>
      </nav>

      {loadingDoacoes && <LoadingSpinner />}

      <ListaDoacoesFiltraValidade
        doacoes={doacoes}
        selecionados={selecionados}
        onSelecionar={(id) =>
          setSelecionados((prev) =>
            prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
          )
        }
        somenteAtivas={true}
      />

      <div className="button-container">
        <button className={styles.postpone_btn} onClick={handleCancel}>
          Cancelar
        </button>
        <button className={styles.approve_btn} onClick={handleSubmit}>
          Enviar
        </button>
      </div>
    </div>
  );
};

export default InicialRecebedor;
