import React from "react";
import { Link } from 'react-router-dom';
import styles from './InicialAdministrador.module.css';

export default function InicialAdministrador() {
  return (
    <div className="text-center mt-5">
      <div className={`row justify-content-center ${styles.center_button_alinhar}`}>
        {/* Botão 1 */}
        <div className="col-12 col-md-4 mb-3 mb-md-0">
        <Link to="/adm/Pedidos">
            <button className={`${styles.center_button}`} type="button">Pedidos</button>
          </Link>
        </div>

        {/* Botão 2 */}
        <div className="col-12 col-md-4 mb-3 mb-md-0">
        <Link to="/adm/Doacoes">
            <button className={`${styles.center_button1}`} type="button">Doações</button>
          </Link>
        </div>

        {/* Botão 3 */}
        <div className="col-12 col-md-4">
          <Link to="/adm/cadastrar-recebedor">
            <button className={`${styles.center_button2}`} type="button">
              Cadastrar Recebedor
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}