
import React, {useEffect, useState} from 'react';
import {collection, getDocs} from 'firebase/firestore';
import { db } from '../../../firebase/config';
import {supabase} from '../../../supabase/supabaseClient'
import useAuthentication from '../../../hooks/useAuthentication'
import CardDoacao from '../../../components/CardDoacao/CardDoacao';
const Minhasdoacoes = () => {
  const {user} = useAuthentication()
  const [doacoes, setDoacoes] = useState([])

   useEffect(() => {
    const fetchDoacoes = async() => {
      const snapshot = await getDocs(collection(db, 'doacoes'))
      const lista = snapshot.docs
      .map(doc => ({id: doc.id, ...doc.data()}))
      .filter(doc => doc.colaboradorId === user?.uid)

      setDoacoes(lista)
    }
   
   fetchDoacoes()
  }, [user] )

  return (
    <div style={{ padding: '20px'}}>
      <h2>Minhas Doações</h2>
      {doacoes.length === 0 ? (
        <p>Nenhuma doação cadastrada por você</p>
        ) : (
          doacoes.map((doacao) => {
            const imagemPublicaUrl = doacao.imagemDoacao ?
            supabase.storage.from('doacoes').getPublicUrl(doacao.imagemDoacao).publicUrl
            :null;
             return (
              <CardDoacao 
              key = {doacao.id}
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