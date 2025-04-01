import React from 'react'
import { Link } from 'react-router-dom'
import styles from './SobreNos.module.css'
import sacola from '../assets/sacola.png'
import tomatos from '../assets/tomatos.png'
import maos from '../assets/maos.png'
import doisamigos from '../assets/doisamigos.png'

const SobreNos = () => {
  return (
    <div>
      <br/>
      <div className="container-fluid">
        <div className="row mb-3">
          <div className={`col-md-12 ${styles.caixa}`}>
            <div className="row align-items-center">
              <div className="col-md-6">
                <img src={sacola} className={`${styles.tamanho_imagem4}`} alt="Sacola com vários alimentos." />
              </div>
              <div className="col-md-6">
                <p className={`${styles.p} ${styles.right}`}>
                  No Colheita Solidária, somos uma equipe dedicada
                  <span className={`${styles.titulo_vermelho}`}> a reduzir o desperdício de alimentos</span> e
                  <span className={`${styles.titulo_vermelho}`}> combater a fome.</span>
                </p>
                <p className={`${styles.right} ${styles.p} `}>
                  Fundado em 2024, nosso objetivo é criar uma ponte entre agricultores com alimentos excedentes e pessoas necessitadas.
                </p>
                <p className={`${styles.right} ${styles.p} `}>
                  Acreditamos que, juntos, podemos construir uma comunidade mais solidária e sustentável!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <br />

      <h1 className={`${styles.titulo_vermelho}`}>Nossa Missão:</h1>

      <div className="container-fluid">
        <div className="row mb-3">
          <div className={`col-md-12 ${styles.caixa} ${styles.caixa11}`}>
            <div className="row align-items-center">
              <div className="col-md-6">
                <img src={tomatos} className={`${styles.tamanho_imagem1}`} alt="Cesta de tomates" />
              </div>
              <div className="col-md-6">
                <br />
                <h2 className={`${styles.titulo_caixa1} ${styles.right}`}>Reduzir o Desperdício</h2>
                <p className={`${styles.p} ${styles.right}`}>Minimizar a perda de alimentos por meio de doações.</p>
              </div>
            </div>
          </div>
        </div>
        <div className="row mb-3">
          <div className={` col-md-12 ${styles.caixa} ${styles.caixa22}`}>
            <div className="row align-items-center">
              <div className="col-md-6 order-md-2">
                <img src={maos} className={`${styles.tamanho_imagem2}`} alt="Duas mãos dadas" />
              </div>
              <div className="col-md-6 order-md-1">
                <br />
                <h2 className={`${styles.titulo_caixa2} ${styles.left}`}>Combater a Fome</h2>
                <p className={`${styles.p} ${styles.left}`}>Fornecer alimentos frescos e nutritivos para quem mais precisa.</p>
              </div>
            </div>
          </div>
        </div>
        <div className="row mb-3">
          <div className={`col-md-12 ${styles.caixa} ${styles.caixa33}`}>
            <div className="row align-items-center">
              <div className="col-md-6 ">
                <img src={doisamigos} className={`${styles.tamanho_imagem3}`} alt="Dois amigos se abraçando" />
              </div>
              <div className="col-md-6">
                <br />
                <h2 className={`${styles.titulo_caixa3} ${styles.right}`}>Fortalecer Comunidades</h2>
                <p className={`${styles.p} ${styles.right}`}>Conectar doadores e recebedores, promovendo a solidariedade.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <br />
    </div>
  );
};

export default SobreNos;