import React from "react";
import { Link } from 'react-router-dom';
import styles from './InicialColaborador.module.css';

export default function InicialColaborador() {
  return (
    <div>
      <div className="container-fluid mt-1">
        <Link to="/RegistrarDoacaoColaborador">
          <button className={`${styles.donation_btn}`}>Realizar doação</button>
        </Link>
      </div>

      <nav className={`navbar navbar-expand-sm navbar-toggleable-sm navbar-light box-shadow mb-1 ${styles.navbarra}`}>
        <div className="container-fluid">
          <h3 id="arrumar">Minhas doações:</h3>
        </div>
      </nav>

      <br />
      <h3 className={`${styles.transparente}`}>Nenhuma doação foi feita</h3>
      <br />
      <br />
    </div>
  );
}