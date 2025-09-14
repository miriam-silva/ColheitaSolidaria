import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './InicialRecebedor.module.css';
import { db } from '../../../firebase/config';
import { collection, getDocs, addDoc, serverTimestamp } from 'firebase/firestore';
import useAuthentication from '../../../hooks/useAuthentication';
import { supabase } from '../../../supabase/supabaseClient';
import CardDoacao from '../../../components/CardDoacao/CardDoacao';
import LoadingSpinner from '../../../components/LoadingSpinner/LoadingSpinner';
import ListaDoacoesFiltraValidade from '../../../components/ListaDoacoesFiltraValidade/ListaDoacoesFiltraValidade';

const InicialRecebedor = () => {
  const navigate = useNavigate();
  const { user } = useAuthentication();

  const [doacoes, setDoacoes] = useState([]);
  const [selecionados, setSelecionados] = useState([]);
  const [loading, setLoading] = useState(false)

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
    
    setLoading(true)
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
    } finally {
      setLoading(false)
    }
  };

  return (
    <div>
      <nav className={`navbar navbar-expand-sm navbar-toggleable-sm navbar-light box-shadow mb-1 ${styles.navbarra}`}>
        <div className="container-fluid">
          <h3 className={`${styles.arrumar}`}>Selecione uma doação que você gostaria de receber:</h3>
        </div>
      </nav>
       
      <br/>

      <ListaDoacoesFiltraValidade 
        selecionados={selecionados} 
        onSelecionar={(id) => {
          setSelecionados(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]) 
      }} somenteAtivas={true}/>


      <div className="button-container">
        <button className={`${styles.postpone_btn}`} onClick={handleCancel}>Cancelar</button>
        <button className={`${styles.approve_btn}`} onClick={handleSubmit}>Enviar</button>
      </div>
    </div>
  );
};

export default InicialRecebedor;
