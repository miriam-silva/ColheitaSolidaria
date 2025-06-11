import React from 'react';
import styles from'./Comoajudar.module.css';

import plantinha from '../../../assets/plantinha.png';
import sopinha from '../../../assets/sopinha.png';
import maosdadas from '../../../assets/maosdadas.png';

const Comoajudar = () => {
  return (
    <div>
      <br />

      {/* Seção 1 */}
      <section className="p-4">
        <div className="container-fluid text-center">
          <div className="row justify-content-center">
            <div className="col-12">
              <div className="col-12">
                <h2 className={`mb-3 ${styles.titulo_vermelho}`}>Faça a diferença!</h2>
                <img src={plantinha} className={`img-fluid ${styles.imagem} mb-3`} alt="imagem de uma plantinha nascendo" />
                <p className={`${styles.p}`}>
                  Há várias maneiras de se envolver e apoiar nossa causa!
                  Veja como você pode ajudar:
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Seção 2 */}
      <section className="p-4">
        <div className="container-fluid text-center">
          <div className="row justify-content-center">
            <div className="col-12">
              <div className="col-12">
                <h2 className={`mb-3 ${styles.titulo_vermelho}`}>Doe alimentos</h2>
                <img src={sopinha} className="img-fluid mb-3" alt="Imagem de um prato de sopa" />
                <p className={`${styles.p}`}>
                  Se você é agricultor, cadastre-se
                  e doe seus excedentes de produção.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Seção 3 */}
      <section className="p-4">
        <div className="container-fluid text-center">
          <div className="row justify-content-center">
            <div className="col-12">
              <div className="col-12">
                <h2 className={`mb-3 ${styles.titulo_vermelho}`}>Divulgue</h2>
                <img src={maosdadas} className="img-fluid mb-3" alt="Mãos dadas simbolizando a união" />
                <p className={`${styles.p}`}>
                  Espalhe a palavra sobre nossa missão
                  e ajude-nos a alcançar mais pessoas necessitadas.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sessão 4 */}
      <section className="p-4"> 
        <div className="container-fluid text-center"> 
          <div className="row justify-content-center"> 
            <div className="col-12"> 
              <p className={`${styles.p}`}>
                Juntos, podemos fazer uma grande diferença na luta contra o desperdício de alimentos e a fome.
              </p>
              <p className={`${styles.p}`}>
                <span className={`${styles.titulo_vermelho2}`}>Cadastre-se hoje mesmo</span> e <span className={`${styles.titulo_vermelho2}`}>junte-se a nós</span> nessa causa!
              </p>
            </div> 
          </div> 
        </div>
      </section>

      <br />
    </div>
  );
};

export default Comoajudar;