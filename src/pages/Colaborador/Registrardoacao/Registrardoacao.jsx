import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Registrardoacao.module.css";
import { registrarDoacao } from "../../../hooks/useDoacoes";
import { supabase } from "../../../supabase/supabaseClient";
import LoadingSpinner from "../../../components/LoadingSpinner/LoadingSpinner";
import { useDoacoes } from "../../../context/DoacoesContext";

const Registrardoacao = () => {
    const navigate = useNavigate();
    const { adicionarDoacao } = useDoacoes();
    const fileInputRef = useRef(null);

    const [produto, setProduto] = useState("");
    const [descricao, setDescricao] = useState("");
    const [quantidade, setQuantidade] = useState("");
    const [validade, setValidade] = useState("");
    const [mensagem, setMensagem] = useState("");
    const [tipoMensagem, setTipoMensagem] = useState("");
    const [imagemDoacao, setImagemDoacao] = useState(null);
    const [previewImagem, setPreviewImagem] = useState(null);
    const [loading, setLoading] = useState(false);
    const [showPreviewModal, setShowPreviewModal] = useState(false);

    const limparCampos = () => {
        setProduto("");
        setDescricao("");
        setQuantidade("");
        setValidade("");
        setImagemDoacao(null);
        setPreviewImagem(null);
        setShowPreviewModal(false);
        if (fileInputRef.current) fileInputRef.current.value = "";
    };

    const handleCancel = () => {
        limparCampos();
        navigate("/InicialColaborador");
    };

    // 🔹 Envia imagem ao Supabase e retorna a URL pública
    const uploadImagemSupabase = async (file, uid) => {
        const nomeArquivo = `${uid}_${Date.now()}`;
        const caminho = `imagens/${nomeArquivo}`;

        const { error } = await supabase.storage.from("doacoes").upload(caminho, file);
        if (error) throw new Error("Erro ao enviar imagem ao Supabase.");

        const { data } = supabase.storage.from("doacoes").getPublicUrl(caminho);
        return data.publicUrl;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMensagem("");

        try {
            if (!produto.trim() || !descricao.trim() || !quantidade || !validade || !imagemDoacao) {
                setMensagem("Preencha todos os campos corretamente.");
                setTipoMensagem("erro");
                setLoading(false);
                return;
            }

            const userId = localStorage.getItem("userId");
            if (!userId) {
                setMensagem("Usuário não autenticado. Faça login novamente.");
                setTipoMensagem("erro");
                setLoading(false);
                return;
            }

            // 🔹 1. Upload da imagem no Supabase
            const imagemUrl = await uploadImagemSupabase(imagemDoacao, userId);

            // 🔹 2. Envia os dados simples, o hook criará o FormData internamente
            const resultado = await registrarDoacao({
                nome: produto,
                descricao,
                quantidade,
                validade,
                imagemUrl, // <-- enviamos a URL pública, não o arquivo
            });


            if (resultado) {
                setMensagem("Doação registrada com sucesso!");
                setTipoMensagem("sucesso");
                adicionarDoacao(resultado);
                limparCampos();

                setTimeout(() => navigate("/colaborador/Doacaoregistrada"), 2000);
            } else {
                setMensagem("Erro ao registrar doação no servidor.");
                setTipoMensagem("erro");
            }
        } catch (error) {
            console.error("Erro no registro:", error);
            setMensagem("Erro inesperado ao registrar doação.");
            setTipoMensagem("erro");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <nav className={`navbar navbar-expand-sm navbar-light box-shadow mb-1 ${styles.navbarra}`}>
                <div className="container-fluid">
                    <h3 className={styles.arrumar}>Registrar Doação:</h3>
                </div>
            </nav>

            {mensagem && (
                <div
                    className={`alert ${tipoMensagem === "sucesso" ? "alert-success" : "alert-danger"} mt-3`}
                    role="alert"
                >
                    {mensagem}
                </div>
            )}

            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="productName" className={`form-label ${styles.texto}`}>
                        Nome do produto:
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="productName"
                        placeholder="Nome"
                        value={produto}
                        onChange={(e) => setProduto(e.target.value)}
                        disabled={loading}
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="productDescription" className={`form-label ${styles.texto}`}>
                        Descrição do produto:
                    </label>
                    <textarea
                        className="form-control"
                        id="productDescription"
                        rows="3"
                        placeholder="Descrição"
                        value={descricao}
                        onChange={(e) => setDescricao(e.target.value)}
                        disabled={loading}
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="productQuantity" className={`form-label ${styles.texto}`}>
                        Quantidade:
                    </label>
                    <input
                        type="number"
                        className="form-control"
                        id="productQuantity"
                        placeholder="Quantidade"
                        value={quantidade}
                        onChange={(e) => setQuantidade(e.target.value)}
                        disabled={loading}
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="productExpiry" className={`form-label ${styles.texto}`}>
                        Validade:
                    </label>
                    <input
                        type="date"
                        className="form-control"
                        id="productExpiry"
                        value={validade}
                        onChange={(e) => setValidade(e.target.value)}
                        disabled={loading}
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="imagemDoacao" className={`form-label ${styles.texto}`}>
                        Foto da doação:
                    </label>
                    <input
                        type="file"
                        className="form-control"
                        id="imagemDoacao"
                        accept="image/*"
                        ref={fileInputRef}
                        onChange={(e) => {
                            const file = e.target.files[0];
                            if (file) {
                                setImagemDoacao(file);
                                setPreviewImagem(URL.createObjectURL(file));
                                setShowPreviewModal(true);
                            }
                        }}
                        disabled={loading}
                    />
                </div>

                {/* 🔹 Modal de pré-visualização da imagem */}
                {showPreviewModal && (
                    <div
                        style={{
                            position: "fixed",
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            backgroundColor: "rgba(0,0,0,0.7)",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            zIndex: 9999,
                        }}
                    >
                        <div
                            style={{
                                background: "#fff",
                                padding: "20px",
                                borderRadius: "10px",
                                textAlign: "center",
                                maxWidth: "90%",
                                maxHeight: "90%",
                                overflow: "auto",
                                position: "relative",
                            }}
                        >
                            <h5 className={styles.texto2}>Confirme a imagem da doação</h5>
                            <img
                                src={previewImagem}
                                alt="Prévia da doação"
                                style={{ maxWidth: "80%", maxHeight: "70vh", borderRadius: "8px" }}
                            />
                            <div
                                style={{
                                    marginTop: "15px",
                                    display: "flex",
                                    justifyContent: "center",
                                    gap: "10px",
                                }}
                            >
                                <button className={styles.approve_btn} onClick={() => setShowPreviewModal(false)}>
                                    Manter
                                </button>
                                <button
                                    className={styles.postpone_btn}
                                    onClick={() => {
                                        setImagemDoacao(null);
                                        setPreviewImagem(null);
                                        setShowPreviewModal(false);
                                        if (fileInputRef.current) fileInputRef.current.value = "";
                                    }}
                                >
                                    Remover
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {loading && (
                    <div className="d-flex justify-content-center my-3">
                        <LoadingSpinner size={60} color="#a50000" />
                    </div>
                )}

                <div className="button-group">
                    <button className={styles.postpone_btn} type="button" onClick={handleCancel}>
                        Cancelar
                    </button>
                    <button
                        className={`form-label ${styles.approve_btn}`}
                        type="submit"
                        disabled={loading}
                    >
                        Enviar
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Registrardoacao;
