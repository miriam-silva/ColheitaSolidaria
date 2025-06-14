import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../../Recebedor/Pedidoenviado/Pedidoenviado.module.css'; 

const Doacaoregistrada = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.center_button_container}>
      <div className={`${styles.arrumar} ${styles.center_button} ${styles.texto}`}>
        Doação registrada!
      </div>

      <button 
        className={styles.voltar_button}
        onClick={() => navigate('/InicialColaborador')}
      >
        Voltar
      </button>
    </div>
  );
};

export default Doacaoregistrada;
