import React, { useEffect, useState } from 'react'
import CardDoacao from '../../components/CardDoacao/CardDoacao'
import styles from './Favoritos.module.css'
import { useNavigate } from 'react-router-dom'
import { FaArrowLeft } from 'react-icons/fa'
const Favoritos = () => {
    const [favoritos, setFavoritos] = useState([])
    const navigate = useNavigate()
    const voltar = () => {
        navigate(-1)
    }

    const atualizarFavoritos = () => {
        const dados = JSON.parse(localStorage.getItem('dadosFavoritos')) || {}
        const listaFavoritos = Object.values(dados)
        setFavoritos(listaFavoritos)
    }

    const removerFavorito = (id) => {
        const dados = JSON.parse(localStorage.getItem('dadosFavoritos')) || {}
        delete dados[id]
        localStorage.setItem('dadosFavoritos', JSON.stringify(dados))
        atualizarFavoritos()
    }

    useEffect(() => {
        window.addEventListener('storage', atualizarFavoritos)

        atualizarFavoritos()
        return () => window.removeEventListener('storage', atualizarFavoritos)
    }, [])



    return (

        <div className={styles.container}>
            <nav className={`navbar navbar-expand-sm navbar-toggleable-sm navbar-light box-shadow mb-1 ${styles.navbarra}`}>
                <div className="container-fluid d-flex align-items-center">

                    <h3 id="arrumar" className="ms-3">
                        Minhas doações favoritas:
                    </h3>
                </div>

            </nav>



            <div className={styles.lista}>
                {favoritos.length > 0 ? (
                    favoritos.map((doacao) => (
                        <CardDoacao
                            key={doacao.id}
                            id={doacao.id}
                            imagemUrl={doacao.imagemUrl}
                            nome={doacao.nome}
                            validade={doacao.validade}
                            descricao={doacao.descricao}
                            selecionavel={false}
                            onToggleFavorito={atualizarFavoritos}
                            onRemoverFavorito={removerFavorito}

                        />
                    ))
                ) : (
                    <div className={`${styles.arrumar} ${styles.center_button} ${styles.texto}`}>
                        <h4>Você não tem doações favoritas</h4>
                    </div>

                )}
            </div>

            <div className={styles.rodape}>
                <button className={styles.botaoVoltar}
                    onClick={voltar}
                    title="Voltar para a página anterior"
                >
                    <FaArrowLeft />
                    Voltar
                </button>
            </div>


        </div>
     


    )

}

export default Favoritos