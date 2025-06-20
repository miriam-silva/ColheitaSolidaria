
import React from "react";
import styles from './CardDoacao.module.css';

const CardDoacao = ({imagemUrl, nome, validade, descricao, selecionado, onToggle, selecionavel = true}) => {
    return (
        <div className= {styles.cardDoacao}>
            <div className={styles.placeholderImagem}>
                <span className={`${styles.legendaImagem}`}>Imagens dos alimentos</span>
            </div>
            {imagemUrl && <img src={imagemUrl} alt={nome} className={styles.imagemdoacao} />}
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


