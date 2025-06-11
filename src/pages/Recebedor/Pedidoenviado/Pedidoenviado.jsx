import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Pedidoenviado.module.css'; 

const Pedidoenviado = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.center_button_container}>
      <div className={`${styles.arrumar} ${styles.center_button} ${styles.texto}`}>
        Solicitação registrada!
      </div>

      <button 
        className={styles.voltar_button}
        onClick={() => navigate('/InicialRecebedor')}
      >
        Voltar
      </button>
    </div>
  );
};

export default Pedidoenviado;
