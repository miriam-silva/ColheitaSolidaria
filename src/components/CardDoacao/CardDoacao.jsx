
import React from "react";
import styles from './CardDoacao.module.css';

const obterUrlImagem = (imagemDoacao) => {
    if (!imagemDoacao) return null

    if (imagemDoacao.startsWith('http')){
        return imagemDoacao
    }

    return `https://pyjqpkkscqlokgmdtslk.supabase.co/storage/v1/object/public/doacoes/${imagemDoacao}`
}

const CardDoacao = ({imagemUrl, nome, validade, descricao, selecionado, onToggle, selecionavel = true}) => {
    const urlImagem = obterUrlImagem(imagemUrl)
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
            
        </div>
    )
};


export default CardDoacao;


