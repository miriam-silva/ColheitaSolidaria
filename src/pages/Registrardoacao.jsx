import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Registrardoacao.module.css';

const Registrardoacao = () => {
    const navigate = useNavigate();

    const handleCancel = () => {
        window.location.href = '/InicialColaborador';
    };
    
    const handleSubmit = () => {
        navigate('/colaborador/Doacaoregistrada');
    };

    return (
        <div >
            <nav className={`navbar navbar-expand-sm navbar-toggleable-sm navbar-light box-shadow mb-1 ${styles.navbarra}`}>
                <div className="container-fluid">
                    <h3 className={`${styles.arrumar}`}>Registrar Doação:</h3>
                </div>
            </nav>

            <br />

            <div className="mb-3">
                <label htmlFor="productName" className={`form-label ${styles.texto}`}>Nome do produto:</label>
                <input type="text" className="form-control" id="productName" placeholder="Nome" />
            </div>
            <div className="mb-3">
                <label htmlFor="productDescription" className={`form-label ${styles.texto}`}>Descrição do produto:</label>
                <textarea className="form-control" id="productDescription" rows="3" placeholder="Ex: Caixa de 10 kilos de banana"></textarea>
            </div>
            <div className="mb-3">
                <label htmlFor="productQuantity" className={`form-label ${styles.texto}`}>Quantidade:</label>
                <input type="number" className="form-control" id="productQuantity" placeholder="Quantidade" />
            </div>
            <div className="mb-3">
                <label htmlFor="productExpiry" className={`form-label ${styles.texto}`}>Validade:</label>
                <input type="date" className="form-control" id="productExpiry" placeholder="Validade" />
            </div>

            <div className="button-group">
                <button className={`${styles.postpone_btn}`} type="button" onClick={handleCancel}>Cancelar</button>
                <button className={`form-label ${styles.approve_btn}`} type="submit" onClick={handleSubmit}>Enviar</button>
            </div>

            <br />
        </div>
    );
};

export default Registrardoacao;