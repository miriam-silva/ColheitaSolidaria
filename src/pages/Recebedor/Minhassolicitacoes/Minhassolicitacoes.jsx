import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { collection, query, where, getDocs, doc, getDoc } from "firebase/firestore";
import { db } from "../../../firebase/config";
import useAuthentication from "../../../hooks/useAuthentication";
import styles from "./Minhassolicitacoes.module.css";

const Minhassolicitacoes = () => {
    const navigate = useNavigate();
    const { user } = useAuthentication();

    const [solicitacoes, setSolicitacoes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSolicitacoes = async () => {
            if (!user) return;

            try {
                const solicitacoesRef = collection(db, "solicitacoes");
                const q = query(solicitacoesRef, where("usuarioId", "==", user.uid));

                const querySnapshot = await getDocs(q);

                const listaSolicitacoes = await Promise.all(
                    querySnapshot.docs.map(async (docSolicitacao) => {
                        const solicitacaoData = docSolicitacao.data();
                        const doacaoRef = doc(db, "doacoes", solicitacaoData.doacaoId);
                        const doacaoSnap = await getDoc(doacaoRef);

                        return {
                            id: docSolicitacao.id,
                            ...solicitacaoData,
                            doacao: doacaoSnap.exists() ? doacaoSnap.data() : null,
                        };
                    })
                );

                setSolicitacoes(listaSolicitacoes);
                setLoading(false);
            } catch (error) {
                console.error("Erro ao buscar solicitações:", error);
                setLoading(false);
            }
        };

        fetchSolicitacoes();
    }, [user]);

    const formatarData = (timestamp) => {
        if (!timestamp) return "Data não disponível";
        const data = timestamp.toDate();
        return data.toLocaleDateString("pt-BR");
    };

    return (
        <div>
            <nav className={`navbar navbar-expand-sm navbar-toggleable-sm navbar-light box-shadow mb-1 ${styles.navbarra}`}>
                <div className="container-fluid">
                    <h3 id="arrumar">Minhas solicitações:</h3>
                </div>
            </nav>

            {loading ? (
                <p className="text-center">Carregando...</p>
            ) : solicitacoes.length === 0 ? (
                <h3 className={`${styles.transparente}`}>Nenhuma solicitação foi feita</h3>
            ) : (
                solicitacoes.map((sol) => (
                    <div key={sol.id} className={styles.caixa}>
                        {sol.doacao && (
                            <>
                                {sol.doacao.imagemUrl && (
                                    <img
                                        src={sol.doacao.imagemUrl}
                                        alt={sol.doacao.titulo}
                                        className={styles.imagem}
                                    />
                                )}
                                <h4 className={styles.textoo}>{sol.doacao.titulo}</h4>
                                <p className={styles.textoo}>{sol.doacao.descricao}</p>
                            </>
                        )}
                        <p className={styles.textoo}>
                            <strong>Data de solicitação:</strong>{" "}
                            {formatarData(sol.dataSolicitacao)}{" "}
                            <strong> | Status:</strong> {sol.status}
                        </p>
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
