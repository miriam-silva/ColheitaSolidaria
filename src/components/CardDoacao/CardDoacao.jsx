import React, { useEffect, useState } from "react";
import styles from './CardDoacao.module.css';
import { FaHeart, FaRegHeart, FaTrash } from 'react-icons/fa';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const obterUrlImagem = (imagemDoacao) => {
    if (!imagemDoacao) return null;
    if (imagemDoacao.startsWith('http')) return imagemDoacao;
    return `https://pyjqpkkscqlokgmdtslk.supabase.co/storage/v1/object/public/doacoes/${imagemDoacao}`;
}

const CardDoacao = ({
    id,
    imagemUrl,
    nome,
    validade,
    descricao,
    selecionado,
    onToggle,
    selecionavel = true,
    onToggleFavorito,
    onRemoverFavorito
}) => {
    const urlImagem = obterUrlImagem(imagemUrl);
    const [favorito, setFavorito] = useState(false);
    const [nutrientes, setNutrientes] = useState(null);
    const [showNutrientesModal, setShowNutrientesModal] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const atualizarFavoritos = () => {
            const favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];
            setFavorito(favoritos.includes(id));
        }
        atualizarFavoritos();
        window.addEventListener("focus", atualizarFavoritos);
        window.addEventListener("storage", atualizarFavoritos);
        return () => {
            window.removeEventListener("focus", atualizarFavoritos);
            window.removeEventListener("storage", atualizarFavoritos);
        }
    }, [id]);

    const toggleFavorito = () => {
        let favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];
        let dados = JSON.parse(localStorage.getItem('dadosFavoritos')) || {};

        if (favoritos.includes(id)) {
            favoritos = favoritos.filter(favId => favId !== id);
            delete dados[id];
            setFavorito(false);
        } else {
            favoritos.push(id);
            dados[id] = { id, imagemUrl, nome, validade, descricao };
            setFavorito(true);
            navigate('/recebedor/favoritos');
        }

        localStorage.setItem('favoritos', JSON.stringify(favoritos));
        localStorage.setItem('dadosFavoritos', JSON.stringify(dados));

        if (onToggleFavorito) onToggleFavorito();
    }

    useEffect(() => {
        const buscarNutrientes = async () => {
            try {
                const response = await axios.get('https://world.openfoodfacts.org/cgi/search.pl', {
                    params: {
                        search_terms: nome,
                        search_simple: 1,
                        action: 'process',
                        json: 1,
                    },
                });

                const produto = response.data.products[0];
                if (produto && produto.nutriments) {
                    setNutrientes({
                        calorias: produto.nutriments['energy-kcal_100g'],
                        proteinas: produto.nutriments['proteins_100g'],
                        gorduras: produto.nutriments['fat_100g'],
                        carboidratos: produto.nutriments['carbohydrates_100g'],
                    });
                } else {
                    setNutrientes({ erro: 'Informação nutricional não encontrada' });
                }
            } catch (error) {
                console.error('Erro ao buscar dados nutricionais', error);
                setNutrientes({ erro: 'Erro ao buscar dados' });
            }
        };
        buscarNutrientes();
    }, [nome]);

    return (
        <div className={styles.cardDoacao}>
            {urlImagem ? (
                <img src={urlImagem} alt={nome} className={styles.imagemdoacao} />
            ) : (
                <div className={styles.placeholderImagem}>
                    <span className={styles.legendaImagem}>Imagens dos alimentos</span>
                </div>
            )}

            <div className={styles.conteudo}>
                <h2 className={styles.nomedoacao}>{nome}</h2>
                <p className={styles.descricaodoacao}>{descricao}</p>
                <p className={styles.validadedoacao}>
                    <strong>Validade:</strong>{' '}
                    {validade ? new Date(validade.seconds ? validade.seconds * 1000 : validade).toLocaleDateString('pt-BR') : 'Não informada'}
                </p>

                <button
                    className={`btn btn-sm ${styles.botaoNutrientes} mb-2`}
                    onClick={() => setShowNutrientesModal(true)}
                >
                    Ver informações nutricionais
                </button>
            </div>

            <div className={styles.iconesAcao}>
                {selecionavel && (
                    <>
                        <label className={styles.checkboxlabel}>
                            <input type="checkbox" checked={selecionado} onChange={onToggle} />
                        </label>
                        <button className={styles.favButton} onClick={toggleFavorito} style={{ marginTop: '9px' }}>
                            {favorito ? <FaHeart color="red" /> : <FaRegHeart />}
                        </button>
                    </>
                )}

                {onRemoverFavorito && (
                    <button
                        className={styles.botaoRemover}
                        onClick={() => onRemoverFavorito(id)}
                        title="Remover dos favoritos"
                        type="button"
                    >
                        <FaTrash color="#c00" />
                    </button>
                )}
            </div>

            {/* Modal de informações nutricionais */}
            {showNutrientesModal && (
                <div className="modal fade show"
                    style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}
                    tabIndex="-1"
                    onClick={() => setShowNutrientesModal(false)}
                >
                    <div className="modal-dialog modal-dialog-centered" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-content p-3"
                            style={{
                                maxWidth: '700px',
                                margin: 'auto',
                                borderRadius: '15px',
                                position: 'relative'
                            }}
                        >
                            <h4 style={{ textAlign: 'center', marginBottom: '15px', color: 'black' }}>
                                Informações Nutricionais do {nome}
                            </h4>

                            <div className={styles.modalBodyResponsive}>
                                {urlImagem && (
                                    <img src={urlImagem} alt={nome} className={styles.modalImagem} />
                                )}

                                <div className={styles.modalInfo}>
                                    {nutrientes ? (
                                        nutrientes.erro ? (
                                            <p>{nutrientes.erro}</p>
                                        ) : (
                                            <ul>
                                                <li><strong>Calorias:</strong> {nutrientes.calorias ?? 'N/A'} Kcal</li>
                                                <li><strong>Proteínas:</strong> {nutrientes.proteinas ?? 'N/A'} g</li>
                                                <li><strong>Gorduras:</strong> {nutrientes.gorduras ?? 'N/A'} g</li>
                                                <li><strong>Carboidratos:</strong> {nutrientes.carboidratos ?? 'N/A'} g</li>
                                            </ul>
                                        )
                                    ) : (
                                        <p className={styles.transparente}>Buscando dados nutricionais...</p>
                                    )}

                                    <p className={styles.info100g} style={{ textAlign: 'center', marginTop: '15px' }}>
                                        Valores por 100g do alimento
                                    </p>
                                </div>
                            </div>

                            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '15px' }}>
                                <button className="btn btn-secondary" onClick={() => setShowNutrientesModal(false)}>
                                    Fechar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
};

export default CardDoacao;
