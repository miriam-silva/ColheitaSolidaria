import React, {useEffect, useState} from 'react';
import {doc, getDoc, setDoc, deleteDoc} from 'firebase/firestore'
import {db} from '../../firebase/config'
import useAuthentication from '../../hooks/useAuthentication'
import styles from './CardDoacao.module.css';
import { useNavigate } from 'react-router-dom';

const CardDoacao =  ({imagemUrl, nome, validade, descricao, selecionado, onToggle, selecionavel = true, id, onRemoverFavorito = null}) => {
    const navigate = useNavigate()
    const {user} = useAuthentication()
    const [favoritado, setFavoritado] = useState(false)

    useEffect (() => {
        const verificarFavorito = async () => {
            if(!user || !id) return
            const docRef = doc(db, "users", user.uid ,"favoritos", id)
            const docSnap = await getDoc(docRef)
            if (docSnap.exists()) {
                setFavoritado(true)
            } else {
                setFavoritado(false)
            }
        }  
        
        if (user) {
            verificarFavorito()
        }
    }, [user, id])

    
           const handleFavoritar = async() => {
           console.log("Valor da prop 'nome' no CardDoacao:", nome);
            console.log("Dentro de handleFavoritar")
            console.log("Valor de user:", user);
            console.log("valor de user.uid:", user?.uid);
            console.log("Valor de id:", id);
            if(!user || !user.uid){
                console.log("Usuario nao logado ou uid nao encontrado");
                return
            } 

            if(!id) {
                console.log("ID da doação não encontrado");
                return
            }


              const favoritoRef = doc(db, "users",user.uid,"favoritos", id)
             try {
            if(favoritado) {
                await deleteDoc (favoritoRef)
                setFavoritado(false)
           
                if(onRemoverFavorito) {
                    onRemoverFavorito()
                }
            } else {
                await setDoc(favoritoRef, {
                    doacaoId: id,
                    nome,
                    validade,
                    descricao,
                    imagemUrl: '',
                    FavoritadoEm: new Date(),
                })
                setFavoritado(true)
                console.log("Doação favoritada com sucesso")
            }
            console.log("Favoritado:", favoritado);
         } catch (error) {
                console.error("Erro ao favoritar a doação:", error);
            }
            if (!favoritado) {
                navigate('/favoritas')
            }
        }  
        
    if (!imagemDoacao) return null

    if (imagemDoacao.startsWith('http')){
        return imagemDoacao
    }



    return (
        <div className= {styles.cardDoacao}>
            {urlImagem ? (
                <img src={urlImagem} alt={nome} className={styles.imagemdoacao}/>
            ) : (
                <div className={styles.placeholderImagem}>
                <span className={`${styles.legendaImagem}`}>Imagens dos alimentos</span>
            </div>
            )}

            <div className= {styles.conteudo}>
            <h2 className={styles.nomedoacao}>{nome}</h2>
            <p className={styles.descricaodoacao}>{descricao}</p>
            <p className={styles.validadedoacao}><strong>Validade:</strong>{validade?.toDate? validade.toDate().toLocaleDateString('pt-BR'): validade}
            </p>
            </div>
            
            {selecionavel && (
            <label className={styles.checkboxlabel}>
                <input type="checkbox"
                checked= {selecionado} onChange = {onToggle}
                />
            </label>
            )}
            <button onClick={handleFavoritar}>
                {favoritado ? ' Remover dos favoritos' : 'Adicionar aos Favoritos'}

            </button>
            
        </div>
    )

}

export default CardDoacao
