import React from "react";
import { useNavigate } from 'react-router-dom';
import styles from './Minhassolicitacoes.module.css';

const Minhassolicitacoes = () => {
    const navigate = useNavigate();
    return (
        <div>
            <nav className={`navbar navbar-expand-sm navbar-toggleable-sm navbar-light box-shadow mb-1 ${styles.navbarra}`}>
                <div className="container-fluid">
                    <h3 id="arrumar">Minhas solicitações:</h3>
                </div>
            </nav>

            <br />
            <h3 className={`${styles.transparente}`}>Nenhuma solicitação foi feita</h3>
            <br />
            <br />
            <button
                className={styles.voltar_button}
                onClick={() => navigate('/InicialRecebedor')}
            >
                Voltar
            </button>
        </div>
    );
};

export default Minhassolicitacoes;