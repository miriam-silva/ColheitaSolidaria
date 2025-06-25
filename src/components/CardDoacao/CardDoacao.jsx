import React, { useEffect, useState} from "react";
import styles from './CardDoacao.module.css';
import {FaHeart, FaRegHeart, FaTrash} from 'react-icons/fa';
import { useNavigate } from "react-router-dom";
import axios from 'axios'
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
    const [nutrientes, setNutrientes] = useState(null)
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
         useEffect(() => {
            const buscarNutrientes = async () => {
                try{
                    const response = await axios.get(
                        'https://world.openfoodfacts.org/cgi/search.pl',
                    {
                        params: {
                            search_terms: nome,
                            search_simple: 1,
                            action: 'process',
                            json: 1,
                        },
                    }

                )
                const produto = response.data.products[0]
                if (produto && produto.nutriments) {
                    setNutrientes({
                        calorias: produto.nutriments['energy-kcal_100g'],
                        proteinas: produto.nutriments['proteins_100g'],
                       gorduras: produto.nutriments['fat_100g'],
                    carboidratos: produto.nutriments['carbohydrates_100g'],
                    })

                    
                }else{
                    setNutrientes({erro: 'informação nutricional não encontrada'})
                }

                }catch (error) {
                    console.error('erro ao buscar dados nutricionais', error)
                    setNutrientes({erro: 'erro ao buscar dados'})
                }
            }  
             buscarNutrientes()
        },[nome])       
           
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

            {nutrientes? (
                nutrientes.erro ? (
                    <p className = {styles.erroNutricional}>{nutrientes.erro}</p>

                ) : (
                <div className = {styles.nutricional}>
                    <h4>Informação Nutricional (100g)</h4>
                    <ul>
                        <li>Calorias:{nutrientes.calorias ?? 'N/A'}Kcal</li>
                        <li>Proteinas:{nutrientes.proteinas ?? 'N/A'}g</li>
                         <li>Gorduras:{nutrientes.gorduras?? 'N/A'}g</li>
                          <li>Carboidratos:{nutrientes.carboidratos ?? 'N/A'}g</li>
                    </ul>
                    </div>
                )
            ):(
               <p className = {styles.loadingNutricional}>Buscando dados nutricionais...</p>
            )}
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


