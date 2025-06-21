import React from "react"
import {supabase} from "../../supabase/supabaseClient"
import styles from "./CardHistoricoDoacao.module.css"

const obterUrlImagem = (imagemDoacao) => {
    if (!imagemDoacao) return null

    if (imagemDoacao.startsWith('http')){
        return imagemDoacao
    }

    const {data, error} = supabase.storage.from("doacoes").getPublicUrl(imagemDoacao)
    if(error){
        console.error("Erro ao obter publicUrl:", error)
        return null
    }

    return data?.publicUrl || null
}

const CardHistoricoDoacao = ({index, doacao}) => {
    if (!doacao) return null
    console.log("imagemDoacao raw:", doacao.imagemDoacao)

    const imagemUrl = obterUrlImagem(doacao.imagemDoacao)

    console.log("URL da imagem da doação:", imagemUrl)

    const formatarData = (data) => {
        if (data?.toDate) return data.toDate().toLocaleString("pt-BR")
        if (data?.seconds) return new Date(data.seconds * 1000).toLocaleDateString("pt-BR")
        return "Data inválida"
    }

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