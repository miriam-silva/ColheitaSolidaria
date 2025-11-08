import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Doacoes.module.css";
import api from "../../../services/Api"; 
import CardHistoricoDoacao from "../../../components/CardHistoricoDoacao/CardHistoricoDoacao";
import LoadingSpinner from "../../../components/LoadingSpinner/LoadingSpinner";
import { gerarPDFDoacoes } from "../../../utils/GerarPDF/gerarPDFDoacoes";

const Doacoes = () => {
  const navigate = useNavigate();
  const [doacoes, setDoacoes] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔹 Busca todas as doações no backend (endpoint do admin)
  useEffect(() => {
  const buscarDoacoes = async () => {
    try {
      const response = await api.get('/doacao');
      setDoacoes(response.data);
    } catch (error) {
      console.error('Erro ao buscar doações:', error);
    } finally {
      setLoading(false);
    }
  };

  buscarDoacoes();
}, []);


  const handleExportarPDF = () => {
    gerarPDFDoacoes(doacoes);
  };

  return (
    <div>
      <br />

      <nav
        className={`navbar navbar-expand-sm navbar-light box-shadow mb-1 ${styles.navbarra}`}
      >
        <div className="container-fluid">
          <h3>Doações:</h3>
        </div>
      </nav>

      <br />

      <div className="container-fluid">
        <div className="row justify-content-center mb-4">
          {loading ? (
            <div className="d-flex justify-content-center my-4">
              <LoadingSpinner size={60} color="#a50000" />
            </div>
          ) : doacoes.length > 0 ? (
            doacoes.map((doacao, index) => (
              <div key={doacao.id} className="mb-3">
                <CardHistoricoDoacao index={index} doacao={doacao} />
              </div>
            ))
          ) : (
            <p className="text-center">Nenhuma doação foi encontrada.</p>
          )}
        </div>
      </div>

      <div className="text-center mb-5">
        <button
          className={`btn btn-primary ${styles.exportar_button}`}
          onClick={handleExportarPDF}
        >
          Exportar PDF Doações
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
  );
};

export default Doacoes;
