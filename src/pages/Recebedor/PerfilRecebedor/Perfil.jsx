import React, { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore'
import { db } from '../../../firebase/config';
import useAuthentication from '../../../hooks/useAuthentication';
import LoadingSpinner from '../../../components/LoadingSpinner/LoadingSpinner';
import sytles from './Perfil.module.css'
const Perfil = () => {
    const { user } = useAuthentication();
    const [dadosUsuario, setDadosUsuario] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const buscarDados = async () => {
            if (!user) return
            try {
                const userRef = doc(db, 'users', user.uid)
                const userSnap = await getDoc(userRef)
                if (userSnap.exists()) {
                    setDadosUsuario(userSnap.data())
                }
            } catch (error) {
                console.error('Erro ao buscar dados do usuário:', error)
            } finally {
                setLoading(false)
            }
        }
        buscarDados()
    
    }, [user])
    if (loading) return <LoadingSpinner size = {60} color="#a50000" />
    if(!dadosUsuario) return <p>Usuário nao encontrado</p>

    return (
        <div className= {sytles.containerPerfil}>
            <h2>Meu Perfil</h2>
            <p><strong>Nome:</strong>{dadosUsuario.nome}</p>
             <p><strong>Email:</strong>{user.email}</p>
            <p> <strong>Tipo de Usuário:</strong> Recebedor{dadosUsuario.tipo}</p>
          <div className= {sytles.botaoContainer}>
                    <button className={sytles.perfil_btn} onClick={() => window.history.back()}>
                      Voltar
                    </button>
                     </div>
       
        </div>
    )
}
  export default Perfil 
