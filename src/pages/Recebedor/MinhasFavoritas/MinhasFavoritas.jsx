import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../../../firebase/config'
import useAuthentication from '../../../hooks/useAuthentication'
import CardDoacao from '../../../components/CardDoacao/CardDoacao';
import styles from './MinhasFavoritas.module.css'
const MinhasFavoritas = () => {
    const { user } = useAuthentication()
    const [favoritos, setFavoritos] = useState([])


    useEffect(() => {
        console.log("MinhasFavoritas: componente montado, ou user mudou")
        const buscarFavoritos = async () => {
            if (!user) return
            console.log("Buscando favoritos do usuário:", user.uid)
            const favoritosRef = collection(db, `users/${user.uid}/favoritos`)
            const snapshot = await getDocs(favoritosRef)

            const lista = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }))

            console.log("Lista de favoritos obtida do Firestore:", lista)
           setFavoritos(lista)
     ,        console.log("Favoritos atualizados:", lista)
        }
      buscarFavoritos()
     }, [user])
    console.log("Estado atual de favoritos:", favoritos)
     
    
  


    return (
        <div className={styles.container}>
            <h1 className={styles.titulo}>Minhas Doações Favoritas</h1>

            {favoritos.length === 0 ? (
                <p className={styles.mensagem}>
                    Você ainda não marcou nenhuma doação como favorita
                </p>
            ) : (



                <div className={styles.gridFavoritos}>
                    {favoritos.map((doacao) => (
                        <CardDoacao
                        imagemUrl={doacao.imagemUrl}
                        nome={doacao.nome}
                        validade={doacao.validade}
                        descricao={doacao.descricao}
                        onToggle={() => {}}
                        selecionavel={false}
                        selecionado={false}
                        key={doacao.id}
                        id={doacao.id}
                        onRemoverFavorito={() =>  setFavoritos((prev) => prev.filter((f) => f.id !== doacao.id))} 
                        />
                    ))}

                </div>
            )}
        </div>



    )
}

export default MinhasFavoritas