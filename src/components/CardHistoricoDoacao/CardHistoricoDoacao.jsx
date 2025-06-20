import React from "react"
import {supabase} from "../../supabase/supabaseClient"
import styles from "./CardHistoricoDoacao.module.css"

const CardHistoricoDoacao = ({index, doacao}) => {
    if (!doacao) return null

    const imagemUrl = doacao.imagemDoacao
    ? supabase.storage.from("doacoes").getPublicUrl(doacao.imagemDoacao).data.publicUrl : null

    const formatarData = (data) => {
        if (data?.toDate) return data.toDate().toLocaleString("pt-BR")
        if (data?.seconds) return new Date(data.seconds * 1000).toLocaleDateString("pt-BR")
        return "Data inválida"
    }

    const isValidDate = (date) => date instanceof Date && !isNaN(date)

    return (
        <div className="col-12">
            <div className={styles.donation_box}>
                <div className="row">
                    <div className="col-md-8 col-sm-12">
                        <h5 className={styles.titulo}>
                            #{index + 1}° Doação - {doacao.produto}
                        </h5>
                        <p className={`${styles.texto}`}>
                            {doacao.descricao} - {doacao.quantidade} unidades
                        </p>
                        <p className={`${styles.texto}`}>
                        Data de registro: {formatarData(doacao.dataRegistro)} | Validade: {formatarData(doacao.validade)}
                        </p>
                        </div>
                        <div className="col-md-4 col-sm-12 d-flex justify-content-end align-items-center">
                            { imagemUrl && (
                                <img src={imagemUrl} alt="Imagem da doação" className={styles.imagem}/>
                            )}
                        </div>
                    </div>
                </div>
        </div>
    )
}

export default CardHistoricoDoacao;