import React from "react";
import { Link } from "react-router-dom";
import styles from "./InicialAdministrador.module.css";
import PainelMetrico from "../Painel/PainelMetrico";

export default function InicialAdministrador() {
  return (
    <div className="text-center mt-5">
      <div className={`row justify-content-center ${styles.center_button_alinhar}`}>
        <div className="col-12 col-md-3 mb-3 mb-md-0">
          <Link to="/adm/Pedidos">
            <button className={styles.center_button} type="button">Pedidos</button>
          </Link>
        </div>

        <div className="col-12 col-md-3 mb-3 mb-md-0">
          <Link to="/adm/Doacoes">
            <button className={styles.center_button1} type="button">Doações</button>
          </Link>
        </div>

        <div className="col-12 col-md-3 mb-3 mb-md-0">
          <Link to="/adm/cadastrar-recebedor">
            <button className={styles.center_button2} type="button">
              Cadastrar Recebedor
            </button>
          </Link>
        </div>

        <div className="col-12 col-md-3">
          <Link to="/adm/usuarios">
            <button className={styles.center_button2} type="button">
              Gerenciar Usuários
            </button>
          </Link>
        </div>
        <div>
           <p>

        </p>
        </div>
       
        <div className="col-12 col-md-3 mb-3">
          <Link to="/adm/HistoricoDoacoes">
            <button className={styles.center_button2} type="button">Histórico de Doações</button>
          </Link>
        </div>
      </div>

      <div className="mt-5">
        <PainelMetrico />
      </div>
    </div>
  );
}
