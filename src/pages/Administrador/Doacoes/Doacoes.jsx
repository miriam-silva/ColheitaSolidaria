import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Doacoes.module.css';
import { supabase } from '../../../supabase/supabaseClient'
import { collection, getDocs, doc, getDoc } from 'firebase/firestore';
import { db } from '../../../firebase/config';
import CardDoacao from '../../../components/CardDoacao/CardDoacao';
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

            doacoes.map((doacao) => {
              const imagemPublicaUrl = doacao.imagemDoacao ? supabase
                .storage
                .from('doacoes')
                .getPublicUrl(doacao.imagemDoacao).publicUrl
                : null;

                return (
                  <div key ={doacao.id} className= "mb-3">
                    <CardDoacao 
                    imagemUrl={imagemPublicaUrl}
                    nome= {doacao.produto}
                    validade= {doacao.validade}
                    descricao={
                      `Doador: ${doacao.nomeColaborador}\n` +
                       `Descrição: ${doacao.descricao}\n` +
                        `Quantidade: ${doacao.quantidade}`
                    }
                    selecionado={false}
                    onToggle={() => {}}

                    />
                  </div>
                );
            })
        
          ):(
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
