import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './InicialRecebedor.module.css';
import { db } from '../../../firebase/config';
import { collection, getDocs, addDoc, serverTimestamp } from 'firebase/firestore';
import useAuthentication from '../../../hooks/useAuthentication';
import { supabase } from '../../../supabase/supabaseClient';

const InicialRecebedor = () => {
  const navigate = useNavigate();
  const { user } = useAuthentication();

  const [doacoes, setDoacoes] = useState([]);
  const [selecionados, setSelecionados] = useState([]);

  useEffect(() => {
    const buscarDoacoes = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'doacoes'));
        const listaDoacoes = querySnapshot.docs.map((doc) => {
          const data = doc.data();

          let imagemPublicaUrl = null;
          if (data.imagemDoacao) { 
            imagemPublicaUrl = supabase
              .storage
              .from('doacoes') 
              .getPublicUrl(data.imagemDoacao).publicUrl;
          }

          return {
            id: doc.id,
            ...data,
            imagemPublicaUrl,
          };
        });

        setDoacoes(listaDoacoes);
      } catch (error) {
        console.error('Erro ao buscar doações:', error);
      }
    };

    buscarDoacoes();
  }, []);


  const handleToggle = (id) => {
    setSelecionados((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleCancel = () => {
    window.location.reload();
  };

  const handleSubmit = async () => {
    if (selecionados.length === 0) {
      alert('Selecione pelo menos uma doação.');
      return;
    }

    if (!user) {
      alert('Você precisa estar logado para solicitar.');
      return;
    }

    try {
      await Promise.all(
        selecionados.map(async (doacaoId) => {
          await addDoc(collection(db, 'solicitacoes'), {
            doacaoId,
            usuarioId: user.uid,
            dataSolicitacao: serverTimestamp(),
            status: 'pendente',
          });
        })
      );
      alert('Solicitação realizada com sucesso!');
      navigate('/recebedor/Pedidoenviado');
    } catch (error) {
      console.error('Erro ao enviar solicitação:', error);
      alert(`Erro ao enviar solicitação: ${error.message || error}`);
    }
  };

  return (
    <div>
      <br />
      <nav className={`navbar navbar-expand-sm navbar-toggleable-sm navbar-light box-shadow mb-1 ${styles.navbarra}`}>
        <div className="container-fluid">
          <h3 className={`${styles.arrumar}`}>Selecione uma doação que você gostaria de receber:</h3>
        </div>
      </nav>
      <br />

      {doacoes.length === 0 ? (
        <p className="text-center">Nenhuma doação disponível no momento.</p>
      ) : (
        doacoes.map((doacao) => (
          <div key={doacao.id} className="container">
            <div className={`${styles.caixa}`}>
              {doacao.imagemPublicaUrl && (
                <img src={doacao.imagemPublicaUrl} alt={doacao.produto} className={`${styles.imagem}`} />
              )}
              <div className={`${styles.titulo}`}>
                <h4>{doacao.produto}</h4>
                <p className={`${styles.textoo}`}>{doacao.descricao}</p>
              </div>
              <div className={`${styles.check}`}>
                <input
                  type="checkbox"
                  checked={selecionados.includes(doacao.id)}
                  onChange={() => handleToggle(doacao.id)}
                />
              </div>
            </div>
          </div>
        ))
      )}

      <div className="button-container">
        <button className={`${styles.postpone_btn}`} onClick={handleCancel}>Cancelar</button>
        <button className={`${styles.approve_btn}`} onClick={handleSubmit}>Enviar</button>
      </div>
    </div>
  );
};

export default InicialRecebedor;
