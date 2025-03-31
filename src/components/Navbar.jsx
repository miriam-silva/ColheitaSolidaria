import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Navbar.module.css';
import logotp from '../assets/logotp.png';

const Navbar = () => {
  return (
    <nav className={`navbar navbar-expand-lg navbar-light ${styles.navbarCustom}`}>
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          <img 
            src={logotp} 
            alt="Colheita Solidária" 
            width="300px" 
            height="130px" 
            className={`d-inline-block align-top`}
          />
        </Link>

        <div className={`ms-auto d-flex align-items-center gap-2 ${styles.botoesContainer}`}>
          <Link to="/login" className="text-decoration-none">
            <button className={`btn ${styles.botaoentrarcadastrar}`} type="button">
              Entrar
            </button>
          </Link>
          
          <Link to="/cadastro" className="text-decoration-none">
            <button className={`btn ${styles.botaoentrarcadastrar}`} type="button">
              Cadastrar-se
            </button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;