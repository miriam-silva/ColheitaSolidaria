import React from "react";
import { useNavigate } from "react-router-dom";
import { useHistoricoSolicitacoes } from "../../../hooks/useHistoricoSolicitacoes";
import styles from "./Minhassolicitacoes.module.css";
import LoadingSpinner from "../../../components/LoadingSpinner/LoadingSpinner";

const Minhassolicitacoes = () => {
    const navigate = useNavigate();
    const { historico, loading, erro } = useHistoricoSolicitacoes();

    const formatarData = (dataString) => {
        if (!dataString) return "Data não disponível";
        const data = new Date(dataString);
        return data.toLocaleDateString("pt-BR");
    };

    return (
        <div>
            <nav className={`navbar navbar-expand-sm navbar-toggleable-sm navbar-light box-shadow mb-1 ${styles.navbarra}`}>
                <div className="container-fluid">
                    <h3 id="arrumar">Minhas solicitações: </h3>
                </div>
            </nav>

            {loading ? (
                <div className="d-flex justify-content-center my-4">
                    <LoadingSpinner size={60} color="#a50000" />
                </div>
            ) : erro ? (
                <h3 className={`${styles.transparente}`}>{erro}</h3>
            ) : historico.length === 0 ? (
                <h3 className={`${styles.transparente}`}>Nenhuma solicitação foi feita</h3>
            ) : (
                historico.map((sol) => (
                    <div key={sol.id} className={styles.caixa}>
                        {sol.doacao && (
                            <>
                                <img
                                    src={sol.doacao.imagemUrl}
                                    alt={sol.doacao.titulo}
                                    className={styles.imagem}
                                />
                                <div className={styles.textoo}> {/* Container do texto */}
                                    <h4>{sol.doacao.titulo}</h4>
                                    <p>{sol.doacao.descricao}</p>
                                    <p>
                                        <strong>Data de solicitação:</strong>{" "}
                                        {formatarData(sol.dataSolicitacao)}{" "}
                                        <strong> | Status:</strong> {sol.status}
                                    </p>
                                </div>
                            </>
                        )}
                    </div>

                ))
            )}

            <div className={styles.container_botao}>
                <button
                    className={styles.voltar_button}
                    onClick={() => navigate("/InicialRecebedor")}
                >
                    Voltar
                </button>
            </div>
        </div>
    );
};

export default Minhassolicitacoes;
