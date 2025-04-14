import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './InicialRecebedor.module.css';
import tomate from '../assets/tomate.png';
import milho from '../assets/milho.jpg';

const InicialRecebedor = () => {
  const navigate = useNavigate();

  const handleCancel = () => {
    window.location.reload();
  };

  const handleSubmit = () => {
    navigate('/recebedor/Pedidoenviado');
  };

  return (
    <div>

      <br />
      <nav className={`navbar navbar-expand-sm navbar-toggleable-sm navbar-light box-shadow mb-1 ${styles.navbarra}`}>
        <div className="container-fluid">
          <h3 className={`${styles.arrumar}`}>Selecione um alimento que você gostaria de receber:</h3>
        </div>
      </nav>
      <br />

      <div>
        <div className="container">
          <div className={`${styles.caixa}`}>
            <img src={tomate} alt="Tomate" className={`${styles.imagem}`} />
            <div className={`${styles.titulo}`}>
              <h4>Tomate</h4>
              <p className={`${styles.textoo}`}>
                O tomate é um fruto suculento, cheio de nutrientes, que vem em diferentes cores. 
                Você pode comê-lo cru em saladas ou cozido em molhos e sopas.
              </p>
            </div>

            <div className={`${styles.check}`}>
              <input type="checkbox" />
            </div>
          </div>
        </div>
        <div className={`${styles.teste}`}></div>
        <div className="container">
          <div className={`${styles.caixa}`}>
            <img src={milho} alt="Milho" className={`${styles.imagem}`} />
            <div className={`${styles.titulo}`}>
              <h4>Milho</h4>
              <p className={`${styles.textoo}`}>
                O milho é um cereal versátil e nutritivo, consumido de várias formas. 
                Rico em fibras e vitaminas, é usado na produção de farinha e óleo.
              </p>
            </div>

            <div className={`${styles.check}`}>
              <input type="checkbox" />
            </div>
          </div>
        </div>

        <div className="button-container">
          <button className={`${styles.postpone_btn}`} onClick={handleCancel}>Cancelar</button>
          <button className={`${styles.approve_btn}`}onClick={handleSubmit}>Enviar</button>
        </div>
      </div>
    </div>
  );
};

export default InicialRecebedor;