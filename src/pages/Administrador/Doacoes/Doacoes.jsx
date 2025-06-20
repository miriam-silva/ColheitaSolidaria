import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Doacoes.module.css';
import { supabase } from '../../../supabase/supabaseClient'
import { collection, getDocs, doc, getDoc } from 'firebase/firestore';
import { db } from '../../../firebase/config';
import CardHistoricoDoacao from '../../../components/CardHistoricoDoacao/CardHistoricoDoacao'
import LoadingSpinner from '../../../components/LoadingSpinner/LoadingSpinner';
import { gerarPDFDoacoes } from '../../../utils/GerarPDF/gerarPDFDoacoes';

const Doacoes = () => {
  const navigate = useNavigate();
  const [doacoes, setDoacoes] = useState([]);
  const [loading, setLoading] = useState(true)

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
      } finally {
        setLoading(false)
      }
    };

    buscarDoacoes();
  }, []);

  const hanldeExportarPDF = () =>{
    gerarPDFDoacoes()
  }

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
          {loading ? (
            <div className="d-flex justify-content-center my-4">
              <LoadingSpinner size={60} color="#a50000"/>
            </div>
          ) : doacoes.length > 0 ? (
            doacoes.map((doacao, index) => (
              <div key ={doacao.id} className= "mb-3">
                    <CardHistoricoDoacao index={index} doacao={doacao} />
                  </div> 
                ))
              ) : (
           <p className="text-center">Nenhuma doação foi encontrada.</p>
          )}
        </div>
      </div>
      
      <div className="text-center mb-5">
          <button className={`btn btn-primary ${styles.exportar_button}`} onClick={hanldeExportarPDF}>Exportar PDF</button>
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

