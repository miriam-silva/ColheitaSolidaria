import { useState } from "react";
import api from "../services/Api";

export function useSolicitacoes() {
  const [solicitacoes, setSolicitacoes] = useState([]);
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState("");

  const usuarioId = localStorage.getItem("userId");

  const registrarSolicitacao = async (doacaoId) => {
    if (!usuarioId) {
      setErro("Usuário não identificado.");
      return null;
    }

    try {
      setCarregando(true);
      const response = await api.post("/Solicitacao", {
        DoacaoId: doacaoId,
        UsuarioId: parseInt(usuarioId)
      });
      setSolicitacoes((prev) => [response.data, ...prev]);
      return response.data;
    } catch (error) {
      console.error("Erro ao registrar solicitação:", error.response?.data || error.message);
      setErro("Erro ao registrar solicitação.");
      return null;
    } finally {
      setCarregando(false);
    }
  };

  const buscarSolicitacoesDoUsuario = async () => {
    if (!usuarioId) {
      setErro("Usuário não identificado.");
      setSolicitacoes([]);
      return [];
    }

    try {
      setCarregando(true);
      const response = await api.get(`/Solicitacao/usuario/${usuarioId}`);
      setSolicitacoes(response.data);
      return response.data;
    } catch (error) {
      console.error("Erro ao buscar solicitações:", error.response?.data || error.message);
      setErro("Erro ao buscar solicitações.");
      setSolicitacoes([]);
      return [];
    } finally {
      setCarregando(false);
    }
  };

  const atualizarSolicitacao = async (id, status) => {
    if (status !== "Aprovado" && status !== "Negado") {
      setErro("Status inválido. Use 'Aprovado' ou 'Negado'.");
      return null;
    }

    try {
      setCarregando(true);
      const response = await api.put(`/Solicitacao/${id}`, { Status: status });

      setSolicitacoes((prev) =>
        prev.map((s) => (s.id === id ? { ...s, Status: status } : s))
      );

      return response.data;
    } catch (error) {
      console.error("Erro ao atualizar solicitação:", error.response?.data || error.message);
      setErro("Erro ao atualizar solicitação.");
      return null;
    } finally {
      setCarregando(false);
    }
  };

  return {
    solicitacoes,
    carregando,
    erro,
    registrarSolicitacao,
    buscarSolicitacoesDoUsuario,
    atualizarSolicitacao
  };
}
