import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Doacoes.module.css';

const Doacoes = () => {
  const navigate = useNavigate();
  return (
    <div>
      <br />

      <nav className={`navbar navbar-expand-sm navbar-toggleable-sm navbar-light box-shadow mb-1 ${styles.navbarra}`}>
        <div className="container-fluid">
          <h3 id="arrumar">Doações:</h3>
        </div>
      </nav>

      <br />

      <div className="container-fluid">
        <div className="row justify-content-center mb-4">
          <div className="col-12">
            <div className={`${styles.donation_box}`}>
              <h5 className={`${styles.titulo}`} >#001 - Agricultor José - 3 doações</h5>
              <p className={`${styles.texto}`} >Doou cinco quilos de cenouras frescas e duas dúzias de espigas de milho</p>
            </div>
          </div>
          <div className="col-12">
            <div className={`${styles.donation_box}`}>
              <h5 className={`${styles.titulo}`} >#002 - Agricultora Maria - 5 doações</h5>
              <p className={`${styles.texto}`} >Doou dez quilos de batatas e três dúzias de espigas de milho</p>
            </div>
          </div>
        </div>
        <div className="col-12">
          <div className={`${styles.donation_box}`}>
            <h5 className={`${styles.titulo}`} >#003 - Agricultor João - 2 doações</h5>
            <p className={`${styles.texto}`} >Doou sete quilos de tomates e uma dúzia de espigas de milho</p>
          </div>
        </div>
      </div>

      <div className={styles.voltar_container}>
        <button
          className={styles.voltar_button}
          onClick={() => navigate('/InicialAdministrador')}
        >
          Voltar
        </button>
      </div>
    </div>
  );
};

export default Doacoes;