import { useState, useEffect } from "react";
import api from "../services/Api";

export function useHistoricoSolicitacoes() {
  const [historico, setHistorico] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState("");

  const usuarioId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchHistorico = async () => {
      if (!usuarioId) {
        setErro("Usuário não identificado.");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const response = await api.get(`/Solicitacao/usuario/${usuarioId}/historico`);
        setHistorico(response.data);
      } catch (error) {
        console.error("Erro ao buscar histórico de solicitações:", error);
        setErro("Não foi possível carregar o histórico.");
      } finally {
        setLoading(false);
      }
    };

    fetchHistorico();
  }, [usuarioId]);

  return { historico, loading, erro };
}
