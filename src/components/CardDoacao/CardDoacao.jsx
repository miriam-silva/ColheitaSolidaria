
import React, { useEffect, useState} from "react";
import styles from './CardDoacao.module.css';
import {FaHeart, FaRegHeart, FaTrash} from 'react-icons/fa';
import { useNavigate } from "react-router-dom";
const obterUrlImagem = (imagemDoacao) => {
    if (!imagemDoacao) return null

    if (imagemDoacao.startsWith('http')){
        return imagemDoacao
    }
    


    return `https://pyjqpkkscqlokgmdtslk.supabase.co/storage/v1/object/public/doacoes/${imagemDoacao}`
}
 
        

const CardDoacao = ({ id, imagemUrl, nome, validade, descricao, selecionado, onToggle, selecionavel = true, onToggleFavorito , onRemoverFavorito}) => {
    const urlImagem = obterUrlImagem(imagemUrl)
    const[favorito, setFavorito] = useState(false)
    const navigate = useNavigate()
  
    useEffect(() => {
        const atualizarFavoritos = () => {
        const favoritos = JSON.parse(localStorage.getItem('favoritos')) || []
        console.log('ID do card', id)
        setFavorito(favoritos.includes(id));
    }
     
        atualizarFavoritos()

        window.addEventListener("focus", atualizarFavoritos);
        window.addEventListener("storage", atualizarFavoritos);

        return () => {
            window.removeEventListener("focus", atualizarFavoritos);
            window.removeEventListener("storage", atualizarFavoritos);
        }
    }, [id]);

     const toggleFavorito = () => {
        let favoritos = JSON.parse(localStorage.getItem('favoritos')) || []
        let dados = JSON.parse(localStorage.getItem('dadosFavoritos')) || {}
        if (favoritos.includes(id)) {
            favoritos = favoritos.filter(favId => favId !== id)
            delete dados[id]
            setFavorito(false)
        
        } else {
            favoritos.push(id)
            dados[id] = { id, imagemUrl, nome, validade, descricao }
            setFavorito(true)

            navigate ('/favoritos')
        }
        localStorage.setItem('favoritos', JSON.stringify(favoritos))
       localStorage.setItem('dadosFavoritos', JSON.stringify(dados))
       
        if (onToggleFavorito) {
            onToggleFavorito();
        }
        
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
            <p className={styles.validadedoacao}><strong>Validade:</strong>{''}
            {validade? new Date(validade.seconds ? validade.seconds * 1000 : validade).toLocaleDateString('pt-BR') : 'Não informada'}
            </p>
            </div>

            <div className={styles.iconesAcao}>
            {selecionavel && (
            <label className={styles.checkboxlabel}>
                <input type="checkbox"
                checked= {selecionado} onChange = {onToggle}
                />
            </label>
            )}

             < button className={styles.favButton} onClick={toggleFavorito}>
           {favorito ? <FaHeart color = "red"/> :<FaRegHeart/>}
           </button>

           {onRemoverFavorito && (

           <button className = {styles.botaoRemover}
           onClick={() => onRemoverFavorito(id)}
           title = "Remover dos favoritos"
           type = "button"
           >
            <FaTrash color = "#c00"/>
           </button>
           )}
            </div>

          
            
        </div>
    )
};


export default CardDoacao;


