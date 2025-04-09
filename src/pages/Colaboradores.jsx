import React from 'react';
import styles from './Colaboradores.module.css';

import icon from '../assets/icon.png';
import colaborador from '../assets/foto colaborador.png';
import colaboradora from '../assets/Foto colaboradora.png';

const Colaboradores = () => {
  return (
    <div>
      <br />
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3">
            <div className={`${styles.box}`}>
              <img src={icon} className={`${styles.img1}`} alt="Plantinha" />
            </div>
          </div>
          <div className="col-md-6">
            <div className={`${styles.box}`}>
              <p className={`${styles.p}`}>
                Nosso trabalho não seria possível sem a
                dedicação e o apoio dos nossos colaboradores.
                Agricultores desempenham um papel crucial em nossa missão.
                Conheça alguns dos nossos colaboradores e
                veja como eles estão ajudando a transformar vidas!
              </p>
            </div>
          </div>
          <div className="col-md-3">
            <div className={`${styles.box}`}>
              <img src={icon} className={`${styles.img2}`} alt="Plantinha" />
            </div>
          </div>
        </div>
      </div>

      <br />

      <div className="container-fluid">
        <div className="row mb-2">
          <div className={`col-md-12 ${styles.caixa} ${styles.caixa1e3}`}>
            <div className="row align-items-center">
              <div className="col-md-4">
                <img src={colaborador} className={`${styles.tamanho_imagem}`} alt="Foto colaborador" />
              </div>
              <div className="col-md-8">
                <h3 className={`${styles.titulo_caixa}`}>Agricultor Roberto</h3>
                <p className={`${styles.texto} ${styles.p}`}>
                  Roberto Rodriguez ajudou doando verduras da sua horta!
                  Como: Alface, tomates e pimentões.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="row mb-2">
          <div className={`col-md-12 ${styles.caixa} ${styles.caixa22}`}>
            <div className="row align-items-center">
              <div className="col-md-4 order-md-2">
                <img src={colaboradora} className={`${styles.tamanho_imagem}`} alt="Foto colaboradora" />
              </div>
              <div className="col-md-8 order-md-1">
                <h3 className={`${styles.titulo_caixa}`}>Agricultora Márcia</h3>
                <p className={`${styles.texto} ${styles.p}`}>
                  Márcia Gonzales ajudou doando
                  muitos alimentos de sua própria lavoura!
                  Alimentos como: Arroz, milho e feijão.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="row mb-2">
          <div className={`col-md-12 ${styles.caixa} ${styles.caixa1e3}`}>
            <div className="row align-items-center">
              <div className="col-md-4">
                <img src={colaborador} className={`${styles.tamanho_imagem}`}alt="Foto colaborador" />
              </div>
              <div className="col-md-8">
                <h3 className={`${styles.titulo_caixa}`}>Fazendeiro Carlos</h3>
                <p className={`${styles.texto} ${styles.p}`}>
                  Carlos Silva contribuiu generosamente
                  doando muitos alimentos de sua própria fazenda!
                  Alimentos como: batata, cenoura e tomate.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <br />
    </div>
  );
};

export default Colaboradores;