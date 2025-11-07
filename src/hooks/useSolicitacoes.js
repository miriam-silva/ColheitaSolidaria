import { useState } from "react";
import api from "../services/Api";

export function useSolicitacoes() {
  const [solicitacoes, setSolicitacoes] = useState([]);
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState("");

  const usuarioIdStr = localStorage.getItem("userId");
  const usuarioId = usuarioIdStr ? parseInt(usuarioIdStr) : 0;
  console.log("usuarioId no hook:", usuarioId);

  const registrarSolicitacao = async (doacaoId, quantidade = 1) => {
    if (!usuarioId || usuarioId <= 0) {
      setErro("Usuário não identificado.");
      console.error("Usuário não identificado.");
      alert("Usuário não identificado. Faça login novamente.");
      return null;
    }

    try {
      setCarregando(true);

      const response = await api.post("/Solicitacao", {
        DoacaoId: parseInt(doacaoId),
        UsuarioId: usuarioId, 
        Quantidade: parseInt(quantidade),
      });

      setSolicitacoes((prev) => [response.data, ...prev]);
      return response.data;
    } catch (error) {
      console.error("Erro ao registrar solicitação:", error);

      if (error.response?.data) {
        console.error("Detalhes do backend:", error.response.data);
        alert("Erro ao registrar solicitação: " + JSON.stringify(error.response.data));
      } else {
        alert("Erro ao registrar solicitação: " + error.message);
      }

      setErro("Erro ao registrar solicitação.");
      return null;
    } finally {
      setCarregando(false);
    }
  };

  return { solicitacoes, carregando, erro, registrarSolicitacao };
}
