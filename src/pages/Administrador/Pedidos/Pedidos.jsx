import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Pedidos.module.css";
import LoadingSpinner from "../../../components/LoadingSpinner/LoadingSpinner";
import { gerarPDFPedidos } from "../../../utils/GerarPDF/gerarPDFPedidos";
import api from "../../../services/Api"; // axios com baseURL da sua API

const Pedidos = () => {
  const navigate = useNavigate();
  const [pedidos, setPedidos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);

  useEffect(() => {
    const carregarPedidos = async () => {
      try {
        const response = await api.get("/Solicitacao");
        setPedidos(response.data);
      } catch (error) {
        console.error("Erro ao carregar solicitações:", error);
      } finally {
        setLoading(false);
      }
    };

    carregarPedidos();
  }, []);

  const handleStatusChange = async (id, novoStatus) => {
  try {
    setUpdatingId(id);

    await api.put(`/Solicitacao/${id}`, { status: novoStatus });

    setPedidos((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, status: novoStatus } : p
      )
    );
  } catch (error) {
    console.error("Erro ao atualizar status:", error);
  } finally {
    setUpdatingId(null);
  }
};


  const handleExportarPDF = async () => {
    await gerarPDFPedidos(pedidos);
  };

  return (
    <div>
      <nav
        className={`navbar navbar-expand-sm navbar-toggleable-sm navbar-light box-shadow mb-1 ${styles.navbarra}`}
      >
        <div className="container-fluid">
          <h3 id="arrumar">Pedidos:</h3>
        </div>
      </nav>

      {loading ? (
        <div className="d-flex justify-content-center my-4">
          <LoadingSpinner size={60} color="#a50000" />
        </div>
      ) : (
        <div className="container-fluid">
          <div className="row justify-content-center mb-4">
            {pedidos.map((pedido, index) => (
              <div className="col-12" key={pedido.id}>
                <div className={styles.donation_box}>
                  <p className={styles.tituloo}>
                    <strong>
                      #{String(index + 1).padStart(3, "0")} -{" "}
                      {pedido.recebedorNome || "Usuário desconhecido"}
                    </strong>
                  </p>
                  <p className={styles.textoo}>
                    {pedido.doacaoNome
                      ? `Solicitou: ${pedido.doacaoNome}`
                      : "Item não identificado"}
                  </p>
                  {pedido.doacaoDescricao && (
                    <p className={styles.textoo}>
                      Descrição: {pedido.doacaoDescricao}
                    </p>
                  )}

                  <div className={styles.button_group}>
                    <button
                      className={styles.approve_btn}
                      onClick={() => handleStatusChange(pedido.id, "Aprovado")}
                      disabled={pedido.status !== "pendente"}
                    >
                      {updatingId === pedido.id ? (
                        <LoadingSpinner size={20} color="#fff" />
                      ) : (
                        "Aprovar"
                      )}
                    </button>
                    <button
                      className={styles.postpone_btn}
                      onClick={() => handleStatusChange(pedido.id, "Protelado")}
                      disabled={pedido.status !== "pendente"}
                    >
                      {updatingId === pedido.id ? (
                        <LoadingSpinner size={20} color="#fff" />
                      ) : (
                        "Protelar"
                      )}
                    </button>
                  </div>

                  {pedido.status && (
                    <p
                      className={`${styles.status} ${pedido.status === "Aprovado"
                          ? styles.approved
                          : pedido.status === "Protelado"
                            ? styles.postponed
                            : styles.pending
                        }`}
                    >
                      Status: {pedido.status}
                    </p>
                  )}
                </div>
              </div>
            ))}

          </div>

          <div className={styles.exportar_container}>
            <button
              className={`btn btn-primary ${styles.exportar_button}`}
              onClick={handleExportarPDF}
            >
              Exportar PDF Pedidos
            </button>
          </div>

          <div className={styles.voltar_container}>
            <button
              className={styles.voltar_button}
              onClick={() => navigate("/InicialAdministrador")}
            >
              Voltar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Pedidos;
