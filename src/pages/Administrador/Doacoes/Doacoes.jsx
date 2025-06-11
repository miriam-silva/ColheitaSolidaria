import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Doacoes.module.css';

import { collection, getDocs, doc, getDoc } from 'firebase/firestore';
import { db } from '../../../firebase/config';

const Doacoes = () => {
  const navigate = useNavigate();
  const [doacoes, setDoacoes] = useState([]);

  useEffect(() => {
    const buscarDoacoes = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'doacoes'));

        const listaDoacoes = await Promise.all(
          querySnapshot.docs.map(async (docItem) => {
            const data = docItem.data();

            let nomeColaborador = 'Usuário não encontrado';
            if (data.colaboradorId) {
              const userRef = doc(db, 'users', data.colaboradorId);
              const userSnap = await getDoc(userRef);
              if (userSnap.exists()) {
                nomeColaborador = userSnap.data().nome;
              }
            }

            return {
              id: docItem.id,
              nomeColaborador,
              ...data,
            };
          })
        );

        setDoacoes(listaDoacoes);
      } catch (error) {
        console.error('Erro ao buscar doações:', error);
      }
    };

    buscarDoacoes();
  }, []);

  return (
    <div>
      <br />

      <nav className={`navbar navbar-expand-sm navbar-light box-shadow mb-1 ${styles.navbarra}`}>
        <div className="container-fluid">
          <h3>Doações:</h3>
        </div>
      </nav>

      <br />

      <div className="container-fluid">
        <div className="row justify-content-center mb-4">
          {doacoes.length > 0 ? (
            doacoes.map((doacao, index) => (
              <div key={doacao.id} className="col-12 mb-3">
                <div className={`${styles.donation_box}`}>
                  <h5 className={styles.titulo}>
                    #{index + 1} - {doacao.produto}
                  </h5>
                  <p className={styles.texto}>
                    Doador: {doacao.nomeColaborador} <br />
                    Descrição: {doacao.descricao} <br />
                    Quantidade: {doacao.quantidade} <br />
                    Validade:{' '}
                    {doacao.validade
                      ? new Date(doacao.validade.seconds * 1000).toLocaleDateString()
                      : 'Sem data'}{' '}
                    <br />
                    Data de Registro:{' '}
                    {doacao.dataRegistro
                      ? new Date(doacao.dataRegistro.seconds * 1000).toLocaleString()
                      : 'Sem data'}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center">Nenhuma doação encontrada.</p>
          )}
        </div>
      </div>

      <div className={styles.voltar_container}>
        <button
          className={styles.voltar_button}
          onClick={() => navigate('/InicialAdministrador')}
        >
          Voltar
        </button>
      </div>
    </div>
  );
};

export default Doacoes;
