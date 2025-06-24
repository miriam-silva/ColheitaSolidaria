import React, {useEffect, useState} from "react";
import {collection, getDocs} from "firebase/firestore"
import {db} from "../../firebase/config"
import {supabase} from "../../supabase/supabaseClient"
import CardDoacao from "../CardDoacao/CardDoacao";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner"

const ListaDoacoesFiltraValidade = ({onSelecionar, selecionados = [] }) => {
    const [doacoes, setDoacoes] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const buscarDoacoes = async () => {
            setLoading(true)
            try{
                const querySnapshot = await getDocs(collection(db, "doacoes"))
                const hoje = new Date()

                const listaDoacoes = querySnapshot.docs
                .map((doc) => {
                    const data = doc.data()

                    let imagemPublicaUrl = null
                    if (data.imagemDoacao){
                        imagemPublicaUrl = supabase
                        .storage 
                        .from("doacoes")
                        .getPublicUrl(data.imagemDoacao).publicUrl
                    }

                    return {
                        id: doc.id,
                        ...data,
                        imagemPublicaUrl,
                    }
                })

                .filter((doacao) => {
                    if(!doacao.validade) return true
                    const validade = doacao.validade.toDate ? doacao.validade.toDate() : new Date(doacao.validade)
                    return validade >= hoje
                })

                setDoacoes(listaDoacoes)
            } catch (error) {
                console.error("Erro ao buscar doações:", error)
            } finally {
                setLoading(false)
            }
        }
        buscarDoacoes()
    }, [])

    if (loading){
        return(
            <div className="d-flex justify-content-center my-4">
                <LoadingSpinner size={60} color="#a50000"/>
            </div>
        )
    }

    if (doacoes.length === 0) {
        return <p className="text-center">Nenhuma doação disponívem no momento.</p>
    }

    return (
        <>
            {doacoes.map((doacao) => (
                <CardDoacao key={doacao.id} id ={doacao.id} imagemUrl={doacao.imagemPublicaUrl} nome={doacao.produto} validade={doacao.validade} descricao={doacao.descricao} selecionado={selecionados.includes(doacao.id)}
                 onToggle={() => onSelecionar && onSelecionar(doacao.id)} />
            ))}
        </>
    )
}

export default ListaDoacoesFiltraValidade;