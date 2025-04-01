import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Footer.module.css';
import lgtpsolo from '../assets/lgtpsolo.png';

const Footer = () => {
  return (
    <footer className={`${styles.rodape} py-4 mt-5`}>
      <div className="container">
        <div className="row align-items-center">
          <div className="col-md-2 text-center text-md-start mb-3 mb-md-0">
            <Link to="/">
            <img 
            src={lgtpsolo} 
            alt="Imagem no canto" 
            width="70px" 
          />
            </Link>
          </div>

          <div className="col-md-9 text-center">
            <p className={`mb-0 ${styles.texto_rodape}`}>
              Colheita Solidária: Juntos plantamos esperança, cultivamos solidariedade e colhemos um futuro melhor para todos.
            </p>
          </div>
        </div>
        
      </div>
    </footer>
  );
};

export default Footer;