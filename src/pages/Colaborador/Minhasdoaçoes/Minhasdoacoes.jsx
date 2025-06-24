/*A listagem de doações com uso do componente CardDoacao foi implementada na página*/
import React, {useEffect, useState} from 'react';
import {collection, getDocs} from 'firebase/firestore';
import { db } from '../../../firebase/config';
import {supabase} from '../../../supabase/supabaseClient'
import useAuthentication from '../../../hooks/useAuthentication'
import CardDoacao from '../../../components/CardDoacao/CardDoacao';
import LoadingSpinner from '../../../components/LoadingSpinner/LoadingSpinner';

const Minhasdoacoes = () => {
  const {user} = useAuthentication()
  const [doacoes, setDoacoes] = useState([])
  const [loading, setLoading] = useState(true)

   useEffect(() => {
    const fetchDoacoes = async() => {
      try{
      const snapshot = await getDocs(collection(db, 'doacoes'))
      const lista = snapshot.docs
      .map(doc => ({id: doc.id, ...doc.data()}))
      .filter(doc => doc.colaboradorId === user?.uid)

      setDoacoes(lista)
    } catch (error) {
      console.error('Erro ao buscar doações:', error)
    } finally {
      setLoading(false)
    }
  }
   
   fetchDoacoes();
  }, [user])
  
  return (
    <div style={{ padding: '20px'}}>
      <h2>Minhas Doações</h2>
      {loading ? (
        <div className="d-flex justify-content-center my-4">
          <LoadingSpinner size={60} color="#a50000"/>
        </div>
      ) : doacoes.length === 0 ? (
        <p>Nenhuma doação cadastrada por você</p>
        ) : (
          doacoes.map((doacao) => {
            const imagemPublicaUrl = doacao.imagemDoacao ?
            supabase.storage.from('doacoes').getPublicUrl(doacao.imagemDoacao).publicUrl
            :null;
             return (
              <CardDoacao 
              key = {doacao.id}
              id={doacao.id}
              imagemUrl={imagemPublicaUrl}
              nome = {doacao.produto}
              validade={doacao.validade}
              descricao={`Descrição: ${doacao.descricao}\n Quantidade : ${doacao.quantidade}`}
              selecionado={false}
              onToggle={() => {}}
              />
             )
          })
      )} 
    
    </div>
  );
};

export default Minhasdoacoes;