import React from "react";
import { Link } from "react-router-dom";
import styles from "./InicialColaborador.module.css";
import { useDoacoes } from "../../../context/DoacoesContext";
import CardHistoricoDoacao from "../../../components/CardHistoricoDoacao/CardHistoricoDoacao";

export default function InicialColaborador() {
  const { doacoes, carregando } = useDoacoes(); // pegando todas as doações do contexto
  const userId = Number(localStorage.getItem("userId")); // pega o id do usuário logado

  // Filtra apenas as doações do usuário logado
  const minhasDoacoes = doacoes.filter(d => d.usuarioId === userId);

  return (
    <div>
      <div className="container-fluid mt-1">
        <Link to="/colaborador/Registrardoacao">
          <button className={`${styles.donation_btn}`}>Realizar doação</button>
        </Link>
      </div>

      <nav
        className={`navbar navbar-expand-sm navbar-toggleable-sm navbar-light box-shadow mb-1 ${styles.navbarra}`}
      >
        <div className="container-fluid">
          <h3>Minhas doações:</h3>
        </div>
      </nav>

      <br />

      {carregando ? (
        <p>Carregando doações...</p>
      ) : minhasDoacoes.length === 0 ? (
        <h3 className={`${styles.transparente}`}>Nenhuma doação foi feita</h3>
      ) : (
        minhasDoacoes.map((doacao, index) => (
          <CardHistoricoDoacao key={doacao.id || index} index={index} doacao={doacao} />
        ))
      )}

      <br /><br />
    </div>
  );
}
