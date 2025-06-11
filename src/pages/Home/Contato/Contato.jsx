import React from 'react';
import styles from './Contato.module.css';

// Importando imagens
import instagramIcon from '../../../assets/icon instagram.png';
import emailIcon from '../../../assets/icon email.png';
import whatsappIcon from '../../../assets/icone whats.png';
import maosDadas from '../../../assets/maosdadas.png';

const Contato = () => {
  return (
    <div >
      <br />

      <div className="text-center">
        <h2 className={`${styles.titulo_vermelho}`} >Entre em contato conosco!</h2>
        <p className={`${styles.p}`}>Seja para sanar dúvidas ou fazer sugestões :)</p>
      </div>

      <form className="contact-form">
        <div className="mb-3">
          <label htmlFor="firstName" className={`form-label ${styles.texto}`}>Primeiro nome:</label>
          <input type="text" className="form-control" id="firstName" placeholder="Nome" />
        </div>
        <div className="mb-3">
          <label htmlFor="lastName" className={`form-label ${styles.texto}`}>Último sobrenome:</label>
          <input type="text" className="form-control" id="lastName" placeholder="Sobrenome" />
        </div>
        <div className="mb-3">
          <label htmlFor="subject" className={`form-label ${styles.texto}`}>Assunto:</label>
          <textarea className="form-control" id="subject" rows="3" placeholder="Fale conosco!"></textarea>
        </div>

        <div className="button-group">
          <button className={`${styles.postpone_btn}`} type="button">Cancelar</button>
          <button className={`form-label ${styles.approve_btn}`} type="submit">Enviar</button>
        </div>
      </form>

      <br />
      <br />

      <div className="container text-center">
        <div className="row justify-content-center">
          <div className="col-12">
            <div className="col-12">
              <h2 className={`mb-3 ${styles.titulo_vermelho1}`}>Veja nossas formas de contato:</h2>
            </div>
          </div>
        </div>
      </div>

      <div className="container contact-methods">
        <div className="row">
          <div className="col-md-4">
            <div className={`${styles.box} ${styles.caixa11}`}>
              <h2 className={`${styles.titulo_caixa}`}>Instagram</h2>
              <img src={instagramIcon} className={`${styles.img11}`} alt="logo do instagram" />
              <p className={`${styles.text_wrap}`}>@Colheita.solidaria</p>
            </div>
          </div>
          <div className="col-md-4">
            <div className={`${styles.box} ${styles.caixa22}`}>
              <h2 className={`${styles.titulo_caixa}`}>Email</h2>
              <img src={emailIcon} className={`${styles.img22}`} alt="ícone de um envelope" />
              <p className={`${styles.text_wrap}`}>colheitasolidariafatec@gmail.com</p>
            </div>
          </div>
          <div className="col-md-4">
            <div className={`${styles.box} text-black ${styles.caixa33}`}>
              <h2 className={`${styles.titulo_caixa}`}>WhatsApp</h2>
              <img src={whatsappIcon} className={`${styles.img33}`} alt="logo do whatsapp" />
              <p className={`${styles.text_wrap}`}>(16)2359-9851</p>
            </div>
          </div>
        </div>
      </div>

      <br />

      <section className="p-4">
        <div className="container text-center">
          <div className="row justify-content-center">
            <div className="col-12">
              <div className="col-12">
                <h2 className={`mb-3 ${styles.titulo_vermelho2}`}>A equipe da Colheita Solidária agradece o seu contato!!</h2>
                <img src={maosDadas} className={`img-fluid ${styles.maos} mb-3`} alt="Mãos dadas simbolizando a união" />
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Contato;