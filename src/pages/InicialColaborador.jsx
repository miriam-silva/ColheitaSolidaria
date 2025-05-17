import React from "react";
import { Link } from 'react-router-dom';
import styles from './InicialColaborador.module.css';
import { useDoacoes } from '../context/DoacoesContext';

export default function InicialColaborador() {
  const { doacoes } = useDoacoes();

  function isValidDate(d) {
    return d instanceof Date && !isNaN(d);
  }


  return (
    <div>
      <div className="container-fluid mt-1">
        <Link to="/colaborador/Registrardoacao">
          <button className={`${styles.donation_btn}`}>Realizar doação</button>
        </Link>
      </div>

      <nav className={`navbar navbar-expand-sm navbar-toggleable-sm navbar-light box-shadow mb-1 ${styles.navbarra}`}>
        <div className="container-fluid">
          <h3 id="arrumar">Minhas doações:</h3>
        </div>
      </nav>

      <br />

      {doacoes.length === 0 ? (
        <h3 className={`${styles.transparente}`}>Nenhuma doação foi feita</h3>
      ) : (
        doacoes.map((doacao, index) => (
          <div key={index} className="col-12">
            <div className={`${styles.donation_box}`}>
              <h5 className={`${styles.titulo}`}>
                #{index + 1}° Doação - {doacao.produto}
              </h5>
              <p className={`${styles.texto}`}>
                {doacao.descricao} - {doacao.quantidade} unidades
              </p>
              <p className={`${styles.texto}`}>
                Data de registro: {doacao.dataRegistro?.toDate
                  ? doacao.dataRegistro.toDate().toLocaleString()
                  : isValidDate(new Date(doacao.dataRegistro))
                    ? new Date(doacao.dataRegistro).toLocaleString()
                    : 'Data inválida'} |
                Validade: {doacao.validade?.toDate
                  ? doacao.validade.toDate().toLocaleDateString()
                  : isValidDate(new Date(doacao.validade))
                    ? new Date(doacao.validade).toLocaleDateString()
                    : 'Data inválida'}
              </p>
            </div>
          </div>
        ))
      )}

      <br /><br />
    </div>
  );
}
