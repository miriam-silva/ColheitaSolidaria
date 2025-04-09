import React, { useState } from 'react';
import styles from './Pedidos.module.css';

const Pedidos = () => {
  const [pedidos, setPedidos] = useState([
    {
      id: 1,
      usuario: 'Usuário46',
      familiares: '4 familiares',
      pedido: 'Gostaria de pedir laranjas e cenouras.',
      status: ''
    },
    {
      id: 2,
      usuario: 'Usuário90',
      familiares: '2 familiares',
      pedido: 'Gostaria de pedir bananas e pepinos.',
      status: ''
    },
    {
      id: 3,
      usuario: 'Usuário06',
      familiares: 'Sem familiares',
      pedido: 'Gostaria de pedir uvas e pimentões.',
      status: ''
    }
  ]);

  const handleStatusChange = (id, status) => {
    setPedidos(pedidos.map(pedido => {
      if (pedido.id === id) {
        return { ...pedido, status };
      }
      return pedido;
    }));
  };

  return (
    <div>
      <nav className={`navbar navbar-expand-sm navbar-toggleable-sm navbar-light box-shadow mb-1 ${styles.navbarra}`}>
        <div className="container-fluid">
          <h3 id="arrumar">Pedidos:</h3>
        </div>
      </nav>

      <br />

      <div className="container-fluid">
        <div className="row justify-content-center mb-4">
          {pedidos.map(pedido => (
            <div className="col-12" key={pedido.id}>
              <div className={`${styles.donation_box}`}>
                <h5 className={`${styles.tituloo}`}>#{pedido.id.toString().padStart(3, '0')} - {pedido.usuario} - {pedido.familiares}</h5>
                <p className={`${styles.textoo}`}>{pedido.pedido}</p>
                <div className={`${styles.button_group}`}>
                  <button 
                    className={`${styles.approve_btn}`}
                    onClick={() => handleStatusChange(pedido.id, 'Aprovado')}
                    disabled={pedido.status !== ''}
                  >
                    Aprovar
                  </button>
                  <button 
                    className={`${styles.postpone_btn}`}
                    onClick={() => handleStatusChange(pedido.id, 'Protelado')}
                    disabled={pedido.status !== ''}
                  >
                    Protelar
                  </button>
                </div>
                {pedido.status && (
                  <p
                  className={`${styles.status} ${
                    pedido.status === 'Aprovado' ? styles.approved : styles.postponed
                  }`}
                >
                  Status: {pedido.status}
                </p>
                
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Pedidos;